import React, { Component } from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Form from '@visualbi/bifrost-editor/dist/forms/Form';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import Select from '@visualbi/bifrost-editor/dist/forms/Select';
import Button from '@visualbi/bifrost-editor/dist/elements/Button';
import _ from 'lodash';

const formFields = [
  {
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
    const rules = toJS(store.get('kpitile'));
    const result = rules.map((item, inx) => {
      if (item.id === this.props.data) {
        merged = { ...rules[inx], general: response };
        if (item.id === merged.id) {
          item = merged;
        }
      }
      return item;
    });
    store.set('kpitile', result);
  }

  onError(errors) {
    console.log('Errors', errors);
  }

  onFieldsChange(changed, all) {
    console.log('Fields changed', changed, all);
  }

  render() {
    const { store } = this.props;
    const response = toJS(store.get('kpitile'));
    console.log('KPI GENERAL', response, this.props);
    const result = response.map((item) => {
      if (item.id === this.props.data) {
        if (item.general) {
          // fields={formFields}
          const fields = formFields.filter((i) => {
            if (Object.keys(item.general).includes(i.name)) {
              Object.keys(item.general).map((k) => {
                if (i.name === k) {
                  i.defaultValue = item.general[k];
                }
              });
            }
            return i;
          });
          return fields;
        }
        return formFields;
      }
      return formFields;
    });
    return (
      <div>
        <Form
          fields={_.flattenDeep(result[0])}
          onSubmit={this.onSubmit}
          // submitButton={<Button>Save</Button>}
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
