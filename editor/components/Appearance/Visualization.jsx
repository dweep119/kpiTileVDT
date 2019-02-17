import React, { Component } from 'react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import { observer, inject } from 'mobx-react';
import Form from '@visualbi/bifrost-editor/dist/forms/Form';
import Checkbox from '@visualbi/bifrost-editor/dist/forms/Checkbox';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import '../../styles/FormElements.css';
import FormGroup from '@visualbi/bifrost-editor/dist/forms/FormGroup';

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

class Visualization extends Component {
  constructor(props) {
    super(props);

    this.onError = this.onError.bind(this);
    this.onChange = this.onChange.bind(this);
    this.formFeilds = this.formFeilds.bind(this);
  }


  formFeilds() {
    const { ValueDriverTree } = this.props;
    const { appearance } = ValueDriverTree;
    const { visualization } = appearance;
    const Title = () => <Box className="section-label">Contents</Box>;

    const NodeStyle = (props) => {
      const { value, onChange } = props;
      return (
        <Box>
          <Flex flexDirection="column">
            <Box className={`nodeStyle${value == 'F' ? ' active' : ''}`}>
              <Box style={{ paddingLeft: '10px', paddingTop: '10px' }}> Standard</Box>
              <div className="standard" onClick={() => onChange('F')} />
            </Box>
            <Box className={`nodeStyle${value == 'S' ? ' active' : ''}`}>
              <Box style={{ paddingLeft: '10px', paddingTop: '10px' }}> Compact</Box>
              <div className="compact" onClick={() => { onChange('S'); }} />
            </Box>
            <Box className={`nodeStyle${value == 'M' ? ' active' : ''}`}>
              <Box style={{ paddingLeft: '10px', paddingTop: '10px' }}> Minimal</Box>
              <div className="minimal" onClick={() => onChange('M')} />
            </Box>
          </Flex>
        </Box>
      );
    };

    return [

      {
        name: 'nodeStyle',
        label: 'Default Node Style',
        // tooltip: 'Set a custom font family for your visualization',
        control: NodeStyle,
        defaultValue: visualization.nodeStyle || 'S',
        controlProps: {
        }
      },
      {
        name: 'content',
        label: '',
        control: Title,
        defaultValue: '',
        controlProps: {
        }
      },
      {
        name: 'nodeVar',
        label: '',
        control: Checkbox,
        defaultValue: visualization.nodeVar == 'X' || visualization.nodeVar == true,
        className: 'checkbox-group',
        controlProps: {
          label: 'Variance',

        }
      },
      {
        name: 'nodeTrend',
        label: '',
        control: Checkbox,
        defaultValue: visualization.nodeTrend == 'X' || visualization.nodeTrend == true,
        className: 'checkbox-group',
        controlProps: {
          label: 'Trend spark line',
        }
      },
      {
        name: 'nodeSecVal',
        label: '',
        control: Checkbox,
        defaultValue: visualization.nodeSecVal == 'X' || visualization.nodeSecVal == true,
        className: 'checkbox-group',
        controlProps: {
          label: 'Secondary value/variance',
        }
      },
      {
        name: 'nodeOperand',
        label: '',
        control: Checkbox,
        defaultValue: visualization.nodeOperand == 'X' || visualization.nodeOperand == true,
        className: 'checkbox-group',
        controlProps: {
          label: 'Node Operand',
        }
      }
    ];
  }

  onChange(changed) {
    const propsWithX = ['nodeVar', 'nodeSecVal', 'nodeOperand', 'nodeTrend']; // properties to be replaced with 'X' for true
    const property = Object.keys(changed)[0];
    let value = changed[property].value;
    if (propsWithX.includes(property)) {
      value = value ? 'X' : '';
    }
    this.props.ValueDriverTree.appearance.visualization[property] = value;
  }

  onError(errors) {
    console.log('Errors', errors);
  }

  render() {
    return (
      <Flex flexDirection="column">
        <h3 className="section-header">Visualization</h3>
        <FormGroup>
          <div className="section-note menu-note">Customize tree widget styles and element(s)</div>
        </FormGroup>
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

export default inject('ValueDriverTree')(observer(Visualization));
