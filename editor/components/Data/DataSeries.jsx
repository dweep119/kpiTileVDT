import React from 'react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import FormGroup from '@visualbi/bifrost-editor/dist/forms/FormGroup';
import Input from '@visualbi/bifrost-editor/dist/forms/Input';
import Checkbox from '@visualbi/bifrost-editor/dist/forms/Checkbox';
import { observer, inject } from 'mobx-react';
import RadioGroup from '../Shared/RadioGroup';
import '../../styles/FormElements.css';
import { toJS } from 'mobx';
import InputNote from '../Shared/InputNote';

// Update Dataseries value for VDT

const DataSeries = (props) => {
  const dataSeries = props.ValueDriverTree.data.dataSeries;
  const seriesGenOptions = [
    {
      name: 'PERIOD_PARTITION',
      label: 'Period Partitioning'
    }, {
      name: 'MEASURE_PARTITION',
      label: 'Measure Partitioning'
    }
  ];
  const onChange = (property, value) => {
    props.ValueDriverTree.data.dataSeries[property] = value;
  };

  return (
    <Flex flexDirection="column">
      <h3 className="section-header">Data Series</h3>
      <FormGroup>
        <div className="menu-note section-note">
          Data series includes values of one or more periods
          (equal time interval such as Jan, Feb, Mar)
        </div>
      </FormGroup>
      <FormGroup
        label="Primary series label"
        value={dataSeries.pVerTitle}
        onChange={(e) => { onChange('pVerTitle', e); }}
      >
        <InputNote note="Baseline data series for simulation" />
      </FormGroup>
      <Checkbox
        label="Include comparison data series"
        value={dataSeries.withComparison === 'X' || dataSeries.withComparison === true}
        onChange={(e) => { onChange('withComparison', e ? 'X' : ''); }}
      />

      <FormGroup
        label="Comparision data series label"
        value={dataSeries.cVerTitle}
        onChange={(e) => { onChange('cVerTitle', e); }}
      >
        <InputNote note="This series can be used to compare against primary
          series. For example, primary series are forecasted values for each period, while
          comparison series are budgeted values"
        />

      </FormGroup>
      <FormGroup
        label="Period(s) per data series"
        value={dataSeries.periods}
        onChange={(e) => { onChange('periods', e); }}
      >
        <InputNote
          type="number"
          note="The number of values in the series. For example, a
        series with Jan, Febn and Mar periods would have 3 periods"
        />
      </FormGroup>
      <FormGroup
        label="Period Label(s)"
        value={dataSeries.periodsLabels}
        onChange={(e) => { onChange('periodsLabels', e); }}
      >
        <InputNote note="Separate each label by a comma (i.e. Jan, Feb,
        Mar...). Add labels for all periods. If left blank, it will be derived from
        primary data series in data source"
        />
      </FormGroup>
      <FormGroup
        label="Series Generation Method "
        value={dataSeries.seriesGenerationMethod}
        onChange={(e) => { onChange('seriesGenerationMethod', e); }}
      >
        <RadioGroup horizontal={false} items={seriesGenOptions} />
      </FormGroup>
      <div className="menu-note">
      Select method to split Primary and Comparison series in your data selection:
      </div>
      <div className="menu-note">
        - Period Partition - Splits the periods based on
        specified number of periods (otherwise defaults to = period columns/2), where
        first set will be considered as Primary and the second set as Comparison.
      </div>
      <div className="menu-note">
        - Measure partition - 1st measure will be considered as
        Primary and the second as Comparison.
      </div>
    </Flex>
  );
};

export default inject('ValueDriverTree')(observer(DataSeries));
