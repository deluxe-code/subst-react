
import { Component } from 'react';
import {Drugs} from './Drugs.js'
import {Units} from './Units.js'
import React, { useState, useRef, useEffect } from "react"
import { Schedules } from './Schedules.js';

import styled from "styled-components";

export default function FunctionalSearchSelect(props) {
    const [inputValue, setInputValue] = useState("");
    const [selectedId, setSelectedId] = useState(1);
    const [opened, setOpened] = useState(0);
    const [selectedOption, setSelectedOption] = useState(0);
    const [addButton, setAddButton] = useState(props.hasAddButton ? <button onClick={()=>{props.addClickFunction(inputValue)}}></button> : <div></div>);
    const searchSelectRef = useRef();
    useEffect(()=>{
        //set default selected
        changeSelected(props.list[0]);
    }, []);
    let changeSelected = (option)=> {
        setSelectedId(option.optionId); 
        setSelectedOption(option);

        console.log(selectedId)
        if(props.onChange!=null)props.onChange(option);
    }
    let optionNameIncludes = (option)=> {
        let title = option.title || "";
        return title.toLowerCase().includes(inputValue.toLowerCase())
    }
    return(
    <div className="search-select" onClick={()=>{window.navigator.vibrate(5)}} ref={searchSelectRef}>
        <TwoStepSearchInput type="text" 
            onInput={(evt)=>{
                let searchInput = evt.target.value;
                let lowerCaseList = props.list.map(value=>value.title.toLowerCase());
                setInputValue(searchInput);
                if(lowerCaseList.includes(inputValue.toLowerCase())||inputValue=="") {
                    setAddButton(<div></div>);
                } else {

                    setAddButton(<button type="button" onClick={()=>{props.addClickFunction(searchInput)}}> Add {searchInput} to list</button>);
            }}} 
            onOpen={()=>{
                setOpened(true);
            }}
            value={inputValue} 
            placeholder={selectedOption.title}
            title={selectedOption.title} 
            setOpened={setOpened}
            opened={opened}
        ></TwoStepSearchInput>
        <div id="options" className={"search-select-option-container " + (opened?"opened":"closed")} onClick={()=>{setOpened(false)}}>
        {
            props.list.filter(optionNameIncludes).map(option => <button className={selectedId==option.optionId ? "search-select-option checked" : "search-select-option unchecked"} type="button" onClick={()=>{changeSelected(option);}}><h2>{option.title}</h2><p>{(props.subtextFunction!=null?props.subtextFunction(option):"") + ""}</p></button>)
        }
        {addButton}
        </div>
    </div>)
}

function TwoStepSearchInput(props) {
    const [opened, setOpened] = useState(props.opened);
    const [title, setTitle] = useState(props.defaultTitle);
    const [currValue, setCurrValue] = useState(props.value);
    const StyledInput = styled.div`
        border-radius: 100px;
        background-color: white;
    `;
    useEffect(()=>{
        setOpened(props.opened);
        setTitle(props.title);
        setCurrValue(props.value);
    });
    let textBox = 
    <StyledInput>
        <input {...props} value={currValue} style={{display: opened?"block":"none", width: "100%", backgroundColor: "transparent"}}></input>  
        <button 
            style={{backgroundColor:"transparent", color: "black", textAlign:"left", display: opened?"none":"block", width: "100%"}} 
            onClick={()=>{props.onOpen();}}
        >{title||props.defaultTitle}</button>
    </StyledInput>;
    return(textBox);
}
export class FormattedOption {
    optionId;
    title;
    constructor(optionId, title) {
        this.optionId = optionId;
        this.title = title;
    }
}


export class DrugSelect extends Component {
    state = {
        list:[],
        searchSelect: React.createRef()
    }
    
    constructor(props) {
        super(props);
        Drugs.AddDefault();
        function GetDrugOptions() {
            let drugs = Drugs.GetDrugs();
            let drugOptions = [];
            drugs.forEach(drug => {
                let option = new FormattedOption(drug.id, drug.drugName);
                drugOptions.push(option);
            });
            return drugOptions;
        }
        this.state.list = GetDrugOptions();
    }

    render() {
        return <FunctionalSearchSelect onChange={this.props.onChange} hasAddButton={true} ref={this.state.searchSelect} list={this.state.list} addClickFunction={function(inputValue){Drugs.Store(Drugs.FormatDrug(inputValue))}} subtextFunction={(drug)=>{ return (Units.GetElementWithId(Drugs.FindDrugWithID(drug.optionId).unitId)||{unitName:""}).unitName}}></FunctionalSearchSelect>
    }
    GetSelectedId() {
        return this.state.searchSelect.current.GetSelectedId();
    }

}


export class UnitSelect extends Component{
    state = {
        list:[],
        searchSelect: React.createRef()
    }
    constructor(props) {
        super(props);
        Units.AddDefault();
        function GetUnitOptions() {
            let units = Units.GetUnits();
            let unitOptions = [];
            units.forEach(unit => {
                let option = new FormattedOption(unit.id, unit.unitName);
                unitOptions.push(option);
            });
            return unitOptions;
        }
        this.state.list = GetUnitOptions();
    }

    render() {
        
        return <FunctionalSearchSelect onChange={this.props.onChange} hasAddButton={true} ref={this.state.searchSelect} list={this.state.list} addClickFunction={function(inputValue){Units.Store(inputValue)}} selectedId></FunctionalSearchSelect>
    }

    GetSelectedId() {
        return this.state.searchSelect.current.GetSelectedId();
    }
}

export function ScheduleSelect(props) {
    return(
    <FunctionalSearchSelect
        defaultTitle="Select a schedule" 
        onChange={props.onChange} 
        hasAddButton={false} 
        list={Schedules.GetSchedules().map(schedule=>new FormattedOption(schedule.id, Drugs.FindDrugWithID(schedule.drugID).drugName)).concat(new FormattedOption(-1, "No schedules"))} 
        addClickFunction={()=>{}} 
        subtextFunction={(option)=>{return ("" + (Schedules.FindScheduleWithId(option.optionId)==null?"nothing":Schedules.FindScheduleWithId(option.optionId).startDate) +  " through "+ (Schedules.FindScheduleWithId(option.optionId)==null?"nothing":Schedules.FindScheduleWithId(option.optionId).endDate)) }}

     ></FunctionalSearchSelect>);
}