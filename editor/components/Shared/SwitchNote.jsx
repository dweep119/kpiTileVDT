import React, { Component } from 'react';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import '../../styles/FormElements.css';
import Switch from '@visualbi/bifrost-editor/dist/forms/Switch';

class SwitchNote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      value, onChange, label, className
    } = this.props;
    return (
      <Box>
        <Switch className={className} label={label} value={value} onChange={e => onChange(e)} />
        <div className="menu-note">{this.props.note}</div>
      </Box>
    );
  }
}

export default SwitchNote;
