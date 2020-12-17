import React from 'react'
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import {BackTop, Card, Divider, Table} from "antd";
import {withRouter} from "react-router-dom";
import { Classification_Image_table_data, Classification_Image_charts_data } from '../../data/Model_Zoo_cla'

import './model_zoo.css'
import baidu_icon from "../../assets/icon/model_zoo_icon/baidu.png";
import google_icon from "../../assets/icon/model_zoo_icon/google.png";
import Echartstest from "../../components/Charts/Echartstest"

@withRouter
export default class Classification extends React.Component{
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

    columns_classification = [{
        title: 'Network',
        dataIndex: 'Network',
        key: 'Network',
        align:'center',
        render: (text, record, index) => {
            index = Number(index)
            let href_str = record['href'] || 'https://github.com/BUPT-PRIV/Pet-dev/blob/master/cfgs/cls/imagenet/hrnet/aligned_hrnet_w48.yaml'

            return (<a href={href_str} style={style.table_text} target="_blank">{text}</a>)
        },
    }, {
        title: 'Top1/Top5',
        dataIndex: 'Top1/Top5',
        key: 'Top1/Top5',
        align:'center',
        render: (text, record, index) => {
            return (<p style={style.table_text}>{text}</p>)
        },
    },{
        title: 'speed',
        dataIndex: 'speed',
        key: 'speed',
        align:'center',
        render: (text, record, index) => {
            return (<p style={style.table_text}>{text}</p>)
        },
    }, {
        title: 'Params',
        dataIndex: 'Params',
        key: 'Params',
        align:'center',
        render: (text, record, index) => {
            return (<p style={style.table_text}>{text}</p>)
        },
    },{
        title: 'Flops',
        dataIndex: 'Flops',
        key: 'Flops',
        align:'center',
        render: (text, record, index) => {
            return (<p style={style.table_text}>{text}</p>)
        },
    }, {
        title: 'download',
        dataIndex: 'download',
        align:'center',
        key: 'download',
        render: (text, record, index) => {
            return (
                <div>
                    <a href={record['download']['baidu_download']} target="_blank" style={style.table_text}>
                        <img src={baidu_icon} />
                    </a>
                    <span style={{...style.table_text, marginLeft:10, fontWeight:500, color:'#31B7F8'}}>
                    {record['download']['baidu_code']}
                    </span>
                    <Divider type="vertical" />
                    <a href={'https://pan.baidu.com/s/1SYNAa78wgPS-5P2FRLl1qQ'} target="_blank" style={style.table_text}>
                        <img src={google_icon} />
                    </a>
                    {/*<span style={{...style.table_text, marginLeft:10*screen_scale_width, fontWeight:500, color:'#31B7F8'}}>*/}
                    {/*        1234*/}
                    {/*</span>*/}
                </div>
            )
        },
    },
    ];

      render() {
          return (
              <div>
                  <Card bordered={false} title='分类' style={{marginBottom: 10, minHeight: 440}} id='editTable'>
                      <Echartstest style={{ width: 'auto', height: document.body.clientHeight-200,marginBottom:10}} charts_data={ Classification_Image_charts_data } type={0}/>
                      <Table className={'model_zoo_table_1'} columns={this.columns_classification} dataSource={Classification_Image_table_data}  pagination={false}  bordered
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