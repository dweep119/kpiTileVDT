import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Editor from '@visualbi/bifrost-editor/dist/core/Editor';

import TodoList from './panels/TodoList';

export class App extends Component {
  constructor(props) {
    super(props);

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

  render() {
    const {listener, configurations} = this.props;
    const panels = [
      {
        key: 'edit-kpi',
        component: TodoList,
        props: {
          className: 'vdt-editor-panel',
          dataView: this.props.dataView
        }
      }];
    const nav = [
      {
        label: 'Edit KPI',
        type: 'panel',
        icon: 'Data',
        panelKey: 'edit-kpi',
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
