import React, { Component } from 'react';
import '../styles/FormGroup.css';
import Flex from '../layout/Flex';
import { Icon } from 'react-icons-kit';
import { ic_help } from 'react-icons-kit/md/ic_help';


export default class FormGroup extends Component {
  render() {
    const {
      error,
      messages,
      horizontal,
      label,
      tooltip,
      children,
      value,
      onChange,
      onBlur } = this.props;

    return (
      <div
        className={`bf-editor-form-group form-group ${horizontal ? 'horizontal' : ''} ${error ? 'has-error' : ''}`}
      >
        {label && (
          <Flex
            className={`form-label-container ${horizontal ? 'horizontal' : ''}`}
            alignItems="center"
            justifyContent="flex-start"
          >
            <label class="form-label">{label}</label>
            {tooltip && (
              <div className="popover popover-right">
                <Icon icon={ic_help} size={14} />
                <div class="popover-container">
                  <div class="card">
                    <div class="card-body">
                      {tooltip}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Flex>
        )}
        <Flex alignItems={horizontal ? 'flex-end' : 'stretch'} flexDirection="column">
          {React.cloneElement(children, { value, onChange, onBlur })}
          {error && Array.isArray(messages) ? (
            messages.map(message => (
              <p class="form-input-hint">{message}</p>
            ))
          ) : null}
        </Flex>
      </div>
    );
  }
}
