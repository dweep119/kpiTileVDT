import React, { Component } from 'react';
import { observer, inject, Provider } from 'mobx-react';
import withPanel from '@visualbi/bifrost-editor/dist/core/withPanel';
import 'react-sortable-tree/style.css';
import PropTypes from 'prop-types';

import Button from '@visualbi/bifrost-editor/dist/elements/Button';
import Select from '@visualbi/bifrost-editor/dist/forms/Select';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Tabs from '../components/Shared/Tabs';
// import { Accordion, AccordionItem } from '../layout/Accordion';
import '../styles/Kpi.css';
// import ImageZoom from 'react-medium-image-zoom'
import GeneralComponent from '../components/KpiGeneral';
import DataComponent from '../components/KpiData';
import AppearanceComponent from '../components/KpiAppearance';
import DataStore from '../store/DataStore';
import _ from 'lodash';
import { toJS } from 'mobx';
import '../styles/Icon.css';
// import '../../styles/DataTab.css';


import '../styles/TodoList.css';
// import TodoItems from "./TodoItems";

const panelConfig = {
  title: 'Create template for KPI',
  options: {
    resizable: false
    // pass extra parameters,
  }
};

const DEFAULT_COLOR = '#FFAA00';
let options = 'title';
const scaling = [{ key: 'title', label: 'Title' }, { key: 'primarykpi', label: 'Primary KPI' }, { key: 'secondarykpi', label: 'Secondary KPI' }, { key: 'sparklinechart', label: 'SparkLine Chart' }, { key: 'icon', label: 'Icon' }, { key: 'image', label: 'Image' }];

