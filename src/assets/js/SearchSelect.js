import { Component } from 'react';
import {Drugs} from './Drugs.js'
import {Units} from './Units.js'
import React, { useState, useRef, useEffect } from "react"

export class SearchSelect extends Component{
    state = {
        hasAddButton: false,
        list:[],
        inputValue:'',
        selectedId: -1
    }
    constructor(props) {
        super(props);
        this.state.hasAddButton = this.props.hasAddButton || false;
        this.state.list = this.props.list || [];
        this.state.addButton = this.state.hasAddButton ? <button onClick={()=>{this.props.addClickFunction(this.state.inputValue)}}></button> : <div></div>
    }
    render() {
        return <div className="search-select">
            <input type="text" onInput={(evt)=>{this.onInput(evt.target.value)}}></input>
            <div id="options" className="search-select-option-container">
               {
                   this.state.list.filter(option=>option.title.toLowerCase().includes(this.state.inputValue.toLowerCase())).map(option => <button className={this.state.selectedId==option.optionId ? "search-select-option checked" : "search-select-option unchecked"} type="button" onClick={()=>{this.setState({selectedId:option.optionId})}}>{option.title}</button>)
               }
            </div>
            {this.state.addButton}
        </div>;
    }
    updateInputValue(evt) {
        this.setState({
          inputValue: evt.target.value
        });
      }
    onInput(searchInput) {
        let lowerCaseList = this.state.list.map(value=>value.title.toLowerCase());
        this.setState({inputValue:searchInput});
        if(lowerCaseList.includes(searchInput.toLowerCase())||searchInput=="") {
            this.setState({addButton: <button type="button" onClick={()=>{this.props.addClickFunction(this.state.inputValue)}}> Add {searchInput} to list</button>});
        } else {

            this.setState({addButton:<button type="button" onClick={()=>{this.props.addClickFunction(this.state.inputValue)}}> Add {searchInput} to list</button>});
        }
    }
    GetSelectedId() {
        return this.state.selectedId;
    }
}

export class FormattedOption {
    optionId;
    title;
    constructor(optionId, title) {
        this.optionId = optionId;
        this.title = title;
    }
}


export class DrugSelect extends Component {
    state = {
        list:[],
        searchSelect: React.createRef()
    }
    
    constructor(props) {
        super(props);
        Drugs.AddDefault();
        function GetDrugOptions() {
            let drugs = Drugs.GetDrugs();
            let drugOptions = [];
            drugs.forEach(drug => {
                let option = new FormattedOption(drug.id, drug.drugName);
                drugOptions.push(option);
            });
            return drugOptions;
        }
        this.state.list = GetDrugOptions();
    }

    render() {
        console.log(this.state.searchSelect)
        return <SearchSelect hasAddButton={true} ref={this.state.searchSelect} list={this.state.list} addClickFunction={function(inputValue){Drugs.Store(Drugs.FormatDrug(inputValue))}}></SearchSelect>
    }
    GetSelectedId() {
        return this.state.searchSelect.current.GetSelectedId();
    }

}


export class UnitSelect extends SearchSelect{
    state = {
        list:[],
        searchSelect: React.createRef()
    }
    constructor(props) {
        super(props);
        Units.AddDefault();
        function GetUnitOptions() {
            let units = Units.GetUnits();
            let unitOptions = [];
            units.forEach(unit => {
                let option = new FormattedOption(unit.id, unit.unitName);
                unitOptions.push(option);
            });
            return unitOptions;
        }
        this.state.list = GetUnitOptions();
    }

    render() {
        return <SearchSelect hasAddButton={true} ref={this.state.searchSelect} list={this.state.list} addClickFunction={function(inputValue){Units.Store(inputValue)}} selectedId></SearchSelect>
    }

    GetSelectedId() {
        return this.state.searchSelect.current.GetSelectedId();
    }
}

