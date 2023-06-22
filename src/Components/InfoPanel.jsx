import React from "react";
import { Card,Title, Divider,Button } from "@tremor/react";

const MainDash = (props = {}) => {
    const localChangeHook = (value) => {
        props.onPhaseChange(value);
    }
    return (
        <Card className="flex flex-col justify-center">
            <div className="flex flex-row">
                <Button variant="light" onClick={()=>localChangeHook("def")}>Reset</Button>
            {
                props.infoList && props.infoList.map(function(val){
                    return (<Card className="max-w-xs mx-auto hover:bg-teal-900" key={val["name"]} onClick={()=>localChangeHook(val["name"])}>
                    <Title className="text-white">{`Phase Name: ${val["name"]}`}</Title>
                    <Title className="text-white">{`Country: ${val["country"]}`}</Title>
                    <Title className="text-white">{`Cloud Provider: ${val["cloud"]}`}</Title>
                    <Title className="text-white">{`CPU : ${val["cpumodel"]}`}</Title>
                    <Title className="text-white">{`GPU : ${val["gpumodel"]}`}</Title>
                </Card>)
                })
            }
            {props.globalValues && 
            <Card className=" mx-auto max-w-xs">
                <Title className="text-white">{`Duration: ${Number.parseFloat(props.globalValues["duration"]/60).toFixed(2)} Mins`}</Title>
                <Divider/>
                <Title className="text-white">{`Energy: ${Number.parseFloat(props.globalValues["energy"]).toFixed(3)} KwH`}</Title>
                <Divider/>
                <Title className="text-white">{`Emissions: ${Number.parseFloat(props.globalValues["emissions"]).toFixed(3)} CO2 Kg`}</Title>
            </Card>
            }
            </div>
            <Divider/>
        </Card>
    )
}
export default MainDash