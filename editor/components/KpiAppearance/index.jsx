
import React, { Component } from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Form from '@visualbi/bifrost-editor/dist/forms/Form';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import Select from '@visualbi/bifrost-editor/dist/forms/Select';
import Button from '@visualbi/bifrost-editor/dist/elements/Button';
import ColorPicker from '@visualbi/bifrost-editor/dist/forms/ColorPicker';
import _ from 'lodash';

const formFields = [
  {
    name: 'fontFamily',
    label: 'Font Family',
    component: ['primarykpi', 'secondarykpi', 'sparklinechart', 'title', 'icon'],
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
    component: ['primarykpi', 'secondarykpi', 'sparklinechart', 'title', 'icon'],
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
    component: ['primarykpi', 'secondarykpi', 'sparklinechart', 'title', 'icon'],
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
  },
  {
    name: 'fontWeight',
    label: 'Font Weight',
    component: ['primarykpi', 'secondarykpi', 'sparklinechart', 'title', 'icon'],
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
    component: ['primarykpi', 'secondarykpi', 'sparklinechart', 'title', 'icon', 'image'],
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
    component: ['primarykpi', 'secondarykpi', 'sparklinechart', 'title', 'icon', 'image'],
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
    const result = rules.map((item, inx) => {
      console.log('Appearance onSubmit', rules, item, this.props)
      if (item.id === this.props.data) {
        merged = { ...rules[inx], appearance: response };
        if (item.id === merged.id) {
          item = merged;
        }
      }
      return item;
    });

    store.set('kpitile', result);
    this.props.onSubmit(this.props.data);
  }

  onError(errors) {
    console.log('Errors', errors);
  }

  onFieldsChange(changed, all) {
    console.log('Fields changed', changed, all);
    // console.log('All fields', );
  }

  render() {
    const { store } = this.props;
    console.log('Store > kpiAppearance', toJS(store.get('kpitile')), this.props);

    const response = toJS(store.get('kpitile'));
    const result = response.map((item) => {
      if (item.id === this.props.data) {
        if (item.appearance) {
          // fields={formFields}
          const fields = formFields.filter((i) => {
            if (i.component.includes(this.props.component)) {
              if (Object.keys(item.appearance).includes(i.name)) {
                Object.keys(item.appearance).map((k) => {
                  if (i.name === k) {
                    i.defaultValue = item.appearance[k];
                  }
                });
              }
              // console.log('iiiiiiiiiiiii', i);
              return i;
            }
          });
          return fields;
        }
      }
      // console.log('formFields formFields Appearance', formFields);
      return formFields;
    });

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
