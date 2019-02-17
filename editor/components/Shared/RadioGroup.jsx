import React, { Component } from 'react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Radio from '@visualbi/bifrost-editor/dist/forms/Radio';
import PropTypes from 'prop-types';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';

class RadioGroup extends Component {
  static get propTypes() {
    return {
      horizontal: PropTypes.bool,
      items: PropTypes.shape,
      onChange: PropTypes.func,
      value: PropTypes.string
    };
  }

  render() {
    const {
      horizontal,
      items,
      onChange,
      value
    } = this.props;

    return (
      <Box>
        <Flex flexDirection={horizontal ? 'row' : 'column'}>
          {
          items.map(data => (
            <Radio
              name={data.name}
              label={data.label}
              value={value === data.name}
              onChange={() => { onChange(data.name); }}
            />
          ))
        }
        </Flex>
        <div className="menu-note">{this.props.note}</div>
      </Box>
    );
  }
}

RadioGroup.defaultProps = {
  horizontal: true,
  items: [],
  onChange: () => {},
  value: ''
};

export default RadioGroup;
