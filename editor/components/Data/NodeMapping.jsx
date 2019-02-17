import React from 'react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import FormGroup from '@visualbi/bifrost-editor/dist/forms/FormGroup';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import { observer, inject } from 'mobx-react';
import Radio from '@visualbi/bifrost-editor/dist/forms/Radio';
import '../../styles/FormElements.css';
import Switch from '@visualbi/bifrost-editor/dist/forms/Switch';

// Update NodeMapping value for VDT
const NodeMapping = (props) => {
  const { ValueDriverTree } = props;
  const { data } = ValueDriverTree;

  const onChange = (property, value) => {
    props.ValueDriverTree.data.nodeMapProps[property] = value;
  };

  const { nodeMapProps } = data;

  return (
    <Box>
      <h3 className="section-header">Node Mapping</h3>
      <FormGroup>
        <div />
      </FormGroup>
      <FormGroup label="Select node mapping methods">
        <Flex className="form-group radio-select" flexDirection="column">
          <Flex flexDirection="column">
            <Radio label="Automatic based on key" value={nodeMapProps.nodeMapping === 'key'} onChange={() => { onChange('nodeMapping', 'key'); }} />
            <Flex className="menu-note">
                Select if data source keys match nodes unique id
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            <Radio label="Automatic based on text" value={nodeMapProps.nodeMapping === 'text'} onChange={() => { onChange('nodeMapping', 'text'); }} />
            <Flex className="menu-note">
                Select if data source keys match part of description
            </Flex>
            {nodeMapProps.nodeMapping === 'text'
              && (
              <Flex flexDirection="column">
                <FormGroup label="Node ID seperator" className="node-separator-section">
                  <div />
                </FormGroup>
                <Input className="node-separator" value={nodeMapProps.nodeMappingSep} onChange={(e) => { onChange('nodeMappingSep', e); }} />

              </Flex>
              )
            }
          </Flex>
          <Flex flexDirection="column">
            <Radio label="Manual" value={nodeMapProps.nodeMapping === ''} onChange={() => { onChange('nodeMapping', ''); }} />
            <Flex className="menu-note">
                Map each node manually (not recommended)
            </Flex>
          </Flex>
        </Flex>
      </FormGroup>
      <FormGroup>
        <Flex flexDirection="column">
          <Switch
            label="Use Manual Data as defaults if sourced nodes not available in result set"
            value={nodeMapProps.useConstants}
            onChange={e => onChange('useConstants', e)}
          />
        </Flex>
      </FormGroup>
    </Box>
  );
};

export default inject('ValueDriverTree')(observer(NodeMapping));
