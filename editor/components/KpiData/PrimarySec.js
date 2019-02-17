import React from 'react';
import Flex from '../../layout/Flex'
import FormGroup from '../../forms/FormGroup';
import Input from '../../forms/Input';
import Select from '../../forms/Select'
import {inject, observer} from 'mobx-react';
const scaling = [{ key: "scaling", label: "Scaling" }, { key: "user-selected", label: "User selected" }, { key: "zerom", label: "0m" }, { key: "zerok", label: "0k" }, { key: "pct", label: "Pct" }];

const PrimarySec= (props)=>{
 
  console.log("asdasdf",props);
    return (
        <Flex flexDirection={"column"}>
          <Flex justifyContent={"space-between"} alignItems={"center"} className={"select-primarySec"}>
            <div> Primary Value Display</div>
            <Select value={props.dataStore.data.primarySec.primaryValue} options={scaling} onChange={(e) => props.dataStore.primarySecFun({primaryValue:e})} />
          </Flex>
          <FormGroup label="Secoundary value display">   
            <div></div>  
            </FormGroup>
          <Flex flexDirection={"column"} className={"select-primarySec"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <div> Active period</div>
            <Select value={props.dataStore.data.primarySec.activePeriod} options={scaling} onChange={(e) => props.dataStore.primarySecFun({activePeriod:e})} />
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"} className={"select-primarySec"}>
            <div> Total of period</div>
            <Select value={props.dataStore.data.primarySec.totalOfPeriod} options={scaling} onChange={(e) => props.dataStore.primarySecFun({totalOfPeriod:e})} />
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"} className={"select-primarySec"}>
            <div> Total to period</div>
            <Select value={props.dataStore.data.primarySec.totalToPeriod} options={scaling} onChange={(e) => props.dataStore.primarySecFun({totalToPeriod:e})} />
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"} className={"select-primarySec"}>
            <div> Selected interval</div>
            <Select value={props.dataStore.data.primarySec.selectedInterval} options={scaling} onChange={(e) => props.dataStore.primarySecFun({selectedInterval:e})} />
          </Flex>
          </Flex>
        </Flex>
    )
}
export default observer(PrimarySec)
