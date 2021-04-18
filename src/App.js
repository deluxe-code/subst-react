import React, { useState, useRef, useEffect } from "react"
import Navbar from "./Navbar"
function App() {
  let vibe = "yes";
  return (
    <>
    <Navbar />
    <div>{vibe}</div>
    </>
  );
}

export default App;
