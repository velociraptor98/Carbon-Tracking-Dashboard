import React,{useState,useEffect} from "react";
import MainDash from './InfoPanel';
import CarbonDonut from './CarbonDonut';
import LineChart from "./LineChartPanel";
import { Title, Divider } from "@tremor/react";
import * as Papa from 'papaparse';

const ParentContainer = (props = {}) => {
    const [csvFile,setCsvFile] = useState([]);
    const [csvHeaders,setCsvHeaders] = useState({});
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

return(
    <div className="flex flex-col bg-teal-400 h-screen">
        <Title className="text-black align-center">Carbon Emission Dashboard</Title>
        <Divider/>
        <MainDash
        csvData = {csvFile}
        headers = {csvHeaders}/>
        <CarbonDonut
        csvData = {csvFile}
        headers = {csvHeaders}
        />
        <LineChart
        csvData = {csvFile}
        headers = {csvHeaders}
        />
    </div>
)
}

export default ParentContainer;