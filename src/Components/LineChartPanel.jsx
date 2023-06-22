import React from "react";
import { LineChart,AreaChart, Card, Title, Subtitle } from "@tremor/react";
const LineChartPanel = (props = {}) => {

    return (
        <div className="flex flex-col">
        <Card className="mt-6">
            <Title>Emissions/Energy</Title>
            <Subtitle>(KwH/Kg Co2)</Subtitle>
            <AreaChart
            className="mt-6"
            data={props.listData}
            index="runId"
            categories={["emissions", "energy"]}
            colors={["emerald", "gray"]}
            yAxisWidth={40}
            />
        </Card>
        <Card className="mt-6">
            <Title>Duration</Title>
            <Subtitle>(Seconds)</Subtitle>
            <AreaChart
            className="mt-6"
            data={props.listData}
            index="runId"
            categories={["duration"]}
            colors={["emerald", "gray"]}
            yAxisWidth={40}
            />
        </Card>
        <Card className="mt-6">
            <Title>Component Power Draw</Title>
            <Subtitle>(KwH)</Subtitle>
            <LineChart
            className="mt-6"
            data={props.listData}
            index="runId"
            categories={["cpuenergy","gpuenergy","ramenergy"]}
            colors={["emerald", "gray","blue"]}
            yAxisWidth={40}
            />
        </Card>
        </div>
    )
}
export default LineChartPanel;