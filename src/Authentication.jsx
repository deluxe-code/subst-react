import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import emailIcon from "./assets/email.svg";
import lockIcon from "./assets/lock.svg";
import firebase from "firebase";
import styled from "styled-components";
// import "./Authentication.css";

const StyledAuthentication = styled.main`
  display: flex;
  flex-direction: column;
  background-color: black;
  header {
    padding: 20px;
    font-size: 1rem;
    color: white;
    font-weight: 600;
    align-self: flex-start;
  }
  #authSection {
    border-radius: 40px;
    width: 100%;
    max-width: 300px;
  }
  #authForm {
    margin-bottom: 50px;
  }
  .authItem {
    margin-bottom: 15px;
  }
  .authItem label {
    margin-left: 30px;
    font-size: 1.1em;
    font-weight: 500;
    color: white;
  }
  .authItem .inputGrid {
    margin-top: 8px;
    width: 100%;
    height: 40px;
    display: grid;
    grid-template-columns: 60px auto;
    position: relative;
  }
  .inputGrid img {
    margin: auto;
    grid-column: 1;
    z-index: 1;
  }
  .inputGrid input {
    position: absolute;
    width: 100%;
    height: inherit;
    background-color:#bed7eebf;
    border-radius: 1000px;
    grid-column: span 2;
    z-index: 0;
    font-weight: 500;
    padding-left: calc(60px/1.1);
    box-sizing: border-box;
  }
  .inputGrid input:focus::placeholder {
    color: transparent;
  }
  #passwordOptions {
    font-size: .8em;
}
#rememberOption {
    width: max-content;
    float: left;
}
#rememberToggle {
    transform: scale(1.2);
}
#forgotPassword {
    float: right;
}
#actionContainer {
    padding: 20px 0px 0px 0px;
}
#actionContainer #actionButton {
    background-color: teal;
    color: #FAFAFA;
    display: block;
    margin: 0 auto 0 auto;
    border-radius: 1000px;
    padding:  10px 25px 10px 25px;
    font-size: 1.25em;
}
`;

function Authentication() {
  const emailEntry = useRef();
  const passwordEntry = useRef();
  let history = useHistory();
  function tryAuthenticating() {
    trySignup();
    tryLogin();
    emailEntry.current.value = "";
    passwordEntry.current.value = "";
  }
  function trySignup(e) {
    let email = emailEntry.current.value;
    let password = passwordEntry.current.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(`${user.email} has successfully signed up.`);
        initializeUser();
        history.push("/");
        // ...
      })
      .catch((error) => {
        console.error("User is already signed up!");
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
  function tryLogin() {
    const email = emailEntry.current.value;
    const password = passwordEntry.current.value;
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(`${user.email} has signed in successfully.`);
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    // Clear input fields

    // const attemptResponse = fetch('http://192.168.0.26:3000/auth/tryLogin', {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //       'Content-Type': 'application/json'
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     body: JSON.stringify({email: email, password: password}) // body data type must match "Content-Type" header
    //   }).then(unauthorized => unauthorized.json()).then(unauthorized => {
    //       console.log("unauthorized = " + unauthorized);
    //       if (unauthorized) {
    //           firebaseApp.auth().signInWithEmailAndPassword(email,password);
    //           localStorage.setItem('account', unauthorized)
    //       }
    //   });
  }
  function initializeUser() {
    const db = firebase.firestore();
    db.collection("users").add({
      email: firebase.auth().currentUser.email,
      userID: uuidv4(),
    });
  }
  return (
    <StyledAuthentication id="LoginMain">
      <header>
        <h1>Sign in here.</h1>
        {/* <h1>account</h1> */}
      </header>
      <section id="authSection">
        <div id="authForm">
          <div class="authItem">
            <label for="email" class="inputLabel">
              Email
            </label>
            <div class="inputGrid">
              <img src={emailIcon} alt="email_icon" />
              <input
                id="emailInput"
                ref={emailEntry}
                type="email"
                placeholder="name@email.com"
              />
            </div>
          </div>
          <div class="authItem">
            <label for="password" class="inputLabel">
              Password
            </label>
            <div class="inputGrid">
              <img src={lockIcon} alt="lock_icon" />
              <input
                id="passInput"
                ref={passwordEntry}
                type="password"
                placeholder="●●●●●●●●"
              />
            </div>
          </div>
          {!firebase.auth().currentUser && (
            <div id="passwordOptions">
              <div id="rememberOption">
                <input
                  id="rememberToggle"
                  name="rememberToggle"
                  type="checkbox"
                />
                <label for="rememberToggle">Remember Password?</label>
              </div>
              <a id="forgotPassword" href="#forgotPassword">
                Forgot Password?
              </a>
            </div>
          )}
        </div>
        <div id="actionContainer">
          <button id="actionButton" onClick={tryAuthenticating}>
            Next
          </button>
        </div>
      </section>
    </StyledAuthentication>
  );
}

export default Authentication;
