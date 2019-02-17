import React, { Component } from 'react';
import ReactColorPicker from 'react-simple-colorpicker'; 
import '../styles/ColorPicker.css';
import Flex from '../layout/Flex';

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.togglePicker = this.togglePicker.bind(this);
  }

  static defaultProps = {
    onChange: () => { },
  }

  togglePicker() {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }

  render() {
    const { visible } = this.state;
    const { value, onChange, disabled } = this.props;

    return (
      <div className="bf-editor-form-colorpicker">
        <div
          className="bf-editor-form-colorpicker swatch"
          style={{ backgroundColor: value }}
          onClick={this.togglePicker}
        />
        <div className={visible ? 'd-visible' : 'd-invisible'}>
          <ReactColorPicker color={value} onChange={color => onChange(color)} />
        </div>
      </div>
    );
  }
}
