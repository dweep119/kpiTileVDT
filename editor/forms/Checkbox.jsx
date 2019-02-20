import React, { Component } from 'react';
import '../styles/Checkbox.css';

export default class Checkbox extends Component {
  static defaultProps = {
    onChange: () => { },
  }

  render() {
    const {
      value, onChange, label, disabled
    } = this.props;

    return (
      <div className="bf-editor-form-checkbox">
        <label className="form-checkbox">
          <input
            type="checkbox"
            checked={value}
            disabled={disabled}
            onChange={e => onChange(e.target.checked)}
          />
          <i className="form-icon" />
          {label && (
            <span>{label}</span>
          )}
        </label>
      </div>
    );
  }
}
