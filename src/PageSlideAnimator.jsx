import React, {useState, useRef, useEffect} from "react";
import { Link, useHistory } from 'react-router-dom';
import {DayOfWeekSelector} from "./assets/react_components/DayOfWeekSelector.jsx"
import {SearchSelect, UnitSelect, DrugSelect} from './assets/js/SearchSelect.js';
import {HapticComponent} from "./assets/react_components/HapticComponent.jsx";
import styled from 'styled-components';
export function PageSlideAnimator(props) {
    let pages = props.children.length==null?[props.children]:props.children;
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    let currentPage = pages[currentPageIndex];
    let previousPage = pages[currentPageIndex-1];
    let loadNextPage = ()=>{
        setCurrentPageIndex(currentPageIndex+1);
        console.log(currentPage);
    };
    const MultiPageWrapper = styled.div`
        display: flex;
        flexDirection: row;
        position: fixed;
        bottom: 100px;
        width: 200vw;
        transform: translateX(-100vw);
        animation: swipeLeft 0.5s;
        @keyframes swipeLeft {
            from { transform: translateX(0vw); }
            to   { transform: translateX(-100vw); }
        }
    `;
    
    return(
    <MultiPageWrapper style={currentPageIndex==0?{animation: "swipeLeft 0s", transform: "translateX(-100vw)"}:{}}>
        {previousPage}
        {currentPage}
    </MultiPageWrapper>
    );
}