import React, { Component } from 'react';
import '../styles/Select.css';

export default class Select extends Component {
  static defaultProps = {
    onChange: () => { },
  }

  render() {
    const {
      icon,
      value,
      options,
      disabled,
      type,
      placeholder,
      onChange,
    } = this.props;

    return (
      <div className={`bf-editor-form-select ${icon ? 'has-icon-left' : ''}`}>
        <select
          className="form-select"
          type={type || 'text'}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {placeholder ? (
            <option key="_placeholder" value={null}>{placeholder}</option>
          ) : null}
          {(options || []).map(option => (
            <option key={option.key} value={option.key}>{option.label}</option>
          ))}
        </select>
        {icon ? (
          <i className={`form-icon icon ${icon}`} />
        ) : null}
      </div>
    );
  }
}
