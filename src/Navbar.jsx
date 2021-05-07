import React, { useState, useRef, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom'
import searchIcon from './assets/img/search_white_24dp.svg'
import homeIcon from './assets/img/home_white_24dp.svg'
import settingsIcon from './assets/img/settings_white_24dp.svg'
import statisticsIcon from './assets/img/analytics_white_24dp.svg'
import {AddButton} from './assets/react_components/AddButton.jsx'
import firebase from 'firebase';
export default function Navbar() {
  let authLabel = useRef();
    firebase.auth().onAuthStateChanged(function(user) {
      let currentStatus = authLabel.current;
      if (!user) {
        currentStatus.innerHTML = "Not signed in";
      } else {
        currentStatus.innerHTML = "Signed in";
      }
    });
  //<div ref={authLabel}></div>
  return (
    <nav onClick={()=>{window.navigator.vibrate(10)}}>
      <Link to="/">
        <img src={homeIcon} className="home-icon nav-icon"/>
      </Link>
      <AddButton></AddButton>
      <Link to="/statistics_page">
        <img src={statisticsIcon} className="statistics-icon nav-icon"/>
      </Link>
      <Link to="/settings">
        <img src={settingsIcon} className="settings-icon nav-icon"/>
      </Link>
    </nav>
  );
}
