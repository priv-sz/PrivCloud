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
        let query_url = HOST() + WEEK_SERVER_DATA
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
        console.log(this.server_info)
    }

    render() {
          let server_info = this.server_info.data_info[0]

          let show_component = server_info.gpu_info.map((info, index)=>{

              let tag_type = info.usedMemry/info.totalMemry
              if (tag_type > 0 && tag_type <= 0.25) tag_type = 'purple'
              else if (tag_type > 0.25 && tag_type <= 0.5) tag_type = '#87d068'
              else if (tag_type > 0.5 && tag_type <= 0.75) tag_type = '#2db7f5'
              else if (tag_type > 0.75 ) tag_type = "#f50"

              let child_component = info.script.map((gpu_process, index)=>{
                  return (
                      <p><span>{`${info.fan}卡:`}</span><span style={{color:'#2db7f5'}}>{`${gpu_process.user}`}</span>训练<span style={{color:tag_type}}>{`${gpu_process.config}`}</span>持续<span style={{color:'orange'}}>{`${gpu_process.duration}`}</span></p>
                  )}
              )
              return (
                  <div>
                      {child_component}
                  </div>
              )
          })

          let GPU_use_percent = 0
          let diskTotal = 500
          let diskUsage = 0
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
              diskTotal = this.state.chart_data[this.state.chart_data.length-1].diskTotal
              diskUsage = this.state.chart_data[this.state.chart_data.length-1].diskUsage
          }

          return (
          <div className={'server_content_2'}>
              <Row gutter={16} style={{backgroundColor:'#F0F2F5', padding:10}}>
                  <Col span={18} >
                      <Card hoverable bordered={false} title={this.server_info.name || 'GPU 使用信息'} >
                          <DatePicker onChange={this.onChange} />
                          <Chart_step data={this.state.chart_data} cols={{
                              timestamp: {
                                  range: [0, 1]
                              },
                              value:{
                                  // tickCount:5, // 10 个区间
                                  alias:'显存占用',
                                  min: 0,
                              }
                          }} height={343}/>
                      </Card>
                  </Col>
                  <Col  span={6} >
                      <Row>
                          <Card hoverable bordered={false} title={'GPU 利用率'} >
                              <Row span={24} type={'flex'} align={'center'}>
                                  <Progress type="circle" percent={GPU_use_percent.toFixed(2)}
                                            strokeColor={'#F87E0E'}
                                  />
                              </Row>
                          </Card>
                      </Row>
                      <Row style={{marginTop:15}}>
                          <Card hoverable bordered={false} title={'硬盘空间'} >
                              <Row span={24} type={'flex'} align={'center'}>
                                  <Progress type="circle" percent={(server_info.diskUsage/server_info.diskTotal*100).toFixed(2)}
                                            strokeColor={'#0BCB2B'}
                                  />
                                  <div>
                                      {`${server_info.diskUsage}G / ${server_info.diskTotal}G`}
                                  </div>
                              </Row>
                          </Card>
                      </Row>
                  </Col>
              </Row>
              <Row gutter={16} style={{backgroundColor:'#F0F2F5', padding:10, }}>
                  <Col span={18} >
                      <Card hoverable bordered={false} title={ `CPU ${server_info.cpu_model}`}
                      style={{height:250}}>
                          <Row gutter={16} type="flex" align="middle" justify="space-around">
                              <Col span={8} style={style.cpu_col}>
                                  <Progress type="circle" percent={(server_info.cpuUsagePercent/(server_info.cpu_num*100)*100).toFixed(2)}
                                            strokeColor={'#46A3FC'}
                                            format={percent => percent + '%'}
                                  />
                                  <div style={{marginTop:10}}>
                                      {`CPU占用${server_info.cpuUsagePercent}%`}
                                  </div>
                              </Col>
                              <Col span={8} style={style.cpu_col}>
                                  <Progress type="circle" percent={(server_info.UsageMemory/server_info.TotalMemory*100).toFixed(2)}
                                            strokeColor={'#6FD18C'}
                                  />
                                  <div style={{marginTop:10}}>
                                      {'内存占用'}
                                  </div>
                              </Col>
                              <Col span={8} style={style.cpu_col}>
                                  <Progress type="circle" percent={(server_info.diskUsage/server_info.diskTotal*100).toFixed(2)}
                                            strokeColor={'#FBDA6D'}
                                  />
                                  <div style={{marginTop:10}}>
                                      {`硬盘`}
                                  </div>
                              </Col>
                          </Row>
                      </Card>
                  </Col>
                  <Col  span={6} >
                      <Card hoverable bordered={false} title={'当前进程'}
                            style={{height:250,overflow:'scroll'}}>
                          <div className={'overflow_div'}
                              style={{
                          }}>
                              {show_component}
                          </div>
                      </Card>
                  </Col>
              </Row>
          </div>

          )
      }
}

const style = {
    cpu_col:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
}