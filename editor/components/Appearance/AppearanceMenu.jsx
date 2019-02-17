import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Button from '@visualbi/bifrost-editor/dist/elements/Button';
import { toJS } from 'mobx';
import General from './General';
import StatusBar from './StatusBar';
import Visualization from './Visualization';
import Colors from './Colors';
import MenuList from '../Shared/MenuList';
import '../../styles/DataTab.css';

const dataMenu = [
  {
    id: 1,
    title: 'General',
    description: 'Basic tree display settings',
    icon: 'icon icon--General',
    storeKey: 'general'
  }, {
    id: 2,
    title: 'Status Bar',
    description: 'Define status bars display and meaning',
    icon: 'icon icon--StatusBar',
    storeKey: 'statusBar'
  }, {
    id: 3,
    title: 'Visualization',
    description: 'Define status bars meaning',
    icon: 'icon icon--Visualization',
    storeKey: 'visualization'
  }, {
    id: 4,
    title: 'Colors',
    description: 'Manage all color settings',
    icon: 'icon icon--Colors',
    storeKey: 'colors'
  }
];

//  Select menu and update data in Appearance settings
class AppearanceMenu extends Component {
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
    ValueDriverTree.setAppearanceMenuItem(menuItem);
    const storeKey = dataMenu[menuItem - 1].storeKey;
    this.setState({
      view,
      storeKey
    });
  }

  onSubmit() {
    const { ValueDriverTree, store } = this.props;
    const { storeKey } = this.state;
    const appearance = ValueDriverTree.appearance;
    const menuData = appearance[storeKey];

    ValueDriverTree.setAppearance(appearance);
    store.set(storeKey, menuData);
    this.onBack();
  }

  componentDidMount() {
    const { store, ValueDriverTree } = this.props;
    const appearance = {
      visualization: toJS(store.get('visualization')),
      statusBar: toJS(store.get('statusBar')),
      general: toJS(store.get('general')),
      colors: toJS(store.get('colors')),
    };

    ValueDriverTree.setInitialAppearance(appearance);
    ValueDriverTree.toggleNodeConfigModal(false);
  }

  // Rendering Form according to menu selected
  renderMenu(appearanceMenuItem, store) {
    if (appearanceMenuItem === 1) {
      return (<General store={store} />);
    } if (appearanceMenuItem === 2) {
      return (<StatusBar store={store} />);
    } if (appearanceMenuItem === 3) {
      return (<Visualization store={store} />);
    }
    return (<Colors store={store} />);
  }

  onBack() {
    this.setState({ view: 'first' });
  }

  render() {
    const { view } = this.state;
    const { ValueDriverTree, store } = this.props;
    const { appearanceMenuItem } = ValueDriverTree;

    return (
      <div className="vdt-data-view">
        {view === 'first'
          && dataMenu.map(data => <MenuList data={data} onClick={this.onClick} />)
        }
        {view === 'second'
          && (
            <div>
              <Flex flexDirection="column" className="menu-data-view">
                <Flex
                  alignItems="center"
                  className="menu-data-view-img"
                >
                  <span onClick={this.onBack}>Back</span>
                  <i
                    className="icon icon--ChevronLeft"
                    onClick={this.onBack}
                    style={{
                      height: '20px',
                      width: '20px',
                      marginRight: '5px'
                    }}
                  />
                </Flex>
                {this.renderMenu(appearanceMenuItem, store)}
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

export default inject('ValueDriverTree')(observer(AppearanceMenu));
