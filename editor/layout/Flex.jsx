import React from 'react';

const Flex = (props) => {
  const {
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
    className,
    onClick
  } = props;

  return (
    <div
      className={`bf-editor-flex ${className}`}
      style={{
        display: 'flex',
        alignItems,
        flexDirection,
        justifyContent,
        flexWrap,
      }}
      onClick={onClick}
    >
      {props.children}
    </div>
  );
};

export default Flex;
