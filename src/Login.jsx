import React, { useState, useRef, useEffect } from "react"
import emailIcon from "./assets/email.svg"
import lockIcon from "./assets/lock.svg"
import "./Login.css"

function Login() {
  return (
    <main>
         <header>
            <h1>Welcome</h1>
            <h1>back.</h1>
        </header>
        
        <section id="authSection">
            <div id="authForm">
                <div class="authItem">
                    <label for="email" class="inputLabel">Email</label>
                    <div class="inputGrid">
                        <img src={emailIcon} alt="email_icon" />
                        <input type="email" placeholder="name@email.com" />
                    </div>
                </div>
                <div class="authItem">
                    <label for="password" class="inputLabel">Password</label>
                    <div class="inputGrid">
                        <img src={lockIcon} alt="lock_icon"/>
                        <input type="password" placeholder="●●●●●●●●" />
                    </div>
                </div>
                
                <div id="passwordOptions">
                    <div id="rememberOption">
                        <input id="rememberToggle" name="rememberToggle" type="checkbox" />
                        <label for="rememberToggle">Remember Password?</label>
                    </div>
                    <a id="forgotPassword" href="#forgotPassword">Forgot Password?</a>
                </div>
                
            </div>
            <div id="actionContainer">
                <button id="actionButton">Next</button>
            </div>
        </section>
    </main>
  );
}

export default Login;
