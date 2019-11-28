import React from 'react'
import { Card, Popconfirm, Button, Icon, Table, Divider, BackTop, Affix, Anchor, Form, InputNumber, Input, Select,
    Cascader, Tag, Tooltip } from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'
import { servers } from '../../data/server'
import { server_arr, grade_arr } from '../../data/general'
import { transform_grade } from '../../utils/utils'
import LoadableComponent from '../../utils/LoadableComponent'

const Step_Chart = LoadableComponent(()=>import('../../components/Charts/Step'))

const { Option } = Select;

const columns4 = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: name => `${name.first} ${name.last}`,
        width: '20%',
    }, {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            {text: 'Male', value: 'male'},
            {text: 'Female', value: 'female'},
        ],
        width: '20%',
    }, {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'GitHub',
        dataIndex: 'github',
    }]

let current_grade = ''
let current_server_id = ''

let data8 = servers;
data8 = data8.map((value,index)=>{
    return Object.assign({}, value, {'key':index.toString()})
})


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
                    if (editing){
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

class ServerInfo extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        loading: false,
        data4: [],
        pagination: {
            pageSize: 8
        },
        current_stu:{},
        current_grade:'',
        current_server_id:'',
        count: data8.length,
        data8,
        editingKey: '',
    }

    componentDidMount() {
        this.getRemoteData()
    }

    jump(server){
        this.props.history.push('/server_info/server_detail')
    }

    columns8 = [
        {
            title: '服务器',
            dataIndex: 'name',
            width: '10%',
            editable: true,
        },
        {
            title: 'ip地址',
            dataIndex: 'ip',
            width: '12%',
            editable: true,
        },
        {
            title: 'GPU信息',
            dataIndex: 'gpu_info',
            width: '60%',
            render:(text, record) =>{
                let gpu_info = record['gpu_info'].map((info, index)=>{
                    let tag_type = info.usedMemry/info.totalMemry
                    if (tag_type > 0 && tag_type <= 0.25) tag_type = 'purple'
                    else if (tag_type > 0.25 && tag_type <= 0.5) tag_type = '#87d068'
                    else if (tag_type > 0.5 && tag_type <= 0.75) tag_type = '#2db7f5'
                    else if (tag_type > 0.75 ) tag_type = "#f50"
                    return (
                        <Tooltip placement="top" title={()=>{
                            return (
                                <div>
                                    <p>{`显卡${info.fan}`}</p>
                                    <p>{`总显存:${info.totalMemry}MiB`}</p>
                                    <p>{`已用显存:${info.usedMemry}MiB`}</p>
                                    <p>{`温度:${info.temp}℃`}</p>
                                    <p>{`功耗:${info.power}`}</p>
                                </div>
                            )
                        }}>
                            <Tag color={tag_type}>
                                {info.name}
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
                                <a onClick={() => this.edit(record)}>编辑</a>
                                <Divider type="vertical"/>
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a>删除</a>
                                </Popconfirm>
                                <Divider type="vertical"/>
                                <a onClick={this.jump.bind(this, record)}>详情</a>
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
    onDelete = (key) => {
        const arr = this.state.data8.slice()
        this.setState({
            data8: arr.filter(item => item.key !== key)
        })
    }
    handleAdd = () => {
        const {data8, count} = this.state //本来想用data7的length来代替count，但是删除行后，length会-1
        const newData = {
            key: count.toString(),
            name: `待编辑`,
            ip: `待编辑`,
            'gpu_info':[
                {
                    'name':'TITAN Xp',
                    'totalMemry':12189,
                    'usedMemry':0,
                    'temp':60,
                    'fan':0,
                    'power':'59W/50W',
                    'script':[]

                },
                {
                    'name':'TITAN Xp',
                    'totalMemry':12189,
                    'usedMemry':0,
                    'temp':60,
                    'fan':1,
                    'power':'59W/50W',
                    'script':[]
                },
                {
                    'name':'TITAN Xp',
                    'totalMemry':12189,
                    'usedMemry':0,
                    'temp':60,
                    'fan':2,
                    'power':'59W/50W',
                    'script':[]
                },
                {
                    'name':'TITAN Xp',
                    'totalMemry':12189,
                    'usedMemry':0,
                    'temp':60,
                    'fan':3,
                    'power':'59W/50W',
                    'script':[]
                },
            ]
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
            current_server_id = record.server_id
        });
    }

    save(form, key) {
        console.log(current_server_id)
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
                    ...{server_id:current_server_id},
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
                <CustomBreadcrumb arr={['服务器管理']}/>
                <Card bordered={false} title='服务器列表' style={{marginBottom: 10, minHeight: 440}} id='editTable'>
                    <p>
                        <Button onClick={this.handleAdd}>添加服务器</Button>
                        <Tag color={"#f50"} style={{marginLeft:20}}>
                            75%以上
                        </Tag>
                        <Tag color={'#2db7f5'}>
                            50%以上
                        </Tag>
                        <Tag color={'#87d068'}>
                            25%以上
                        </Tag>
                        <Tag color={"purple"}>
                            0以上
                        </Tag>
                    </p>

                    <Table style={styles.tableStyle} components={components}  dataSource={this.state.data8}
                           columns={columns8}
                           pagination={false}
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

export default ServerInfo