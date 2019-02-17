import React, {Component} from 'react';
import Flex from '../../layout/Flex'
import FormGroup from '../../forms/FormGroup';
import Input from '../../forms/Input';
import Select from '../../forms/Select'
import {observer} from 'mobx-react';
import Button from '../../forms/Button';
import Checkbox from '../../forms/Checkbox'
import Form from '../../forms/Form';

const scaling = [
  {
    key: "scaling",
    label: "Scaling"
  }, {
    key: "user-selected",
    label: "User selected"
  }, {
    key: "zerom",
    label: "0m"
  }, {
    key: "zerok",
    label: "0k"
  }, {
    key: "pct",
    label: "Pct"
  }
];

const formFields = [
  {
    name: 'activePeriodTO',
    label: 'Active Period To',
    defaultValue: 'Arial',
    // tooltip: 'Set a custom font family for your visualization',
    control: Input,
    defaultValue: 0,
    controlProps: {
      type: 'number',
      placeholder: 'To',
      min: 0
    },
    // rules: [{   required: true,   message: 'Font Family is required', }]
  }, {
    name: 'activePeriodFrom',
    label: 'Active Period From',
    defaultValue: 'Arial',
    // tooltip: 'Set a custom font family for your visualization',
    control: Input,
    defaultValue: 0,
    controlProps: {
      type: 'number',
      placeholder: 'From'
    },
    // rules: [{   required: true,   message: 'Font Family is required', }]
  }, {
    name: 'topNode',
    label: 'Top Node',
    description: 'Top Node details',
    control: Input,
    controlProps: {
      placeholder: "Top Node"
    },
    // rules: [{   required: true,   message: 'Font Color is required', }],
  }, {
    name: 'showLevel',
    label: 'Show Levels',
    defaultValue: 'Arial',
    // tooltip: 'Set a custom font family for your visualization',
    control: Input,
    controlProps: {
      type: 'number'
    },
    // rules: [{   required: true,   message: 'Font Family is required', }]
  }, {
    name: 'zoom',
    label: 'Zoom (%)',
    defaultValue: 'Arial',
    // tooltip: 'Set a custom font family for your visualization',
    control: Input,
    controlProps: {
      type: 'number'
    },
    // rules: [{   required: true,   message: 'Font Family is required', }]
  }, {
    name: 'autoScale',
    label: 'Auto Scale',
    tooltip: 'Set a font weight for your visualization',
    control: Select,
    defaultValue: 'normal',
    controlProps: {
      placeholder: 'Choose a font weight',
      options: scaling
    },
    rules: [
      {
        required: true,
        message: 'Font Weight selection is required'
      }
    ]
  }, {
    name: 'displayasZero',
    label: 'Display as Zero',
    tooltip: 'Set a font weight for your visualization',
    control: Select,
    defaultValue: 'normal',
    controlProps: {
      placeholder: 'Choose a font weight',
      options: scaling
    },
    rules: [
      {
        required: true,
        message: 'Font Weight selection is required'
      }
    ]
  }, {
    name: 'displayNegativeAs',
    label: 'Display negative value as',
    tooltip: 'Set a font weight for your visualization',
    control: Select,
    defaultValue: 'normal',
    controlProps: {
      placeholder: 'Choose a font weight',
      options: scaling
    },
    rules: [
      {
        required: true,
        message: 'Font Weight selection is required'
      }
    ]
  }, {
    name: 'decimalSeprator',
    label: 'Decimal Seprator',
    tooltip: 'Set a font weight for your visualization',
    control: Select,
    defaultValue: 'normal',
    controlProps: {
      placeholder: 'Choose a font weight',
      options: scaling
    },
    rules: [
      {
        required: true,
        message: 'Font Weight selection is required'
      }
    ]
  }, {
    name: 'thousandSeprator',
    label: 'Thousand seperator',
    tooltip: 'Set a font weight for your visualization',
    control: Select,
    defaultValue: 'normal',
    controlProps: {
      placeholder: 'Choose a font weight',
      options: scaling
    },
    rules: [
      {
        required: true,
        message: 'Font Weight selection is required'
      }
    ]
  }, {
    name: 'treeEditing',
    label: 'Tree editing and runtime',
    description: 'Enable font scaling for better rendering',
    control: Checkbox,
    defaultValue: false,
    horizontal: true,
    props: {}
  }, {
    name: 'hint',
    label: 'Hint',
    description: 'Top Node details',
    control: Input,
    controlProps: {
      placeholder: "Hint?"
    },
    // rules: [{   required: true,   message: 'Font Color is required', }],
  }
];

class General extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.onFieldsChange = this.onFieldsChange.bind(this);
  }

  onSubmit(response) {
   this.props.appearance.generalFun(response);
   this.props.onClick("first",null)
  }

  onError(errors) {
    console.log('Errors', errors);
  }

  onFieldsChange(changed, all) {
    console.log('Fields changed', changed);
    console.log('All fields', all);
  }

  render() {
    let {appearance} = this.props;
    return (
      <Flex flexDirection={"column"}>
        <Form
          fields={formFields}
          onSubmit={this.onSubmit}
          onError={this.onError}
          onFieldsChange={this.onFieldsChange}
          onClear={() => {}}
          showClearButton={true}/>
      </Flex>
    )
  }
}

export default observer(General);