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
import DataSet from "@antv/data-set";
import { chart_color } from './chart_config'
class Clusteredstacked extends React.Component {

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    render() {
        const { DataView } = DataSet;
        const data = [
            {
                timestamp: "12-17 00:00:00",
                "192.168.88.91-0": 1000,
                "192.168.88.91-1":1000,
                "192.168.88.91-2":2000,
                "192.168.88.91-3":2000,
                "192.168.88.91-4": 1000,
                "192.168.88.91-5":1000,
                "192.168.88.91-6":2000,
                "192.168.88.91-7":4000,
                "192.168.88.60-0": 1500,
                "192.168.88.60-1": 1500,
                "192.168.88.60-2": 5000,
                "192.168.88.60-3": 3000,
            },
            {
                timestamp: "12-17 00:30:00",
                "192.168.88.91-0": 1000,
                "192.168.88.91-1":1000,
                "192.168.88.91-2":4000,
                "192.168.88.91-3":4000,
                "192.168.88.60-0": 1500,
                "192.168.88.60-1": 1500,
                "192.168.88.60-2": 5000,
                "192.168.88.60-3": 3000,
            },
            {
                timestamp: "12-17 01:00:00",
                "192.168.88.91-0": 1000,
                "192.168.88.91-1":1000,
                "192.168.88.91-2":4000,
                "192.168.88.91-3":4000,
                "192.168.88.60-0": 1500,
                "192.168.88.60-1": 1500,
                "192.168.88.60-2": 5000,
                "192.168.88.60-3": 3000,
            },
            {
                timestamp: "12-17 01:30:00",
                "192.168.88.91-0": 1000,
                "192.168.88.91-1":1000,
                "192.168.88.91-2":4000,
                "192.168.88.91-3":4000,
                "192.168.88.60-0": 1500,
                "192.168.88.60-1": 1500,
                "192.168.88.60-2": 5000,
                "192.168.88.60-3": 3000,
            },
            {
                timestamp: "12-17 02:00:00",
                "192.168.88.91-0": 1000,
                "192.168.88.91-1":1000,
                "192.168.88.91-2":4000,
                "192.168.88.91-3":4000,
                "192.168.88.60-0": 1500,
                "192.168.88.60-1": 1500,
                "192.168.88.60-2": 5000,
                "192.168.88.60-3": 3000,
            },
            {
                timestamp: "12-17 02:30:00",
                "192.168.88.91-0": 1000,
                "192.168.88.91-1":1000,
                "192.168.88.91-2":4000,
                "192.168.88.91-3":4000,
                "192.168.88.60-0": 1500,
                "192.168.88.60-1": 1500,
                "192.168.88.60-2": 5000,
                "192.168.88.60-3": 3000,
            },
            {
                timestamp: "12-17 03:00:00",
                "192.168.88.91-0": 1000,
                "192.168.88.91-1":1000,
                "192.168.88.91-2":4000,
                "192.168.88.91-3":4000,
                "192.168.88.60-0": 1500,
                "192.168.88.60-1": 1500,
                "192.168.88.60-2": 5000,
                "192.168.88.60-3": 3000,
            }
        ];
        let { ages, key_arr, dataSource } = this.props || []

        // let { ages } = []

        // const ages = [
        //     "192.168.88.91-0",
        //     "192.168.88.91-1",
        //     "192.168.88.91-2",
        //     "192.168.88.91-3",
        //     "192.168.88.91-4",
        //     "192.168.88.91-5",
        //     "192.168.88.91-6",
        //     "192.168.88.91-7",
        //     "192.168.88.60-0",
        //     "192.168.88.60-1",
        //     "192.168.88.60-2",
        //     "192.168.88.60-3",
        // ];
        const dv = new DataView();
        dv.source(dataSource)
            .transform({
                type: "fold",
                fields: ages,
                key: "age",
                value: "population",
                retains: ["timestamp"]
            })
            .transform({
                type: "map",
                callback: obj => {
                    const key = obj.age;
                    let type;
                    // console.log(this.key_arr.indexOf(key.split('-')[0]))
                    obj.type = key_arr.indexOf(key.split('-')[0]);
                    return obj;
                }
            });
        const colorMap = {
            // "192.168.88.91-0": "#E3F4BF",
            // "192.168.88.91-1": "#BEF7C8",
            // "192.168.88.91-2": "#86E6C8",
            // "192.168.88.91-3": "#36CFC9",
            // "192.168.88.60-0": "#E3F4BF",
            // "192.168.88.60-1": "#BEF7C8",
            // "192.168.88.60-2": "#86E6C8",
            // "192.168.88.60-3": "#36CFC9",
            // "25 to 44 Years": "#209BDD",
            // "45 to 64 Years": "#1581E6",
            // "65 Years and Over": "#0860BF"
        };
        const cols = {
            // population: {
            //     tickInterval: 1000000
            // }
        };
        return (
            <div>
                <Chart
                    height={this.props.height || 500}
                    data={dv}
                    scale={cols}
                    padding={[20, 160, 80, 60]}
                    forceFit
                >
                    <Axis
                        name="population"
                        label={{
                            formatter: function(val) {
                                return val / 1000 + "G";
                                // console.log(val)
                                // return 1000 + "M";
                            }
                        }}
                    />
                    <Legend position="right" />
                    <Tooltip />
                    <Geom
                        type="interval"
                        position="timestamp*population"
                        color={[
                            "age",
                            chart_color
                        ]}
                        tooltip={[
                            "age*population",
                            (age, population) => {
                                return {
                                    name: age,
                                    value: population
                                };
                            }
                        ]}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                        adjust={[
                            {
                                type: "dodge",
                                dodgeBy: "type",
                                // 按照 type 字段进行分组
                                marginRatio: 0 // 分组中各个柱子之间不留空隙
                            },
                            {
                                type: "stack"
                            }
                        ]}
                        size={10}
                    />
                </Chart>
            </div>
        );
    }
}

export default Clusteredstacked