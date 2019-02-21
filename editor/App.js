import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Editor from '@visualbi/bifrost-editor/dist/core/Editor';

import CustomizePanel from './panels/CustomizePanel';

const propertyIds = ['kpitile','kpieditor']

export class App extends Component {
  constructor(props) {
    super(props);

    this.persistProperty();
    
  }

  persistProperty() {
    propertyIds.map(propetyId =>{
      this[propetyId] = this
      .props
      .getPropertyValue({propertyId: propetyId, sectionId: 'editor'});
    })
  }

  getPanels() {
    const { configurations } = this.props;
    const VdtInstance = configurations ? configurations.VdtInstance : {};
    const dataViews = configurations ? configurations.dataViews : {};
    const treeInstance = configurations? configurations.treeInstance: {}
    return [
      {
        key: 'edit-kpi',
        component: CustomizePanel,
        props: {
          className: 'kpi-editor-panel',
          dataView: this.props.dataView
        }
      }
    ];
  }

  getNav() {
    return [
      {
        label: 'New',
        type: 'panel',
        icon: 'Add',
        panelKey: 'new-kpi',
      }, {
        label: 'Customize',
        type: 'panel',
        icon: 'Edit',
        panelKey: 'edit-kpi',
      }, {
        label: 'Settings',
        type: 'panel',
        icon: 'Settings',
        panelKey: 'settings',
      }
    ];
  }

  getStore() {
    return [
      {
        name: 'kpitile',
        meta: {
          propertyId: 'kpitile',
          sectionId: 'editor',
        },
        defaultValue: this.kpitile,
      }, {
        name: 'kpieditor',
        meta: {
          propertyId: 'kpieditor',
          sectionId: 'editor',
        },
        defaultValue: this.kpieditor,
      }
    ];
  }

  render() {
    const {listener} = this.props;
    const panels = this.getPanels();
    const nav = this.getNav();
    const store = this.getStore();

    return (
      <div className="App">
        <Editor nav={nav} panels={panels} store={store} listener={listener}/>
      </div>
    );
  }
}

export const loadEditor = (element, options) => {
  ReactDOM.render(
    <App
    configurations={options.configurations}
    options={options}
    dataView={options.bifrostData}
    listener={options.listener}
    getPropertyValue={options.getPropertyValue}/>, element);
};

export const removeEditor = (element) => {
  ReactDOM.unmountComponentAtNode(element);
};
