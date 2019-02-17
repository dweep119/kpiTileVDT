import React from 'react';
import Flex from '../../layout/Flex'
import FormGroup from '../../forms/FormGroup';
import Input from '../../forms/Input';
import Checkbox from '../../forms/Checkbox'
import {inject, observer} from 'mobx-react';

const PeriodAgg= (props)=>{
 
  console.log("asdasdf",props);
    return (
        <Flex flexDirection={"column"}>
          <FormGroup label="Period aggregaton labels  ">        
          <div></div>  
          </FormGroup>
          <div>
            <FormGroup label="Active Periods">   
            <div></div>  
            </FormGroup>
            <Flex>
              <Flex flexDirection="column">
              <div>Label</div>
                <Input value={props.dataStore.data.periodAgg.activePeriod.value} onChange={(e) =>{props.dataStore.periodAggFun({activePeriod:{value:e,abb:e.substring(0,3)}})}}/> 
              </Flex>           
            <Flex flexDirection="column">
              <div>3 letter abbreviation</div>
                <Input value={props.dataStore.data.periodAgg.activePeriod.abb} disabled={true}/> 
              </Flex>                 
            </Flex>
            <FormGroup label="Total to Periods">   
            <div></div>  
            </FormGroup>
            <Flex>
              <Flex flexDirection="column">
              <div>Label</div>
                <Input value={props.dataStore.data.periodAgg.totalOfPeriod.value} onChange={(e) =>{props.dataStore.periodAggFun({totalOfPeriod:{value:e,abb:e.substring(0,3)}})}}/> 
              </Flex>           
            <Flex flexDirection="column">
              <div>3 letter abbreviation</div>
                <Input value={props.dataStore.data.periodAgg.totalOfPeriod.abb} disabled={true}/> 
              </Flex>                 
            </Flex>
            <FormGroup label="Total of Periodss">   
            <div></div>  
            </FormGroup>
            <Flex>
              <Flex flexDirection="column">
              <div>Label</div>
                <Input value={props.dataStore.data.periodAgg.totalToPeriod.value} onChange={(e) =>{props.dataStore.periodAggFun({totalToPeriod:{value:e,abb:e.substring(0,3)}})}}/> 
              </Flex>           
            <Flex flexDirection="column">
              <div>3 letter abbreviation</div>
                <Input value={props.dataStore.data.periodAgg.totalToPeriod.abb} disabled={true}/> 
              </Flex>                 
            </Flex>
            <FormGroup label="Selected interval">   
            <div></div>  
            </FormGroup>
            <Flex>
              <Flex flexDirection="column">
              <div>Label</div>
                <Input value={props.dataStore.data.periodAgg.selectedInterval.value} onChange={(e) =>{props.dataStore.periodAggFun({selectedInterval:{value:e,abb:e.substring(0,3)}})}}/> 
              </Flex>           
            <Flex flexDirection="column">
              <div>3 letter abbreviation</div>
                <Input value={props.dataStore.data.periodAgg.selectedInterval.abb} disabled={true}/> 
              </Flex>                 
            </Flex>
            </div>
        </Flex>
    )
}
export default observer(PeriodAgg)
