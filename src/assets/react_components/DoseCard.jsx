
'use strict';
import React, { createRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import {Drugs} from  '../js/Drugs.js';
import {Schedules} from '../js/Schedules.js'
import {Units} from '../js/Units.js'
import {Doses} from '../js/Doses.js';
import img from '../img/schedule_black_24dp.svg';
import { EditText, EditTextarea } from 'react-edit-text';
export class DoseCardDisplay extends React.Component {
    state = {
        doses: Doses.GetTodaysDoses()
    };
    constructor(props){
        super(props);
        if(this.props.doses!=null) {
            this.state.doses = this.props.doses;
        }
    }
    render() {  
      return <div className="dose-cards-section">{this.state.doses.map(dose=><DoseCard key={dose.id} dose={dose} refreshDisplay={(p)=>{this.setState({doses:p})}}></DoseCard>)}</div>;

    }
}

class DoseCard extends React.Component {
    state = {
        transitionSpeed: "0.1s",
        isOpened: false
    };
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
      }
    
      onClick() {
          this.setState({isOpened: !this.state.isOpened});
          window.navigator.vibrate(10);
        //this.state.isOpened = !this.state.isOpened;
    }
    
    render() {
        //Drugs.FindDrugWithID(this.props.dose.drugID).drugName
        this.state.takenTextColor = this.props.dose.dateTimeTakenMilis<0 ? "white" : "grey";
        return <div className={"schedule-card"}>
            <button id="body" className="dose-card-body" onClick={this.onClick}>
                <div style={{display:"flex", alignItems: "center"}}>
                    <img id="icon" src={img} className="schedule-card-icon"></img>
                    <h1 id="drugName" className="schedule-card-title">
                        {Drugs.FindDrugWithID(this.props.dose.drugID).drugName}
                    </h1>
                </div>
                <h1 id="timeDisplay" className="schedule-card-time" style={{color:this.state.takenTextColor}}>
                    <ElapsedTimeText dateTimeTakenMilis={this.props.dose.dateTimeTakenMilis}></ElapsedTimeText>
                </h1>
            </button>
            <DoseCardDropdown className={this.state.isOpened?"dose-card-dropdown opened":"dose-card-dropdown closed"} dose={this.props.dose} refreshDisplay={this.props.refreshDisplay}></DoseCardDropdown>
        </div>
    }

}

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
            <div>
                <button id="schedule-card-take-button" 
                    onClick={()=>{
                        Doses.SetTimer(new Date().getTime(), this.props.dose.id); this.props.refreshDisplay(Doses.GetTodaysDoses());
                    }}
                >Take Dose</button>
                <Link to={scheduleInfoLink}><button type="button">Schedule info</button></Link>
            </div>;
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