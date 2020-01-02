import React from 'react'
import {
    Card, Popconfirm, Button, Icon, Table, Divider, BackTop, Affix, Anchor, Form, InputNumber, Input, Select,
    Cascader, Tag, message, Tabs
} from 'antd'
import axios from 'axios'
import male from '../../assets/icon/Male.ico'
import female from '../../assets/icon/Female.ico'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'
import { person } from '../../data/person'
import { server_arr, grade_arr } from '../../data/general'
import {_fetch, transform_grade, getGrade, dateFormat, deepCopy, timestamp2Date} from '../../utils/utils'
import LoadableComponent from '../../utils/LoadableComponent'

import person_tmp from '../../assets/icon/gtx.jpg'
import {ADD_STUDENT, ALL_STUDENT, DEL_SERVER, DEL_STUDENT, HOST, ONE_DAY} from "../../utils/url_config";
import { Generate_Clus } from '../../components/Charts/Generate_chart'


const Clusteredstacked = LoadableComponent(()=>import('../../components/Charts/Clusteredstacked'))
const Chart_step = LoadableComponent(()=>import('../../components/Charts/Student_Chart_server'))

const { Option } = Select;
const { TabPane } = Tabs;

let current_grade = ''
let current_server = ''

// let data8 = person;
let data8 = [];
data8 = data8.map((value,index)=>{
    return Object.assign({}, value, {'key':index.toString()})
})

let local_url = HOST()

const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    let Com_temp = React.Component
                    if (editing && dataIndex === 'server'){
                        Com_temp = <Select style={{ width: '100%' }}
                                           onChange={(value => {
                                               current_server = server_arr[value]
                                           })}>
                            {server_arr.map((server, index)=>{
                                return (
                                    <Option value={index} key={`option_${index}`}>
                                        {server}
                                    </Option>
                                )
                            })}
                        </Select>
                    }else if (editing && dataIndex === 'grade'){
                        Com_temp = <Cascader options={grade_arr} placeholder="Please select"
                                             displayRender={label => label[label.length - 1]}
                                             onChange={(value => {
                                                 current_grade = value[value.length-1]
                                             })}/>
                    } else if (editing){
                        Com_temp = <FormItem style={{margin: 0}}>
                            {getFieldDecorator(dataIndex, {
                                rules: [{
                                    required: true,
                                    message: `请输入 ${title}!`,
                                }],
                                initialValue: record[dataIndex],
                            })(this.getInput())}
                        </FormItem>
                    }

                    return (
                        <td {...restProps}>
                            {editing  ? (
                                (Com_temp)
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class StudentInfo extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state = {
              filteredInfo: null,
              sortedInfo: null,
              loading: false,
              data4: [],
              pagination: {
                  pageSize: 8
              },
              current_stu:{},
              current_grade:'',
              current_server:'',
              count: data8.length,
              data8,
              editingKey: '',
          }

          this.jump = this.jump.bind(this)
          this._onOk_24 = this._onOk_24.bind(this)
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

    componentDidMount() {
        this.getRemoteData()
    }

    componentWillMount() {
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
                    console.log(this.state.data8)
                })
            }
            else {
                message.error(json.err_msg)
            }
        })

    }

    jump(route, student){
        student = student || {}
        this.props.history.push(route, student)
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
            width: '10%',
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
        },
        {
            title: '电话',
            dataIndex:'phone',
        },
        {
            title: 'github',
            dataIndex:'github',
            render:(text, record) => {
                return <a href={`https://github.com/${text}`} target="_Blank"> {text} </a>
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
            render: (text, record) => {
                const editable = this.isEditing(record);
                return (
                    <div>
                        {editable ? (
                            <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a

                            onClick={() => this.save(form, record.key)}
                            style={{marginRight: 8}}
                        >
                            Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="Sure to cancel?"
                      onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                        ) : (
                            <span>
                                {/*<a onClick={() => this.edit(record)}>编辑</a>*/}
                                {/*<Divider type="vertical"/>*/}
                                {/*<a onClick={this.jump.bind(this, 'student_info/student_detail', record)}>详情</a>*/}
                                <a onClick={this.jump.bind(this, 'student_info/student_detail', record)}>详情</a>
                                <Divider type="vertical"/>
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record)}>
                                <a>删除</a>
                                </Popconfirm>
                            </span>
                        )}
                    </div>
                );
            },
        },
    ]

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        })
    }
    clearFilters = () => {
        this.setState({filteredInfo: null})
    }
    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        })
    }
    setSort = (type) => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: type,
            },
        })
    }

    getRemoteData(params) {
        this.setState({
            loading: true
        })
        axios.get('https://randomuser.me/api', {
            params: {
                results: 10,
                size: 200,
                ...params
            }
        }).then(res => {
            const pagination = {...this.state.pagination};
            pagination.total = 200
            this.setState({
                loading: false,
                data4: res.data.results,
                pagination
            })
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.getRemoteData({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        })
    }
    onDelete = (record) => {
        let query_url = local_url + DEL_STUDENT
        // let query_url = 'http://127.0.0.1:9000' + ADD_STUDENT
        let { grade, name, stuid, key} = record

        _fetch(query_url,
            {
                student:[{
                    name,
                    grade,
                    stuid,
                }]
            }
        ,(json)=>{
            if (json.status === 200){
                message.success('删除成功')
                const arr = this.state.data8.slice()
                this.setState({
                    data8: arr.filter(item => item.key !== key)
                })
            }
            else {
                message.error(json.err_msg)
            }
        })
    }
    handleAdd = () => {
        const {data8, count} = this.state //本来想用data7的length来代替count，但是删除行后，length会-1
        const newData = {
            key: count.toString(),
            name: `待编辑`,
            grade: `待编辑`,
            server: `待编辑`,
            GitHub:'待编辑'
        };
        this.setState({
            data8: [...data8, newData],
            count: count + 1
        })
    }
    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };

    edit(record) {
        this.setState({
            editingKey: record.key,
            current_stu:record,
        },()=>{
            current_grade = record.grade
            current_server = record.server
        });
    }

    save(form, key) {
        console.log(current_server)
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data8];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                    ...{server:current_server},
                    ...{grade:current_grade},
                });
                // TODO
                this.setState({data8: newData, editingKey: ''},()=>{
                    // 上传服务器逻辑
                });
            } else {
                newData.push(data8);
                this.setState({data8: newData, editingKey: ''},()=>{
                    // 上传服务器逻辑
                });
            }
        });
    }

    cancel = () => {
        this.setState({
            editingKey: '',
            current_stu:{},
        });
    };

    render() {

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns8 = this.columns8.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    // inputType: col.dataIndex === 'grade' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });



        return (
            <div>
                <CustomBreadcrumb arr={['学生管理']}/>
                <Card bordered={false} title='学生列表' style={{marginBottom: 10, minHeight: 440}} id='editTable'>
                    <p>
                        <Button onClick={this.jump.bind(this, 'student_info/add_student', {})}>添加同学</Button>
                    </p>
                    <Table style={styles.tableStyle} components={components}  dataSource={this.state.data8}
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

export default StudentInfo