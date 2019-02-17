import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { App } from '../App';
import './css/stories.css';

const listener = (change, meta) => {

};

export default class VDTEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editor-container">
        <div className="editor">
          <App configurations={null} options={null} listener={listener} />
        </div>
      </div>
    );
  }
}

storiesOf('Editor', module)
  .add('Core', () => (
    <VDTEditor />
  ));
