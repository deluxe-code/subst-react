import React from "react";
import { Link } from 'react-router-dom'
import './DrugInfo.css';
import {DoseCardDisplay} from './assets/react_components/DoseCard.jsx';
import {Units} from './assets/js/Units.js';
import {SearchSelect, UnitSelect, DrugSelect} from './assets/js/SearchSelect.js';
import {MultiStepForm, FormDateRange, FormDrugSelect, FormUnitSelect, FormDoseAmount, FormTimeSelect} from "./MultiStepForm.jsx"

import scheduleIcon from './assets//img/edit_calendar_white_24dp.svg';
import { Doses } from "./assets/js/Doses";
import { Schedules } from "./assets/js/Schedules";
//import WeekdayPicker from "react-weekday-picker";

let drugSelect = React.createRef();
let startDose = React.createRef();
let endDose = React.createRef();
let unitSelect = React.createRef();
let startDate = React.createRef();
let endDate = React.createRef();
let time = React.createRef();
let dayOfWeekSelect = React.createRef();
export default function AddDosePage(match) {
    let drugId = -1;
    let unitId = -1;
    let time = -1;
    let startDose = -1;
    let endDose = -1;
    let startDate = -1;
    let endDate = -1;
    let daysOfWeek = -1;
    console.log(match); 
    var modifiers = {
        'weekend': function(weekday) {
          return weekday == 0 || weekday == 6;
        }
      };
    
      /*
  return (
      
    <main>
        <form className="d-flex flex-column align-items-center">
            <label>Drug Name</label>
            <DrugSelect hasAddButton={true} ref={drugSelect} onChange={(option)=>{drugId=option.optionId}}></DrugSelect>;
            <label className="d-flex justify-content-center">Start Dose</label>
            <input className="form-control" type="number" id="start-dose" ref={startDose}></input>
            <label className="d-flex justify-content-center">End Dose</label>
            <input className="form-control" type="number" id="end-dose" ref={endDose}></input>
            <label id="units">Units</label>
            <UnitSelect hasAddButton={true} ref={unitSelect} onChange={(option)=>{unitId=option.optionId}}></UnitSelect>
      
            <input type="time" className="form-control" id="time" ref={time}></input>
            <button className="btn btn-primary" id="submit" type="button" onClick={submitSchedule}>Submit</button>
        </form>
    </main>
  );
  */
  function submitSchedule() {
    //DayOfWeekSelect
    Schedules.Store(Schedules.FormatSchedule(drugId, startDose, endDose, unitId, startDate, endDate, new Date(time).getTime(), (Array.isArray(daysOfWeek)?daysOfWeek:[daysOfWeek]).map(day=>day.Value), -1));
  }

  return (    
    <div>
      <div style={{position: "fixed", display: "flex", flexDirection: "column", alignContent: "center"}}>
          <h1 style={{paddingLeft: "50px", marginBottom:"0px"}}>Create</h1>
          <h2 style={{paddingLeft: "50px"}}>Schedule</h2>
          <img src={scheduleIcon} height="400vw" style={{position:"absolute", top:"150px"}}/>
      </div>
      <MultiStepForm onSubmit={submitSchedule}>
          <FormDrugSelect onChange={(value)=>{drugId = value}}></FormDrugSelect>
          <FormDateRange onChange={(value)=>{startDate = value.startDate; endDate = value.endDate; daysOfWeek = value.daysOfWeek}}></FormDateRange>
          <FormUnitSelect onChange={(value)=>{unitId = value}}></FormUnitSelect>
          <FormTimeSelect onChange={(value)=>{time = value}}></FormTimeSelect>
      </MultiStepForm>
    </div>
  );
}