import React, { Component } from 'react';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import '../../styles/FormElements.css';

class InputNote extends Component {
  render() {
    const { value, onChange, type } = this.props;
    return (
      <Box>
        <Input value={value} onChange={e => onChange(e)} type={type} />
        <div className="menu-note">{this.props.note}</div>
      </Box>
    );
  }
}
InputNote.defaultProps = {
  onChange: () => {},
  type: 'text',
  value: ''
};

export default InputNote;
