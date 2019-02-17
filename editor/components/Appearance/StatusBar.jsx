import React, { Component } from 'react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import { observer, inject } from 'mobx-react';
import Form from '@visualbi/bifrost-editor/dist/forms/Form';
import FormGroup from '@visualbi/bifrost-editor/dist/forms/FormGroup';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import RadioGroup from '../Shared/RadioGroup';
import '../../styles/FormElements.css';

const Status = [
  {
    name: 'V',
    label: 'Variance'
  }, {
    name: 'I',
    label: 'Simulation Impact'
  }, {
    name: 'H',
    label: 'Hidden'
  }
];

class StatusBar extends Component {
  constructor(props) {
    super(props);

    this.onError = this.onError.bind(this);
    this.onChange = this.onChange.bind(this);
    this.formFeilds = this.formFeilds.bind(this);
  }


  formFeilds() {
    const { ValueDriverTree } = this.props;
    const { appearance } = ValueDriverTree;

    const { statusBar } = appearance;
    const ColorLabel = () => (
      <FormGroup label="Color Indicator">
        <div className="menu-note">Status bar color change accordingly to percentage of deviant from intial value</div>
      </FormGroup>
    );
    const DisplayLabel = () => (
      <FormGroup>
        <div className="menu-note section-note">Each node may have a status bar to indicate whether the trend of values is favourable</div>
      </FormGroup>
    );
    const ColorIndicator = (props) => {
      const {
        label, onChange, height, color, type, value
      } = props;
      return (
        <Flex justifyContent="space-between" alignItems="center">
          <Box style={{ width: '30px' }}>{label}</Box>
          <Flex alignItems="center" className="color-indicator-input">
            <Input type={type} value={value} onChange={(e) => { onChange(e); }} />
              %
          </Flex>
          <Box style={{
            height, width: height, background: color, marginLeft: '10px'
          }}
          />
        </Flex>
      );
    };

    return [

      {
        name: 'a',
        label: '',
        // tooltip: 'Set a custom font family for your visualization',
        control: DisplayLabel,
        defaultValue: statusBar.nodeStatus,
        controlProps: {
        }
      },
      {
        name: 'nodeStatus',
        label: 'Display status bar when there is a change in',
        // tooltip: 'Set a custom font family for your visualization',
        control: RadioGroup,
        defaultValue: statusBar.nodeStatus,
        controlProps: {
          items: Status,
          horizontal: false
        }
      },
      {
        name: 'as',
        label: '',
        // tooltip: 'Set a custom font family for your visualization',
        control: ColorLabel,
        defaultValue: 'V',
        controlProps: {
        }
      },
      {
        name: 'PctVarRed',
        label: '',
        // tooltip: 'Set a custom font family for your visualization',
        control: ColorIndicator,
        defaultValue: statusBar.PctVarRed || 10,
        controlProps: {
          type: 'number',
          label: 'From',
          height: '1.8rem',
          color: 'red'
        }
      },
      {
        name: 'PctVarAmber',
        label: '',
        // tooltip: 'Set a custom font family for your visualization',
        control: ColorIndicator,
        defaultValue: statusBar.PctVarAmber || 10,
        controlProps: {
          type: 'number',
          label: 'to',
          height: '1.8rem',
          color: '#FFC200'
        }
      },
      {
        name: 'PctVarGreen',
        label: '',
        // tooltip: 'Set a custom font family for your visualization',
        control: ColorIndicator,
        defaultValue: statusBar.PctVarGreen || 10,
        controlProps: {
          type: 'number',
          label: 'to',
          height: '1.8rem',
          color: 'green'
        }
      }
    ];
  }

  onError(errors) {
    // console.log('Errors', errors);
  }

  onChange(changed) {
    const property = Object.keys(changed)[0];
    const value = changed[property].value;
    this.props.ValueDriverTree.appearance.statusBar[property] = value;
  }

  render() {
    return (
      <Flex flexDirection="column">
        <h3 className="section-header">Status Bar</h3>
        <Form
          fields={this.formFeilds()}
          showSubmitButton={false}
          onError={this.onError}
          onFieldsChange={this.onChange}
        />
      </Flex>
    );
  }
}

export default inject('ValueDriverTree')(observer(StatusBar));
