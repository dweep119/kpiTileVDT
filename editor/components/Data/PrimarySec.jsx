import React from 'react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Select from '@visualbi/bifrost-editor/dist/forms/Select';
import FormGroup from '@visualbi/bifrost-editor/dist/forms/FormGroup';
import { observer, inject } from 'mobx-react';
import '../../styles/FormElements.css';

const scaling = [{ key: 'ptd', label: 'Total to Period' }, { key: 'total', label: 'Total of Periods' }, { key: 'sel', label: 'Selected simulation Interval' }];
const interval = [{ key: 'per', label: 'Active Period' }, { key: 'ptd', label: 'Total to Periods' }, { key: 'total', label: 'Total of Periods' }];
// Update Primary and secordary display value for VDT

const PrimarySec = (props) => {
  const { ValueDriverTree } = props;
  const { data } = ValueDriverTree;

  const onChange = (property, value) => {
    props.ValueDriverTree.data.primarySec[property] = value;
  };

  const { primarySec } = data;

  return (
    <Flex flexDirection="column">
      <h3 className="section-header">Values display</h3>
      <FormGroup className="form-group-zero-bot-margin">
        <div className="menu-note section-note">
          Determine how values are displayed based on periods aggregation
        </div>
      </FormGroup>
      <Flex justifyContent="space-between" alignItems="center" className="select-primarySec">
        <div className="main-label" style={{ width: '200px' }}> Primary Value</div>
        <Select className="dropdown" value={primarySec.primaryDisplayValue} options={scaling} onChange={e => onChange('primaryDisplayValue', e)} />
      </Flex>
      <FormGroup className="secondary-value-section" label="Secondary Value">
        <div />
      </FormGroup>
      <Flex flexDirection="column" className="select-primarySec">
        <Flex justifyContent="space-between" alignItems="center">
          <div style={{ width: '200px; font-size:12px' }} className="sublabel-dropdown"> Active period</div>
          <Select className="dropdown" value={primarySec.secValDispper} options={scaling} onChange={e => onChange('secValDispper', e)} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" className="select-primarySec">
          <div style={{ width: '200px; font-size:12px' }} className="sublabel-dropdown"> Total of period</div>
          <Select className="dropdown" value={primarySec.secValDispptd} options={scaling} onChange={e => onChange('secValDispptd', e)} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" className="select-primarySec">
          <div style={{ width: '200px; font-size:12px' }} className="sublabel-dropdown"> Total to period</div>
          <Select className="dropdown" value={primarySec.secValDisptotal} options={scaling} onChange={e => onChange('secValDisptotal', e)} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" className="select-primarySec">
          <div style={{ width: '200px; font-size:12px' }} className="sublabel-dropdown"> Selected interval</div>
          <Select className="dropdown" value={primarySec.secValDispsel} options={interval} onChange={e => onChange('secValDispsel', e)} />
        </Flex>
      </Flex>
      <div className="menu-note">Determine how secondary value is displayed for each type of periods aggregation</div>
    </Flex>
  );
};
export default inject('ValueDriverTree')(observer(PrimarySec));
