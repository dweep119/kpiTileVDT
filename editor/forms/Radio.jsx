import React, { Component } from 'react';
import '../styles/Radio.css';

export default class Radio extends Component {
  render() {
    const { name, label, disabled } = this.props;

    return (
      <div class="bf-editor-form-radio">
        <label class="form-radio">
          <input name={name} type="radio" disabled={disabled} />
          <i class="form-icon"></i>
          {label && (
            <span>{label}</span>
          )}
        </label>
      </div>
    );
  }
}

