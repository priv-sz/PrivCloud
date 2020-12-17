import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import { scatter } from 'echarts'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {Menu} from "antd";





class Echartstest extends Component {


    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:0
        };
        this._scatter = this._scatter.bind(this);
    }

    componentDidMount() {
        let { charts_data ,type} = this.props;
        this._scatter(charts_data, type)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('render charts');
        let { charts_data, type } = nextProps;
        this._scatter(charts_data, type)
    }

    componentDidUpdate(){

    }

    _scatter(charts_data, type){
        console.log(`type is ${type}`);
        let itemStyle = {
            normal: {
                opacity: 1,
                // shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        };

        let dataKeys = Object.keys(charts_data)
        let legendData = []
        let seriesData = []
        for (let key of dataKeys){
            let objLegend = {name:key,value:key}
            let objSeries = {name:key,type:'scatter',itemStyle: itemStyle,data:charts_data[key]}
            legendData.push(objLegend)
            seriesData.push(objSeries)
        }

        let myChart_s = echarts.init(document.getElementById('model_zoo_chart'));

        // vec top1 top5 flops params  backbone note
        let schema_classification = [
            {name: 'sample/sec', index: 0, text: 'sample/sec'},
            {name: 'top1', index: 1, text: 'top1'},
            {name: 'top5', index: 2, text: 'top5'},
            {name: 'flops', index: 3, text: 'flops'},
            {name: 'params', index: 4, text: 'params'},
            {name: 'backbone', index: 5, text: 'backbone'},
            // {name: 'note', index: 6, text: 'note'}
        ];
        // inference_time box_AP mask_AP train_mem backbone
        let schema_detection = [
            {name: 'inference_time', index: 0, text: 'inference_time'},
            {name: 'box_AP', index: 1, text: 'box_AP'},
            {name: 'mask_AP', index: 2, text: 'mask_AP'},
            {name: 'train_mem', index: 4, text: 'train_mem'},
            {name: 'backbone', index: 5, text: 'backbone'},
            // {name: 'note', index: 6, text: 'note'}
        ];

        let schema_arr = [schema_classification, schema_detection, schema_classification, schema_classification];
        let yAxis_name = ['top 1', 'mAP']

        let option = {
            // backgroundColor: '#404a59',
            backgroundColor: '#FAFAFA',
            // color: [
            //     // '#2678B2', '#FD7F28', '#339F34', '#C61714','#05828E'
            //     '#DBDA91',
            //     '#C7C7C7',
            //     '#F6B7D2',
            //     '#C39296',
            //     '#936ABB',
            //     '#D42A2F',
            //     '#339F34',
            // ],
            legend: [
                //     {
                //     name:'ls',
                //     y: 'top',
                //     data:legendData,
                //     // data: [
                //     //     {name: 'faster_rcnn', value: 'faster_rcnn'},
                //     //     {name: 'ssd', value: 'ssd'},
                //     //     {name: 'yolo3', value: 'yolo3'},
                //     //     {name: 'CornerNet', value: 'CornerNet'},
                //     //     {name: 'MaskRCNN', value: 'MaskRCNN'}],
                //     // 'faster_rcnn', 'ssd', 'yolo3', 'CornerNet', 'MaskRCNN'
                //     textStyle: {
                //         // color: '#fff',
                //         color: '#000',
                //         fontSize: 16
                //     }
                // },
                {
                    // y: 'bottom',
                    y: 'top',
                    x:'left',
                    orient:'vertical',
                    padding:[100,0,0,15],
                    data: legendData,
                    textStyle: {
                        // color: '#fff',
                        color: '#000',
                        fontSize: 12
                    }
                }],
            grid: {
                x: '20%',
                x2: 150,
                y: '18%',
                y2: '10%',
                width:650,
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {},
                }
            },
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function (obj) {
                    let value = obj.value;
                    let schema = schema_arr[type];
                    // vec top1 top5 flops params  backbone note
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                        //
                        //     // + obj.seriesName + ' ' + value[0] + '日：'
                        //     // + value[5]
                        + value[schema.length-1]
                        //     // + obj.seriesName
                        + '</div>'
                        //     {schema.map((item,i)=>(
                        //         `+${item[i].text}:${value[i]}`
                        //     ))}
                        + schema[1].text + '：' + value[1] + '<br>'
                        + schema[2].text + '：' + value[2] + '<br>'
                        + 'speed' + '：' + value[0] + '<br>'
                        + schema[3].text + '：' + value[3] + '<br>'
                        + schema[4].text + '：' + value[4] + '<br>'
                }
            },
            xAxis: {
                type: 'log',
                name: 'speed(sec)',
                nameGap: 16,
                logBase: 5,
                axisLabel:{
                    formatter: function (value, index) {
                        // if (index > 1){
                        //     return value
                        // }
                        //  return null
                        return value
                    }
                },
                // min:function(value) {
                //     return value.min - 30;
                //     return 0;
                // },
                // max: function(value) {
                //     return value.max + 20;
                // },
                // interval:500,
                nameTextStyle: {
                    // color: '#fff',
                    color: '#000',
                    fontSize: 14
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        // color: '#eee'
                        color: '#000',
                    }
                },
            },
            yAxis: {
                type: 'value',
                name: yAxis_name[type],
                nameLocation: 'end',
                nameGap: 20,
                min: function(value) {
                    return value.min - 2;
                },
                nameTextStyle: {
                    // color: '#fff',
                    color: '#000',
                    fontSize: 16
                },
                axisLine: {
                    lineStyle: {
                        // color: '#eee'
                        color: '#000',
                    }
                },
                splitLine: {
                    show: false
                }
            },
            visualMap: [
                {
                    show:false,
                    left: 'right',
                    top: '10%',
                    dimension: 3,
                    itemWidth: 0,
                    itemHeight: 0,
                    min: 100,
                    max: 5000,
                    //是否显示拖拽手柄
                    calculable: false,
                    precision: 0.001,
                    // text: ['圆形大小：显存'],
                    textGap: 30,
                    textStyle: {
                        // color: '#fff'
                        color: '#000',
                    },
                    inRange: {
                        symbolSize: [15, 20]
                        // symbolSize: [0, 0.2]
                    },
                    outOfRange: {
                        symbolSize: [20, 25],
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#444']
                        }
                    }
                },
                {
                    left: 'right',
                    bottom: '10%',
                    dimension: 1, //2 top5
                    show:false,
                    min: 0,
                    max: 50,
                    itemWidth: 0,
                    itemHeight: 0,
                    // itemHeight: 120,
                    calculable: false,
                    precision: 0.1,
                    // text: ['明暗：mAP'],
                    textGap: 30,
                    textStyle: {
                        // color: '#fff'
                        color: '#000',
                    },
                    inRange: {
                        colorLightness: [1, 0.5]
                    },
                    outOfRange: {
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#444']
                        }
                    }
                }
            ],
            series:seriesData
        };
        myChart_s.clear()
        myChart_s.setOption(option);

        myChart_s.on('legendselectchanged', function(obj) {
            var selected = obj.selected;
            var legend = obj.name;

            // 使用 legendToggleSelect Action 会重新触发 legendselectchanged Event，导致本函数重复运行
            // 使得 无 selected 对象
            var temp = "";
            for(var i in obj){//用javascript的for/in循环遍历对象的属性
                temp += i+":"+obj[i]+"\n";
                if (i==='selected'){
                    for (let j in selected){
                        temp += j+":"+obj[j]+"\n";
                    }
                }
            }
            // alert(temp);

        });
    }

    render() {
        let { style, ...props } = this.props;
        let { charts_data } = this.props
        // this._scatter(charts_data)
        let defaultStyle = { width: document.body.clientWidth-250, height: document.body.clientHeight-200 }
        // if (this.state.data === 0){
        //     return (<div id="main" style={{ width: document.body.clientWidth, height: document.body.clientHeight }}></div>)
        // }else {
        //     return (<div id="main" style={{ width: document.body.clientWidth, height: document.body.clientHeight }}></div>)
        // }
        return (<div id="model_zoo_chart" style={style}></div>)

    }
}

export default Echartstest;