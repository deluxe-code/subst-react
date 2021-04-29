
'use strict';
import React, { createRef } from "react";
import { Link } from 'react-router-dom'
import {Drugs} from  '../js/Drugs.js';
import {Schedules} from '../js/Schedules.js'
import {Units} from '../js/Units.js'
import {Doses} from '../js/Doses.js';
import img from '../img/schedule_white_24dp.svg';
const e = React.createElement;
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
      return <div>{this.state.doses.map(dose=><DoseCard key={dose.id} dose={dose} refreshDisplay={(p)=>{this.setState({doses:p})}}></DoseCard>)}</div>;

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
        //this.state.isOpened = !this.state.isOpened;
    }
    
    render() {
        //Drugs.FindDrugWithID(this.props.dose.drugID).drugName
        console.log(this.props.dose);
        this.state.takenTextColor = this.props.dose.dateTimeTakenMilis<0 ? "white" : "grey";
        return <div className={"schedule-card"}>
            <button id="body" className="dose-card-body" onClick={this.onClick}>
                <img id="icon" src={img} className="schedule-card-icon"></img>
                <h1 id="drugName" className="schedule-card-title"> {Drugs.FindDrugWithID(this.props.dose.drugID).drugName}</h1>
                <h1 id="timeDisplay" className="schedule-card-time" style={{color:this.state.takenTextColor}}>&nbsp; -  {this.props.dose.dateTimeTakenMilis<0 ? this.getFormatedTime(Schedules.FindScheduleWithId(this.props.dose.scheduleId).time) : "Took at - " + this.getFormatedTime(this.props.dose.dateTimeTakenMilis) + ""}</h1>
            </button>
            <DoseCardDropdown className={this.state.isOpened?"dose-card-dropdown opened":"dose-card-dropdown closed"} dose={this.props.dose} refreshDisplay={this.props.refreshDisplay}></DoseCardDropdown>
        </div>
    }
    getFormatedTime(timeMilis) {
        let date = new Date(timeMilis);
        return date.toLocaleTimeString('en-US').split(':')[0]+ ":" + date.toLocaleTimeString('en-US').split(':')[1];
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
        let drugInfoLink = `drug_info/${this.props.dose.drugID}`;
        let scheduleInfoLink = `schedule_info/${this.props.dose.scheduleId}`;
        if(!Doses.HasTaken(this.props.dose.id)) {
            this.state.bodyChildren = [<button id="schedule-card-take-button" onClick={()=>{Doses.SetTimer(new Date().getTime(), this.props.dose.id); this.props.refreshDisplay(Doses.GetTodaysDoses());}}>Take Dose</button>,
        <Link to={scheduleInfoLink}><button type="button">Schedule info</button></Link>];
        } else {
            this.state.bodyChildren = [<h1>You took {this.props.dose.doseAmount} {Units.GetElementWithId(this.props.dose.doseType).unitName}</h1>,
                                    <Link to={drugInfoLink}>
                                        <button type="button">Drug Info</button>
                                    </Link>,
                                    <h1>{this.state.time}</h1>,
                                    <h2>"{this.props.dose.experience}" - User4389</h2>,
                                    <input type="text" placeholder="Note your experience." ref={this.state.experienceRef} onChange={()=>{Doses.SetExperience(this.state.experienceRef.current.value, this.props.dose.id)}}></input>
                                    ,<button onClick={()=>{Doses.RemoveDose(this.props.dose.id); this.setState({removed: true});this.props.refreshDisplay(Doses.GetTodaysDoses());}}>remove</button>];
        }
        return(
            <div className={this.props.className}>{this.state.bodyChildren}</div>
        );
    }

    componentDidMount() {
        this.setTimerValue();
        this.myInterval = setInterval(() => {
            this.setTimerValue();
        }, 1000)
    }
    setTimerValue() {
        let currentTimeMilis = new Date().getTime();
        let timeDiff = currentTimeMilis - this.props.dose.dateTimeTakenMilis;
        this.setState({time:this.formatTime(timeDiff)});
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
    formatTime(time) {
        let dateObj = new Date(time);
        let hours = dateObj.getUTCHours();
        let minutes = dateObj.getUTCMinutes();
        let seconds = dateObj.getSeconds();
        let timeString = hours.toString().padStart(2, '0') + ':' + 
            minutes.toString().padStart(2, '0') + ':' + 
            seconds.toString().padStart(2, '0');
        return timeString;
    }
}