import React from "react";
import { Link } from 'react-router-dom'
import './DrugInfo.css';
import {DoseCardDisplay} from './assets/react_components/DoseCard.jsx';
import { EditText, EditTextarea } from 'react-edit-text';
import { Drugs } from "./assets/js/Drugs";
import { Doses } from "./assets/js/Doses";

export default function DrugInfo(match) {
    let drugId = match.match.params.id;
    let drug = Drugs.FindDrugWithID(drugId);
  return (
    <main id="drug-info-page">
        <h1>Drug Name</h1>
        <h1 id="drug-name">{drug.drugName}</h1>
        <div className="card">
            <h1>Description</h1>
            <EditTextarea placeholder={drug.description==''?'Add a description' : drug.description} onSave={(evt)=>{Drugs.ChangeDescription(drugId, evt.value)}}/>
        </div>
        <section className="dose-cards-section">
            <div className="card">
                <h1>Recent Doses</h1>
                <DoseCardDisplay doses={Doses.GetDosesCategorizedByDrug().get(drugId)}></DoseCardDisplay>
            </div>
            <div className="card">
                <h1>Missed Doses</h1>
                <p></p>
            </div>
        </section>
        <div className="card">
            <h1>Progress</h1>
            <p></p>
        </div>
    </main>
  );
}
