import React, { useState, useEffect } from "react";
import { LineChart, Card, Title } from "@tremor/react";
const LineChartPanel = (props = {}) => {
    const [listData, setListData] = useState([]);
    useEffect(() => {
        const { csvData, headers } = props;
        let g = [];
        if (csvData.length) {
            for (let i = 0; i < csvData.length; ++i) {
                let temp = {};
                temp["runId"] = csvData[i][headers["run_id"]];
                temp["emissions"] = Number.parseFloat(csvData[i][headers["emissions"]]) * 1000;
                temp["energy"] = Number.parseFloat(csvData[i][headers["energy_consumed"]]) * 1000;
                temp["duration"] = Number.parseFloat(csvData[i][headers["duration"]]);
                g.push(temp);
            }
        }
        setListData(g);
    }, [props])
    return (
        <Card>
            <Title>Emissions Vs Energy</Title>
            <LineChart
            className="mt-6"
            data={listData}
            index="runId"
            categories={["emissions", "energy"]}
            colors={["emerald", "gray"]}
            yAxisWidth={40}
            />
        </Card>
    )
}
export default LineChartPanel;