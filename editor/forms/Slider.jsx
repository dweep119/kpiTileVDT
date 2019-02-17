import React, { Component } from 'react';
import '../styles/Slider.css';

export default class Slider extends Component {
  static defaultProps = {
    onChange: () => { },
  }

  render() {
    const { disabled, value, min, max } = this.props;

    return (
      <div class="bf-editor-form-slider">
        <input value={value} class="slider" type="range" min={min || 0} max={max || 100}></input>
      </div>
    );
  }
}

