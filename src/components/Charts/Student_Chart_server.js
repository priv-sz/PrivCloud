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

// let chartIns = null;
//
// const getG2Instance = (chart) => {
//     chartIns = chart;
// };

class Student_Chart_server extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // fields : ["0","1","2","3","4","5","6","7"],
            fields : [],
            chart_data:[],
            max_gpu: 12196,
            chartIns:null
        };


    }


    componentWillMount() {
        let { data, cols, x_name, y_name , fields} = this.props
        data = data || []
        cols = cols || {}
        fields = fields || ["0","1","2","3","4","5","6","7"]
        this.setState({
            data,
            cols,
            fields
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let { data, cols, fields } = nextProps
        console.log(data)
        data = data || []
        cols = cols || {}
        fields = fields || ["0","1","2","3","4","5","6","7"]
        this.setState({
            data,
            cols,
            fields
        })
    }

    render() {

        const data = [
            {
                timestamp:"12-13",
                0:1000,
                1:1000,
                2:1000,
                3:1000,
                temperature:50
            },
            {
                timestamp:"12-14",
                0:1000,
                1:1000,
                2:1000,
                3:1000,
                temperature:50
            },{
                timestamp:"12-15",
                0:1000,
                1:1000,
                2:1000,
                3:1000,
                temperature:50
            },{
                timestamp:"12-16",
                0:1000,
                1:1000,
                2:1000,
                3:1000,
                temperature:50
            },{
                timestamp:"12-17",
                0:1000,
                1:1000,
                2:1000,
                3:1000,
                temperature:50
            },{
                timestamp:"12-18",
                0:1000,
                1:1000,
                2:1000,
                3:1000,
                temperature:50
            },{
                timestamp:"12-19",
                0:1000,
                1:1000,
                2:1000,
                3:1000,
                temperature:50
            },
        ];

        let cols = {
            // value: {
            //     tickInterval: 1000000
            // }
            temperature: {
                type: 'linear',
                min: 0,
            },
            value:{
                alias:'显存占用',
                min: 0,
                max: this.state.max_gpu
            }
        };

        let dataSource = this.state.data || data
        const ds = new DataSet();
        const dv = ds.createView().source(dataSource);
        dv.transform({
            type: "fold",
            fields: this.state.fields,
            key: "gpu",
            value: "value",
        });

        // let chartIns = null;
        return (
            <div >
                <Chart height={400}  data={dv} scale={this.state.cols} forceFit
                       onGetG2Instance={chart => {
                           // chartIns = chart;
                           // console.log(chartIns)
                           this.setState({
                               chartIns:chart
                           })
                       }}
                >
                    <Legend
                        custom={true}
                        allowAllCanceled={true}
                        items={[
                            {
                                value: "平均显存占用",
                                marker: {
                                    symbol: "hyphen",
                                    stroke: "#FA4E21",
                                    radius: 5,
                                    lineWidth: 3
                                }
                            },
                            {
                                value: "GPU利用率",
                                marker: {
                                    symbol: "hyphen",
                                    stroke: "#1581E6",
                                    radius: 5,
                                    lineWidth: 3
                                }
                            },
                            {
                                value: "温度",
                                marker: {
                                    symbol: "hyphen",
                                    stroke: "#fad248",
                                    radius: 5,
                                    lineWidth: 3
                                }
                            },
                        ]}

                        onClick={ev => {
                            const item = ev.item;
                            const value = item.value;
                            const checked = ev.checked;
                            // const geoms = chartIns.getAllGeoms();
                            const geoms = this.state.chartIns.getAllGeoms();

                            for (let i = 0; i < geoms.length; i++) {
                                const geom = geoms[i];

                                // if (geom.getYScale().field === value) {
                                //     if (checked) {
                                //         geom.show();
                                //     } else {
                                //         geom.hide();
                                //     }
                                // }
                                if (geom.getYScale().alias === value) {
                                    if (checked) {
                                        geom.show();
                                    } else {
                                        geom.hide();
                                    }
                                }
                            }
                        }}
                    />
                    {/*<Legend />*/}
                    {/*<Axis*/}
                    {/*    name="value"*/}
                    {/*    label={{*/}
                    {/*        formatter: function(val) {*/}
                    {/*            return Math.round(val / 1024) + "GiB";*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <Axis
                        name="gpu_value"
                        label={{
                            offset:0,
                            formatter: function(val) {
                                return Math.round(val / 1024) + "GiB";
                            }
                        }}
                        // visible={false}
                    />
                    <Axis
                        name="temperature"
                        label={{
                            offset:1,
                            formatter(text, item, index) {
                                return `${text}℃`;
                            },
                        }}
                        // visible={false}
                    />
                    <Axis
                        name="GPU_use_percent"
                        visible={false}
                    />
                    <Axis
                        name="value"
                        // label={{
                        //     formatter: function(val) {
                        //         return Math.round(val / 1024) + "GiB";
                        //     }
                        // }}
                        visible={false}
                    />
                    <Tooltip />
                    <Geom type="line" position="timestamp*gpu_value" color="#FA4E21" size={3}
                          tooltip={[
                              "温度*gpu_value",
                              (age, value) => {
                                  return {
                                      name: '平均显存',
                                      value: `${value}Mib`
                                  };
                              }
                          ]}/>
                    <Geom type="line" position="timestamp*temperature" color="#fad248" size={3}
                          tooltip={[
                              "温度*temperature",
                              (age, value) => {
                                  return {
                                      name: '温度',
                                      value: `${value}℃`
                                  };
                              }
                          ]}/>
                    <Geom type="line" position="timestamp*GPU_use_percent" color="#1581E6" size={3}
                          tooltip={[
                              "温度*GPU_use_percent",
                              (age, value) => {
                                  return {
                                      name: 'GPU 占用率',
                                      value: `${value}%`
                                  };
                              },
                          ]}
                    />
                    <Geom
                        type="intervalStack"
                        position="timestamp*value"

                        color={[
                            "gpu",
                            // chart_color
                            ['transparent']
                        ]}
                        tooltip={[
                            "gpu*value",
                            (age, value) => {
                                return {
                                    name: `${age}卡`,
                                    value: `${value} `
                                };
                            }
                        ]}

                        // style={{
                        //     stroke: "#fff",
                        //     lineWidth: 1
                        // }}
                    />
                </Chart>
            </div>
        );
    }
}

export default Student_Chart_server