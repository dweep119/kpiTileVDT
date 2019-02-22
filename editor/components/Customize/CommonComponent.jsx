import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import Tabs from '../Shared/Tabs';

import GeneralComponent from '../KpiGeneral';
import DataComponent from '../KpiData';
import AppearanceComponent from '../KpiAppearance';

import '../../styles/DataTab.css';

let options = 'title';
// const scaling = [{ key: 'title', label: 'Title' }, { key: 'primarykpi', label: 'Primary KPI' }, { key: 'secondarykpi', label: 'Secondary KPI' }, { key: 'sparklinechart', label: 'SparkLine Chart' }, { key: 'icon', label: 'Icon' }, { key: 'image', label: 'Image' }];

class CommonComponent extends Component {
    constructor(props) {
      super(props);
    //   this.proceed = this.proceed.bind(this);
      this.state = {
        onState: 'second',
        tabSelected: 'appearance',
        key: '',
        component: ''
      };
      
      this.ontabSelected = this.ontabSelected.bind(this);
    //   this.createTasks = this.createTasks.bind(this);
    //   this.addItem = this.addItem.bind(this);
    //   this.deleteItem = this.deleteItem.bind(this);
    //   this.onChange = this.onChange.bind(this);
    }
  
    // delete(key) {
    //   this.props.delete(key);
    // }
  
    // createTasks(item) {
    //   return (
    //     <div className="list-style">
    //       <span key={item.key} style={{ textTransform: 'capitalize' }}>{item.text}</span>
    //       <div>
    //         <i style={{ margin: '0px 10px' }} className="material-icons" onClick={() => this.proceed(item.key, item.text)}>settings</i>
    //         <i style={{ margin: '0px 10px' }} className="material-icons" onClick={() => this.deleteItem(item.key)}>delete</i>
    //       </div>
    //     </div>
    //   );
    // }
  
    // addItem() {
    //   const { store } = this.props;
    //   const itemArray = toJS(store.get('kpitile'));
    //   console.log('AddItem itemArray', itemArray);
    //   // if (itemArray.length !== 0) {
    //   //   if (itemArray[0].icon === "icon-check") {
    //   //     itemArray.shift();
    //   //   }
    //   // }
    //   if (options !== '') {
    //     itemArray.push(
    //       {
    //         text: options,
    //         key: Date.now(),
    //       }
    //     );
  
    //     options = '';
    //   }
    //   console.log('itemArrayi', itemArray);
    //   // let obj = {
    //   //   "widget":
    //   // }
    //   // const rules = _.reverse(itemArray);
    //   // this.setState({
    //   //   items: itemArray
    //   // });
    //   console.log('itemArray TodoList itemArray', itemArray);
    //   store.set('kpitile', itemArray);
    //   // e.preventDefault();
    // }
  
    // deleteItem(key) {
    //   console.log('deleteItem deleteItem deleteItem', key);
    //   const { store } = this.props;
    //   const rules = toJS(store.get('kpitile'));
    //   const filteredItems = rules.filter(item => (item.key !== key));
  
    //   // this.setState({
    //   //   items: filteredItems
    //   // });
    //   store.set('kpitile', filteredItems);
    // }
  
  
    // onSubmit(response) {
    //   // this.setState({ selection: response });
    // }
  
    // proceed(val, name) {
    //   // console.log('proceed proceed', val, name);
    //   this.setState({
    //     onState: 'second',
    //     key: val,
    //     component: name
    //   });
    // }
  
    ontabSelected(code) {
      this.setState({ tabSelected: code });
    }
  
    // onChange(v) {
    //   options = v;
    //   console.log('OnChange TodoList', options);
    // }
  
    render() {
      const { store } = this.props;
    //   const obj = { enable: true };
    //   store.set('kpieditor', obj);
      const todoEntries = toJS(store.get('kpitile'));
      console.log("toJS(store.get('kpitile'))", todoEntries);
      // if (todoEntries[0].icon === "icon-check") {
      //   todoEntries.shift();
      // }
    //   const listItems = todoEntries.map(this.createTasks);
      console.log('this.props this.props Render', this.props);
      const list = [
    //   {
    //     name: 'General',
    //     code: 'general',
    //     status: true,
    //     colorCode: '#f3c907',
  
    //   },
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
            {/* {
                this.state.onState === 'first' && (
                <div>
                  <div className="todoListMain">
                    <div className="header" style={{ marginBottom: '30px' }}>
                      <form> */}
                        {/* <input ref={(a) => this._inputElement = a}
                            placeholder="enter task">
                          </input>  */}
                        {/* <select id="myDropdown" ref={(a) => this._inputElement = a} defaultValue={"Title"}>
                          <option value="">Select an element</option>
                            <option name="Title" value="title">Title</option>
                            <option name="Primary KPI" value="primarykpi">Primary KPI</option>
                            <option name="Secondary KPI" value="secondarykpi">Secondary KPI</option>
                            <option name="SparkLine Chart" value="sparklinechart">SparkLine Chart</option>
                            <option name="Image" value="image">Image</option>
                            <option name="Icon" value="icon">Icon</option>
                          </select> */}
  
                        {/* <Select className="dropdown" options={scaling} onChange={e => this.onChange(e)} />
  
  
                        <Button type="submit" onClick={this.addItem}>Add</Button>
                      </form>
                    </div>
  
                    <div className="theList">
                      {listItems}
                    </div> */}
                    {/* <TodoItems entries={this.state.items}
                                delete={this.deleteItem}/>      */}
                  {/* </div>
  
  
                </div>
                )} */}
            {
              this.state.onState === 'second' && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
  
                <Tabs list={list} selected={this.state.tabSelected} onSelect={this.ontabSelected} />
                {/* {this.state.tabSelected === 'general' && (
                <div className="vdt-general">
                  <GeneralComponent
                    store={this.props.store}
                    editorData={CommonComponent}
                    expand={this.expand}
                    data={this.props.key}
                    onSubmit={key => this.setState({ tabSelected: 'appearance', key })}
                  />
                </div>
                )} */}
                {this.state.tabSelected === 'appearance' && (
                <div className="vdt-appearance">
                  <AppearanceComponent
                    store={this.props.store}
                    component={this.props.component}
                    editorData={CommonComponent}
                    expand={this.expand}
                    data={this.props.data}
                    onSubmit={key => this.setState({ tabSelected: 'data', key })}
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