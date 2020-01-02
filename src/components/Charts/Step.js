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
import { chart_color } from './chart_config'
import { randomNum } from '../../utils/utils'

const data_default = [
    {
        timestamp: "00:00",
        value: randomNum(0,3)*100
    },
    {
        timestamp: "01:00",
        value: randomNum(0,3)*100
    },
    {
        timestamp: "02:00",
        value: randomNum(0,3)*100
    },
    {
        timestamp: "03:00",
        value: randomNum(0,3)*100
    },
    {
        timestamp: "04:00",
        value: randomNum(0,3)*100
    },
    {
        timestamp: "05:00",
        value: randomNum(0,3)*100
    },
    {
        timestamp: "06:00",
        value: randomNum(0,3)*100
    },
    {
        timestamp: "07:00",
        value: randomNum(0,3)*100
    },
    {
        timestamp: "08:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "09:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "10:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "11:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "12:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "13:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "14:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "15:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "16:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "17:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "18:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "19:00",
        value: randomNum(7,10)*100
    },
    {
        timestamp: "20:00",
        value: randomNum(7,10)*100
    },
];
const cols_default = {
    timestamp: {
        range: [0, 1]
    },
    value:{
        // tickCount:5, // 10 个区间
        alias:'显存占用',
        min: 0,
        max: 12196*8
    }
};

class Step extends React.Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:[],
            cols:{
                timestamp: {
                    range: [0, 1]
                },
                value:{
                    // tickCount:5, // 10 个区间
                    alias:'显存占用',
                    min: 0,
                }
            },
            x_name:'timestamp',
            y_name:'value'
        };
      }

    componentWillMount() {
        let { data, cols, x_name, y_name } = this.props
        data = data || data_default
        cols = cols || cols_default
        x_name = x_name || 'timestamp'
        y_name = y_name || 'value'
        this.setState({
            data,
            cols,
            x_name,
            y_name
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let { data, cols, x_name, y_name } = nextProps
        data = data || data_default
        cols = cols || cols_default
        x_name = x_name || 'timestamp'
        y_name = y_name || 'value'
        this.setState({
            data,
            cols,
            x_name,
            y_name
        })
    }

    render() {
        console.log(this.state.data)
        return (
            <div>
                <Chart height={this.props.height || 400} data={this.state.data} scale={this.state.cols} forceFit>
                    <Axis name={this.state.x_name} />
                    <Axis name={this.state.y_name}
                          label={{
                              formatter: val => `${val} MiB`
                          }}/>
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="line" position={`${this.state.x_name}*${this.state.y_name}`} size={2} shape={"hv"} />
                    {/*<Geom*/}
                    {/*    type="point"*/}
                    {/*    position={`${this.state.x_name}*${this.state.y_name}`}*/}
                    {/*    size={1}*/}
                    {/*    shape={"circle"}*/}
                    {/*    color={["state_type", chart_color]}*/}
                    {/*    style={{*/}
                    {/*        stroke: "#fff",*/}
                    {/*        lineWidth: 1*/}
                    {/*    }}*/}
                    {/*/>*/}
                </Chart>
            </div>
        );
    }
}

export default Step;