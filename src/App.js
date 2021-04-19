import React, { useState, useRef, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from "./Navbar.jsx"
import Home from "./Home.jsx"
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
// import Settings from "./Settings.jsx"
import "./App.css";

function App() {
  let vibe = "yes";
  return (
    <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
    </Router>
  );
}

export default App;