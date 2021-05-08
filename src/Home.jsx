import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";
import './Home.css';

import {DoseCardDisplay} from './assets/react_components/DoseCard.jsx';
// import { AddOrb } from "./assets/react_components/AddOrb";
export default function Home(match) {
  
    let [userEmail, setEmail] = useState("");
    let [isAuthorized, setAuthorized] = useState(false);
    useEffect(
      function () {
        if (isAuthorized) {
          setEmail(firebase.auth().currentUser.email);
        } else {
          setEmail("");
        }
      },
      [isAuthorized]
    );
  
  
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    });
  return (
    <main>
    {isAuthorized && <> 
    <span style={{"color": "white"}}>{userEmail}</span>
    <button onClick={() => firebase.auth().signOut()}>Sign out</button>
    </>}
    
    
        <div class="card">
            <span class="card-title">Today</span>
            <span class="card-subtitle">Today's doses</span>
            <DoseCardDisplay></DoseCardDisplay>
            <a href="add_dose"><button>Add Dose</button></a>
        </div>

        <div class="card">
            <span class="card-title">Your Progress</span>
            <canvas data-bss-chart="{&quot;type&quot;:&quot;line&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;January&quot;,&quot;February&quot;,&quot;March&quot;,&quot;April&quot;,&quot;May&quot;,&quot;June&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;Dataset 0&quot;,&quot;fill&quot;:true,&quot;data&quot;:[]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{}}}"></canvas>        
        </div>
    </main>
  );
}
