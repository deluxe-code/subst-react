import React, { useState, useRef, useEffect } from "react"
import { Link } from 'react-router-dom'
import emailIcon from "./assets/email.svg"
import lockIcon from "./assets/lock.svg"
import firebaseApp from "firebase";

export default function Signup() {
    const emailEntry = useRef();
    const passwordEntry = useRef();
    function trySignup(e) {
        let email = emailEntry.current.value;
        let password = passwordEntry.current.value;

        firebaseApp.auth().createUserWithEmailAndPassword(email,password).then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(`${user.email} has successfully signed up.`);
            // ...
          })
          .catch((error) => {
              console.error(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });
        console.log(email, password); 
        if (localStorage.getItem('account')) {
            console.log("You already have an account!");
        } else {
            localStorage.setItem('account', [email, password]);
        }
        

    }
    return (
<main>
        <header>
            <h1>Create your</h1>
            <h1>account</h1>
        </header>

        <section id="authSection">
            <div id="authForm">
                <div class="authItem">
                    <label for="email" class="inputLabel">Email</label>
                    <div class="inputGrid">
                        <img src={emailIcon} alt="email_icon" />
                        <input id="emailInput" ref={emailEntry} type="email" placeholder="name@email.com" />
                    </div>
                </div>
                <div class="authItem">
                    <label for="password" class="inputLabel">Password</label>
                    <div class="inputGrid">
                        <img src={lockIcon} alt="lock_icon" />
                        <input id="passInput" ref={passwordEntry} type="password" placeholder="●●●●●●●●" />
                    </div>
                </div>

            </div>
            <div id="actionContainer">
                <button id="actionButton" onClick={trySignup}>Next</button>
            </div>
        </section>
    </main>
  );
}
