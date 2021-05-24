
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";
//import "./Home.css";
import { AppContext } from "./App"
import {HapticComponent} from "./assets/react_components/HapticComponent.jsx"
import { DrugChart } from "./assets/react_components/ChartComponents.jsx";

import addBoxIcon from "./assets/img/add_box_white_24dp.svg";
import { DoseCardDisplay } from "./assets/react_components/DoseCard.jsx";
import substLogoRed from "./assets/img/SPill.svg"
import { ScheduleSelect } from "./assets/js/SearchSelect.js"
import {Schedules} from "./assets/js/Schedules.js"
import { Doses } from "./assets/js/Doses";
// import { AddOrb } from "./assets/react_components/AddOrb";

const HomeMain = styled.main`
  /*
    display: flex;
    width: 500px;
    flex-direction: column;
    align-items: center;
    */

  .card-title {
    font-size: 1.4rem;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .card-subtitle {
    font-size: 1.2rem;
    color: white;
    margin-top: 50px;
    margin-bottom: 25px;
    text-align: left;
    font-weight: bold;
    align-self: start;
  }

  button {
    background-color: black;
    padding: 8px 13px 8px 13px;
    outline: none;
    border: none;
    border-radius: 5px;
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
        <span class="card-title">
        <img style={{width: "40px", position: "absolute", left: "25px"}}src={substLogoRed} />Today</span>
        <span class="card-subtitle">Current doses</span>
        <DoseCardDisplay doses={Doses.GetTodaysTakenDoses()}></DoseCardDisplay>
        <Link to="add_dose">
          <HapticComponent><button style={{color: "white", width: "75px"}}><img src={addBoxIcon} width="100%" height="100%"/>Dose</button></HapticComponent>
        </Link>
        <span class="card-subtitle">Upcoming doses</span>
        <DoseCardDisplay doses={Doses.GetTodaysUpcomingDoses()}></DoseCardDisplay>
        
      </div>

      <div class="card">
        <span class="card-title">Your Progress</span>
        <DrugChart></DrugChart> 
      </div>
    </HomeMain>
  );
}
