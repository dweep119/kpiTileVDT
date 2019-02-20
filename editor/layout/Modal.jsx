import React from 'react';
import Flex from './Flex';
import '../styles/Modal.css';
import Button from '../forms/Button';

const Modal = (props) => {
  const {
    open, onClose, onSubmit, title, children
  } = props;

  return (
    <div className={`bf-editor-modal modal modal-sm ${open ? 'active' : ''}`}>
      <a onClick={onClose} href="#close" className="modal-overlay" aria-label="Close" />
      <div className="modal-container">
        <div className="modal-header">
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <h4>{title}</h4>
            </Flex>
            <button onClick={onClose} className="btn btn-clear" aria-label="Close" />
          </Flex>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <Button onClick={onSubmit} className="btn btn-sm btn-primary">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
