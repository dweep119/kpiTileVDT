import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import Tabs from '../Shared/Tabs';

import GeneralComponent from './General';
import DataComponent from './Data';
import AppearanceComponent from './Appearance';

// let options = 'title';
// const scaling = [{ key: 'title', label: 'Title' }, { key: 'primarykpi', label: 'Primary KPI' }, { key: 'secondarykpi', label: 'Secondary KPI' }, { key: 'sparklinechart', label: 'SparkLine Chart' }, { key: 'icon', label: 'Icon' }, { key: 'image', label: 'Image' }];

class CommonComponent extends Component {
    constructor(props) {
      super(props);
    //   this.proceed = this.proceed.bind(this);
      this.state = {
        onState: 'second',
        tabSelected: 'general',
        key: '',
        component: ''
      };
      
      this.ontabSelected = this.ontabSelected.bind(this);
    }
  
    ontabSelected(code) {
      this.setState({ tabSelected: code });
    }
  
    render() {
      const { store } = this.props;
      const todoEntries = toJS(store.get('kpitile'));
      console.log("toJS(store.get('kpitile'))", todoEntries);
      console.log('this.props this.props Render', this.props);
      const list = [
      {
        name: 'General',
        code: 'general',
        status: true,
        colorCode: '#f3c907',
  
      },
      {
        name: 'Appearance',
        code: 'appearance',
        status: true,
        colorCode: '#f3c907'
      },
      {
        name: 'Data',
        code: 'data',
        status: true,
        colorCode: '#f3c907'
      }];
  
      return (  
          <div  style={{marginTop:25}}>
            {
              this.state.onState === 'second' && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
  
                <Tabs list={list} selected={this.state.tabSelected} onSelect={this.ontabSelected} />
                {this.state.tabSelected === 'general' && (
                <div className="vdt-general">
                  <GeneralComponent
                    store={this.props.store}
                    editorData={CommonComponent}
                    expand={this.expand}
                    data={this.props.data}
                  />
                </div>
                )}
                {this.state.tabSelected === 'appearance' && (
                <div className="vdt-appearance">
                  <AppearanceComponent
                    store={this.props.store}
                    component={this.props.component}
                    editorData={CommonComponent}
                    expand={this.expand}
                    data={this.props.data}
                  />
                </div>
                )}
                {this.state.tabSelected === 'data' && (
                <div className="vdt-data">
                  <DataComponent
                    store={this.props.store}
                    data={this.props.data}
                    dataView={this.props.dataView}
                    component={this.props.component}
                    editorData={CommonComponent}
                    expand={this.expand}
                    close={() => this.props.onClose()}
                  />
                </div>
                )}
              </div>
              )}
          </div>
  
      );
    }
  }

  export default inject('dataStore')(observer(CommonComponent));
//   export default withPanel(observer(CommonComponent), panelConfig);