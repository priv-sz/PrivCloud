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

class Step extends React.Component {
    render() {
        const data = [
            {
                time: "Jan",
                value: 51
            },
            {
                time: "Feb",
                value: 91
            },
            {
                time: "Mar",
                value: 34
            },
            {
                time: "Apr",
                value: 47
            },
            {
                time: "May",
                value: 63
            },
            {
                time: "June",
                value: 58
            },
            {
                time: "July",
                value: 56
            },
            {
                time: "Aug",
                value: 77
            },
            {
                time: "Sep",
                value: 99
            },
            {
                time: "Oct",
                value: 106
            },
            {
                time: "Nov",
                value: 88
            },
            {
                time: "Dec",
                value: 56
            }
        ];
        const cols = {
            time: {
                range: [0, 1]
            },
            value:{
                // tickCount:5, // 10 个区间
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