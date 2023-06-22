import React from "react";
import { Card,Title, Divider,Button } from "@tremor/react";

const MainDash = (props = {}) => {
    const localChangeHook = (value) => {
        props.onPhaseChange(value);
    }
    return (
        <Card className="flex flex-col justify-center mt-2">
            <div className="flex flex-row">
                <Button variant="light" onClick={()=>localChangeHook("all")}>Reset</Button>
            {
                props.infoList && props.infoList.map(function(val){
                    return (<Card className="max-w-xs mx-auto hover:bg-blue-400" key={val["name"]} onClick={()=>localChangeHook(val["name"])}>
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
            {props.globalValues && 
            <Card className=" mx-auto max-w-xs">
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