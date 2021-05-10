import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";
import pillIcon from "./assets/img/PillIconNew.png";
import "./LandingPage.css"
let features = ["Plan out a tapering schedule", "Share your journey with others", "Feature 3"];
function Carousel(props) {
  let { children } = props;

  return (
    <div id="Carousel">
      {children.map((listItem, index) => (
        <div key={index}>{listItem}</div>
      ))}
    </div>
  );
}

const PillsDecoration = styled.div`
  background-color: gray;
  width: 80%;
  height: 200px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  > img {
  }
`;

function LoginButton(props) {
  let { onClick } = props;
  return <button>Login</button>;
}

export default function LandingPage() {
  return (
    <main id="LandingContent">
      <PillsDecoration>
        <img style={{ width: "60px", transform: "rotate(40deg)"}} src={pillIcon} alt="" />
        <img style={{ width: "40px", transform: "rotate(10deg)" }} src={pillIcon} alt="" />
        <img style={{ grid_area: "3", width: "30px", transform: "rotate(-40deg)" }} src={pillIcon} alt="" />
      </PillsDecoration>
      <h1>Subst</h1>
      <h2>A better way to manage drug use.</h2>
      <Carousel>{features}</Carousel>
      <LoginButton />
    </main>
  );
}
