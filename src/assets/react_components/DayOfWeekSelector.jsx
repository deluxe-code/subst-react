import React, {useState, useRef, useEffect} from "react";

export class DayOfWeekSelector extends React.Component {
    state = {
      days: [
        {
          Name: 'Su',
          Value: 0,
          Checked: false
        },
        {
          Name: 'Mo',
          Value: 1,
          Checked: false
        },
        {
          Name: 'Tu',
          Value: 2,
          Checked: false
        },
        {
          Name: 'We',
          Value: 3,
          Checked: false
        },
        {
          Name: 'Th',
          Value: 4,
          Checked: false
        },
        {
          Name: 'Fr',
          Value: 5,
          Checked: false
        },
        {
          Name: 'Sa',
          Value: 6,
          Checked: false
        }
      ]
    }
    render() {
      return (
      <div className="day-of-week-selector">
        <div>
          {this.state.days.map(day => <a className={day.Checked?"day-select checked" : "day-select unchecked"} onClick={()=>{day.Checked=!day.Checked; this.setState({days:this.state.days}); this.props.onChange(this.state.days)}}>{day.Name}</a>)}
        </div>
      </div>);
    }
  
    getChecked() {
      return this.state.days.filter(day=>day.Checked);
    }
  }