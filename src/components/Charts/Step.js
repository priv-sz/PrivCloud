import React from "react";
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";

import { randomNum } from '../../utils/utils'

class Step extends React.Component {
    render() {
        const data = [
            {
                time: "00:00",
                value: randomNum(0,3)*10
            },
            {
                time: "01:00",
                value: randomNum(0,3)*10
            },
            {
                time: "02:00",
                value: randomNum(0,3)*10
            },
            {
                time: "03:00",
                value: randomNum(0,3)*10
            },
            {
                time: "04:00",
                value: randomNum(0,3)*10
            },
            {
                time: "05:00",
                value: randomNum(0,3)*10
            },
            {
                time: "06:00",
                value: randomNum(0,3)*10
            },
            {
                time: "07:00",
                value: randomNum(0,3)*10
            },
            {
                time: "08:00",
                value: randomNum(7,10)*10
            },
            {
                time: "09:00",
                value: randomNum(7,10)*10
            },
            {
                time: "10:00",
                value: randomNum(7,10)*10
            },
            {
                time: "11:00",
                value: randomNum(7,10)*10
            },
            {
                time: "12:00",
                value: randomNum(7,10)*10
            },
            {
                time: "13:00",
                value: randomNum(7,10)*10
            },
            {
                time: "14:00",
                value: randomNum(7,10)*10
            },
            {
                time: "15:00",
                value: randomNum(7,10)*10
            },
            {
                time: "16:00",
                value: randomNum(7,10)*10
            },
            {
                time: "17:00",
                value: randomNum(7,10)*10
            },
            {
                time: "18:00",
                value: randomNum(7,10)*10
            },
            {
                time: "19:00",
                value: randomNum(7,10)*10
            },
            {
                time: "20:00",
                value: randomNum(7,10)*10
            },
            {
                time: "21:00",
                value: randomNum(7,10)*10
            },
            {
                time: "22:00",
                value: randomNum(7,10)*10
            },
            {
                time: "23:00",
                value: randomNum(0,3)*10
            },

        ];
        const cols = {
            time: {
                range: [0, 1]
            },
            value:{
                // tickCount:5, // 10 个区间
                alias:'显存占用'
            }
        };
        return (
            <div>
                <Chart height={400} data={data} scale={cols} forceFit>
                    <Axis name="time" />
                    <Axis name="value"
                          label={{
                              formatter: val => `${val}MiB`
                          }}/>
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="line" position="time*value" size={2} shape={"hv"} />
                </Chart>
            </div>
        );
    }
}

export default Step;