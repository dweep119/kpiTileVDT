import React from 'react';
import PropTypes from 'prop-types';

const MenuList = (props) => {
  const { data } = props;
  return (
    <div className="vdt-data-menu" onClick={() => props.onClick('second', data.id)}>
      <div className="vdt-data-subMenu">
        <div className="vdt-data-menu-img">
          <i className={data.icon} />
        </div>
        <div className="vdt-data-menu-name">
          <div className="vdt-data-menu-title">{data.title}</div>
          <div className="vdt-data-menu-description">{data.description}</div>
        </div>
      </div>
      <div className="vdt-data-menu-front-img">
        <i className="icon icon--ChevronRight" />
      </div>
    </div>
  );
};

MenuList.defaultProps = {
  data: {},
  onClick: () => {}
};

MenuList.propTypes = {
  data: PropTypes.element,
  onClick: PropTypes.func
};

export default MenuList;
