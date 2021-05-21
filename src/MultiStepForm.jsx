import React, {useState, useRef, useEffect} from "react";
import { Link, useHistory } from 'react-router-dom';
import {DayOfWeekSelector} from "./assets/react_components/DayOfWeekSelector.jsx"
import {SearchSelect, UnitSelect, DrugSelect} from './assets/js/SearchSelect.js';
import {HapticComponent} from "./assets/react_components/HapticComponent.jsx";
import styled from 'styled-components';
export function MultiStepForm(props) {
    let pages = props.children.length==null?[props.children]:props.children;
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    let currentPage = pages[currentPageIndex];
    let previousPage = pages[currentPageIndex-1];
    let loadNextPage = ()=>{
        setCurrentPageIndex(currentPageIndex+1);
        console.log(currentPage);
    };
    const CurrentFormPageWrapper = styled.div`
        background-color: rgb(39, 39, 39);
        padding: 20px;
        border-radius: 20px;
        width: 100vw;
        height: 300px;
        margin-left: 20px;
        margin-right: 20px;
    `;
    const PreviousFormPageWrapper = styled.div`
        background-color: rgb(39, 39, 39);
        padding: 20px;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 20px;
        width: 100vw;
        height: 300px;
    `;

    const MultiStepFormWrapper = styled.div`
        display: flex;
        flexDirection: row;
        position: fixed;
        top: 42vh;
        width: 200vw;
        transform: translateX(-100vw);
        animation: swipeLeft 0.5s;
        @keyframes swipeLeft {
            from { transform: translateX(0vw); }
            to   { transform: translateX(-100vw); }
        }
    `;
    
    return(
    <MultiStepFormWrapper style={currentPageIndex==0?{animation: "swipeLeft 0s", transform: "translateX(-100vw)"}:{}}>
        <PreviousFormPageWrapper>
            {previousPage}
            {currentPageIndex>=pages.length-1?
                <button type="submit" onClick={props.onSubmit}>Submit</button>:
                <button type="button" onClick={()=>{loadNextPage()}}>next</button>
            }
        </PreviousFormPageWrapper>

        <CurrentFormPageWrapper>
            {currentPage}
            {currentPageIndex>=pages.length-1?
                <HapticComponent><button type="submit" onClick={props.onSubmit}>Submit</button></HapticComponent>:
                <HapticComponent><button type="button" onClick={()=>{loadNextPage()}}>next</button></HapticComponent>
            }
        </CurrentFormPageWrapper>


    </MultiStepFormWrapper>
    );
}
export function FormDrugSelect(props) {
    return (
        <div>
            <h2>Drug Name</h2>
            <DrugSelect hasAddButton={true} onChange={(option)=>{props.onChange(option.optionId)}}></DrugSelect>
        </div>
    );
}

export function FormUnitSelect(props) {
    return (
        <div>
            <label id="units">Units</label>
            <UnitSelect hasAddButton={true} onChange={(option)=>{props.onChange(option.optionId)}}></UnitSelect>
        </div>
    );
}

export function FormDoseAmount(props) {
    return (
        <div>
            <label className="d-flex justify-content-center">Amount</label>
            <input className="form-control" type="number" id="dose-amount" onInput={(evt)=>{props.onChange(evt.target.value)}}></input>
        </div>
    );
}

export function FormTimeSelect(props) {
    return(
        <div>
            <label>Time</label>
            <input type="datetime-local" className="form-control" id="time" defaultValue={new Date().toISOString().substr(0,10)}onInput={(evt)=>{props.onChange(evt.target.value)}}></input>
        </div>
    );
}

export function FormDateRange(props) {
    let startDate = -1;
    let endDate = -1;
    let daysOfWeek = -1;
    let triggerChange = ()=>{
        if(startDate!=-1 && endDate!=-1 && daysOfWeek!=-1) {
            props.onChange({startDate:startDate, endDate:endDate, daysOfWeek:daysOfWeek});
        }
    }
    return(
        <div className="d-flex flex-row justify-content-center" id="date-range">
            <input type="date" className="form-control" id="start-date" onInput={(evt)=>{startDate = evt.target.value; triggerChange()}}></input>
            <input type="date" className="form-control" id="end-date" onInput={(evt)=>{endDate = evt.target.value; triggerChange()}}></input>
            <DayOfWeekSelector onChange={(evt)=>{daysOfWeek=evt;triggerChange()}}></DayOfWeekSelector>
        </div>
    );
}
//