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

class Histogram_chart extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // fields : ["0","1","2","3","4","5","6","7"],
            fields : [],
            chart_data:[],
            max_gpu: 12196,
            chartIns:null,
            data:[]
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


        return (
            <div >
                <Chart height={this.props.height}  data={this.state.data} scale={this.state.cols} forceFit
                       onGetG2Instance={chart => {
                           // chartIns = chart;
                           // console.log(chartIns)
                           this.setState({
                               chartIns:chart
                           })
                       }}
                >
                    <Legend position="bottom" offsetY={this.props.offsetY || 0}/>
                    <Axis
                        name="total_hours"
                        label={{
                            offset:0,
                            formatter: function(val) {
                                return val + "h";
                            }
                        }}
                    />
                    <Axis
                        name="name"
                        label={{
                            offset:10,
                        }}
                    />
                    <Tooltip />
                    <Geom type="interval" position="name*total_hours"
                          tooltip={[
                              "name*total_hours",
                              (age, value) => {
                                  // let type = value / 1024 /1024 > 1 ? 'Gib' : 'Mib'
                                  // let value_type = {
                                  //     Gib:1024*1024,
                                  //     Mib:1024
                                  // }
                                  return {
                                      name: '总运行时间',
                                      value: `${value}h`
                                  };
                              }
                          ]}
                          color={"name"}
                    >
                        <Label content={['name*total_hours', (name, total_hours) => `${total_hours}h`]}
                               labelLine={{
                                   lineWidth: 1, // 线的粗细
                                   stroke: '#ff8800', // 线的颜色
                                   lineDash: [2, 2], // 虚线样式
                               }} />
                    </Geom>
                </Chart>
            </div>
        );
    }
}

export default Histogram_chart