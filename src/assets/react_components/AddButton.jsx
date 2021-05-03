
import React, { useState, useRef, useEffect } from "react"
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AddButtonOptionsDisplay } from "./AddButtonOptionsDisplay";

import addBoxIcon from '../img/add_box_white_24dp.svg'


export default function AddButton() {
    let addBtn = useRef();
    let optionsBlock = useRef();
    let [openStatus, setOpenStatus] = useState(false);

    useEffect(() => {
        console.log("button intialized or pressed");
        openStatus ? openOptionsMenu() : closeOptionsMenu();
    }, [openStatus])

    function openOptionsMenu() {

    }

    function closeOptionsMenu() {

    }
    const AddMenu = () => {
        return (
            <div id="optionsBlock" ref={optionsBlock}>
            <Link to="/create_schedule">
                {/* <img></img> */}
                <span>Create Schedule</span>
            </Link>
            <Link to="/add_dose">
                <span>Add Dose</span>
            </Link>
            </div>
        )
    }
    return (
        <>
            {openStatus ? <AddMenu/> : null}
            <div className="nav-item">
            {/* <button className={"add-button "+(this.state.opened?"opened" : "closed")} onBlur={()=>{this.setState({opened:false})}} onClick={()=>{this.setState({opened:!this.state.opened})}} >
                <img src={addBoxIcon} className="add-box-icon nav-icon"/>
            </button> */}


            <button ref={addBtn} onClick={() => setOpenStatus(!openStatus)}>
                <img src={addBoxIcon} className="add-box-icon nav-icon"/> 
            </button>
            {/* <AddButtonOptionsDisplay opened={this.state.opened}></AddButtonOptionsDisplay> */}
        </div>
        </>

    )
}
