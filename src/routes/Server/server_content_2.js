import React from 'react'
import {DatePicker, Card, Row, Col, message, Progress} from 'antd';
import moment from 'moment';
import {HOST, WEEK_SERVER_DATA} from '../../utils/url_config'
import LoadableComponent from "../../utils/LoadableComponent";
import './server_content_2.less'
import {_fetch, timestamp2Date} from "../../utils/utils";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const Chart_step = LoadableComponent(()=>import('../../components/Charts/Step'))

export default class Server_content_2 extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            chart_data : [],
            chart_cols:{
                          timestamp: {
                              range: [0, 1]
                          },
                          value:{
                              // tickCount:5, // 10 个区间
                              alias:'显存占用'
                          }
            }
        };
        this.onChange = this.onChange.bind(this)
      }

    onChange(date, dateString){
        let timestamp = Math.round(date._d.getTime()/1000)
        let query_url = HOST + WEEK_SERVER_DATA
        let mess_load = message.loading('查询中', 0);
        _fetch(query_url,{
            start_time:timestamp,
            end_time:timestamp,
            ip_list:[this.server_info.host]
        },(json)=>{
            if (json.status === 200){
                message.success('查询成功', )
                console.log(json.err_msg)
                mess_load()
                let chart_data = json.err_msg[0].data_info.map((value, index)=>{
                    if (Object.keys(value).length !== 0){
                        // value 字段表示 显存
                        value.value = 0
                        value.timestamp = timestamp2Date('m-d',value.timestamp)
                        if (value.gpu_info.length > 0){
                            let reduceStruct = value.gpu_info.reduce((initValue, item)=>{
                                    return {
                                        usedMemry:initValue.usedMemry + item.usedMemry,
                                        percent:initValue.percent + item.percent
                                    }
                            },{ usedMemry:0, percent: 0 })
                            value.value = Math.round(reduceStruct.usedMemry/(1024*1024))
                            value.GPU_use_percent = reduceStruct.percent
                        }
                    }
                    return value
                })
                // 倒叙
                chart_data = chart_data.reverse()
                this.setState({
                    chart_data
                },()=>{
                    console.log(chart_data)
                })
            }
            else {
                console.log(json.err_msg)
            }
        })
    }

    componentWillMount() {
        let { name, interval, user, pwd, host } = this.props.server_info
        this.server_info = this.props.server_info
    }

    render() {
          let GPU_use_percent = 0
          if (this.state.chart_data.length > 0){
              let num = 0
              let sum = 0

              for (let i =0; i< this.state.chart_data.length; i++){
                  if (this.state.chart_data[i].hasOwnProperty('GPU_use_percent')){
                      num++
                      console.log(this.state.chart_data[i])
                      sum += this.state.chart_data[i].GPU_use_percent
                  }
              }
              GPU_use_percent = Math.round(sum/num*100)/100
              console.log(GPU_use_percent)
              GPU_use_percent = GPU_use_percent > 100 ? GPU_use_percent / 10 : GPU_use_percent
          }

          return (
          <div className={'server_content_2'}>
              <Row gutter={16} style={{backgroundColor:'#F0F2F5', padding:10}}>
                  <Col span={18} >
                      <Card bordered={false} title={this.server_info.name || 'GPU 使用信息'} >
                          <DatePicker onChange={this.onChange} />
                          <Chart_step data={this.state.chart_data}/>
                      </Card>
                  </Col>
                  <Col  span={6} >
                      <Card bordered={false} title={'GPU 利用率'} >
                          <Row span={24} type={'flex'} align={'center'}>
                              <Progress type="circle" percent={GPU_use_percent.toFixed(2)}
                                        strokeColor={'#F87E0E'}
                              />
                          </Row>
                      </Card>
                  </Col>
              </Row>
          </div>

          )
      }
}
