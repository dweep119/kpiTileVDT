import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Editor from '@visualbi/bifrost-editor/dist/core/Editor';

import TodoListPanel from './panels/TodoListPanel';

export class App extends Component {
  constructor(props) {
    super(props);

    if (this.props.configurations) {
      this.kpitile = this
        .props
        .getPropertyValue({propertyId: 'kpitile', sectionId: 'editor'});
      this.kpieditor = this
        .props
        .getPropertyValue({propertyId: 'kpieditor', sectionId: 'editor'});

    } else {

      this.kpitile = [{
        name: 'Test',
        color: '#FFAA22',
        icon: 'icon-check',
      }];
      this.kpieditor = [{
        name: 'Test',
        color: '#FFAA22',
        icon: 'icon-check',
      }]
    }
    
  }

  render() {
    const {listener, configurations} = this.props;
    const panels = [
      {
        key: 'edit-kpi',
        component: TodoListPanel,
        props: {
          className: 'vdt-editor-panel',
          dataView: this.props.dataView
        }
      }];
    const nav = [
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
      }];

    const store = [
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
    return (
      <div className="App">
        <Editor nav={nav} panels={panels} store={store} listener={listener}/>
      </div>
    );
  }
}

export const loadEditor = (element, options) => {
  console.log('App.js Render', options)
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
