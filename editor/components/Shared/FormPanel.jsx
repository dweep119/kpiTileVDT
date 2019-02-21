import React, { Component } from 'react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Button from '@visualbi/bifrost-editor/dist/elements/Button';

export default class FormPanel extends Component {
  render() {
    const {
      onBack, onSubmit, children, submitButtonRender, title, className
    } = this.props;
    return (
      <div>
        <Flex flexDirection="column" className="menu-data-view">
          <Flex justifyContent="space-between" alignItems="center" className={className}>
            <h3 className="section-header">{title}</h3>
            <div onClick={onBack} className="menu-data-view-img">
              <span>Back</span>
              <i
                onClick={onBack}
                className="icon icon--ChevronLeft"
                style={{
                  height: '20px',
                  width: '20px',
                  marginRight: '5px'
                }}
              />
            </div>
          </Flex>
          {children}
        </Flex>
        { submitButtonRender && (
          <div className="view-footer-btn">
            <Button disabled size="sm" className="back-button" onClick={onBack}>Back</Button>
            <Button secondary size="sm" className="finish-button" onClick={onSubmit}>Finish</Button>
          </div>
        )

        }

      </div>
    );
  }
}
