import React from 'react';

const Box = props => {
  const {
    className,
    height,
    width,
  } = props;

  return (
    <div
      className={`bf-editor-box ${className}`}
      style={{
        display: 'block',
        height,
        width,
      }}
    >
      {props.children}
    </div>
  );
};

export default Box;
