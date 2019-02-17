import React, { Component } from 'react';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import { observer, inject } from 'mobx-react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Checkbox from '@visualbi/bifrost-editor/dist/forms/Checkbox';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import FormGroup from '@visualbi/bifrost-editor/dist/forms/FormGroup';
import PropTypes from 'prop-types';


class TileSelection extends Component {
  constructor(props) {
    super(props);
    this.state = { key: '', value: '' };
    this.enumList = this.enumList.bind(this);
  }

  enumList(list) {
    const values = [];
    for (const prop in list) {
      values.push({ key: prop, value: list[prop] });
    }
    return values;
  }

  render() {
    const { value, onChange } = this.props;
    const { key, value: stateValue } = this.state;

    return (
      <Box>
        <FormGroup label="Fixed value list">
          <div className="menu-note">loren ipsum solor sit amet, consectuer adipiscing</div>
        </FormGroup>
        <Checkbox
          label="Enabled"
          value={value.enableEnumList === 'on'}
          onChange={value => onChange({
            ...value,
            enableEnumList: value
              ? 'on'
              : ''
          })}
        />
        {' '}
        {value.enableEnumList === 'on'
          && (
            <Box>
              <Flex className="enum-label">
                <Flex className="enum-flex-icon">
                  <a className="btn-clear add-node-btn">
                    <i className="icon icon--Add" />
                  </a>
                  <Box style={{ marginLeft: '10px' }}>Label</Box>
                </Flex>
                <Box style={{ display: 'flex', flex: '50%', marginLeft: '10px' }}>Value</Box>
              </Flex>

              <Flex flexDirection="column">
                <Box>
                  {(value.enumList)
                    && (
                      <Box>
                        {this
                          .enumList(value.enumList)
                          .map(data => (
                            <Box style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
                              <Box style={{ display: 'flex', flex: '50%' }}>
                                <a
                                  style={{ cursor: 'pointer' }}
                                  className="btn-clear add-node-btn"
                                  onClick={() => {
                                    const enumList = value.enumList;
                                    delete enumList[data.key];
                                    this.setState({ key: '', value: '' });
                                    onChange({
                                      ...value,
                                      enumList
                                    });
                                  }}
                                >
                                  <i className="icon icon--Delete" />
                                </a>
                                <Box style={{ marginLeft: '10px' }}>{data.key}</Box>
                              </Box>
                              <Box style={{ display: 'flex', flex: '50%', marginLeft: '10px' }}>{data.value}</Box>
                            </Box>
                          ))
                        }
                      </Box>
                    )
									  }
                </Box>
                <Box style={{ paddingTop: '10px', }}>
                  <Flex>
                    <Box style={{ display: 'flex', flex: '50%', alignItems: 'center' }}>
                      <a
                        style={{ cursor: 'pointer' }}
                        primary
                        onClick={() => {
                          const enumList = value.enumList;
                          enumList[key] = stateValue;
                          this.setState({ key: '', value: '' });
                          onChange({
                            ...value,
                            enumList
                          });
                        }}
                      >
                        <i className="icon icon--Add" />
                      </a>
                      <Box style={{ margin: ' 0 10px' }}>
                        <Input value={key} onChange={e => this.setState({ key: e })} />
                      </Box>
                    </Box>
                    <Box style={{ display: 'flex', flex: '50%', }}>
                      <Box style={{ margin: ' 0 10px' }}>
                        <Input
                          type="number"
                          value={stateValue}
                          onChange={e => this.setState({ value: e })}
                        />
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          )
        }
      </Box>
    );
  }
}

TileSelection.defaultProps = {
  value: {},
  onChange: () => {}
};

TileSelection.propTypes = {
  value: PropTypes.element,
  onChange: PropTypes.func
};
export default inject('ValueDriverTree')(observer(TileSelection));
