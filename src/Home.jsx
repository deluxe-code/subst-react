import React from "react";
import { Link } from 'react-router-dom'
import './Home.css';
import {DoseCardDisplay} from './assets/react_components/DoseCard.jsx';
export default function Home(match) {
    console.log(match);
  return (
    <main>
        <div class="card">
            <span class="card-title">Today</span>
            <span class="card-subtitle">Today's doses</span>
            <DoseCardDisplay></DoseCardDisplay>
            <a href="add_dose"><button>Add Dose</button></a>
        </div>

        <div class="card">
            <span class="card-title">Your Progress</span>
            <canvas data-bss-chart="{&quot;type&quot;:&quot;line&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;January&quot;,&quot;February&quot;,&quot;March&quot;,&quot;April&quot;,&quot;May&quot;,&quot;June&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;Dataset 0&quot;,&quot;fill&quot;:true,&quot;data&quot;:[]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{}}}"></canvas>        </div>
    </main>
  );
}