class TodoListPanel extends Component {
  constructor(props) {
    super(props);
    this.proceed = this.proceed.bind(this);
    this.state = {
      onState: 'first',
      tabSelected: 'general',
      items: [],
      key: '',
      component: ''
    };
    console.log('this.props this.props constructor', this.props);
    this.dataStore = new DataStore();
    this.ontabSelected = this.ontabSelected.bind(this);

    this.createTasks = this.createTasks.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  createTasks(item) {
    return (
      <div className="list-style">
        <span key={item.key} style={{ textTransform: 'capitalize' }}>{item.text}</span>
        <div>
          <i style={{ margin: '0px 10px' }} className="material-icons" onClick={() => this.proceed(item.key, item.text)}>settings</i>
          <i style={{ margin: '0px 10px' }} className="material-icons" onClick={() => this.deleteItem(item.key)}>delete</i>
        </div>
      </div>
    );
  }

  addItem() {
    const { store } = this.props;
    const itemArray = toJS(store.get('kpitile'));
    console.log('AddItem itemArray', itemArray);
    // if (itemArray.length !== 0) {
    //   if (itemArray[0].icon === "icon-check") {
    //     itemArray.shift();
    //   }
    // }
    if (options !== '') {
      itemArray.push(
        {
          text: options,
          key: Date.now(),
        }
      );

      options = '';
    }
    console.log('itemArrayi', itemArray);
    // let obj = {
    //   "widget":
    // }
    // const rules = _.reverse(itemArray);
    this.setState({
      items: itemArray
    });
    console.log('itemArray TodoList itemArray', itemArray);
    store.set('kpitile', itemArray);
    // e.preventDefault();
  }

  deleteItem(key) {
    console.log('deleteItem deleteItem deleteItem', key);
    const { store } = this.props;
    const rules = toJS(store.get('kpitile'));
    const filteredItems = rules.filter(item => (item.key !== key));

    this.setState({
      items: filteredItems
    });
    store.set('kpitile', filteredItems);
  }


  onSubmit(response) {
    this.setState({ selection: response });
  }

  proceed(val, name) {
    console.log('proceed proceed', val, name);
    this.setState({
      onState: 'second',
      key: val,
      component: name
    });
  }

  ontabSelected(code) {
    this.setState({ tabSelected: code });
  }

  static get propTypes() {
    return { store: PropTypes.element };
  }

  onChange(v) {
    options = v;
    console.log('OnChange TodoList', options);
  }

  render() {
    const { store } = this.props;
    const obj = { enable: true };
    store.set('kpieditor', obj);
    const todoEntries = toJS(store.get('kpitile'));
    console.log("toJS(store.get('kpitile'))", todoEntries);
    // if (todoEntries[0].icon === "icon-check") {
    //   todoEntries.shift();
    // }
    const listItems = todoEntries.map(this.createTasks);
    console.log('this.props this.props Render', this.props);
    const list = [{
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
      <Provider dataStore={this.dataStore}>

        <div>
          {
              this.state.onState == 'first' && (
              <div>
                <div className="todoListMain">
                  <div className="header" style={{ marginBottom: '30px' }}>
                    <form>
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

                      <Select className="dropdown" options={scaling} onChange={e => this.onChange(e)} />


                      <Button type="submit" onClick={this.addItem}>Add</Button>
                    </form>
                  </div>

                  <div className="theList">
                    {listItems}
                  </div>
                  {/* <TodoItems entries={this.state.items}
                              delete={this.deleteItem}/>      */}
                </div>


              </div>
              )}
          {
            this.state.onState == 'second' && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>

              {/* <Flex flexDirection={"column"} className={"menu-data-view"}>
                  <Flex
                    alignItems={"center"}
                    className={"menu-data-view-img"}
                    onClick={() => this.setState({onState: "first", tabSelected: 'general', key: '', component: ''})}>
                    <i class="material-icons" style={{width: '20px'}}>arrow_back_ios</i>
                    <span style={{textTransform: "capitalize", fontSize: "15px"}}>{this.state.component}</span>
                  </Flex>
                </Flex> */}
              <Flex
                alignItems="center"
                className="menu-data-view-img"
              >
                <i
                  className="icon icon--ChevronLeft"
                  onClick={() => this.setState({
                    onState: 'first', tabSelected: 'general', key: '', component: ''
                  })}
                  style={{
                    height: '20px',
                    width: '20px',
                    marginRight: '5px'
                  }}
                />
                <span onClick={() => this.setState({
                  onState: 'first', tabSelected: 'general', key: '', component: ''
                })}
                >
Back
                </span>
              </Flex>

              <Tabs list={list} selected={this.state.tabSelected} onSelect={this.ontabSelected} />
              {this.state.tabSelected == 'general' && (
              <div className="vdt-general">
                <GeneralComponent
                  store={this.props.store}
                  editorData={TodoList}
                  expand={this.expand}
                  data={this.state.key}
                  onSubmit={key => this.setState({ tabSelected: 'appearance', key })}
                />
              </div>
              )}
              {this.state.tabSelected == 'appearance' && (
              <div className="vdt-appearance">
                <AppearanceComponent
                  store={this.props.store}
                  component={this.state.component}
                  editorData={TodoList}
                  expand={this.expand}
                  data={this.state.key}
                  onSubmit={key => this.setState({ tabSelected: 'data', key })}
                />
              </div>
              )}
              {this.state.tabSelected == 'data' && (
              <div className="vdt-data">
                <DataComponent
                  store={this.props.store}
                  data={this.state.key}
                  dataView={this.props.dataView}
                  component={this.state.component}
                  editorData={TodoList}
                  expand={this.expand}
                  close={() => this.props.onClose()}
                />
              </div>
              )}
            </div>
            )}
        </div>

      </Provider>
    );
  }
}

TodoListPanel.defaultProps = {
  store: {}
};

export default withPanel(observer(TodoListPanel), panelConfig);


// import React, { Component } from "react";
// import "./TodoList.css";
// import TodoItems from "./TodoItems";

// class TodoList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       items: []
//     };

//     this.addItem = this.addItem.bind(this);
//     this.deleteItem = this.deleteItem.bind(this);
//   }

//   addItem(e) {
//     var itemArray = this.state.items;

//     if (this._inputElement.value !== "") {
//       itemArray.unshift(
//         {
//           text: this._inputElement.value,
//           key: Date.now()
//         }
//       );

//       this.setState({
//         items: itemArray
//       });

//       this._inputElement.value = "";
//     }
//     console.log(itemArray);
//     e.preventDefault();
//   }

//   deleteItem(key) {
//     var filteredItems = this.state.items.filter(function (item) {
//       return (item.key !== key);
//     });

//     this.setState({
//       items: filteredItems
//     });
//   }

//   render() {
//     return (
//       <div className="todoListMain">
//         <div className="header">
//           <form onSubmit={this.addItem}>
//             <input ref={(a) => this._inputElement = a}
//               placeholder="enter task">
//             </input>

//             <button type="submit">add</button>
//           </form>
//         </div>

//         <TodoItems entries={this.state.items}
//                   delete={this.deleteItem}/>
//       </div>
//     );
//   }
// }

// export default TodoList;
