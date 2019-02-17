import React, { Component } from 'react';
import '../styles/Input.css';

export default class Input extends Component {
  static defaultProps = {
    onChange: () => {console.log("asdaaaaaa") },
  }

  render() {
    const {
      icon,
      value,
      disabled,
      type,
      placeholder,
      onChange,
    } = this.props;

    return (
      <div class={`bf-editor-form-input ${icon ? 'has-icon-left' : ''}`}>
        <input
          class="form-input"
          type={type || 'text'}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) =>{ onChange(e.target.value)}}
        ></input>
        {icon ? (
          <i class={`form-icon icon ${icon}`}></i>
        ) : null}
      </div>
    );
  }
}
