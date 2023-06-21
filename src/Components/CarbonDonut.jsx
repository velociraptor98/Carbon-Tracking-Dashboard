import React, { useState, useEffect } from "react";
import { Card, Title, DonutChart } from "@tremor/react";

//const valueFormatter = (number) => `$ ${Intl.NumberFormat("us").format(number).toString()}`;
const energyFormatter = (number) => `${number.toFixed(2).toString()} KwH`;
const emissionFormatter = (number) => `${number.toFixed(2).toString()} Kg CO2`;
const durationFormatter = (number) => `${(number/60).toFixed(2).toString()} Minutes`;


const CarbonDonut = (props = {}) => {
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
        <div className="flex flex-row">
            <Card className="max-w-auto">
                <Title>Energy Per Run</Title>
                <DonutChart
                    className="mt-6"
                    data={listData}
                    category="energy"
                    index="runId"
                    valueFormatter={energyFormatter}
                    colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                />
            </Card>
            <Card className="max-w-auto">
                <Title>Emissions Per Run</Title>
                <DonutChart
                    className="mt-6"
                    data={listData}
                    category="emissions"
                    index="runId"
                    valueFormatter={emissionFormatter}
                    colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                />
            </Card>
            <Card className="max-w-auto">
                <Title>Duration Per Run</Title>
                <DonutChart
                    className="mt-6"
                    data={listData}
                    category="duration"
                    index="runId"
                    valueFormatter={durationFormatter}
                    colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                />
            </Card>
        </div>
    )
}
export default CarbonDonut