
import React, { Component } from 'react';
import { toJS } from 'mobx';
import {inject, observer} from 'mobx-react';
import Form from '@visualbi/bifrost-editor/dist/forms/Form';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import Select from '@visualbi/bifrost-editor/dist/forms/Select';
import Button from '@visualbi/bifrost-editor/dist/forms/Button';
import ColorPicker from '@visualbi/bifrost-editor/dist/forms/ColorPicker';

const panelConfig = {
  title: 'Apperance',
  options: {
    // pass extra parameters,
  }
};


const formFields = [
  {
    name: 'fontFamily',
    label: 'Font Family',
    component: ["primarykpi","secondarykpi","sparklinechart","title","icon"],
    defaultValue: 'Arial',
    tooltip: 'Set a custom font family for your visualization',
    control: Select,
    controlProps: {
      placeholder: 'Choose font family',
      options: [{
        key: 'Arial',
        label: 'Arial'
      }, {
        key: 'Arial Black',
        label: 'Arial Black'
      }, {
        key: 'Helvetica',
        label: 'Helvetica'
      }, {
        key: 'Times New Roman',
        label: 'Times New Roman'
      }, {
        key: 'Times',
        label: 'Times'
      }, {
        key: 'Courier New',
        label: 'Courier New'
      }, {
        key: 'Courier',
        label: 'Courier'
      }, {
        key: 'Verdana',
        label: 'Verdana'
      }, {
        key: 'Georgia',
        label: 'Georgia'
      }, {
        key: 'Palatino',
        label: 'Palatino'
      }, {
        key: 'Garamond',
        label: 'Garamond'
      }, {
        key: 'Bookman',
        label: 'Bookman'
      }, {
        key: 'Comic Sans MS',
        label: 'Comic Sans MS'
      }, {
        key: 'Trebuchet MS',
        label: 'Trebuchet MS'
      }, {
        key: 'Impact',
        label: 'Impact'
      }],
    },
    rules: [{
      required: true,
      message: 'Font Family is required',
    }]
  },
  {
    name: 'fontColor',
    label: 'Font Color',
    component: ["primarykpi","secondarykpi","sparklinechart","title","icon"],
    description: 'Set the default font color',
    control: ColorPicker,
    defaultValue: '#000000',
    controlProps: {
    },
    rules: [{
      required: true,
      message: 'Font Color is required',
    }],
  },
  {
    name: 'fontSize',
    label: 'Font Size',
    component: ["primarykpi","secondarykpi","sparklinechart","title","icon"],
    description: 'Set a font size for your visualization',
    defaultValue: 20,
    control: Input,
    controlProps: {
      type: 'number',
      placeholder: 'Set a font size',
    },
    rules: [{
      required: true,
      message: 'Font Size is required',
    }]
    // }, {
    //   type: 'string',
    //   min: 8,
    //   max: 64,
    //   message: 'Font Size must be between 8 and 64',
    // }]
  }, 
  {
    name: 'fontWeight',
    label: 'Font Weight',
    component: ["primarykpi","secondarykpi","sparklinechart","title","icon"],
    tooltip: 'Set a font weight for your visualization',
    control: Select,
    defaultValue: 'normal',
    controlProps: {
      placeholder: 'Choose a font weight',
      options: [{
        key: 'normal',
        label: 'Normal'
      }, {
        key: 'bold',
        label: 'Bold'
      }],
    },
    rules: [{
      required: true,
      message: 'Font Weight selection is required',
    }],
  }, 
  {
    name: 'backgroundColor',
    label: 'Background Color',
    component: ["primarykpi","secondarykpi","sparklinechart","title","icon","image"],
    description: 'Set the default background color',
    control: ColorPicker,
    defaultValue: '#4A90E2',
    controlProps: {
    },
    rules: [{
      required: true,
      message: 'background Color is required',
    }],
  },
  {
    name: 'textAlign',
    label: 'Text Align',
    component: ["primarykpi","secondarykpi","sparklinechart","title","icon","image"],
    tooltip: 'Set a text align for your visualization',
    control: Select,
    defaultValue: 'left',
    controlProps: {
      placeholder: 'Choose a text align',
      options: [{
        key: 'left',
        label: 'Left'
      }, {
        key: 'center',
        label: 'Center'
      }, {
        key: 'right',
        label: 'Right'
      }],
    },
    rules: [{
      required: true,
      message: 'text align selection is required',
    }],
  }, 
];

