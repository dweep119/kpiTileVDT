import React, { Component } from 'react';
import '../styles/Textarea.css';

export default class Textarea extends Component {
  static defaultProps = {
    onChange: () => { },
  }

  render() {
    const { value, onChange, placeholder, disabled, rows } = this.props;

    return (
      <div class="bf-editor-form-textarea">
        <textarea
          disabled={disabled}
          class="form-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 4}
        />
      </div>
    );
  }
}

