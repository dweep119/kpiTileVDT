import React, { Component } from 'react';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import PropTypes from 'prop-types';

class TileSimulation extends Component {
  static get propTypes() {
    return {
      tileValue: PropTypes.string,
      onChange: PropTypes.func,
      title: PropTypes.string,
      description: PropTypes.string,
      className: PropTypes.string,
      value: PropTypes.string
    };
  }

  render() {
    const {
      className, title, description, value, onChange, tileValue
    } = this.props;
    return (
      <div onClick={() => onChange(tileValue)} className={`simulation-node${value === tileValue ? ' active' : ''}`}>
        <Flex>
          <Box className={className} />
          <Flex flexDirection="column" justifyContent="center">
            <Box style={{ fontWeight: 600 }}>{title}</Box>
            <Box>{description}</Box>
          </Flex>
        </Flex>
      </div>
    );
  }
}

TileSimulation.defaultProps = {
  tileValue: '',
  onChange: () => {},
  title: '',
  description: '',
  className: '',
  value: ''
};

export default TileSimulation;
