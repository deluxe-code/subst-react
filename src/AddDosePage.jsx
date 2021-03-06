import React from "react";
import { Link } from 'react-router-dom'
import './DrugInfo.css';
import {DoseCardDisplay} from './assets/react_components/DoseCard.jsx';
import {Units} from './assets/js/Units.js';
import {SearchSelect, UnitSelect, DrugSelect} from './assets/js/SearchSelect.js';
import { Doses } from "./assets/js/Doses";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import {MultiStepForm, FormDrugSelect, FormUnitSelect, FormDoseAmount, FormTimeSelect} from "./MultiStepForm.jsx"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import styled from 'styled-components';
import { checkPropTypes } from "prop-types";
import doseIcon from './assets/img/medication_white_24dp.svg';
/*
let drugSelect = React.createRef();
let amount = React.createRef();
let unitSelect = React.createRef();
let time = React.createRef();
*/
export default function AddDosePage(match) {
    console.log(match);
    let drugId = -1;
    let amount = -1;
    let unitId = -1;
    let time = -1;
  return (
    <div>
        <div style={{position: "fixed", display: "flex", flexDirection: "column", alignContent: "center"}}>
            <h1 style={{paddingLeft: "50px", marginBottom:"0px", color: "white"}}>Add</h1>
            <h2 style={{paddingLeft: "50px"}}>Dose</h2>
            <img src={doseIcon} height="400vw" style={{position:"absolute", top:"150px"}}/>
        </div>
        <MultiStepForm onSubmit={()=>{submitDose(); console.log(drugId)}}>
            <FormDrugSelect onChange={(value)=>{drugId = value; console.log("new" + drugId)} }></FormDrugSelect>
            <FormDoseAmount onChange={(value)=>{amount = value}}></FormDoseAmount>
            <FormTimeSelect onChange={(value)=>{time = value}}></FormTimeSelect>
        </MultiStepForm>
    </div>
  );
  function submitDose() {
    Doses.Store(Doses.FormatDose(drugId, amount, -1, new Date(time).getTime()));
  }
}