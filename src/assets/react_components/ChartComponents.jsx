
import React, {useState, useRef, useEffect} from "react";
import { Link, useHistory } from 'react-router-dom'
import { Line } from 'react-chartjs-2';
import {DoseCardDisplay} from '../../assets/react_components/DoseCard.jsx';
import { AddOrb } from "../../assets/react_components/AddOrb";
import {Units} from '../../assets/js/Units.js';
import {SearchSelect, UnitSelect, DrugSelect} from '../../assets/js/SearchSelect.js';
import { Doses } from "../../assets/js/Doses";
import { Schedules } from "../../assets/js/Schedules";
import styled from "styled-components";
export function DrugChart(match) {
    const [drugId, setDrugId] = useState(0);
    const drugSelectRef = useRef();
    const [data, setData] = useState(0);
    const [graphRegion, setGraphRegion] = useState(<p className="error">No data for this drug.</p>);
    let options = {
        elements: {
            line: {
                borderColor: 'white'
            }
        },
    }
    const StyledLine = styled(Line)`
    `;
    let updateData = (option)=>{
        if(Doses.GetDosesCategorizedByDrug().get(option.optionId)!=null) {
            let doseList = Doses.GetDosesCategorizedByDrug().get(option.optionId).sort(function(a, b){return a.dateTimeTakenMilis-b.dateTimeTakenMilis});
            let doseAmountList = doseList.map(dose => dose.doseAmount);
            let doseLabelList = doseList.map(dose => new Date(dose.dateTimeTakenMilis).getMonth()+1 + "/" + new Date(dose.dateTimeTakenMilis).getDate());
            setData({
                labels: doseLabelList,
                    datasets: [
                    {
                        label: `${option.title} usage over time`,
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                        data: doseAmountList
                    }
                    ]
            })
        }
    }
    function ChartContainer(props) {
        if(Doses.GetDosesCategorizedByDrug().get(drugId)!=null) {

            return <StyledLine data={data} options={options}></StyledLine>;
        } else {
            return <p className="error">No data for this drug.</p>;
        }
    }


  return (
    <>
        <DrugSelect ref={drugSelectRef} onChange={(option)=>{setDrugId(option.optionId); updateData(option)}} style={{width:"100%"}}>
        </DrugSelect>
        <ChartContainer></ChartContainer>
    </>
  );
}