class KpiAppearance extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.onFieldsChange = this.onFieldsChange.bind(this);
  }

  onSubmit(response) {
    let merged;
    const { store } = this.props;
    const rules = toJS(store.get('kpitile'));
    console.log(', rules , rules', rules)
    let general = this.props.data

    let result = rules.map((item,inx) => {
      if(item.key === this.props.data) {
        merged = {...rules[inx], "appearance": response};
        if (item.key === merged.key) {
          item = merged;
        }
      }
      return item;    
    })
    // let arr = [merged];
    console.log('Response 123 Appearance', response, merged,  'rules.push(merged)', result);
    store.set('kpitile', result);
    this.props.onSubmit(this.props.data)
  }

  onError(errors) {
    console.log('Errors', errors);
  }

  onFieldsChange(changed, all) {
    console.log('Fields changed', changed);
    console.log('All fields', all);
  }

  render() {
    const { store } = this.props;
    console.log('Store > kpiAppearance', toJS(store.get('kpitile')));

    let response = toJS(store.get('kpitile'));
    let result = response.map((item) => {
      if (item.key === this.props.data) {
        if(item.appearance){
          // fields={formFields}
          let fields = formFields.filter((i) => {
            if (i.component.includes(this.props.component)) {
              if(Object.keys(item.appearance).includes(i.name)){
                Object.keys(item.appearance).map((k) => {
                    if(i.name === k){
                      i.defaultValue = item.appearance[k];
                    }
                })
              }
              console.log('iiiiiiiiiiiii', i)
              return i;
            }
          })
          return fields;
        }
      }
      console.log('formFields formFields Appearance', formFields)
      return formFields;
    })

    // let fields = formFields.filter(item => {
    //   if (item.component.includes(this.props.component)) {
    //     return item;
    //   }
    // })

    return (
      <div>
        <Form
          fields={_.flattenDeep(result[0])}
          onSubmit={this.onSubmit}
          submitButton={<Button>Next</Button>}
          onError={this.onError}
          onFieldsChange={this.onFieldsChange}
          onClear={() => {}}
          // showClearButton={true}
        />
      </div>
    );
  }
}

export default inject('dataStore')(observer(KpiAppearance));

















// import React, {Component} from 'react';
// import MenuList from '../Shared/MenuList'
// import {inject, observer} from 'mobx-react';
// import {toJS} from 'mobx';
// import Flex from '../../layout/Flex'
// import FormGroup from '../../forms/FormGroup';
// import Input from '../../forms/Input';
// import General from './General'
// import StatusBar from './StatusBar'
// import Visualization from './Visualization'
// import Colors from './Colors'
// const dataMenu = [
//   {
//     id: 1,
//     title: "Title Bar",
//     description: "Delete",
//     icon: "/images/titleBar"
//   }, {
//     id: 2,
//     title: "Image",
//     description: "Delete",
//     icon: "/images/image"
//   }
//   // {
//   //   id: 1,
//   //   title: "General",
//   //   description: "Basic tree display settings",
//   //   icon: "/images/datasource.svg"
//   // }, {
//   //   id: 2,
//   //   title: "Status Bar",
//   //   description: "Define status bars display and meaning",
//   //   icon: "/images/datasource.svg"

//   // }, {
//   //   id: 3,
//   //   title: "Visualization",
//   //   description: "Define status bars meaning",
//   //   icon: "/images/datasource.svg"

//   // }, {
//   //   id: 4,
//   //   title: "Colors",
//   //   description: "Manage all color settings",
//   //   icon: "/images/datasource.svg"

//   // }
// ];


// class Appearance extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       view: "first",
//       menuItem: 0
//     }
//     this.onClick = this
//       .onClick
//       .bind(this);

//   }
//   onClick(view, menuItem) {
//     this.setState({view, menuItem});
//   }

 
//   renderMenu() {
//     if (this.state.menuItem == 1) {
//       return (<General {...this.props}  onClick={this.onClick}  />)
//     }
//     if (this.state.menuItem == 2) {
//       return (<StatusBar {...this.props}/>)
//     }
//     if (this.state.menuItem == 3) {
//       return (<Visualization {...this.props}/>)
//     }
//     if (this.state.menuItem == 4) {
//       return (<Colors {...this.props}/>)
//     }

//   }

//   render() {
//     console.log(this.props);

//     return (
//       <div className="vdt-data-view">
//         {this.state.view == "first"
//           ? dataMenu.map(data => <MenuList data={data} onClick={this.onClick}/>)
//           : null
// }
//         {this.state.view == 'second'
//           ? <Flex flexDirection={"column"} className={"menu-data-view"}>
//               <Flex
//                 alignItems={"center"}
//                 className={"menu-data-view-img"}
//                 onClick={() => this.setState({view: "first", menuItem: 1})}>
//                 <img
//                   src="/images/left-arrow-blue.svg"
//                   style={{
//                   height: "20px",
//                   width: "20px",
//                   marginRight: "5px"
//                 }}/>
//                 <span>Back</span>
//               </Flex>
//               {this.renderMenu()}

//             </Flex>
//           : null
// }
//       </div>
//     )
//   }
// }

// export default inject('dataStore')(observer(Appearance));


