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
    const {
      key, icon, actions, color, title, subtitle, onClick
    } = this.props;

    return (
      <div className="bf-editor-tile tile tile-centered" onClick={() => onClick(key, this.props)}>
        <div style={color ? { backgroundColor: color } : null} className="tile-icon">
          <i className={`icon ${icon} centered`} />
        </div>
        <div className="tile-content">
          <div className="tile-title">{title}</div>
          <small className="tile-subtitle text-gray">{subtitle}</small>
        </div>
        <div className="tile-action">
          {actions.map(action => (
            <button title={action.title} className={action.className || 'btn btn-link'} onClick={e => this.onActionClick(e, action.onClick)}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
