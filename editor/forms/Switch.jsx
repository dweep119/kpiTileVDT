import React, { Component } from 'react';
import '../styles/Switch.css';

export default class Switch extends Component {
  static defaultProps = {
    onChange: () => { },
  }

  render() {
    const {
      value, size, className, onChange, label, disabled
    } = this.props;

    return (
      <div className={`bf-editor-form-switch ${className} ${size || ''}`}>
        <label className="form-switch">
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
