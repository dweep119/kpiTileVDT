import React from 'react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import FormGroup from '@visualbi/bifrost-editor/dist/forms/FormGroup';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import { observer, inject } from 'mobx-react';
import '../../styles/FormElements.css';

// Update Period aggregation value for VDT
const PeriodAgg = (props) => {
  const { ValueDriverTree } = props;
  const { data } = ValueDriverTree;

  const onChange = (property, value) => {
    props.ValueDriverTree.data.periodAgg[property] = value;
  };

  const { periodAgg } = data;

  return (
    <Flex flexDirection="column">
      <h3 className="section-header">Periods Aggregation</h3>
      <FormGroup label="Active periods" className="periods">
        <div />
      </FormGroup>
      <Flex>
        <Flex flexDirection="column">
          <div className="sublabel">Label</div>
          <Input className="inline-label" value={periodAgg.valTextLper} onChange={(e) => { onChange('valTextLper', e); }} />
        </Flex>
        <Flex flexDirection="column">
          <div className="sublabel">3 letter abbreviation</div>
          <Input className="inline-label" onChange={(e) => { onChange('valTextSper', e.substring(0, 3)); }} value={periodAgg.valTextSper} />
        </Flex>
      </Flex>
      <div className="menu-note">Only one period of interest</div>
      <FormGroup label="Total to period" className="periods">
        <div />
      </FormGroup>
      <Flex>
        <Flex flexDirection="column">
          <div className="sublabel">Label</div>
          <Input className="inline-label" value={periodAgg.valTextLptd} onChange={(e) => { onChange('valTextLptd', e); }} />
        </Flex>
        <Flex flexDirection="column">
          <div className="sublabel">3 letter abbreviation</div>
          <Input className="inline-label" value={periodAgg.valTextSptd} onChange={(e) => { onChange('valTextSptd', e); }} />
        </Flex>
      </Flex>
      <div className="menu-note">Total value from beginning to a specific period</div>

      <FormGroup label="Total of periods" className="periods">
        <div />
      </FormGroup>
      <Flex>
        <Flex flexDirection="column">
          <div className="sublabel">Label</div>
          <Input className="inline-label" value={periodAgg.valTextLtotal} onChange={(e) => { onChange('valTextLtotal', e); }} />
        </Flex>
        <Flex flexDirection="column">
          <div className="sublabel">3 letter abbreviation</div>
          <Input className="inline-label" value={periodAgg.valTextStotal} onChange={(e) => { onChange('valTextStotal', e); }} />
        </Flex>
      </Flex>
      <div className="menu-note">Total value of all periods in the series</div>

      <FormGroup label="Selected interval" className="periods">
        <div />
      </FormGroup>
      <Flex>
        <Flex flexDirection="column">
          <div className="sublabel">Label</div>
          <Input className="inline-label" value={periodAgg.valTextLsel} onChange={(e) => { onChange('valTextLsel', e); }} />
        </Flex>
        <Flex flexDirection="column">
          <div className="sublabel">3 letter abbreviation</div>
          <Input className="inline-label" value={periodAgg.valTextSsel} onChange={(e) => { onChange('valTextSsel', e); }} />
        </Flex>
      </Flex>
      <div className="menu-note">A specific set of continuous periods</div>
    </Flex>
  );
};
export default inject('ValueDriverTree')(observer(PeriodAgg));
