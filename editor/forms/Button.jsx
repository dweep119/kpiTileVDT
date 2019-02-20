import React from 'react';
import '../styles/Button.css';

const Button = (props) => {
  const {
    className,
    onClick,
  } = props;

  return (
    <button
      className={`btn bf-editor-button ${className}`}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
