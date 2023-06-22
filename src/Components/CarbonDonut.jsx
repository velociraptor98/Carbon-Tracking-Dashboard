import React from "react";
import { Card, Title, DonutChart } from "@tremor/react";

const energyFormatter = (number) => `${number.toFixed(3).toString()} KwH`;
const emissionFormatter = (number) => `${number.toFixed(3).toString()} Kg CO2`;
const durationFormatter = (number) => `${(number/60).toFixed(2).toString()} Minutes`;


const CarbonDonut = (props = {}) => {
    return (
        <Card className="mt-2 flex flex-row justify-evenly">
            <Card className="max-w-xs">
                <Title>Energy Per Run</Title>
                <DonutChart
                    className="mt-2"
                    data={props.listData}
                    category="energy"
                    index="runId"
                    valueFormatter={energyFormatter}
                />
            </Card>
            <Card className="max-w-xs">
                <Title>Emissions Per Run</Title>
                <DonutChart
                    className="mt-2"
                    data={props.listData}
                    category="emissions"
                    index="runId"
                    valueFormatter={emissionFormatter}
                />
            </Card>
            <Card className="max-w-xs">
                <Title>Duration Per Run</Title>
                <DonutChart
                    className="mt-2"
                    data={props.listData}
                    category="duration"
                    index="runId"
                    valueFormatter={durationFormatter}
                />
            </Card>
        </Card>
    )
}
export default CarbonDonut