import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Editor from '@visualbi/bifrost-editor/dist/core/Editor';
// import VDTEditor from './panels/VDTEditor';
import DataPanel from './panels/DataPanel';
import AppearancePanel from './panels/AppearancePanel';
import TodoList from './panels/TodoList';
// import NodePanel from './panels/NodePanel';
// import KpiPanel from './panels/KpiPanel';
// import ValueDriverTree from './store/ValueDriverTree'


export class App extends Component {
  constructor(props) {
    super(props);
    
    this.nodeMapProps = {};
    this.dataSeries = {};
    this.periodAgg = {};
    this.primarySec = {};
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
        key: 'sample-kpi',
        component: DataPanel,
        props: {
          className: 'vdt-editor-panel'
        }
      },
      {
        key: 'edit-kpi',
        component: TodoList,
        props: {
          className: 'vdt-editor-panel'
        }
      },
      {
        key: 'vdt-kpi',
        component: AppearancePanel,
        props: {
          className: 'vdt-editor-panel'
        }
      }
    ];
    const nav = [
     {
        label: 'Sample KPI',
        type: 'panel',
        icon: 'Data',
        panelKey: 'sample-kpi'
      },
      {
        label: 'Edit KPI',
        type: 'panel',
        icon: 'Data',
        panelKey: 'edit-kpi',
      },
      {
        label: 'KPI',
        type: 'panel',
        icon: 'Data',
        panelKey: 'vdt-kpi'
      }
    ];

    const store = [
     {
        name: 'nodeMapProps',
        meta: {
          propertyId: 'nodeMapProps',
          sectionId: 'editor'
        },
        defaultValue: this.nodeMapProps
      }, {
        name: 'dataSeries',
        meta: {
          propertyId: 'dataSeries',
          sectionId: 'editor'
        },
        defaultValue: this.dataSeries
      }, {
        name: 'periodAgg',
        meta: {
          propertyId: 'periodAgg',
          sectionId: 'editor'
        },
        defaultValue: this.periodAgg
      }, {
        name: 'primarySec',
        meta: {
          propertyId: 'primarySec',
          sectionId: 'editor'
        },
        defaultValue: this.primarySec
      }, {
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
    listener={options.listener}
    getPropertyValue={options.getPropertyValue}/>, element);
};

export const removeEditor = (element) => {
  ReactDOM.unmountComponentAtNode(element);
};
