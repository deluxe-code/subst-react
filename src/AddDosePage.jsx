import React from "react";
import { Link } from 'react-router-dom'
import './DrugInfo.css';
import {DoseCardDisplay} from './assets/react_components/DoseCard.jsx';
import {Units} from './assets/js/Units.js';
import {SearchSelect, UnitSelect, DrugSelect} from './assets/js/SearchSelect.js';
import { Doses } from "./assets/js/Doses";

let drugSelect = React.createRef();
let amount = React.createRef();
let unitSelect = React.createRef();
let time = React.createRef();
export default function AddDosePage(match) {
    console.log(match); 

  return (
      
    <main>
        <form className="d-flex flex-column align-items-center">
            <label>Drug Name</label>
            <DrugSelect hasAddButton={true} ref={drugSelect} ></DrugSelect>;
            <label className="d-flex justify-content-center">Amount</label>
            <input className="form-control" type="number" id="dose-amount" ref={amount}></input>
            <label id="units">Units</label>
            <UnitSelect hasAddButton={true} ref={unitSelect}></UnitSelect>
            <div className="d-flex flex-row justify-content-center" id="date-range">
                <div></div>
            </div><label>Time</label>
            <input type="datetime-local" className="form-control" id="time" ref={time}></input>
            <button className="btn btn-primary" id="submit" type="button" onClick={submitDose}>Submit</button>
        </form>
    </main>
  );
}
function submitDose() {
    console.log(amount.current.value);
    window.location.pathname = '/'
    Doses.Store(Doses.FormatDose(drugSelect.current.GetSelectedId(), amount.current.value, unitSelect.current.GetSelectedId(), -1, new Date(time.current.value).getTime()));
}
 