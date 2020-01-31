import React from 'react'
import {BackTop, Card, Col, Row, Table, message, Tooltip, Icon, Divider, Tag} from 'antd'
import {HOST, HOME_ALL_SERVER,HOME_ALL_STUDENT} from '../../utils/url_config'
import LoadableComponent from "../../utils/LoadableComponent";
import {_fetch, deepCopy, timestamp2Date} from "../../utils/utils";

const Chart_step = LoadableComponent(()=>import('../../components/Charts/Student_Chart_server'))
const Histogram_chart = LoadableComponent(()=>import('../../components/Charts/Histogram_chart'))

let local_url = HOST()
const col_height = 500

class Home extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            max_gpu:25769803776*8,
            servers_fields:['192.168.88.20', '192.168.88.21', '192.168.88.40', '192.168.88.60', '192.168.88.70', '192.168.88.109', '192.168.88.123', '192.168.88.191', '192.168.88.197', '192.168.88.221'],
            server_chart_data:[],
            student_chart_data:[],
            server_data:[]
        };
        this.server_query = this.server_query.bind(this)
        this.student_query = this.student_query.bind(this)
    }

    server_query(){
        let query_url = HOST() + HOME_ALL_SERVER
        let servers_fields = []
        _fetch(query_url,{}, (json)=>{
            if (json.status === 200) {
                message.success('加载成功')
                let response_json = deepCopy(json.err_msg)
                response_json = response_json.map((value, index)=>{
                    value.temperature = value.temp_avg
                    value.gpu_value = Math.round(value.gpu_avg/1024/1024)
                    value.GPU_use_percent = value.percent_avg
                    value.timestamp = timestamp2Date('H:i',value.timestamp)
                    for (let server_gpu_info of value.server_info) {
                        value[[server_gpu_info.net_ip]] = `${Math.round(server_gpu_info.gpu / 1024 / 1024)}Mib (显卡占用率:${server_gpu_info.percent}%,温度:${server_gpu_info.temp}℃)`
                        if (servers_fields.indexOf(server_gpu_info.net_ip) === -1){
                            servers_fields.push(server_gpu_info.net_ip)
                        }
                    }
                    return value
                });

                response_json = response_json.map((value, index)=>{
                    for (let field of servers_fields){
                        if (value.hasOwnProperty(field) === false){
                            value[[field]] = `0 Mib (显卡占用率:0 %,温度:0 ℃)`
                        }
                    }
                    return value
                });

                servers_fields = servers_fields.sort((a, b)=>{
                    let a_arr = a.split('.')
                    let b_arr = b.split('.')

                    return Number(a_arr.slice(a_arr.length-1, a_arr.length)) - Number(b_arr.slice(b_arr.length-1, b_arr.length))
                })

                console.log(response_json)
                this.setState({
                    server_chart_data:response_json,
                    servers_fields:servers_fields,
                    server_data:json.server_total,
                    server_conf:json.server_conf
                },()=>{
                    console.log(this.state.server_chart_data)
                    console.log(json.server_total)
                    console.log(json.server_conf)
                })
            }else {
                message.error('加载失败')
            }
        })
    }

    student_query(){
        let query_url = HOST() + HOME_ALL_STUDENT
        let servers_fields = []
        _fetch(query_url,{}, (json)=>{
            if (json.status === 200) {
                message.success('学生信息加载成功')
                this.setState({
                    student_chart_data:json.err_msg
                },()=>{
                    console.log(json.err_msg)
                })
            }else {
                message.error('学生信息加载失败')
            }
        })

    }

    componentDidMount() {
        this.server_query()
        this.student_query()

    }

    columns_student = [
        {
            title: '姓名',
            dataIndex: 'name',
            // width: '15%',
        },
        {
            title: '显存占用',
            dataIndex: 'gpu',
            // width: '15%',
            sorter: (a, b)=>{
                return a.gpu - b.gpu
            },
            defaultSortOrder: 'descend',
            render:(text, row) =>{
                let type = text / 1024 /1024  > 1 ? 'Gib' : 'Mib'
                let value_type = {
                    Gib:1024*1024,
                    Mib:1024*1024
                }

                return (
                    <Tag color={'#87d068'}>
                        {`${(text/value_type[type]).toFixed(2)}${type}`}
                    </Tag>
                )

                // return `${(text/value_type[type]).toFixed(2)}${type}`

            }
        },
    ]

    columns_server = [
        {
            title: '服务器',
            dataIndex: 'net_ip',
            // width: '15%',
            render:(text, row) => {
                let tag_type = row.percent / 100
                if (tag_type >= 0 && tag_type <= 0.25) tag_type = 'purple'
                else if (tag_type > 0.25 && tag_type <= 0.5) tag_type = '#87d068'
                else if (tag_type > 0.5 && tag_type <= 0.75) tag_type = '#2db7f5'
                else if (tag_type > 0.75 ) tag_type = "#f50"
                return (
                    <Tag color={tag_type} >
                        {this.state.server_conf[text]}
                    </Tag>
                )
            }
        },
        {
            title: '显存占用',
            dataIndex: 'gpu',
            // width: '15%',
            sorter: (a, b)=>{
                return a.gpu - b.gpu
            },
            defaultSortOrder: 'descend',
            render:(text, row) =>{
                let type = text / 1024 /1024 / 1024 > 1 ? 'Gib' : 'Mib'
                let value_type = {
                    Gib:1024*1024*1024,
                    Mib:1024*1024
                }
                let tag_type = row.percent / 100
                if (tag_type >= 0 && tag_type <= 0.25) tag_type = 'purple'
                else if (tag_type > 0.25 && tag_type <= 0.5) tag_type = '#87d068'
                else if (tag_type > 0.5 && tag_type <= 0.75) tag_type = '#2db7f5'
                else if (tag_type > 0.75 ) tag_type = "#f50"
                return (
                    <Tag color={tag_type} >
                        {`${(text/value_type[type]).toFixed(2)}${type}`}
                    </Tag>
                )

            }
        },
        {
            title: '温度',
            dataIndex: 'temp',
            // width: '15%',
            sorter: (a, b)=>{
                return a.temp - b.temp
            },
            defaultSortOrder: 'descend',
            render:(text, row) =>{

                return `${text}℃`

            }
        },
        {
            title: '显存占用比例',
            dataIndex: 'percent',
            // width: '15%',
            sorter: (a, b)=>{
                return a.percent - b.percent
            },
            defaultSortOrder: 'descend',
            render:(text, row) =>{

                return `${text}%`

            }
        },
    ];

    render() {
        return (
            <div style={styles.bg} className='home'>
                <Card hoverable bordered={false} title={'首页'} >

                    <Row gutter={16} style={{backgroundColor:'#F0F2F5', padding:10}}>
                        <Col span={16} style={{height:col_height}}>
                            <div style={styles.col_div}>
                    <span style={{marginLeft:20}}>
                      服务器&nbsp;
                        <Tooltip title='当天所有服务器显存总占用平均值'>
                        <Icon type='question-circle-o'/>
                      </Tooltip>
                    </span>
                                <Divider />
                                <Chart_step data={this.state.server_chart_data} cols={{
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
                                        max: Math.round(this.state.max_gpu/1024/1024),
                                    },
                                    GPU_use_percent:{
                                        alias:'GPU利用率',
                                        type: 'linear',
                                        min: 0,
                                        max:100,
                                    }
                                }}
                                            fields={this.state.servers_fields}
                                            height={343}/>
                            </div>
                        </Col>
                        <Col span={8} style={{ height:col_height}}>
                            <div style={{...styles.col_div, overflow:'scroll'}}>
                                <Table style={styles.tableStyle} dataSource={this.state.server_data}
                                       columns={this.columns_server}
                                       bordered
                                       pagination={false}
                                />
                            </div>
                        </Col>
                    </Row>


                    <Row gutter={16} style={{backgroundColor:'#F0F2F5', padding:10}}>
                        <Col span={16} style={{ height:col_height}}>
                            <div style={styles.col_div}>
                    <span style={{marginLeft:20}}>
                      学生&nbsp;
                        <Tooltip title='当天所有同学显存总占用平均值'>
                        <Icon type='question-circle-o'/>
                      </Tooltip>
                    </span>
                                <Divider />
                                <Histogram_chart data={this.state.student_chart_data} cols={{
                                }}
                                                 height={343}/>
                            </div>
                        </Col>
                        <Col span={8} style={{height:col_height, }}>
                            <div style={{...styles.col_div, overflow:'scroll'}}>
                                <Table style={styles.tableStyle} dataSource={this.state.student_chart_data}
                                       columns={this.columns_student}
                                       bordered
                                       pagination={false}
                                />
                            </div>
                        </Col>
                    </Row>

                </Card>

                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

const styles = {
    bg:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'calc(100vh - 64px)'
    },
    col_div:{
        backgroundColor:'#FFFFFF',
        height:col_height,
        paddingTop:10
    },
    tableStyle: {
        width: '100%'
    },
}

export default Home