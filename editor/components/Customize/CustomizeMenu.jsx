import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import CommonComponent from './CommonComponent';
import MenuList from '../Shared/MenuList';
import FormPanel from '../Shared/FormPanel';

import Button from '@visualbi/bifrost-editor/dist/elements/Button';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';

import '../../styles/DataTab.css';
// import '../../styles/VDT.css';
import '@visualbi/bifrost-editor/css/Editor.css';
import '../../styles/NodeNavigator.css';

// const dataMenu = [
//     {
//         id: 1,
//         title: 'Title',
//         description: 'Basic dimension data display',
//         icon: 'icon icon--General',
//         storeKey: 'title'
//     }, {
//       id: 2,
//       title: 'Primary KPI',
//       description: 'Basic Measure and dimension data display',
//       icon: 'icon icon--General',
//       storeKey: 'primarykpi'
//     }, {
//       id: 3,
//       title: 'Secondary KPI',
//       description: 'Basic Measure and dimension data display',
//       icon: 'icon icon--StatusBar',
//       storeKey: 'secondarykpi'
//     }, {
//       id: 4,
//       title: 'SparkLine Chart',
//       description: 'Display chart as per Measure and Dimension data',
//       icon: 'icon icon--Visualization',
//       storeKey: 'sparklinechart'
//     }, {
//       id: 5,
//       title: 'Icon',
//       description: 'Basic display Icon',
//       icon: 'icon icon--Colors',
//       storeKey: 'icon'
//     }, {
//         id: 6,
//         title: 'Image',
//         description: 'Basic display Image',
//         icon: 'icon icon--Colors',
//         storeKey: 'image'
//     }
//   ];

class CustomizeMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
          view: 'first',
          storeKey: '',
          title: '',
          id: 0
        };
        
    this.onClick = this.onClick.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  onClick(view, menuItem) {
    let storeKey,title,id;
    const { store } = this.props;
    const itemArray = toJS(store.get('kpitile'));
    console.log('view menuItem', view, menuItem);
    itemArray.map(item => {
        if (item.id === menuItem) {
            storeKey = item.text;
            title = item.title;
            id = item.id;
        }
    });
    // const storeKey = dataMenu[menuItem - 1].storeKey;
    // const title = dataMenu[menuItem - 1].title;
    // const id = dataMenu[menuItem - 1].id;
    this.setState({
      view,
      storeKey,
      title,
      id
    });
    // itemArray.push(
    //     {
    //     text: storeKey,
    //     id: Date.now(),
    //     }
    // );
    // this.props.store.set('kpitile', itemArray);
  }

//   onSubmit() {
//     const { store } = this.props;
//     const { storeKey } = this.state;
//     const menuData = appearance[storeKey];

//     store.set(storeKey, menuData);
//     this.onBack();
//   }

  onBack() {
    this.setState({ view: 'first' });
  }

  render() {
    const { view } = this.state;
    const { store, dataView, onClose } = this.props;
    const kpitileArray = toJS(store.get('kpitile'));
    console.log('datastore in CustomizeMenu', this.props, store, this.state)
    // const { treeHierachical } = TreeStore; // Store does not update without this statement, TODO
    return (
      <div className="vdt-data-view" style={{ marginBottom: '20px' }}>
        {view === 'first'
          && kpitileArray.map(data => <MenuList data={data} onClick={this.onClick} /> )
        }
        
        {view === 'second'
          && (
            <FormPanel onSubmit={this.onSubmit} onBack={this.onBack} title={this.state.title}>
                { <CommonComponent store={store} title={this.state.title} data={this.state.id} component={this.state.storeKey} dataView={dataView} onClose={onClose} /> }
            </FormPanel>
          )
        }

        {
            view === 'first'
            && <div className="node-toolbar" style={{ position: 'fixed', width: '320px'}}>
            <Button className="btn-clear" onClick={this.onClick}>
                <Flex alignItems="center">
                <i className="icon icon--Add" />
                Add
                </Flex>              
            </Button>
            <Button className="btn-clear" onClick={this.collapseAll}>
                <Flex alignItems="center">
                <i className="icon icon--Collapse" />
                    Collapse
                </Flex>
            </Button>
            <Button className="btn-clear add-node-btn" onClick={this.confirmResetHandler}>
                <Flex>
                <i className="icon icon--Refresh" style={{ color: '#e81123' }} />
                Reset
                </Flex>
            </Button>
        </div>
        }
      </div>
    );
  }
}

  export default inject('dataStore')(observer(CustomizeMenu));
//   export default withPanel(observer(CustomizeMenu), panelConfig);