import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import CommonComponent from './CommonComponent';
import MenuList from '../Shared/MenuList';
import FormPanel from '../Shared/FormPanel';

import Button from '@visualbi/bifrost-editor/dist/elements/Button';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';

import '../../styles/DataTab.css';
// import '../../styles/VDT.css';
import '@visualbi/bifrost-editor/css/Editor.css';
import '../../styles/NodeNavigator.css';

const dataMenu = [
    {
        id: 1,
        title: 'Title',
        description: 'Basic dimension data display',
        icon: 'icon icon--General',
        storeKey: 'general'
    }, {
      id: 2,
      title: 'Primary KPI',
      description: 'Basic Measure and dimension data display',
      icon: 'icon icon--General',
      storeKey: 'general'
    }, {
      id: 3,
      title: 'Secondary KPI',
      description: 'Basic Measure and dimension data display',
      icon: 'icon icon--StatusBar',
      storeKey: 'statusBar'
    }, {
      id: 4,
      title: 'SparkLine Chart',
      description: 'Display chart as per Measure and Dimension data',
      icon: 'icon icon--Visualization',
      storeKey: 'visualization'
    }, {
      id: 5,
      title: 'Icon',
      description: 'Basic display Icon',
      icon: 'icon icon--Colors',
      storeKey: 'colors'
    }, {
        id: 6,
        title: 'Image',
        description: 'Basic display Image',
        icon: 'icon icon--Colors',
        storeKey: 'colors'
    }, {
        id: 7,
        title: 'Image',
        description: 'Basic display Image',
        icon: 'icon icon--Colors',
        storeKey: 'colors'
    }, {
        id: 8,
        title: 'Image',
        description: 'Basic display Image',
        icon: 'icon icon--Colors',
        storeKey: 'colors'
    }
  ];

class CustomizeMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
          onState: 'first',
          tabSelected: 'general',
          component: '',
          view: 'first',
          storeKey: '',
          title: '',
          id: 0
        };
        
    this.onClick = this.onClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onClick(view, menuItem) {
    console.log('view menuItem', view, menuItem);
    const storeKey = dataMenu[menuItem - 1].storeKey;
    const title = dataMenu[menuItem - 1].title;
    const id = dataMenu[menuItem - 1].id;
    this.setState({
      view,
      storeKey,
      title,
      id
    });
  }

  onSubmit() {
    const { store } = this.props;
    const { storeKey } = this.state;
    const menuData = appearance[storeKey];

    store.set(storeKey, menuData);
    this.onBack();
  }

  onBack() {
    this.setState({ view: 'first' });
  }

  render() {
    const { view } = this.state;
    const { store } = this.props;
    console.log('datastore in CustomizeMenu', this.props, store, this.state.id)
    // const { treeHierachical } = TreeStore; // Store does not update without this statement, TODO
    return (
      <div className="vdt-data-view" style={{ marginBottom: '20px' }}>
        {view === 'first'
          && dataMenu.map(data => <MenuList data={data} onClick={this.onClick} /> )
        }
        
        {view === 'second'
          && (
            <FormPanel onSubmit={this.onSubmit} onBack={this.onBack} submitButtonRender title={this.state.title}>
                { (this.state.id === 1) && <CommonComponent store={store} title="Title" key={this.state.id} /> }
                { (this.state.id === 2) && <CommonComponent store={store} title="Primary KPI" /> }
                { (this.state.id === 3) && <CommonComponent store={store} title="Secondary KPI" /> }
                { (this.state.id === 4) && <CommonComponent store={store} title="SparkLine Chart" /> }
                { (this.state.id === 5) && <CommonComponent store={store} title="Icon" /> }
                { (this.state.id === 6) && <CommonComponent store={store} title="Image" /> }
                { (this.state.id === 7) && <CommonComponent store={store} title="Image" /> }
                { (this.state.id === 8) && <CommonComponent store={store} title="Image" /> }
            </FormPanel>
          )
        }

        {
            view === 'first'
            && <div className="node-toolbar" style={{ position: 'fixed', width: '320px'}}>
            <Button className="btn-clear" onClick={this.expandAll}>
                <Flex alignItems="center">
                <i className="icon icon--Expand" />
                Expand
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