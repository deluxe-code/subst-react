
'use strict';
import React, { createRef, useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import {Drugs} from  '../js/Drugs.js';
import {Schedules} from '../js/Schedules.js'
import {Units} from '../js/Units.js'
import {Doses} from '../js/Doses.js';
import img from '../img/schedule_black_24dp.svg';
import { EditText, EditTextarea } from 'react-edit-text';
import styled from 'styled-components'
/*

.schedule-card-time {
    font-size: 1em;
    margin: 0px;
    text-align: center;
}

.schedule-card-title {
    font-size: 1.5rem;
    text-align: center;
}
*/

export function DoseCardDisplay(props) {
    const [doses, setDoses] = useState(props.doses||Doses.GetTodaysDoses());
    const StyledDoseCardDisplay = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 98%;
        margin-left: 30px;
    `;
    return <StyledDoseCardDisplay>{doses.map(dose=><DoseCard key={dose.id} dose={dose} refreshDisplay={(value)=>{setDoses(value)}}></DoseCard>)}</StyledDoseCardDisplay>;
}

export function DoseCard(props) {
    const [isOpened, setIsOpened] = useState(false);
    const [takenTextColor, setTakenTextColor] = useState("white");
    let transitionSpeed = "0.1s";
    function onClick() {
        setIsOpened(!isOpened);
        //this.state.isOpened = !this.state.isOpened;
    }
    useEffect(()=>{
        setTakenTextColor(props.dose.dateTimeTakenMilis<0 ? "white" : "grey");
    })
    return <div className={"schedule-card"}>
        <button id="body" className="dose-card-body" onClick={onClick}>
            <div style={{display:"flex", alignItems: "center"}}>
                <img id="icon" src={img} className="schedule-card-icon"></img>
                <h1 id="drugName" className="schedule-card-title">
                    {Drugs.FindDrugWithID(props.dose.drugID).drugName}
                </h1>
            </div>
            <h1 id="timeDisplay" className="schedule-card-time" style={{color:takenTextColor}}>
                    {props.dose.dateTimeTakenMilis>0?<ElapsedTimeText dateTimeTakenMilis={props.dose.dateTimeTakenMilis}></ElapsedTimeText>:Schedules.FindScheduleWithId(props.dose.scheduleId).time }
            </h1>
        </button>
        <DoseCardDropdown className={isOpened?"dose-card-dropdown opened":"dose-card-dropdown closed"} dose={props.dose} refreshDisplay={props.refreshDisplay}></DoseCardDropdown>
    </div>

}

const StyledDropdown = styled.div`
    color: "white";
    button { 
        color: white;
    }
`;
class DoseCardDropdown extends React.Component {
    
    state = {
        removed: false,
        experienceRef: createRef()
    }
    constructor(props) {
        super(props);
    }
    render() {
        let drugInfoLink = `/drug_info/${this.props.dose.drugID}`;
        let scheduleInfoLink = `schedule_info/${this.props.dose.scheduleId}`;
        if(!Doses.HasTaken(this.props.dose.id)) {
            this.state.currentBody = 
            <StyledDropdown>
                <button id="schedule-card-take-button" 
                    onClick={()=>{
                        console.log(this.props.dose)
                        OpenAmountDialog();
                    }}
                >Take Dose</button>
                <Link to={scheduleInfoLink}><button type="button">Schedule info</button></Link>
            </StyledDropdown>;
        } else {
            this.state.currentBody = 
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap", justifyContent: "center"}}>
                    <div className="dose-card-section-card">
                        <Link to={drugInfoLink}>
                            <button type="button" style={{backgroundColor: "#EF4D4D", color: "white",  width: "100%", borderRadius: "20px"}}><p className="highlighted" style={{color: "black"}}>{Drugs.FindDrugWithID(this.props.dose.drugID).drugName}</p> Info</button>
                        </Link>
                    </div>
                    <div className="dose-card-section-card">
                        <h1>You took <p className="highlighted">{this.props.dose.doseAmount}</p> {Units.GetElementWithId(Drugs.FindDrugWithID(this.props.dose.drugID).unitId).unitName}</h1>
                    </div>
                    <div className="dose-card-section-card">
                        <TimeTakenDisplay {...this.props}></TimeTakenDisplay>
                    </div>
                    <div className="dose-card-section-card">
                        <EditTextarea className="edit-text-area" placeholder={this.props.dose.experience==''?'Add a description' : this.props.dose.experience} onSave={(evt)=>{Doses.SetExperience(evt.value, this.props.dose.id)}}/>
                        <h2 style={{textAlign: "right"}}> - User4389</h2>
                    </div>
                    <button style={{color: "white"}}onClick={()=>{Doses.RemoveDose(this.props.dose.id); this.setState({removed: true});this.props.refreshDisplay(Doses.GetTodaysDoses());}}>remove</button>
                </div>
        }
        return(
            <div className={this.props.className}>{this.state.currentBody}</div>
        );
    }
}

function OpenAmountDialog(props) {
    const StyledBox = styled.div`
        position: static;
        left: 50%;
    `;
    Doses.SetTimer(new Date().getTime(), this.props.dose.id); 
    return <StyledBox></StyledBox>
}

function ElapsedTimeText(props) {
    const [time, setTime] = useState(0);
    useEffect(()=>{
        setTimerValue();
        const timeInterval = setInterval(() => {
            setTimerValue();
        }, 1000)
    })
    function setTimerValue() {
        let currentTimeMilis = new Date().getTime();
        let timeDiff = currentTimeMilis - props.dateTimeTakenMilis;
        setTime(formatTime(timeDiff));
    }
    function formatTime(time) {
        let dateObj = new Date(time);
        let hours = dateObj.getUTCHours();
        let minutes = dateObj.getUTCMinutes();
        let seconds = dateObj.getSeconds();
        let timeString = hours.toString().padStart(2, '0') + ':' + 
            minutes.toString().padStart(2, '0') + ':' + 
            seconds.toString().padStart(2, '0');
        return timeString;
    }
    return(
       <h1 style={{fontSize: "1.2em"}}>{time} elapsed</h1>
    );
}

function TimeTakenDisplay(props) {
    
    function getFormatedTime(timeMilis) {
        let date = new Date(timeMilis);
        return date.toLocaleTimeString('en-US').split(':')[0]+ ":" + date.toLocaleTimeString('en-US').split(':')[1];
    }
    return <h1>{props.dose.dateTimeTakenMilis<0 ? "Scheduled for " + getFormatedTime(Schedules.FindScheduleWithId(props.dose.scheduleId).time) : "Took at "} <p className="highlighted">{getFormatedTime(props.dose.dateTimeTakenMilis)}</p></h1>
}