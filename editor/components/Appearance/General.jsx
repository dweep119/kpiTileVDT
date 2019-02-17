import React, { Component } from 'react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import Select from '@visualbi/bifrost-editor/dist/forms/Select';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import Form from '@visualbi/bifrost-editor/dist/forms/Form';
import '../../styles/FormElements.css';
import InputNote from '../Shared/InputNote';
import SelectNote from '../Shared/SelectNote';
import FormGroup from '@visualbi/bifrost-editor/dist/forms/FormGroup';

const scaling = [
  {
    key: '0.0b',
    label: '0.0b'
  }, {
    key: '0.00b',
    label: '0.00b'
  }, {
    key: '0m',
    label: '0m'
  }, {
    key: '0.0m',
    label: '0.0m'
  }, {
    key: '0.00m',
    label: '0.00m'
  }, {
    key: '0k',
    label: '0k'
  }, {
    key: '0',
    label: '0'
  }
];
const zeroDisplayOptions = [{ key: '', label: 'None' }, { key: '-', label: '-' }, { key: '0', label: '0' }];
const negativeDisplayOptions = [{ key: '(0)', label: '(0)' }, { key: '-0', label: '-0' }, { key: '0-', label: '0-' }];


//  General Apperance form Component
class General extends Component {
  constructor(props) {
    super(props);
    this.onError = this.onError.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  static defaultProps = {
    ValueDriverTree:{}, 
    onClick:()=>{}, 
    store:[]
  }

  onError(errors) {
    console.log('Errors', errors);
  }

  onChange(changed) {
    const property = Object.keys(changed)[0];
    const value = changed[property].value;  
    this.props.ValueDriverTree.appearance.general[property] = value;
  }

  render() {
    const { ValueDriverTree, TreeStore } = this.props;
    const { appearance } = ValueDriverTree;
    const { general } = appearance;
    const suffixLabel = () => <div className="menu-note" />;
    const nodeDataSet = toJS(TreeStore.getFlatData);
    const listNode = () => {
      const array = [];
      array.push({ key: '', label: 'First Node' });
      nodeDataSet.map((data) => {
        array.push({ key: data.name, label: `${data.name}: ${data.title}` });
      });
      return array;
    };

    const formFields = [
      {
        name: 'PeriodColumn',
        label: 'Active Period From',
        control: InputNote,
        defaultValue: general.PeriodColumn || 0,
        controlProps: {
          type: 'number',
          placeholder: 'To',
          min: 0,
          note: 'Apply only specific periods, such as Jan-July',
        },
        // rules: [{   required: true,   message: 'Font Family is required', }]
      }, {
        name: 'PeriodToColumn',
        label: 'Active Period To',
        control: Input,
        defaultValue: general.PeriodToColumn || 0,
        controlProps: {
          type: 'number',
          placeholder: 'From'
        },
        // rules: [{   required: true,   message: 'Font Family is required', }]
      }, {
        name: 'activeTopNode',
        label: 'Top Node',
        description: 'Top Node details',
        defaultValue: general.activeTopNode || '',
        control: SelectNote,
        controlProps: {
          options: listNode(),
          note: 'Root node at the lowest level with no parent note',
        },
        // rules: [{   required: true,   message: 'Font Color is required', }],
      }, {
        name: 'dispLevels',
        label: 'Show Levels',
        defaultValue: general.dispLevels || 0,
        control: InputNote,
        controlProps: {
          type: 'number',
          note: 'Starting with top node at level 0',
        },
        // rules: [{   required: true,   message: 'Font Family is required', }]
      }, {
        name: 'zoom',
        label: 'Zoom (%)',
        defaultValue: general.zoom || 0,
        // tooltip: 'Set a custom font family for your visualization',
        control: InputNote,
        controlProps: {
          type: 'number',
          note: 'Set default zoom ratio',
        },
        // rules: [{   required: true,   message: 'Font Family is required', }]
      }, {
        name: 'scale',
        label: 'Auto Scale',
        control: SelectNote,
        defaultValue: general.scale || '0',
        controlProps: {
          options: scaling,
          note: 'Select data format to be displayed in tree widget',
        }
      }, {
        name: 'label',
        label: 'Scale Suffix',
        defaultValue: '',
        // tooltip: 'Set a custom font family for your visualization',
        control: suffixLabel,
        className: 'form-group-zero-bot-margin',
        controlProps: {

        },
        // rules: [{   required: true,   message: 'Font Family is required', }]
      },
      {
        name: 'scaleSuffixK',
        label: 'Thousands',
        defaultValue: general.scaleSuffixK,
        // tooltip: 'Set a custom font family for your visualization',
        control: Input,
        className: 'suffix-labels',
        controlProps: {
        },
        // rules: [{   required: true,   message: 'Font Family is required', }]
      },
      {
        name: 'scaleSuffixM',
        label: 'Millions',
        defaultValue: general.scaleSuffixM,
        // tooltip: 'Set a custom font family for your visualization',
        control: Input,
        className: 'suffix-labels',
        controlProps: {

        },
        // rules: [{   required: true,   message: 'Font Family is required', }]
      },
      {
        name: 'scaleSuffixB',
        label: 'Billions',
        defaultValue: general.scaleSuffixB,
        // tooltip: 'Set a custom font family for your visualization',
        control: Input,
        className: 'suffix-labels',
        controlProps: {

        },
        // rules: [{   required: true,   message: 'Font Family is required', }]
      },
      {
        name: 'zeroDisplay',
        label: 'Display as Zero',
        control: Select,
        defaultValue: general.zeroDisplay || '',
        controlProps: {
          placeholder: 'Choose a font weight',
          options: zeroDisplayOptions
        }
      }, {
        name: 'negativeDisplay',
        label: 'Display negative value as',
        control: Select,
        defaultValue: general.negativeDisplay || '(0)',
        controlProps: {
          placeholder: 'Choose a font weight',
          options: negativeDisplayOptions
        }
      }, {
        name: 'decimalSeparator',
        label: 'Decimal Seprator',
        control: Input,
        defaultValue: general.decimalSeparator,
        controlProps: {

        }
      }, {
        name: 'thousandSeparator',
        label: 'Thousand seperator',
        control: Input,
        defaultValue: general.thousandSeparator,
        controlProps: {
        }
      },/* {
        name: 'isEditModeAllowed',
        label: 'Tree editing at runtime',
        description: 'Enable font scaling for better rendering',
        control: Checkbox,
        defaultValue: general.isEditModeAllowed == 'X',
        horizontal: true,
        props: {}
      } */, {
        name: 'hint',
        label: 'Hint',
        description: 'Top Node details',
        control: Input,
        defaultValue: general.hint,
        controlProps: {
          placeholder: 'Hint?'
        },
        // rules: [{   required: true,   message: 'Font Color is required', }],
      }
    ];
    return (
      <Flex flexDirection="column">
      <h3 className='section-header'>General</h3>
      <FormGroup>
        <div className="section-note menu-note"></div>
      </FormGroup>
        <Form
          fields={formFields}
          showSubmitButton={false}
          onError={this.onError}
          onFieldsChange={this.onChange}
        />
      </Flex>
    );
  }
}

export default inject("TreeStore")(inject("ValueDriverTree")(observer(General)));
