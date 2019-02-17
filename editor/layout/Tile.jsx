import React, { Component } from 'react';
import '../styles/Tile.css';

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.onActionClick = this.onActionClick.bind(this);
  }

  static defaultProps = {
    actions: [],
  };

  onActionClick(e, onClick) {
    onClick();
    e.stopPropagation();
  }

  render() {
    const { key, icon, actions, color, title, subtitle, onClick } = this.props;

    return (
      <div class="bf-editor-tile tile tile-centered" onClick={() => onClick(key, this.props)}>
        <div style={color ? { backgroundColor: color } : null} class="tile-icon">
          <i class={`icon ${icon} centered`}></i>
        </div>
        <div class="tile-content">
          <div class="tile-title">{title}</div>
          <small class="tile-subtitle text-gray">{subtitle}</small>
        </div>
        <div class="tile-action">
          {actions.map(action => (
            <button title={action.title} class={action.className || 'btn btn-link'} onClick={(e) => this.onActionClick(e, action.onClick)}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

