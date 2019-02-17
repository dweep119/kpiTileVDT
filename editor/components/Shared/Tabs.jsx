import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Tabs.css';


class Tabs extends Component {
  constructor(props) {
    super(props);
    this.onClick = this
      .onClick
      .bind(this);
  }

  static get propTypes() {
    return {
      list: PropTypes.shape,
      onSelect: PropTypes.func,
      selected: PropTypes.element
    };
  }

  onClick(status) {
    const { onSelect } = this.props;
    onSelect(status);
  }

  render() {
    const { list, selected } = this.props;
    return (
      <div>
        <ul className="tab tab-block">
          {list.map((listData) => {
            const classname = selected === listData.code
              ? 'active'
              : null;
            const styleData = selected === listData.code
              ? {
                borderBottomColor: '#0078d4',
                color: 'black',
                fontSize: '14px'
              }
              : {
                fontSize: '14px'
              };
            return (
              <li className={`tab-item ${classname}`}>
                <button onClick={() => this.onClick(listData.code)} style={styleData}>
                  {listData.name}
                </button>

              </li>
            );
          })
}
        </ul>
      </div>
    );
  }
}

Tabs.defaultProps = {
  list: [],
  onSelect: () => {},
  selected: ''
};

export default Tabs;
