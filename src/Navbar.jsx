import React, { useState, useRef, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom'
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
  
  return (
    <nav>
      <Link to="/">
      <a href="#">Home</a>
      </Link>
      <Link to="/login">
      <a href="#">Login</a>
      </Link>
      <Link to="/signup">
      <a href="#">Signup</a>
      </Link>
      <Link to="/account">
      <a href="#">Account</a>
      </Link>
      <div ref={authLabel}></div>
      <Link to="/create_schedule">
      <a href="#">Create Schedule</a>
      </Link>
    </nav>
  );
}
