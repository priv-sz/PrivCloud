import React from 'react'
import {
    Card, Popconfirm, Button, Icon, Table, Divider, BackTop, Affix, Anchor, Form, InputNumber, Input, Select,
    Cascader, Tag
} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'
import { person } from '../../data/person'
import { server_arr, grade_arr } from '../../data/general'
import { transform_grade } from '../../utils/utils'
import LoadableComponent from '../../utils/LoadableComponent'

import person_tmp from '../../assets/icon/gtx.jpg'

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

let data8 = person;
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
                    if (editing && dataIndex === 'server_id'){
                        Com_temp = <Select style={{ width: '100%' }}
                                           onChange={(value => {
                                               current_server_id = server_arr[value]
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
              current_server_id:'',
              count: data8.length,
              data8,
              editingKey: '',
          }

          this.jump = this.jump.bind(this)
      }

    componentDidMount() {
        this.getRemoteData()
    }

    jump(route, student){
        console.log(route)
        this.props.history.push(route)
    }

    columns8 = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: '20%',
            editable: true,
            render:(text, record) =>{
                return (
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                        <img src={record.img} alt="" width='30px' height='30px' style={{borderRadius:15}}/>
                        <span style={{
                            marginLeft:10
                        }}>
                            {record.name}
                        </span>
                    </div>
                )
            }
        },
        {
            title: '年级',
            dataIndex: 'grade',
            width: '20%',
            editable: true,
            // sorter: (a, b) => a.grade_index - b.grade_index,
            sorter: (a, b)=>{
                let a_index = transform_grade(a.grade)
                let b_index = transform_grade(b.grade)
                return a_index - b_index
            },
            defaultSortOrder: 'descend',
        },
        {
            title: '服务器',
            dataIndex: 'server_id',
            width: '40%',
            editable: true,
            render:(text, record) =>{
                let server_info = record.server_id.map((item, index)=>{
                    let colorType = 'purple'
                    if (item.includes("20")){
                        colorType = 'purple'
                    }
                    if (item.includes("40")){
                        colorType = '#87d068'
                    }
                    if (item.includes("60")){
                        colorType = '#2db7f5'
                    }
                    if (item.includes("80")){
                        colorType = '#f50'
                    }

                    return (
                        <Tag color={colorType}>
                            {item}
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
                                <a onClick={this.jump.bind(this, 'student_info/student_detail', record)}>详情</a>
                                <Divider type="vertical"/>
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
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
            grade: `待编辑`,
            server_id: `待编辑`,
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
                <CustomBreadcrumb arr={['学生管理']}/>
                {/*<Card bordered={false} title='远程加载数据' style={{marginBottom: 10, minHeight: 762}} id='remoteLoading'>*/}
                {/*    <Table rowKey={record => record.login.uuid}*/}
                {/*           loading={this.state.loading}*/}
                {/*           dataSource={this.state.data4}*/}
                {/*           // pagination={this.state.pagination}*/}
                {/*           pagination={false}*/}
                {/*           onChange={this.handleTableChange}*/}
                {/*           columns={columns4} style={styles.tableStyle}/>*/}
                {/*</Card>*/}
                <Card bordered={false} title='学生列表' style={{marginBottom: 10, minHeight: 440}} id='editTable'>
                    <p>
                        <Button onClick={this.jump.bind(this, 'student_info/add_student')}>添加同学</Button>
                    </p>
                    <Table style={styles.tableStyle} components={components}  dataSource={this.state.data8}
                           columns={columns8}
                           pagination={false}
                           expandedRowRender={record => <Step_Chart />}/>
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