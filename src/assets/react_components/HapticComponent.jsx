import React, { useState, useRef, useEffect, useContext } from "react";
export function HapticComponent(props) {
    return (<div onClick={()=>{window.navigator.vibrate(10)}}>{props.children}</div>);
}
