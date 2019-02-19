import React, { Component } from 'react';
import { toJS } from 'mobx';
import {inject, observer} from 'mobx-react';
import Form from '@visualbi/bifrost-editor/dist/forms/Form';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import Select from '@visualbi/bifrost-editor/dist/forms/Select';
import Button from '@visualbi/bifrost-editor/dist/forms/Button';
import _ from 'lodash';

const panelConfig = {
  title: 'General',
  options: {
    // pass extra parameters,
  }
};

const customFamilyValidator = (rule, value, callback) => {
  console.log('Custom Validator', rule, value, callback);
}

const formFields = [
  {
    name: 'name',
    label: 'Name',
    defaultValue: 'Name1',
    tooltip: 'Set a Name for your visualization',
    control: Input,
    controlProps: {
      placeholder: 'Name',
    },
    rules: [{
      required: true,
      message: 'Name is required',
    }]
  },  {
    name: 'sizex',
    label: 'Widget Size X',
    tooltip: 'Set Widget Size-X',
    control: Select,
    defaultValue: '1',
    controlProps: {
      options: [{
        key: '1',
        label: '1'
      }, {
        key: '2',
        label: '2'
      }, {
        key: '3',
        label: '3'
      }, {
        key: '4',
        label: '4'
      }, {
        key: '5',
        label: '5'
      }],
    },
    rules: [{
      required: true,
      message: '',
    }],
  }, {
    name: 'sizey',
    label: 'Widget Size Y',
    tooltip: 'Set Widget Size-Y',
    control: Select,
    defaultValue: '1',
    controlProps: {
      options: [{
        key: '1',
        label: '1'
      }, {
        key: '2',
        label: '2'
      }, {
        key: '3',
        label: '3'
      }, {
        key: '4',
        label: '4'
      }, {
        key: '5',
        label: '5'
      }],
    },
    rules: [{
      required: true,
      message: '',
    }],
  }, {
    name: 'col',
    label: 'Widget Position Column',
    tooltip: 'Set Widget Position Column number',
    control: Select,
    defaultValue: '1',
    controlProps: {
      options: [{
        key: '1',
        label: '1'
      }, {
        key: '2',
        label: '2'
      }, {
        key: '3',
        label: '3'
      }, {
        key: '4',
        label: '4'
      }, {
        key: '5',
        label: '5'
      }],
    },
    rules: [{
      required: true,
      message: '',
    }],
  }, {
    name: 'row',
    label: 'Widget Position Row',
    tooltip: 'Set Widget Position Row Number',
    control: Select,
    defaultValue: '1',
    controlProps: {
      options: [{
        key: '1',
        label: '1'
      }, {
        key: '2',
        label: '2'
      }, {
        key: '3',
        label: '3'
      }, {
        key: '4',
        label: '4'
      }, {
        key: '5',
        label: '5'
      }]  
    },
    rules: [{
      required: true,
      message: '',
    }],
  }
];

class KpiGeneral extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.onFieldsChange = this.onFieldsChange.bind(this);
  }

  onSubmit(response) {
    let merged;
    const { store } = this.props;
    console.log('Response kpi general', this.props);
    const rules = toJS(store.get('kpitile'));
    let result = rules.map((item,inx) => {
      if(item.key === this.props.data) {
        merged = {...rules[inx], "general": response};
        if (item.key === merged.key) {
          item = merged;
        }
      }
      return item;    
    })
    console.log('Response', response, 'Rules', result, merged);
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
    console.log('Store > kpiGeneral', toJS(store.get('kpitile')));
    let response = toJS(store.get('kpitile'));
    let result = response.map((item) => {
      if (item.key === this.props.data) {
        if(item.general){
          // fields={formFields}
          let fields = formFields.filter((i) => {
            if(Object.keys(item.general).includes(i.name)){
              Object.keys(item.general).map((k) => {
                  if(i.name === k){
                    i.defaultValue = item.general[k];
                  }
              })
            }
            return i;
          })
          return fields;
        }
      }
      console.log('formFields formFields General', formFields)
      return formFields;
    })
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

export default inject('dataStore')(observer(KpiGeneral));
