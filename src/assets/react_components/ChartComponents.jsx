
import React, {useState, useRef, useEffect} from "react";
import { Link, useHistory } from 'react-router-dom'
import { Line } from 'react-chartjs-2';
import {DoseCardDisplay} from '../../assets/react_components/DoseCard.jsx';
import { AddOrb } from "../../assets/react_components/AddOrb";
import {Units} from '../../assets/js/Units.js';
import {SearchSelect, UnitSelect, DrugSelect, ScheduleSelect} from '../../assets/js/SearchSelect.js';
import { Doses } from "../../assets/js/Doses";
import { Schedules } from "../../assets/js/Schedules";
import styled from "styled-components";
export function DrugChart(match) {
    const [schedueId, setScheduleId] = useState(0);
    const [data, setData] = useState(0);
    const [graphRegion, setGraphRegion] = useState(<p className="error">No data for this drug.</p>);
    let options = {
        elements: {
            line: {
                borderColor: 'white'
            }
        },
        interaction: {
            intersect: false,
        },
        animation: {
            duration: 0
        }
    }
    const StyledLine = styled(Line)`
        border-radius: 20px;
        border-color: salmon;
        border-style: solid;
        border-width: 0.1px;
    `;
    let updateData = (option)=>{
        if(Doses.GetDosesCategorizedBySchedule().get(option.optionId)!=null) {
            let doseList = Doses.GetDosesCategorizedBySchedule().get(option.optionId).sort(function(a, b){return a.dateTimeTakenMilis-b.dateTimeTakenMilis});
            let doseAmountList = doseList.map(dose => dose.doseAmount);
            let doseLabelList = doseList.map(dose => new Date(dose.dateTimeTakenMilis).getMonth()+1 + "/" + new Date(dose.dateTimeTakenMilis).getDate());
            let schedule = Schedules.FindScheduleWithId(option.optionId);
            setData({
                labels: [schedule.startDate].concat(doseLabelList).concat([schedule.endDate]),
                    datasets: [
                        {
                            label: `${option.title} usage over time`,
                            borderColor:"white",
                            data: doseAmountList
                        },
                        {
                            label: "goal",
                            borderColor:"rgb(20, 20, 20)",
                            data: [schedule.startDose].concat(doseAmountList).concat([schedule.endDose ])
                        }
                    ]
            })
        }
    }
    function ChartContainer(props) {
        if(Doses.GetDosesCategorizedBySchedule().get(schedueId)!=null) {

            return <StyledLine data={data} options={options}></StyledLine>;
        } else {
            return <p className="error">No data for this schedule.</p>;
        }
    }


  return (
    <>
        <ScheduleSelect onChange={(option)=>{setScheduleId(option.optionId); updateData(option)}} style={{width:"100%"}}>
        </ScheduleSelect>
        <ChartContainer></ChartContainer>
    </>
  );
}