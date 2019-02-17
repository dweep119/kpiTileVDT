import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import '../../styles/Icon.css';

const Icon = (props) => {
  const {
    icon,
    size,
    color,
    className,
    onClick,
  } = props;

  const resolvedClassName = classNames(
    'icon',
    `icon--${icon}`,
    className,
  );

  return (
    <i
      style={{ fontSize: size, color }}
      className={resolvedClassName}
      onClick={onClick}
    />
  );
};

Icon.defaultProps = {
  size: 14,
};

Icon.defaultProps = {
  icon: '',
  size: '',
  color: '',
  className: '',
  onClick: () => {},
};
Icon.propTypes = {
  icon: PropTypes.element,
  size: PropTypes.element,
  color: PropTypes.element,
  className: PropTypes.element,
  onClick: PropTypes.func,
};

export default Icon;
