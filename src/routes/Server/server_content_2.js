import React from 'react'
import {DatePicker, Card, Row, Col, message, Progress, Select, Table, Tooltip, Tag, Popconfirm, Divider} from 'antd';
import moment from 'moment';
import {HOST, WEEK_SERVER_DATA, SERVER_STU, ONE_DAY, PREIOD_TIME} from '../../utils/url_config'
import LoadableComponent from "../../utils/LoadableComponent";
import './server_content_2.less'
import {_fetch, deepCopy, timestamp2Date} from "../../utils/utils";
import {tag_info} from "./server_info_data";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

// const Chart_step = LoadableComponent(()=>import('../../components/Charts/Step'))
const Chart_step = LoadableComponent(()=>import('../../components/Charts/Server_Chart'))

function onOk(value) {
    console.log('onOk: ', value);
}



export default class Server_content_2 extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            date_mode: 1, // 0: 24 小时 12 份; 1: 一周 7 天; 10: custom 小时 ; 11: custom 天
            tagMode: 0, // 显存, 温度, GPU 利用率
            data8:[],
            fields : ["0","1","2","3","4","5","6","7"],
            max_gpu: 12196,
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
        this.onChange = this.onChange.bind(this);
        this.onOk_24 = this.onOk_24.bind(this);
        this.dateModeChanged = this.dateModeChanged.bind(this);
        this.tagModeChanged = this.tagModeChanged.bind(this);
        this.rangePickerOk = this.rangePickerOk.bind(this);
        this._generate_table_data = this._generate_table_data.bind(this)

      }

    dateModeChanged(value){
          this.setState({
              date_mode:value
          })
    }
    tagModeChanged(value){
        this.setState({
            tagMode:value
        })
    }

    rangePickerOk(value){
        let start_time = Math.round(value[0]._d.getTime()/1000)
        let end_time = Math.round(value[1]._d.getTime()/1000)
        console.log(`开始时间 -- ` + start_time)
        console.log(`结束时间 -- ` + end_time)
        let query_url = HOST() + PREIOD_TIME
        let mess_load = message.loading('查询中', 0);

        _fetch(query_url,{
            start_time,
            end_time,
            ip_list:[this.server_info.host],
            "count":9
        },(json)=>{
            mess_load()
            if (json.status === 200){
                console.log(json.err_msg)

                let response_json = deepCopy(json.err_msg)
                this._generate_table_data(response_json[0].data_info)

                let chart_data = json.err_msg[0].data_info.map((value, index)=>{
                    let value_tmp = Object.assign({},value)
                    // console.log(value_tmp)
                    if (Object.keys(value).length !== 0){
                        // value 字段表示 显存
                        value.value = 0
                        value.temperature = 0
                        value.timestamp = timestamp2Date('m-d-H:i',value.timestamp)
                        if (value.gpu_info.length > 0){
                            let reduceStruct = value.gpu_info.reduce((initValue, item)=>{
                                return {
                                    usedMemry:initValue.usedMemry + item.usedMemry,
                                    percent:initValue.percent + item.percent,
                                    temp: initValue.temp + item.temp
                                }
                            },{ usedMemry:0, percent: 0 , temp: 0})
                            value.value = Math.round(reduceStruct.usedMemry/(1024*1024))
                            value.temperature = Math.round(reduceStruct.temp)
                            value.GPU_use_percent = reduceStruct.percent
                        }
                    }
                    return value
                })
                // 倒叙
                // chart_data = chart_data.reverse()
                console.log(chart_data)
                let max_gpu = this.state.max_gpu
                let fields = []
                chart_data = chart_data.map((value, index)=>{
                    // value.gpu_totalMemry = value.gpu_info[0].totalMemry*value.gpu_info.length / 1024 / 1024
                    // 平均值
                    value.gpu_totalMemry = Math.round(value.gpu_info[0].totalMemry*value.gpu_info.length / 1024 / 1024 / value.gpu_info.length)
                    if (index === 0){
                        max_gpu = value.gpu_totalMemry
                    }
                    // 平均值
                    value.temperature = Math.round(value.temperature / value.gpu_info.length)
                    value.GPU_use_percent = Math.round(value.GPU_use_percent / value.gpu_info.length)
                    value.gpu_value = Math.round(value.value / value.gpu_info.length)
                    for (let gpu of value.gpu_info){
                        value[[gpu.fan]] = `${Math.round(gpu.usedMemry / 1024 / 1024)}Mib (${gpu.name} 显存:${Math.round(gpu.usedMemry / 1024 / 1024)}Mib,显卡占用率:${gpu.percent}%,温度:${gpu.temp}℃)`
                        if ( index === 0 ){
                            fields.push(gpu.fan)
                        }
                    }
                    return value
                })
                console.log(chart_data)
                fields = fields.reverse()
                fields = fields.map((value, index)=>{
                    return value.toString()
                })
                this.setState({
                    chart_data,
                    max_gpu,
                    fields
                },()=>{
                    console.log(chart_data)
                })
            }
            else {
                console.log(json.err_msg)
            }
        })
    }

    onOk_24(date, dateString){

        if (date === null){
            return
        }

        let timestamp = Math.round(date._d.getTime()/1000)
        let query_url = HOST() + ONE_DAY
        let mess_load = message.loading('查询中', 0);
        _fetch(query_url,{
            timestamp:timestamp,
            ip_list:[this.server_info.host]
        },(json)=>{
            mess_load()
            if (json.status === 200){
                console.log(json.err_msg)
                let response_json = deepCopy(json.err_msg)
                this._generate_table_data(response_json[0].data_info)
                let chart_data = json.err_msg[0].data_info.map((value, index)=>{
                    let value_tmp = Object.assign({},value)
                    console.log(value_tmp)
                    if (Object.keys(value).length !== 0){
                        // value 字段表示 显存
                        value.value = 0
                        value.temperature = 0
                        value.timestamp = timestamp2Date('H:i',value.timestamp)
                        if (value.gpu_info.length > 0){
                            let reduceStruct = value.gpu_info.reduce((initValue, item)=>{
                                return {
                                    usedMemry:initValue.usedMemry + item.usedMemry,
                                    percent:initValue.percent + item.percent,
                                    temp: initValue.temp + item.temp
                                }
                            },{ usedMemry:0, percent: 0 , temp: 0})
                            value.value = Math.round(reduceStruct.usedMemry/(1024*1024))
                            value.temperature = Math.round(reduceStruct.temp)
                            value.GPU_use_percent = reduceStruct.percent
                        }
                    }
                    return value
                })
                // 倒叙
                // chart_data = chart_data.reverse()
                console.log(chart_data)
                let max_gpu = this.state.max_gpu
                let fields = []
                chart_data = chart_data.map((value, index)=>{
                    // value.gpu_totalMemry = value.gpu_info[0].totalMemry*value.gpu_info.length / 1024 / 1024
                    // 平均值
                    value.gpu_totalMemry = Math.round(value.gpu_info[0].totalMemry*value.gpu_info.length / 1024 / 1024 / value.gpu_info.length)
                    if (index === 0){
                        max_gpu = value.gpu_totalMemry
                    }
                    // 平均值
                    value.temperature = Math.round(value.temperature / value.gpu_info.length)
                    value.GPU_use_percent = Math.round(value.GPU_use_percent / value.gpu_info.length)
                    value.gpu_value = Math.round(value.value / value.gpu_info.length)
                    for (let gpu of value.gpu_info){
                        value[[gpu.fan]] = `${Math.round(gpu.usedMemry / 1024 / 1024)}Mib (${gpu.name} 显存:${Math.round(gpu.usedMemry / 1024 / 1024)}Mib,显卡占用率:${gpu.percent}%,温度:${gpu.temp}℃)`
                        if ( index === 0 ){
                            fields.push(gpu.fan)
                        }
                    }
                    return value
                })
                console.log(chart_data)
                fields = fields.reverse()
                fields = fields.map((value, index)=>{
                    return value.toString()
                })
                this.setState({
                    chart_data,
                    max_gpu,
                    fields
                },()=>{
                    console.log(chart_data)
                })
            }
            else {
                console.log(json.err_msg)
            }
        })
    }

    onChange(date, dateString){

        if (date === null){
            return
        }

        let timestamp = Math.round(date._d.getTime()/1000)
        let query_url = HOST() + WEEK_SERVER_DATA
        let mess_load = message.loading('查询中', 0);
        _fetch(query_url,{
            start_time:timestamp,
            end_time:timestamp,
            ip_list:[this.server_info.host]
        },(json)=>{
            mess_load()
            if (json.status === 200){
                let response_json = deepCopy(json.err_msg)
                this._generate_table_data(response_json[0].data_info)

                let chart_data = json.err_msg[0].data_info.map((value, index)=>{
                    if (Object.keys(value).length !== 0){
                        // value 字段表示 显存
                        value.value = 0
                        value.temperature = 0
                        value.timestamp = timestamp2Date('m-d',value.timestamp)
                        if (value.gpu_info.length > 0){
                            let reduceStruct = value.gpu_info.reduce((initValue, item)=>{
                                return {
                                    usedMemry:initValue.usedMemry + item.usedMemry,
                                    percent:initValue.percent + item.percent,
                                    temp: initValue.temp + item.temp
                                }
                            },{ usedMemry:0, percent: 0 , temp: 0})
                            value.value = Math.round(reduceStruct.usedMemry/(1024*1024))
                            value.temperature = Math.round(reduceStruct.temp)
                            value.GPU_use_percent = reduceStruct.percent
                        }
                    }
                    return value
                })
                // 倒叙 倒叙这里已删除 由后端统一排序
                // chart_data = chart_data.reverse()
                console.log(Object.assign({}, chart_data))
                let max_gpu = this.state.max_gpu
                let fields = []
                chart_data = chart_data.map((value, index)=>{
                    // value.gpu_totalMemry = value.gpu_info[0].totalMemry*value.gpu_info.length / 1024 / 1024
                    // 平均值
                    value.gpu_totalMemry = Math.round(value.gpu_info[0].totalMemry*value.gpu_info.length / 1024 / 1024 / value.gpu_info.length)
                    if (index === 0){
                        max_gpu = value.gpu_totalMemry
                    }
                    // 平均值
                    value.temperature = Math.round(value.temperature / value.gpu_info.length)
                    value.GPU_use_percent = Math.round(value.GPU_use_percent / value.gpu_info.length)
                    value.gpu_value = Math.round(value.value / value.gpu_info.length)
                    for (let gpu of value.gpu_info){
                        value[[gpu.fan]] = `${Math.round(gpu.usedMemry / 1024 / 1024)}Mib (${gpu.name} 显存:${Math.round(gpu.usedMemry / 1024 / 1024)}Mib,显卡占用率:${gpu.percent}%,温度:${gpu.temp}℃)`
                        if ( index === 0 ){
                            fields.push(gpu.fan)
                        }
                    }
                    return value
                })
                console.log(chart_data)
                fields = fields.reverse()
                fields = fields.map((value, index)=>{
                    return value.toString()
                })
                this.setState({
                    chart_data,
                    max_gpu,
                    fields
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
        // let query_url = HOST() + SERVER_STU
        // _fetch(query_url, {
        //     'ip_list':[
        //         {
        //             'host':this.server_info.host,
        //             'name':this.server_info.name
        //         }
        //     ]
        // },(json)=>{
        //     if (json.status === 200) {
        //         console.log(json.err_msg)
        //     }else {
        //         console.log(json.err_msg)
        //     }
        //
        // })
    }

    _generate_table_data(data){
        console.log(data)


        // 这里数组 里每个元素代表不同时间的 data_info 信息
        data = data.map((value,index)=>{
            value.value = 0
            value.temperature = 0

            if (value.gpu_info.length > 0){
                let reduceStruct = value.gpu_info.reduce((initValue, item)=>{
                    return {
                        usedMemry:initValue.usedMemry + item.usedMemry,
                        percent:initValue.percent + item.percent,
                        temp: initValue.temp + item.temp
                    }
                },{ usedMemry:0, percent: 0 , temp: 0})


                value.gpu_totalMemry = Math.round(value.gpu_info[0].totalMemry*value.gpu_info.length / 1024 / 1024 / value.gpu_info.length)
                console.log(value.gpu_totalMemry)

                value.value = Math.round(reduceStruct.usedMemry/(1024*1024)/ value.gpu_info.length)
                value.temperature = Math.round(reduceStruct.temp/ value.gpu_info.length)
                value.GPU_use_percent = Math.round(reduceStruct.percent / value.gpu_info.length)
            }

            return Object.assign({}, value, {'key':index.toString()})
        })
        this.setState({
            data8:data
        })
    }

    columns8 = [
        {
            title: '时间',
            dataIndex: 'timestamp',
            width: '10%',
            editable: true,
            sorter:(a, b)=>{
                return a.timestamp - b.timestamp
            },
            defaultSortOrder: 'ascend',
            render:(text, record)=>{
                let Date_picker_custom;
                switch (this.state.date_mode) {
                    case 0:
                        Date_picker_custom = timestamp2Date('H:i',text)
                        break;
                    case 1:
                        Date_picker_custom = timestamp2Date('m-d',text)
                        break;
                    case 10:
                        Date_picker_custom = timestamp2Date('m-d-H:i',text)

                        break;
                    default:
                        Date_picker_custom = timestamp2Date('m-d-H:i',text)
                        break;
                }
                return Date_picker_custom
            }
        },
        {
            title: '平均显存',
            dataIndex: 'value',
            width: '15%',
            editable: true,
            sorter: (a, b)=>{
                return a.value-b.value
            },
            defaultSortOrder: 'ascend',
            render:(text, record)=>{
                let tag_type = record.value/record.gpu_totalMemry;
                if (tag_type >= 0 && tag_type <= 0.25) tag_type = 'purple'
                else if (tag_type > 0.25 && tag_type <= 0.5) tag_type = '#87d068'
                else if (tag_type > 0.5 && tag_type <= 0.75) tag_type = '#2db7f5'
                else if (tag_type > 0.75 ) tag_type = "#f50"

                return (
                    <Tag color={tag_type} style={{marginTop: 5, marginBottom:5}}>
                        {`${text}Mib`}
                    </Tag>
                )

            }
        },
        {
            title: '平均温度',
            dataIndex: 'temperature',
            width: '15%',
            editable: true,
            sorter: (a, b)=>{
                return a.temperature-b.temperature
            },
            defaultSortOrder: 'ascend',
            render:(text, record)=>{
                let tag_type = record.temperature/100;
                if (tag_type >= 0 && tag_type <= 0.25) tag_type = 'purple'
                else if (tag_type > 0.25 && tag_type <= 0.5) tag_type = '#87d068'
                else if (tag_type > 0.5 && tag_type <= 0.75) tag_type = '#2db7f5'
                else if (tag_type > 0.75 ) tag_type = "#f50"

                return (
                    <Tag color={tag_type} style={{marginTop: 5, marginBottom:5}}>
                        {`${text}℃`}
                    </Tag>
                )
            }
        },
        {
            title: '平均显存占用率',
            dataIndex: 'GPU_use_percent',
            width: '15%',
            editable: true,
            sorter: (a, b)=>{
                return a.GPU_use_percent-b.GPU_use_percent
            },
            defaultSortOrder: 'ascend',
            render:(text, record)=>{
                let tag_type = record.GPU_use_percent/100;
                if (tag_type >= 0 && tag_type <= 0.25) tag_type = 'purple'
                else if (tag_type > 0.25 && tag_type <= 0.5) tag_type = '#87d068'
                else if (tag_type > 0.5 && tag_type <= 0.75) tag_type = '#2db7f5'
                else if (tag_type > 0.75 ) tag_type = "#f50"

                return (
                    <Tag color={tag_type} style={{marginTop: 5, marginBottom:5}}>
                        {`${text}%`}
                    </Tag>
                )
            }
        },
        {
            title: 'GPU信息',
            dataIndex: 'gpu_info',
            // width: '60%',
            render:(text, record) =>{
                if (text.length > 0){
                    // console.log(record)
                    let gpu_info = text.map((info, index)=>{
                        let tag_type = 0
                        switch (this.state.tagMode) {
                            case 0:
                                // 显存占用
                                tag_type = info.usedMemry/info.totalMemry;
                                break;
                            case 1:
                                // 温度
                                tag_type = info.temp/ 100;
                                break;
                            case 2:
                                // gpu 利用率
                                tag_type = info.percent/ 100;
                                break;
                            default:
                                tag_type = info.usedMemry/info.totalMemry
                                break;
                        }

                        if (tag_type > 0 && tag_type <= 0.25) tag_type = 'purple'
                        else if (tag_type > 0.25 && tag_type <= 0.5) tag_type = '#87d068'
                        else if (tag_type > 0.5 && tag_type <= 0.75) tag_type = '#2db7f5'
                        else if (tag_type > 0.75 ) tag_type = "#f50"
                        return (
                            <Tooltip placement="top" title={()=>{
                                return (
                                    <div>
                                        <p>{`显卡${info.fan}`}</p>
                                        <p>{`总显存:${Math.round(info.totalMemry/(1024*1024))}MiB`}</p>
                                        <p>{`已用显存:${Math.round(info.usedMemry/(1024*1024))}MiB`}</p>
                                        <p>{`显存利用率:${info.percent}%`}</p>
                                        <p>{`温度:${info.temp}℃`}</p>
                                        <p>{`功耗:${info.power}`}</p>
                                    </div>
                                )
                            }}>
                                <Tag color={tag_type} style={{marginTop: 5, marginBottom:5}}>
                                    {info.name.split(' ').slice(0, 3).join(' ')}
                                </Tag>
                            </Tooltip>
                        )
                    })
                    return (
                        <div>
                            {gpu_info}
                        </div>
                    )
                }
                else {
                    return (
                        <div>
                            暂未采集
                        </div>
                    )
                }
            }
        },
    ]

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
                      // console.log(this.state.chart_data[i])
                      sum += this.state.chart_data[i].GPU_use_percent
                  }
              }
              GPU_use_percent = Math.round(sum/num*100)/100
              console.log(GPU_use_percent)
              GPU_use_percent = GPU_use_percent > 100 ? GPU_use_percent / 10 : GPU_use_percent
              diskTotal = this.state.chart_data[this.state.chart_data.length-1].diskTotal
              diskUsage = this.state.chart_data[this.state.chart_data.length-1].diskUsage
          }
          let Date_picker_custom;
          switch (this.state.date_mode) {
              case 0:
                  Date_picker_custom = <DatePicker showToday={false}
                                                   // showTime
                                                   placeholder="选择时间"
                                                   // onOk={this.onOk_24}
                                                   onChange={this.onOk_24}
                  />
                  break;
              case 1:
                  Date_picker_custom = <DatePicker showToday={false} onChange={this.onChange} />
                  break;
              case 10:
                  Date_picker_custom = <RangePicker
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      placeholder={['Start Time', 'End Time']}
                      onOk={this.rangePickerOk}
                  />
                  break;
              default:
                  Date_picker_custom = <DatePicker onChange={this.onChange} />
                  break
          }

          return (
          <div className={'server_content_2'}>
              <Row gutter={16} style={{backgroundColor:'#F0F2F5', padding:10}}>
                  <Col span={24} >
                      <Card hoverable bordered={false} title={this.server_info.name || 'GPU 使用信息'} >
                          <Select defaultValue={this.state.date_mode} onChange={this.dateModeChanged} style={{ width: 120, marginRight:5 }}>
                              <Option value={0}>24 小时</Option>
                              <Option value={1}>一周</Option>
                              <Option value={10}>时间区间</Option>
                          </Select>
                          {Date_picker_custom}
                          {/*<DatePicker onChange={this.onChange} />*/}
                          <Chart_step data={this.state.chart_data} cols={{
                              temperature: {
                                  alias:'温度',
                                  type: 'linear',
                                  min: 0,
                                  max:100,
                              },
                              // value:{
                              //     alias:'显存占用',
                              //     min: 0,
                              //     max: this.state.max_gpu
                              // },
                              gpu_value:{
                                  alias:'平均显存占用',
                                  min: 0,
                                  max: this.state.max_gpu
                              },
                              GPU_use_percent:{
                                  alias:'GPU利用率',
                                  type: 'linear',
                                  min: 0,
                                  max:100,
                              }
                          }}
                                      fields={this.state.fields}
                                      height={343}/>
                          <Select defaultValue={0} onChange={this.tagModeChanged} style={{ width: 120 }}>
                              <Option value={0}>显存</Option>
                              <Option value={1}>温度</Option>
                              <Option value={2}>GPU 利用率</Option>
                          </Select>
                          <Tag color={"#f50"} style={{marginLeft:20}}>
                              {tag_info[this.state.tagMode][0]}
                          </Tag>
                          <Tag color={'#2db7f5'}>
                              {tag_info[this.state.tagMode][1]}
                          </Tag>
                          <Tag color={'#87d068'}>
                              {tag_info[this.state.tagMode][2]}
                          </Tag>
                          <Tag color={"purple"}>
                              {tag_info[this.state.tagMode][3]}
                          </Tag>
                          <Table style={style.tableStyle} dataSource={this.state.data8}
                                 columns={this.columns8}
                                 // pagination={false}
                                 expandedRowRender={record => {
                                     let show_component = record.gpu_info.map((info, index)=>{

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
                                     return (
                                         <div>
                                             {show_component}
                                         </div>
                                     )
                                 }}
                                 />
                      </Card>
                  </Col>
              </Row>
              <Row gutter={16} style={{backgroundColor:'#F0F2F5', padding:10, }}>
                  <Col  span={24} >
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
              <Row gutter={16} style={{backgroundColor:'#F0F2F5', padding:10, }}>
                  <Col span={24} >
                      <Card hoverable bordered={false} title={ `CPU ${server_info.cpu_model}`}
                      style={{height:250}}>
                          <Row gutter={16} type="flex" align="middle" justify="space-around">
                              <Col span={8} style={style.cpu_col}>
                                  <Progress type="circle" percent={(server_info.cpuUsagePercent/(server_info.cpu_num*100)*100).toFixed(2)}
                                            strokeColor={'#46A3FC'}
                                            format={percent => percent + '%'}
                                  />
                                  <div style={{marginTop:10}}>
                                      {/*{`CPU占用${server_info.cpuUsagePercent}%`}*/}
                                      {`CPU占用`}
                                  </div>
                              </Col>
                              <Col span={8} style={style.cpu_col}>
                                  <Progress type="circle" percent={(server_info.UsageMemory/server_info.TotalMemory*100).toFixed(2)}
                                            strokeColor={'#6FD18C'}
                                  />
                                  <div style={{marginTop:10}}>
                                      {`内存占用(${server_info.UsageMemory}G/${server_info.TotalMemory}G)`}
                                  </div>
                              </Col>
                              <Col span={8} style={style.cpu_col}>
                                  <Progress type="circle" percent={(server_info.diskUsage/server_info.diskTotal*100).toFixed(2)}
                                            strokeColor={'#FBDA6D'}
                                  />
                                  <div style={{marginTop:10}}>
                                      {`硬盘(${server_info.diskUsage}G/${server_info.diskTotal}G)`}
                                  </div>
                              </Col>
                          </Row>
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
    },
    tableStyle: {
        width: '100%',
        marginTop:20
    },
}