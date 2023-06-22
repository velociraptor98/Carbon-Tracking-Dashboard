import React from "react";
import { Card, Title, DonutChart } from "@tremor/react";

const energyFormatter = (number) => `${number.toFixed(3).toString()} KwH`;
const emissionFormatter = (number) => `${number.toFixed(3).toString()} Kg CO2`;
const durationFormatter = (number) => `${(number/60).toFixed(2).toString()} Minutes`;


const CarbonDonut = (props = {}) => {
    return (
        <div className="flex flex-row">
            <Card className="max-w-auto">
                <Title>Energy Per Run</Title>
                <DonutChart
                    className="mt-6"
                    data={props.listData}
                    category="energy"
                    index="runId"
                    valueFormatter={energyFormatter}
                    // colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                />
            </Card>
            <Card className="max-w-auto">
                <Title>Emissions Per Run</Title>
                <DonutChart
                    className="mt-6"
                    data={props.listData}
                    category="emissions"
                    index="runId"
                    valueFormatter={emissionFormatter}
                    // colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                />
            </Card>
            <Card className="max-w-auto">
                <Title>Duration Per Run</Title>
                <DonutChart
                    className="mt-6"
                    data={props.listData}
                    category="duration"
                    index="runId"
                    valueFormatter={durationFormatter}
                    // colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                />
            </Card>
        </div>
    )
}
export default CarbonDonut