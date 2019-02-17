import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Button from '@visualbi/bifrost-editor/dist/elements/Button';
import { toJS } from 'mobx';
import MenuList from '../Shared/MenuList';
import NodeMapping from './NodeMapping';
import DataSeries from './DataSeries';
import PeriodAgg from './PeriodAgg';
import PrimarySec from './PrimarySec';
import '../../styles/DataTab.css';

const dataMenu = [
  {
    id: 1,
    title: 'Node Mapping',
    description: 'Map existing data source to tree',
    icon: 'icon icon--NodeMapping',
    storeKey: 'nodeMapProps'
  }, {
    id: 2,
    title: 'Data Series',
    description: 'Set up baseline values for simulation',
    icon: 'icon icon--DataSeries',
    storeKey: 'dataSeries'

  }, {
    id: 3,
    title: 'Periods aggregation',
    description: 'Label time interval of interest',
    icon: 'icon icon--PeriodsAggregation',
    storeKey: 'periodAgg'
  }, {
    id: 4,
    title: 'Primary and secondary values',
    description: 'Determine value to be displayed',
    icon: 'icon icon--PrimandSec',
    storeKey: 'primarySec'
  }
];

//  Select menu and  update data in Data settings

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'first',
      storeKey: ''
    };

    this.onClick = this.onClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onClick(view, menuItem) {
    const { ValueDriverTree } = this.props;
    ValueDriverTree.setDataMenuItem(menuItem);
    const storeKey = dataMenu[menuItem - 1].storeKey;
    this.setState({
      view,
      storeKey
    });
  }

  onBack() {
    this.setState({ view: 'first' });
  }

  onSubmit() {
    const { ValueDriverTree, store } = this.props;
    const { storeKey } = this.state;
    const data = ValueDriverTree.data;
    const menuData = data[storeKey];

    ValueDriverTree.setData(data);
    store.set(storeKey, menuData);
    this.onBack();
  }

  componentDidMount() {
    const {
      store, ValueDriverTree
    } = this.props;

    const data = {
      nodeMapProps: toJS(store.get('nodeMapProps')),
      dataSeries: toJS(store.get('dataSeries')),
      periodAgg: toJS(store.get('periodAgg')),
      primarySec: toJS(store.get('primarySec'))

    };

    ValueDriverTree.setInitialData(data);
    ValueDriverTree.toggleNodeConfigModal(false);
  }

  //  render component according to menu selected

  render() {
    const { view } = this.state;
    const { ValueDriverTree, store } = this.props;
    const { dataMenuItem } = ValueDriverTree;

    return (
      <div className="vdt-data-view">
        {view === 'first'
          && dataMenu.map(data => <MenuList data={data} onClick={this.onClick} />)
        }
        {view === 'second'
          && (
            <div>
              <Flex flexDirection="column" className="menu-data-view">
                <Flex alignItems="center" className="menu-data-view-img">
                  <span onClick={this.onBack}>Back</span>
                  <i
                    onClick={this.onBack}
                    className="icon icon--ChevronLeft"
                    style={{
                      height: '20px',
                      width: '20px',
                      marginRight: '5px'
                    }}
                  />
                </Flex>
                { (dataMenuItem === 1) ? <NodeMapping store={store} /> : null}
                { (dataMenuItem === 2) ? <DataSeries store={store} /> : null}
                { (dataMenuItem === 3) ? <PeriodAgg store={store} /> : null}
                { (dataMenuItem === 4) ? <PrimarySec store={store} /> : null}
              </Flex>
              <div className="view-footer-btn">
                <Button disabled size="sm" className="back-button" onClick={this.onBack}>Back</Button>
                <Button secondary size="sm" className="finish-button" onClick={this.onSubmit}>Finish</Button>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default inject('ValueDriverTree')(observer(Data));
