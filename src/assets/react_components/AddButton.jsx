
import React from "react";
import { AddButtonOptionsDisplay } from "./AddButtonOptionsDisplay";

import addBoxIcon from '../img/add_box_white_24dp.svg'
export class AddButton extends React.Component {
    state = {
        opened: false
    }
    render() {
        return(
        <div className="nav-item">
            <button className={"add-button "+(this.state.opened?"opened" : "closed")} onBlur={()=>{this.setState({opened:false})}} onClick={()=>{this.setState({opened:!this.state.opened})}} >
                <img src={addBoxIcon} className="add-box-icon nav-icon"/>
            </button>
            <AddButtonOptionsDisplay opened={this.state.opened}></AddButtonOptionsDisplay>
        </div>
        )
    }
}