import React, { useState, useEffect } from "react";
import { LineChart,AreaChart, Card, Title, Subtitle } from "@tremor/react";
const LineChartPanel = (props = {}) => {
    const [listData, setListData] = useState([]);
    useEffect(() => {
        const { csvData, headers } = props;
        let g = [];
        if (csvData.length) {
            for (let i = 0; i < csvData.length; ++i) {
                let temp = {};
                temp["runId"] = csvData[i][headers["run_id"]];
                temp["emissions"] = Number.parseFloat(csvData[i][headers["emissions"]]);
                temp["energy"] = Number.parseFloat(csvData[i][headers["energy_consumed"]]);
                temp["duration"] = Number.parseFloat(csvData[i][headers["duration"]]);
                temp["timestamp"] = csvData[i][headers["duration"]];
                g.push(temp);
            }
        }
        setListData(g);
    }, [props])
    return (
        <div className="flex flex-col">
        <Card className="mt-6">
            <Title>Emissions/Energy</Title>
            <Subtitle>(KwH/Kg Co2)</Subtitle>
            <AreaChart
            className="mt-6"
            data={listData}
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
            data={listData}
            index="runId"
            categories={["duration"]}
            colors={["emerald", "gray"]}
            yAxisWidth={40}
            />
        </Card>
        </div>
    )
}
export default LineChartPanel;