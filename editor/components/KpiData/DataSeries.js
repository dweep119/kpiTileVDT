import React from 'react';
import Flex from '../../layout/Flex'
import FormGroup from '../../forms/FormGroup';
import Input from '../../forms/Input';
import Checkbox from '../../forms/Checkbox'
import {inject, observer} from 'mobx-react';

const DataSeries= (props)=>{
 
  console.log("asdasdf",props);
    return (
        <Flex flexDirection={"column"}>
          <FormGroup label="Data Series labels">        
          <div></div>  
          </FormGroup>
          <div>
            <FormGroup label="Primary series label" value={props.dataStore.data.dataSeries.periodPerSeries} onChange={(e) =>{ props.dataStore.dataSeriesFun({primarySeries:e})}}>   
              <Input />            
            </FormGroup>
            <Checkbox  label={"Include comparison data series"} value={props.dataStore.data.dataSeries.compareDataSeriesCheck} onChange={(e) =>props.dataStore.dataSeriesFun({compareDataSeriesCheck:e})}/>
            <FormGroup label="Comparision data series label">   
            <div></div>           
            </FormGroup>
            <Input  value={props.dataStore.data.dataSeries.periodPerSeries} onChange={(e) =>props.dataStore.dataSeriesFun({compareDataSeries:e})}/>
            <FormGroup label="Period per data series">
            <div></div>
            </FormGroup>
            <Input value={props.dataStore.data.dataSeries.periodPerSeries} type={"number"}  onChange={(e) =>props.dataStore.dataSeriesFun({periodPerSeries:e})}/>
            <FormGroup label="Period Label">     
            <div></div>         
            </FormGroup>
            <Input value={props.dataStore.data.dataSeries.primaryLabel} onChange={(e) =>props.dataStore.dataSeriesFun({primaryLabel:e})} />
            </div>
        </Flex>
    )
}
export default observer(DataSeries)
