import React, { useState, useRef, useEffect } from "react"
import { Link } from 'react-router-dom'
import emailIcon from "./assets/email.svg"
import lockIcon from "./assets/lock.svg"


export default function Signup() {
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
                        <input id="emailInput" type="email" placeholder="name@email.com" />
                    </div>
                </div>
                <div class="authItem">
                    <label for="password" class="inputLabel">Password</label>
                    <div class="inputGrid">
                        <img src={lockIcon} alt="lock_icon" />
                        <input id="passInput" type="password" placeholder="●●●●●●●●" />
                    </div>
                </div>

            </div>
            <div id="actionContainer">
                <button id="actionButton">Next</button>
            </div>
        </section>
    </main>
  );
}
