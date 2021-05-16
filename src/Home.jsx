import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";
import "./Home.css";
import { AppContext } from "./App"
import {HapticComponent} from "./assets/react_components/HapticComponent.jsx"
import { DrugChart } from "./assets/react_components/ChartComponents.jsx";

import { DoseCardDisplay } from "./assets/react_components/DoseCard.jsx";
// import { AddOrb } from "./assets/react_components/AddOrb";
export default function Home(match) {
  let [userEmail, setEmail] = useState("");
  let isAuthorized = useContext(AppContext);
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

  return (
    <main>
      <div class="card">
        <span class="card-title">Today</span>
        <span class="card-subtitle">Today's doses</span>
        <DoseCardDisplay></DoseCardDisplay>
        <Link to="add_dose">
          <HapticComponent><button>Add Dose</button></HapticComponent>
        </Link>
      </div>

      <div class="card">
        <span class="card-title">Your Progress</span>
        <DrugChart></DrugChart>
      </div>
    </main>
  );
}
