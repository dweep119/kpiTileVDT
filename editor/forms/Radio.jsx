import React, { Component } from 'react';
import '../styles/Radio.css';

export default class Radio extends Component {
  render() {
    const { name, label, disabled } = this.props;

    return (
      <div className="bf-editor-form-radio">
        <label className="form-radio">
          <input name={name} type="radio" disabled={disabled} />
          <i className="form-icon" />
          {label && (
            <span>{label}</span>
          )}
        </label>
      </div>
    );
  }
}
