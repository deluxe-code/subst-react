import React, { useState, useRef, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import firebase from "firebase";
import arrow_back from "./assets/img/arrow_back-24px.svg";
import smilecheems from "./assets/img/smilecheems.png";
import add_a_photo from "./assets/img/add_a_photo-24px.svg";
import person from "./assets/img/manage_accounts_white_24dp.svg";
import privacy from "./assets/img/lock_white_24dp.svg";
import layout from "./assets/img/dashboard_customize_white_24dp.svg";
import palette from "./assets/img/color_lens_white_24dp.svg";
import notifications from "./assets/img/notifications_white_24dp.svg";
import help_outline from "./assets/img/help_outline_white_24dp.svg";
import policy from "./assets/img/policy-24px.svg";
import gavel from "./assets/img/gavel_white_24dp.svg";
import bug_report from "./assets/img/bug_report_white_24dp.svg" ;
import styled from 'styled-components';
import { AppContext } from "./App";
const Main = styled.main`
  background-color: black;
  color: white;
`;
const SettingsContent = styled.div`

`;

const ProfileBlock = styled.div`

`;

const CategoryBlock = styled.div`
  a, a:link, a:visited, a:focus, a:hover, a:active{
    color: white;
    text-decoration:none; 
    cursor: crosshair;
  }
`;
export default function Settings() {
  let [isAuthorized, userEmail] = useContext(AppContext);

  return (
    <Main>
        {isAuthorized && (
      <>
        <span style={{ color: "white" }}>{userEmail}</span>
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </>
    )}
      <header>
        <img src={arrow_back} alt="back" />
        <h1>Settings</h1>
      </header>
      <SettingsContent>
        <ProfileBlock>
          <img
            src={smilecheems}
            id="profilePicture"
            alt="profile picture"
          />
          <div id="addProfilePictureContainer">
            <img
              src={add_a_photo}
              id="addProfilePicture"
              alt="new profile picture"
            />
          </div>
        </ProfileBlock>
        <CategoryBlock>
          <h2>ACCOUNT</h2>
          <a href="#" class="settingBlock">
            <img src={person} alt="person" />
            <p>Account Settings</p>
          </a>
          <a href="#" class="settingBlock">
            <img src={privacy} alt="privacy" />
            <p>privacy</p>
          </a>
          <a href="#" class="settingBlock">
            <img src={layout} alt="layout" />
            <p>Layout</p>
          </a>
        </CategoryBlock>
        <CategoryBlock>
          <h2>GENERAL</h2>
          <a href="#" class="settingBlock">
            <img src={palette} alt="palette" />
            <p>Appearance</p>
          </a>
          <a href="#" class="settingBlock">
            <img src={notifications} alt="bell" />
            <p>Notifications</p>
          </a>
          <a href="#" class="settingBlock">
            <img
              src={help_outline}
              alt="question mark"
            />
            <p>Help</p>
          </a>
        </CategoryBlock>
        <CategoryBlock>
          <h2>OTHER</h2>
          <a href="#" class="settingBlock">
            <img src={policy} alt="policy" />
            <p>Privacy Policy</p>
          </a>
          <a href="#" class="settingBlock">
            <img src={gavel} alt="gavel" />
            <p>Terms of Service</p>
          </a>
          <a href="#" class="settingBlock">
            <img src={bug_report}alt="bug" />
            <p>Report a Bug</p>
          </a>
        </CategoryBlock>
        <footer>
          <button>Sign Out</button>
        </footer>
      </SettingsContent>
    </Main>
  );
}
