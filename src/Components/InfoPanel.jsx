import React from "react";
import { Card,Title, Divider } from "@tremor/react";

const MainDash = (props = {}) => {
    const localChangeHook = (value) => {
        props.onPhaseChange(value);
    }
    return (
        <Card className="flex flex-col justify-evenly mt-2 overflow-auto h-full">
            <div className="flex flex-row overflow-hidden max-w-s max-h-xs">
                <Card className="flex flex-row max-w-5xl ml-2 mt-2 mb-2 overflow-auto">
            {
                props.infoList && props.infoList.map(function(val){
                    return (<Card 
                    className="max-h-xs max-w-xs mx-auto hover:bg-blue-400" 
                    key={val["name"]} 
                    onClick={()=>localChangeHook(val["name"])}
                    decoration="left"
                    decorationColor="blue"
                    >
                    <Title>{`Phase Name: ${val["name"]}`}</Title>
                    <Title>{`Country: ${val["country"]}`}</Title>
                    <Title>{`Cloud Provider: ${val["cloud"]}`}</Title>
                    <Title>{`CPU : ${val["cpumodel"]}`}</Title>
                    <Title>{`CPU Count: ${val["cpucount"]}`}</Title>
                    <Title>{`GPU : ${val["gpumodel"]}`}</Title>
                    <Title>{`RAM : ${val["ram"]} GB`}</Title>
                </Card>)
                })
            }
            </Card>
            {props.globalValues && 
            <Card className=" mx-auto max-w-xs mt-2 ml-2 mb-2">
                <Title>{`Duration: ${Number.parseFloat(props.globalValues["duration"]/60).toFixed(2)} Mins`}</Title>
                <Divider/>
                <Title>{`Energy: ${Number.parseFloat(props.globalValues["energy"]).toFixed(3)} KwH`}</Title>
                <Divider/>
                <Title>{`Emissions: ${Number.parseFloat(props.globalValues["emissions"]).toFixed(3)} CO2 Kg`}</Title>
            </Card>
            }
            </div>
            <Divider/>
        </Card>
    )
}
export default MainDash