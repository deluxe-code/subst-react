import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";
//import "./Home.css";
import { AppContext } from "./App"
import {HapticComponent} from "./assets/react_components/HapticComponent.jsx"
import { DrugChart } from "./assets/react_components/ChartComponents.jsx";

import { DoseCardDisplay } from "./assets/react_components/DoseCard.jsx";
// import { AddOrb } from "./assets/react_components/AddOrb";

const HomeMain = styled.main`
  /*
    display: flex;
    width: 500px;
    flex-direction: column;
    align-items: center;
    */
  .card * {
    margin-top: 5px;
  }

  .card-title {
    font-size: 1.4rem;
  }

  .card-subtitle {
    font-size: 0.8rem;
    color: #6c757d;
  }

  button {
    background-color: black;
    padding: 8px 13px 8px 13px;
    outline: none;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    transition: 0.15s;
  }
  button:hover {
    background-color: #0069d9;
  }

  button:hover,
  a:hover {
    cursor: pointer;
  }
`;

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
    <HomeMain>
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
    </HomeMain>
  );
}
