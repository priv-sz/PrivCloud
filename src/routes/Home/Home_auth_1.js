import React from 'react'
import {Card, Table, BackTop, Tabs, message, Icon, Tag, Popconfirm, Divider, Select, Tooltip, Button} from 'antd'
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import male from "../../assets/icon/Male.ico";
import female from "../../assets/icon/Female.ico";
import {_fetch, getGrade, timestamp2Date} from "../../utils/utils";
import {ALL_SERVER, ALL_STUDENT, HOST, ONE_DAY} from "../../utils/url_config";
import LoadableComponent from "../../utils/LoadableComponent";
import {isAuthenticated} from "../../utils/Session";
import {tag_info} from "../Server/server_info_data";

let local_url = HOST()

const Chart_step = LoadableComponent(()=>import('../../components/Charts/Student_Chart_server'))

const { Option } = Select;
const { TabPane } = Tabs;

export default class Home_auth_1 extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tagMode: 0
        };
        this.jump = this.jump.bind(this);
        this._onOk_24 = this._onOk_24.bind(this);
        this.tagModeChanged = this.tagModeChanged.bind(this)
      }

    componentDidMount() {
        let query_url = HOST() + ALL_STUDENT

        _fetch(query_url,{},(json)=>{
            let server_data = json.err_msg
            console.log(server_data)
            server_data = server_data.map((person, person_i)=>{
                let dataSource = []
                for (let item of person.data_info){
                    dataSource = dataSource.concat(item)
                }
                dataSource = dataSource.sort((a,b)=>{
                    return a.timestamp-b.timestamp
                })
                dataSource = dataSource.map((data_item, data_item_i)=>{
                    // console.log(data_item.timestamp)
                    // 时间戳转换 在 chart data 赋值里做
                    // if (typeof data_item.timestamp === "number"){
                    //     data_item.timestamp = dateFormat(data_item.timestamp*1000,'m-d H:i:s')
                    // }
                    return data_item
                })
                person.data_info = dataSource
                console.log(person.data_info.length)
                return person
            })

            let sessionId = isAuthenticated()

            server_data = server_data.filter((item, index) => {
                    for (let server of item.server){
                        if (server.user === sessionId){
                            return true
                        }
                    }
                    return false
            })

            if (json.status === 200){
                message.success('加载完成')
                console.log(server_data)
                server_data = server_data.map((value,index)=>{
                    return Object.assign({}, value, {'key':index.toString()})
                })
                this.setState({
                    data8: server_data,
                    count: server_data.length
                },()=>{
                    let query_url = HOST() + ALL_SERVER
                    _fetch(query_url, {
                    }, (json)=>{
                        let server_data = json.err_msg

                        server_data = server_data.filter((item, index) => {
                            for (let server of this.state.data8[0].server){
                                if (server.host === item.host){
                                    return true
                                }
                            }
                            return false
                        })

                        server_data = server_data.map((value,index)=>{
                            return Object.assign({}, value, {'key':index.toString()})
                        })



                        this.setState({
                            data9: server_data,
                            count: server_data.length
                        },()=>{
                            // console.log(this.state.data8)
                        })
                    })
                })
            }
            else {
                message.error(json.err_msg)
            }
        })
    }

    _onOk_24(date, state_key, query_ip){

        if (date === null){
            return
        }

        let timestamp = date
        let query_url = HOST() + ONE_DAY
        let mess_load = message.loading('查询中', 0);
        _fetch(query_url,{
            timestamp:timestamp,
            ip_list:[query_ip]
        },(json)=>{
            mess_load()
            if (json.status === 200){
                console.log(json.err_msg)

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
                let max_gpu = 8
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
                    [state_key]:{
                        chart_data,
                        max_gpu,
                        fields
                    }
                },()=>{
                    console.log(this.state)
                })
            }
            else {
                console.log(json.err_msg)
            }
        })
    }

    jump(route, student){
        student = student || {}
        this.props.history.push(route, student)
    }

    tagModeChanged(value){
        this.setState({
            tagMode:value
        })
    }

    columns8 = [
        {
            title: '姓名',
            dataIndex: 'name',
            // width: '20%',
            width: '15%',
            editable: true,
            render:(text, record) =>{
                let textColor = record.gender === 0 ? '#56BAEB' : '#D771B3'
                let gender_icon = record.gender === 0 ? male : female
                return (
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                        <img src={local_url+record.img_addr} alt="" width='30px' height='30px' style={{borderRadius:15}}/>
                        <span style={{
                            marginLeft:10,
                            marginRight:5,
                            color:textColor
                        }}>
                            {record.name}
                        </span>
                        <img src={gender_icon} width='10px' height='10px'/>
                    </div>
                )
            }
        },
        {
            title: '年级',
            dataIndex: 'grade',
            // width: '20%',
            width: '7%',
            editable: true,
            // sorter: (a, b) => a.grade_index - b.grade_index,
            sorter: (a, b)=>{
                // let a_index = transform_grade(a.grade)
                // let b_index = transform_grade(b.grade)
                // return a_index - b_index
                return a.grade - b.grade
            },
            defaultSortOrder: 'descend',
            render:(text, record) =>{
                return getGrade(text)
            }
        },
        {
            title: '学号',
            dataIndex:'stuid',
            width: '15%',
        },
        {
            title: '电话',
            dataIndex:'phone',
            render:(text,record) => {
                return (
                    <a>
                        <Icon type="phone" theme="twoTone" style={{marginRight:10}}/>
                        {text}
                    </a>
                )
            }
        },
        {
            title: 'github',
            dataIndex:'github',
            render:(text, record) => {
                return (
                    <a href={`https://github.com/${text}`} target="_Blank">
                        <Icon type="github" theme="filled" style={{marginRight:10}}/>
                        {text}
                    </a>
                )
            }
        },
        {
            title: '服务器',
            dataIndex: 'server',
            width: '25%',
            editable: true,
            render:(text, record) =>{
                // console.log(record)
                let server_info = record.server.map((item, index)=>{
                    let colorType = 'purple'
                    // if (item.includes("20")){
                    //     colorType = 'purple'
                    // }
                    // if (item.includes("40")){
                    //     colorType = '#87d068'
                    // }
                    // if (item.includes("60")){
                    //     colorType = '#2db7f5'
                    // }
                    // if (item.includes("80")){
                    //     colorType = '#f50'
                    // }

                    return (
                        <Tag color={colorType}>
                            {item.name || item.host}
                        </Tag>
                    )
                })
                return (
                    <div>
                        {server_info}
                    </div>
                )
            }
        },
        {
            title: '编辑',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record) => {
                return (
                    <div>
                        <span>
                            <a onClick={this.jump.bind(this, 'student_info/student_detail', record)}>详情</a>
                        </span>
                    </div>
                );
            },
        },
    ]

    columns9 = [
        {
            title: '服务器',
            dataIndex: 'name',
            width: '15%',
            editable: true,
        },
        {
            title: 'ip地址',
            dataIndex: 'host',
            width: '22%',
            editable: true,
            sorter: (a, b)=>{
                let host_a_arr = a.host.split('.')
                let host_a = Number(host_a_arr[host_a_arr.length-1])

                let host_b_arr = b.host.split('.')
                let host_b = Number(host_b_arr[host_b_arr.length-1])
                return host_a-host_b
            },
            defaultSortOrder: 'ascend',
        },
        {
            title: 'GPU信息',
            dataIndex: 'gpu_info',
            width: '53%',
            render:(text, record) =>{
                if (record.data_info.length > 0){
                    // console.log(record)
                    let gpu_info = record['data_info'][0]['gpu_info'].map((info, index)=>{
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

                        if (tag_type >= 0 && tag_type <= 0.25) tag_type = 'purple'
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
        {
            title: '编辑',
            dataIndex: 'operation',
            width: '10%',
            render: (text, record) => {
                return (
                    <div>
                        <span>
                            <a onClick={this.jump.bind(this, 'server_info/server_detail', record)}>详情</a>
                        </span>
                    </div>
                );
            },
        },
    ]


      render() {

          const columns8 = this.columns8.map((col) => {
              return col;
          });

          return (
              <div>
                  <CustomBreadcrumb arr={['首页']}/>
                  <p>
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
                      <Select defaultValue={0} onChange={this.tagModeChanged} style={{ width: 120 }}>
                          <Option value={0}>显存</Option>
                          <Option value={1}>温度</Option>
                          <Option value={2}>GPU 利用率</Option>
                      </Select>
                  </p>
                  <Card bordered={false} title='首页' style={{marginBottom: 10, minHeight: 440}} id='editTable'>
                      <Table style={{...styles.tableStyle, marginTop:10}}  dataSource={this.state.data8}
                             columns={columns8}
                             pagination={false}
                             expandedRowRender={(record) => {
                                 console.log(record)
                                 // TODO 这里的逻辑是用 server 平均值做的, 重构要改成user 平均值, 先要改后台接口

                                 // let source_tmp = Generate_Clus(record)
                                 // return (
                                 //     <Clusteredstacked ages={source_tmp.ages} key_arr={source_tmp.key_arr} dataSource={source_tmp.dataSource} />
                                 // )

                                 let data = {}
                                 let max_gpu = {}
                                 let fields = {}

                                 for (let server of record.server){
                                     let date = Math.round(new Date().getTime() /1000)
                                     let query_ip = server.host
                                     let state_key = `${query_ip}_expanded`

                                     if (this.state.hasOwnProperty(state_key)){
                                         data[[server.host]] = this.state[[state_key]].chart_data
                                         max_gpu[[server.host]] = this.state[[state_key]].max_gpu
                                         fields[[server.host]] = this.state[[state_key]].fields
                                     }else {
                                         this._onOk_24(date, state_key, query_ip)
                                     }
                                 }

                                 let expandedComponent = record.server.map((value, index)=>{
                                     let query_ip = value.host
                                     let state_key = `${query_ip}_expanded`
                                     return (
                                         <TabPane tab={value.host} key={index} >
                                             {
                                                 this.state.hasOwnProperty(state_key) ?
                                                     <Chart_step data={data[[query_ip]]} cols={{
                                                         temperature: {
                                                             alias:'温度',
                                                             type: 'linear',
                                                             min: 0,
                                                             max:100,
                                                         },
                                                         gpu_value:{
                                                             alias:'平均显存占用',
                                                             min: 0,
                                                             max: max_gpu[[query_ip]]
                                                         },
                                                         GPU_use_percent:{
                                                             alias:'GPU利用率',
                                                             type: 'linear',
                                                             min: 0,
                                                             max:100,
                                                         }
                                                     }}
                                                                 fields={fields[[query_ip]]}
                                                                 height={343}/> :
                                                     null
                                             }
                                         </TabPane>
                                     )
                                 })

                                 return (
                                     <Tabs defaultActiveKey={0} tabPosition={'left'}
                                           style={{height: 'auto' ,}}>
                                         {expandedComponent}
                                     </Tabs>
                                 )
                             }} />
                      <Table style={{...styles.tableStyle, marginTop:10}} dataSource={this.state.data9}
                             columns={this.columns9}
                             pagination={false}
                             expandedRowRender={record => {
                                 let show_component = record.data_info[0].gpu_info.map((info, index)=>{

                                     let tag_type = info.usedMemry/info.totalMemry
                                     if (tag_type >= 0 && tag_type <= 0.25) tag_type = 'purple'
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
                             }}/>
                  </Card>
                  <BackTop visibilityHeight={200} style={{right: 50}}/>
              </div>
          )
      }

}
const styles = {
    tableStyle: {
        width: '100%'
    },
    affixBox: {
        position: 'absolute',
        top: 100,
        right: 50,
        with: 170
    }
}