import React, { Component } from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Form from '@visualbi/bifrost-editor/dist/forms/Form';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import Select from '@visualbi/bifrost-editor/dist/forms/Select';


const panelConfig = {
  title: 'Data',
  options: {
    // pass extra parameters,
  }
};

const customFamilyValidator = (rule, value, callback) => {
  console.log('Custom Validator', rule, value, callback);
};

const formFields = [
  {
    name: 'measure',
    label: 'Measure',
    component: ['primarykpi', 'secondarykpi', 'sparklinechart'],
    defaultValue: '',
    tooltip: '',
    control: Select,
    rules: [{
      required: true,
      message: '',
    }]
  }, {
    name: 'comparisonMeasure',
    label: 'Comparison Measure',
    component: ['primarykpi', 'secondarykpi', 'sparklinechart'],
    defaultValue: '',
    tooltip: '',
    control: Select,
    rules: [{
      required: true,
      message: '',
    }]
  }, {
    name: 'dimension',
    label: 'Dimension',
    component: ['sparklinechart', 'title'],
    defaultValue: '',
    tooltip: '',
    control: Select,
    rules: [{
      required: true,
      message: '',
    }]
  }, {
    name: 'function',
    label: 'Function',
    component: ['primarykpi', 'secondarykpi'],
    defaultValue: 'sum',
    tooltip: '',
    control: Select,
    controlProps: {
      placeholder: 'Choose a Function',
      options: [{
        key: 'sum',
        label: 'SUM'
      }, {
        key: 'avg',
        label: 'Average'
      }, {
        key: 'max',
        label: 'MAX'
      }, {
        key: 'min',
        label: 'MIN'
      }],
    },
    rules: [{
      required: true,
      message: '',
    }]
  },
  {
    name: 'imageSource',
    label: 'Image Source',
    component: ['image'],
    defaultValue: '',
    tooltip: 'Set image source',
    control: Input,
    controlProps: {
      placeholder: '',
    },
    rules: [{
      required: true,
      message: 'Image Source is required',
    }]
  },
  {
    name: 'iconSource',
    label: 'Icon Source',
    component: ['icon'],
    defaultValue: '',
    tooltip: 'Set Icon Source',
    control: Input,
    controlProps: {
      placeholder: '',
    },
    rules: [{
      required: true,
      message: 'Icon Source is required',
    }]
  }, {
    name: 'tooltip',
    label: 'Tooltip',
    component: ['image', 'icon'],
    defaultValue: '',
    tooltip: 'Set a tooltip text',
    control: Input,
    controlProps: {
      placeholder: '',
    },
    rules: [{
      required: true,
      message: 'tooltip text is required',
    }]
  }, {
    name: 'customText',
    label: 'Custom Text',
    component: ['title'],
    defaultValue: '',
    tooltip: 'Set a Custom Text',
    control: Input,
    controlProps: {
      placeholder: '',
    },
    rules: [{
      required: true,
      message: 'Custom Text is required',
    }]
  }

];

class KpiData extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.onFieldsChange = this.onFieldsChange.bind(this);
  }

  onSubmit(response) {
    let merged;
    console.log('Response data', response);
    const { store } = this.props;
    const rules = toJS(store.get('kpitile'));
    console.log(', rules , rules', rules);
    const result = rules.map((item, inx) => {
      if (item.key === this.props.data) {
        merged = { ...rules[inx], data: response };
        if (item.key === merged.key) {
          item = merged;
        }
      }
      return item;
    });
    console.log('kpitile data result', result);
    store.set('kpitile', result);
    const editor = toJS(store.get('kpieditor'));
    console.log('close called', rules);
    editor.enable = false;
    store.set('kpieditor', editor);
    this.props.close();
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
    console.log('Store > kpiData', this.props);
    const response = toJS(store.get('kpitile'));
    const result = response.map((item) => {
      if (item.key === this.props.data) {
        if (item.data) {
          // fields={formFields}
          const fields = formFields.filter((i) => {
            if (i.component.includes(this.props.component)) {
              if (Object.keys(item.data).includes(i.name)) {
                Object.keys(item.data).map((k) => {
                  if (i.name === k) {
                    if (i.name === 'dimension') {
                      this.props.dataView.categorical.dimensions.map((x, y) => {
                        console.log('Hiiiiii', x, item.data[k]);
                        if (x.label === item.data[k]) {
                          i.defaultValue = this.props.dataView.categorical.dimensions[y].label;
                          i.controlProps = {
                            options: this.props.dataView.categorical.dimensions
                          };
                        }
                      });
                    } else if (i.name === 'measure' || i.name === 'comparisonMeasure') {
                      this.props.dataView.categorical.measures.map((x, y) => {
                        if (x.label === item.data[k]) {
                          i.defaultValue = this.props.dataView.categorical.measures[y].label;
                          i.controlProps = {
                            options: this.props.dataView.categorical.measures
                          };
                        }
                      });
                    } else {
                      i.defaultValue = item.data[k];
                    }
                  }
                });
              }
              return i;
            }
          });
          return fields;
        }
      }
      const fields = formFields.filter((itm) => {
        if (itm.component.includes(this.props.component)) {
          console.log('itm itm', itm);
          if (itm.name === 'dimension') {
            itm.defaultValue = this.props.dataView.categorical.dimensions[0].label;
            itm.controlProps = {
              options: this.props.dataView.categorical.dimensions
            };
          } else if (itm.name === 'measure' || itm.name === 'comparisonMeasure') {
            itm.defaultValue = this.props.dataView.categorical.measures[0].label;
            itm.controlProps = {
              options: this.props.dataView.categorical.measures
            };
          }
          return itm;
        }
      });
      return fields;
    });

    console.log('Result Result Result Data', result);

    return (
      <div>
        <Form
          fields={_.flattenDeep(result[0])}
          onSubmit={this.onSubmit}
          onError={this.onError}
          onFieldsChange={this.onFieldsChange}
          onClear={() => {}}
          // showClearButton={true}
        />
      </div>
    );
  }
}

export default inject('dataStore')(observer(KpiData));
