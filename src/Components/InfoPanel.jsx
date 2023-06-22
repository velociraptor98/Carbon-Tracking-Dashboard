import React, {useState,useEffect} from "react";
import { Card,Title, Metric, Divider } from "@tremor/react";

const MainDash = (props = {}) => {
    const [infoList,setInfoList] = useState([]);
    const [globalValues,setGlobalValues] = useState({});
    useEffect(()=>{
        const {csvData,headers} = props;
        let tempList = [];
        let g = {};
        g["duration"] = 0;
        g["energy"] = 0;
        g["emissions"] = 0;
        if(csvData.length){
            for(let i = 0; i<csvData.length;++i){
                let tempContainer = {};
                tempContainer["name"] = csvData[i][headers["project_name"]];
                tempContainer["country"] = csvData[i][headers["country_name"]];
                tempContainer["cloud"] = csvData[i][headers["cloud_region"]];
                tempContainer["cpumodel"] = csvData[i][headers["cpu_model"]];
                tempContainer["gpumodel"] = csvData[i][headers["gpu_model"]];
                tempList.push(tempContainer);
                g["duration"]+=Number.parseFloat(csvData[i][headers["duration"]]);
                // Values scaled temporarily for demo purpose
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
            {infoList.length &&
                <Card className="max-w-xs mx-auto">
                    <Title className="text-white">{`Project Name: ${infoList[0]["name"]}`}</Title>
                    <Title className="text-white">{`Country: ${infoList[0]["country"]}`}</Title>
                    <Title className="text-white">{`Cloud Provider: ${infoList[0]["cloud"]}`}</Title>
                    <Title className="text-white">{`CPU : ${infoList[0]["cpumodel"]}`}</Title>
                    <Title className="text-white">{`GPU : ${infoList[0]["gpumodel"]}`}</Title>
                </Card>
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