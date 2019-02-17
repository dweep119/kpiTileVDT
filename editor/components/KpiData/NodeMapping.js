import React, {Component} from 'react';
import Flex from '../../layout/Flex'
import FormGroup from '../../forms/FormGroup';
import Input from '../../forms/Input';
import {inject, observer} from 'mobx-react';


const NodeMapping= (props)=>{
    return (
        <Flex>
          <FormGroup label="Select Node mapping methods">
            <Flex className={"form-group radio-select"} flexDirection={"column"}>
              <Flex alignItems={"center"} flexDirection={"column"} onClick={()=>{ console.log("SDasdasd"); props.dataStore.nodeMappingFun({"key":"AutomaticKey"})}} >
                <Flex alignItems={"center"} className={"radio-check-class form-radio"} >
                  <input type="radio" name="gender" value="show" style={{marginRight:"10px"}}  checked={props.dataStore.data.nodeMapping.key =="AutomaticKey"}/>
                  <i className="form-icon"/>
                  <span>Automatic based on key</span>
                </Flex>
                <Flex className="menu-note">
                    Select if data source keys match nodes unique id
                </Flex>
              </Flex>
              <Flex alignItems={"center"} flexDirection={"column"} onClick={()=> props.dataStore.nodeMappingFun({"key":"AutomaticText"})} >
                <Flex alignItems={"center"} className={"radio-check-class form-radio"}>
                  <input type="radio" name="gender" value="show" style={{marginRight:"10px"}} checked={props.dataStore.data.nodeMapping.key =="AutomaticText"}/>
                  <i className="form-icon"/>
                  <span>Automatic based on key</span>
                </Flex>
                <Flex className="menu-note">
                    Select if data source keys match nodes unique id
                </Flex>
                {props.dataStore.data.nodeMapping.key =="AutomaticText" ?
                <Flex flexDirection={"column"}>
                    <FormGroup label="Node ID seperator">
                    <div></div>
                    </FormGroup>
                    <Input  onChange={(e) => { console.log("sdfsdf")}}/>
                   
                </Flex>:null

                }
              </Flex>
              <Flex alignItems={"center"} flexDirection={"column"} onClick={()=> props.dataStore.nodeMappingFun({"key":"Manual"})} >
                <Flex alignItems={"center"} className={"radio-check-class form-radio"}>
                  <input type="radio" name="gender" value="show" style={{marginRight:"10px"}} checked={props.dataStore.data.nodeMapping.key =="Manual"}/>
                  <i className="form-icon"/>
                  <span>Manual</span>
                </Flex>
                <Flex className="menu-note">
                   Map each node to manual(not recommended)
                </Flex>
              </Flex>
            </Flex>
          </FormGroup>
        </Flex>
    )
}

export default observer(NodeMapping)