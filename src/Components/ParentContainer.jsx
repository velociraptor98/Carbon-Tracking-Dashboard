import React,{useState,useEffect} from "react";
import MainDash from './InfoPanel';
import CarbonDonut from './CarbonDonut';
import LineChart from "./LineChartPanel";
import { Title, Divider, Card } from "@tremor/react";
import * as Papa from 'papaparse';

const ParentContainer = () => {
    const [csvFile,setCsvFile] = useState([]);
    const [csvHeaders,setCsvHeaders] = useState({});
    const [infoList,setInfoList] = useState([]);
    const [globalValues,setGlobalValues] = useState({});
    const [listData, setListData] = useState([]);
    const [selectionPhase,setSelectionPhase] = useState("def");

    useEffect(() => {
        fetch( './out.csv' )
            .then( response => response.text() )
            .then( responseText => {
                let data = Papa.parse(responseText);
                // Always generate the CSV file with headers
                setCsvHeaders(data.data[0]);
                const headers = data.data[0];
                let temp = {};
                for(let i = 0;i<headers.length;++i){
                    temp[headers[i]] = i;
                }  
                setCsvHeaders(temp);
                setCsvFile(data.data.slice(1));
            })
    }, [])

    useEffect(()=>{
        let tempList = [];
        let projectList = [];
        let gl = {};
        gl["duration"] = 0;
        gl["energy"] = 0;
        gl["emissions"] = 0;
        let localG = [];
        let csvData = csvFile;
        let headers = csvHeaders;
        if(csvData.length){
            for(let i = 0; i<csvData.length;++i){
                let tempContainer = {};
                if(projectList.includes(csvData[i][headers["project_name"]])){}else{
                tempContainer["name"] = csvData[i][headers["project_name"]];
                projectList.push(tempContainer["name"]);
                tempContainer["country"] = csvData[i][headers["country_name"]];
                tempContainer["cloud"] = csvData[i][headers["cloud_region"]];
                tempContainer["cpumodel"] = csvData[i][headers["cpu_model"]];
                tempContainer["gpumodel"] = csvData[i][headers["gpu_model"]];
                tempList.push(tempContainer);
                }
                if(selectionPhase === 'def' || selectionPhase === csvData[i][headers["project_name"]]){
                gl["duration"]+=Number.parseFloat(csvData[i][headers["duration"]]);
                gl["energy"]+=Number.parseFloat(csvData[i][headers["energy_consumed"]]); 
                gl["emissions"]+=Number.parseFloat(csvData[i][headers["emissions"]]);
                let temp = {};
                temp["runId"] = csvData[i][headers["run_id"]];
                temp["emissions"] = Number.parseFloat(csvData[i][headers["emissions"]]);
                temp["energy"] = Number.parseFloat(csvData[i][headers["energy_consumed"]]);
                temp["duration"] = Number.parseFloat(csvData[i][headers["duration"]]);
                temp["timestamp"] = csvData[i][headers["duration"]];
                temp["cpuenergy"] = csvData[i][headers["cpu_energy"]];
                temp["gpuenergy"] = csvData[i][headers["gpu_energy"]];
                temp["ramenergy"] = csvData[i][headers["ram_energy"]];
                localG.push(temp);
                }
            }
        
        }
        setInfoList(tempList);
        setGlobalValues(gl);
        setListData(localG);
    },[csvFile,selectionPhase])

    const onPhaseChange = (value) => {
        setSelectionPhase(value);
    }
return(
    <Card className="flex flex-col h-full">
        <Title className="text-black align-center">Carbon Emission Tracker</Title>
        <Divider/>
        <MainDash
        infoList = {infoList}
        globalValues = {globalValues}
        onPhaseChange = {onPhaseChange}/>
        <Divider/>
        <CarbonDonut
        csvData = {csvFile}
        headers = {csvHeaders}
        listData = {listData}
        />
        <Divider/>
        <LineChart
        listData = {listData}
        />
        <Divider/>
    </Card>
)
}

export default ParentContainer;