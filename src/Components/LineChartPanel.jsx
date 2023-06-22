import React from "react";
import { LineChart,AreaChart, Card, Title, Subtitle } from "@tremor/react";
const LineChartPanel = (props = {}) => {

    return (
        <Card className="flex flex-col mt-2">
        <Card className="mt-3">
            <Title>Emissions/Energy</Title>
            <Subtitle>(Kg Co2/KwH)</Subtitle>
            <AreaChart
            className="mt-3"
            data={props.listData}
            index="runId"
            categories={["emissions", "energy"]}
            colors={["emerald", "gray"]}
            yAxisWidth={40}
            />
        </Card>
        <Card className="mt-3">
            <Title>Duration</Title>
            <Subtitle>(Seconds)</Subtitle>
            <AreaChart
            className="mt-3"
            data={props.listData}
            index="runId"
            categories={["duration"]}
            colors={["emerald", "gray"]}
            yAxisWidth={40}
            />
        </Card>
        <Card className="mt-3">
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
        </Card>
    )
}
export default LineChartPanel;