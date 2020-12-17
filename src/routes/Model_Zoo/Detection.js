import React from 'react'
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import {BackTop, Card, Divider, Table} from "antd";
import {withRouter} from "react-router-dom";
import { Detect_COCO_table_data, Detect_COCO_charts_data } from '../../data/Model_Zoo_det'

import './model_zoo.css'
import baidu_icon from "../../assets/icon/model_zoo_icon/baidu.png";
import google_icon from "../../assets/icon/model_zoo_icon/google.png";
import {Classification_Image_charts_data} from "../../data/Model_Zoo_cla";
import Echartstest from "../../components/Charts/Echartstest";


@withRouter
export default class Detection extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    setRowClassName(record, index){
        // console.log(record)
        //   let num = index%6
        if (record['type']===1){
            return 'model_zoo_table_1_row'
        }
    }

    colums_detection = [{
        title: 'Method',
        dataIndex: 'Method',
        key: 'Method',
        align:'center',
        render: (text, record, index) => {
            const obj = {
                children: text,
                props: {},
            };
            if (index%3===0){
                obj.props.rowSpan = 3;
            }else {
                obj.props.rowSpan = 0;
            }
            obj.props.style = style.table_text;
            return obj;
        },
    }, {
        title: 'Backbone',
        dataIndex: 'Backbone',
        key: 'Backbone',
        align:'center',
        render: (text, record, index) => {
            let href_str = record['href'] || 'https://pan.baidu.com/s/1SYNAa78wgPS-5P2FRLl1qQ'
            return (<a herf={href_str} style={{display:'flex',justifyContent:'center' ,...style.table_text}}>{text}</a>)
        },
    },{
        title: 'train mem (GB)',
        dataIndex: 'train_mem',
        key: 'train_mem',
        align:'center',
        render: (text, record, index) => {
            return (<p style={style.table_text}>{text}</p>)
        },
    },{
        title: 'inference time',
        dataIndex: 'inference_time',
        key: 'inference_time',
        align:'center',
        render: (text, record, index) => {
            return (<p style={style.table_text}>{text}</p>)
        },
    },{
        title: 'box AP',
        dataIndex: 'box_AP',
        key: 'box_AP',
        align:'center',
        render: (text, record, index) => {
            return (<p style={style.table_text}>{text}</p>)
        },
    },{
        title: 'mask_AP',
        dataIndex: 'mask_AP',
        key: 'mask_AP',
        align:'center',
        render: (text, record, index) => {
            return (<p style={style.table_text}>{text}</p>)
        },
    },

    ];

    render() {
        return (
            <div>
                <Card bordered={false} title='检测' style={{marginBottom: 10, minHeight: 440}} id='editTable'>
                    <Echartstest style={{ width: 'auto', height: document.body.clientHeight-200,marginBottom:10}} charts_data={ Detect_COCO_charts_data } type={1}/>
                    <Table className={'model_zoo_table_1'} columns={this.colums_detection} dataSource={Detect_COCO_table_data}  pagination={false}  bordered
                           rowClassName={this.setRowClassName}/>
                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

const style = {
    table_text:{
        // fontSize:15*screen_scale_width,
        fontSize:15,
        fontWeight:500,
        // textAlign:'center',
    }
}