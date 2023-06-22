import React, {useState,useEffect} from "react";
import { Card,Title, Metric, Divider } from "@tremor/react";

const MainDash = (props = {}) => {
    const [infoList,setInfoList] = useState([]);
    const [globalValues,setGlobalValues] = useState({});
    useEffect(()=>{
        const {csvData,headers} = props;
        let tempList = [];
        let projectList = [];
        let g = {};
        g["duration"] = 0;
        g["energy"] = 0;
        g["emissions"] = 0;
        if(csvData.length){
            for(let i = 0; i<csvData.length;++i){
                let tempContainer = {};
                if(projectList.includes(csvData[i][headers["project_name"]])){}else{
                console.log(projectList);
                tempContainer["name"] = csvData[i][headers["project_name"]];
                projectList.push(tempContainer["name"]);
                tempContainer["country"] = csvData[i][headers["country_name"]];
                tempContainer["cloud"] = csvData[i][headers["cloud_region"]];
                tempContainer["cpumodel"] = csvData[i][headers["cpu_model"]];
                tempContainer["gpumodel"] = csvData[i][headers["gpu_model"]];
                tempList.push(tempContainer);
                }
                g["duration"]+=Number.parseFloat(csvData[i][headers["duration"]]);
                g["energy"]+=Number.parseFloat(csvData[i][headers["energy_consumed"]]); 
                g["emissions"]+=Number.parseFloat(csvData[i][headers["emissions"]]);
            }
        
        }
        setInfoList(tempList);
        setGlobalValues(g);
    },[props])
    return (
        <Card className="flex flex-col justify-center">
            <div className="flex flex-row">
            {
                infoList.map(function(val){
                    return (<Card className="max-w-xs mx-auto" key={val["name"]}>
                    <Title className="text-white">{`Phase Name: ${val["name"]}`}</Title>
                    <Title className="text-white">{`Country: ${val["country"]}`}</Title>
                    <Title className="text-white">{`Cloud Provider: ${val["cloud"]}`}</Title>
                    <Title className="text-white">{`CPU : ${val["cpumodel"]}`}</Title>
                    <Title className="text-white">{`GPU : ${val["gpumodel"]}`}</Title>
                </Card>)
                })
            }
            {globalValues && 
            <Card className=" mx-auto max-w-xs">
                <Metric className="text-white">{`Duration: ${Number.parseFloat(globalValues["duration"]/60).toFixed(2)} Mins`}</Metric>
                <Divider/>
                <Metric className="text-white">{`Energy: ${Number.parseFloat(globalValues["energy"]).toFixed(3)} KwH`}</Metric>
                <Divider/>
                <Metric className="text-white">{`Emissions: ${Number.parseFloat(globalValues["emissions"]).toFixed(3)} CO2 Kg`}</Metric>
            </Card>
            }
            </div>
            <Divider/>
        </Card>
    )
}
export default MainDash