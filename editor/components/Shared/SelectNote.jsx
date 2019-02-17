import React, { Component } from 'react';
import Select from '@visualbi/bifrost-editor/dist/forms/Select';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import '../../styles/FormElements.css';

class SelectNote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onChange } = this.props;

    return (
      <Box>
        <Select options={this.props.options} value={value} onChange={e => onChange(e)} />
        <div className="menu-note">{this.props.note}</div>
      </Box>
    );
  }
}
export default SelectNote;
