import React, {useState,useEffect} from "react";
import { Card,Title, Text, Metric, Divider } from "@tremor/react";

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
                g["energy"]+=Number.parseFloat(csvData[i][headers["energy_consumed"]]);
                g["emissions"]+=Number.parseFloat(csvData[i][headers["emissions"]]);
            }
        
        }
        setInfoList(tempList);
        setGlobalValues(g);
    },[props])
    return (
        <div className="flex flex-col justify-center">
            <Title className="text-black align-center">Info Panel</Title>
            <div className="flex flex-row">
            {infoList.length &&
                <Card className="max-w-xs mx-auto">
                    <Text className="text-white">{`Project Name: ${infoList[0]["name"]}`}</Text>
                    <Text className="text-white">{`Country: ${infoList[0]["country"]}`}</Text>
                    <Text className="text-white">{`Cloud Provider: ${infoList[0]["cloud"]}`}</Text>
                    <Text className="text-white">{`CPU : ${infoList[0]["cpumodel"]}`}</Text>
                    <Text className="text-white">{`GPU : ${infoList[0]["gpumodel"]}`}</Text>
                </Card>
            }
            {globalValues && 
            <Card className=" mx-auto max-w-xs">
                <Metric className="text-white">{`Duration: ${globalValues["duration"]} Seconds`}</Metric>
                <Divider/>
                <Metric className="text-white">{`Energy: ${globalValues["energy"]} KwH`}</Metric>
                <Metric className="text-white">{`Emissions: ${globalValues["emissions"]} CO2 Kg`}</Metric>
            </Card>
            }
            </div>
            <Divider/>
        </div>
    )
}
export default MainDash