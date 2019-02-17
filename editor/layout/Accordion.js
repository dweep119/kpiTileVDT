import React, { Component } from 'react';
import Flex from './Flex';
import '../styles/Accordion.css';

export const Accordion = props => {
  return (
    <div className="bf-editor-accordion accordion">
      {props.children}
    </div>
  );
};


export class AccordionItem extends Component {
  constructor(props) {
    super(props);
    this.onActionClick = this.onActionClick.bind(this);
    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  static defaultProps = {
    actions: [],
  };

  onActionClick(e, onClick) {
    onClick();
    e.stopPropagation();
  }

  onHeaderClick() {
    const { active, onChange } = this.props;
    if (onChange) {
      onChange(!active);
    }
  }

  render() {
    const { name, active, title, children, actions } = this.props;

    return (
      <div className="bf-editor-accordion-container">
        <input checked={active} type="checkbox" id={name || title} name="accordion-checkbox" hidden />
        <label className="accordion-header" for={name || title} onClick={this.onHeaderClick}>
          <Flex flexDirection="row" alignItems="center" className="accordion-title">
            <i className="icon icon-arrow-right mr-1"></i>
            <h3>{title || '(title)'}</h3>
          </Flex>
          <Flex alignItems="center" className="accordion-action">
            {actions.map(action => (
              <button title={action.title} class={action.className || 'btn btn-sm btn-link'} onClick={(e) => this.onActionClick(e, action.onClick)}>
                {action.label}
              </button>
            ))}
          </Flex>
        </label>
        <div className="accordion-body">
          {children}
        </div>
      </div>
    );
  }
}
