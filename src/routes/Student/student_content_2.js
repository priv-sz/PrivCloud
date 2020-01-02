import React from 'react'
import {Descriptions, Badge, Table, Input, Form, Button, DatePicker, Select, message, Spin} from 'antd';
import {EDI_STUDENT, HOST} from "../../utils/url_config";
import './student_content_2.css'
import {_fetch, getGrade, timestamp2Date, deepCopy} from "../../utils/utils";
import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item
const { RangePicker,} = DatePicker;

let local_url = HOST()
const gender_arr = ['男', '女']
const dateFormat = 'YYYY-MM-DD';


@Form.create()
export default class student_content_2 extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading:false,
            FormDisabled:true,
            student_info:{

            },
            education_data:[
                {
                    key:0,
                    time:'',
                    school:'',
                    speciality:'',
                    education:''
                },
                {
                    key:1,
                    time:'',
                    school:'',
                    speciality:'',
                    education:''
                },
                {
                    key:2,
                    time:'',
                    school:'',
                    speciality:'',
                    education:''
                },
            ]
        };
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log(err)
                message.warning('请先填写正确的表单')
            } else {
                console.log(values)
                // 生成 new_data
                let { name, grade, stuid } = this.state.student_info
                let { phone, email, nation, hometown, parties, birthday, married, practice, skill, awards, evaluation } = values
                birthday = Math.round(birthday._d.getTime()/1000)
                let educationExperience = []
                for (let i=0; i<3;i++){
                    educationExperience.push({
                        education_time: values[`education_time_${i}`],
                        education_school: values[`education_school_${i}`],
                        education_speciality: values[`education_speciality_${i}`],
                        education_education: values[`education_education_${i}`],
                    })
                }
                console.log(educationExperience)
                let new_data = {
                    name, grade, stuid,
                    phone, email, nation, hometown, parties, birthday, married, practice, skill, awards, evaluation,
                    educationExperience
                }
                console.log(new_data)
                let query_url = local_url + EDI_STUDENT
                // let query_url = 'http://127.0.0.1:9000' + EDI_STUDENT
                this.setState({
                    loading: true
                },()=>{
                    _fetch(query_url,{
                        old_data:{
                            name:this.state.student_info.name,
                            grade:this.state.student_info.grade,
                            stuid:this.state.student_info.stuid,
                        },
                        new_data
                    },(json)=>{
                        console.log(json)
                        this.setState({
                            loading: false
                        },()=>{
                            if (json.status === 200){
                                message.success('提交成功')
                                // 更新 student_info
                                let new_student_info = Object.assign({},this.state.student_info, new_data)
                                this.setState({
                                    student_info:new_student_info,
                                    FormDisabled:true
                                },()=>{
                                    this.props.changeStudnetInfo(this.state.student_info)
                                })
                            }
                            else {
                                this.setState({
                                    FormDisabled:true
                                })
                                message.error(json.err_msg)
                            }
                        })
                    })
                })
            }
        });
    }

    componentWillMount() {
        let {student_info} = this.props;
        let education_data = deepCopy(student_info.educationExperience)
        //TODO 还未定位到原因 ,这里的 undefined
        if (education_data === undefined){
            education_data = [{}, {} ,{}]
        }

        education_data = education_data.map((value, index)=>{
                                            return {
                                                key:Number(index),
                                                time:value.education_time,
                                                school:value.education_school,
                                                speciality:value.education_speciality,
                                                education:value.education_education
                                            }
                                        });
        this.setState({
            student_info,
            education_data:education_data
        },()=>{
            console.log(student_info);
            console.log(this.state.education_data)
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {student_info} = nextProps;
        this.setState({
            student_info
        })
    }

    render() {
        const columns = [
            {
                title: '时间',
                dataIndex: 'time',
                // width: '50%',
                render:(text, record) => {
                    // return (
                    //     <RangePicker onChange={(date, dateString)=>{
                    //         console.log(date, dateString);
                    //     }}
                    //                  defaultValue={[moment('2015-06-01', dateFormat),moment('2018-09-06', dateFormat)]}
                    //                  disabled={this.state.FormDisabled}
                    //                  style={{width:'100%'}}/>
                    // )
                    return (
                        <FormItem {...formItemLayout}>
                            {
                                getFieldDecorator(`education_time_${record.key}`, {
                                    initialValue:record.time,
                                    // this.state.student_info.education[0].time ||
                                })(
                                     <Input style={{
                                         borderStyle:'none'
                                     }} disabled={this.state.FormDisabled} placeholder={'年-月-日'}/>
                                )
                            }
                        </FormItem>
                    )
                }
            },{
                title: '学校',
                dataIndex: 'school',
                // width: '50%',
                render: (text, record) =>{
                    return (
                        <FormItem {...formItemLayout}>
                            {
                                getFieldDecorator(`education_school_${record.key}`, {
                                    initialValue:record.school,
                                    // this.state.student_info.education[0].time ||
                                })(
                                    <Input style={{
                                        borderStyle:'none'
                                    }} disabled={this.state.FormDisabled}/>
                                )
                            }
                        </FormItem>
                    )
                }
            },{
                title:'专业',
                dataIndex:'speciality',
                render: (text, record) =>{
                    return (
                        <FormItem {...formItemLayout}>
                            {
                                getFieldDecorator(`education_speciality_${record.key}`, {
                                    initialValue:record.speciality,
                                    // this.state.student_info.education[0].time ||
                                })(
                                    <Input style={{
                                        borderStyle:'none'
                                    }} disabled={this.state.FormDisabled}/>
                                )
                            }
                        </FormItem>
                    )
                }
            },{
                title:'学历',
                dataIndex:'education',
                render: (text, record) =>{
                    return (
                        <FormItem {...formItemLayout}>
                            {
                                getFieldDecorator(`education_education_${record.key}`, {
                                    initialValue:record.education,
                                    // this.state.student_info.education[0].time ||
                                })(
                                    <Input style={{
                                        borderStyle:'none'
                                    }} disabled={this.state.FormDisabled}/>
                                )
                            }
                        </FormItem>
                    )
                }
            }
        ]

        const {getFieldDecorator, getFieldValue} = this.props.form

        const formItemLayout = {
            labelCol: {
                // xs: {span: 24},
                // sm: {span: 4},
            },
            wrapperCol: {
                // xs: {span: 24},
                // sm: {span: 12},
            },
        };

        let DescriptionsTitle = this.state.FormDisabled ? <Button type="primary" onClick={()=>{
        this.setState({
            FormDisabled: false
        })}
            }>修改</Button> :
            <div>
                <Button type="primary" htmlType="submit">确定</Button>
                <Button type="primary" onClick={()=>{
                    this.setState({
                        FormDisabled:true
                    })
                }} style={{marginLeft:20}}>取消</Button>
            </div>


        return (
            <Spin spinning={this.state.loading}>
                <Form layout='horizontal' style={{width: '100%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                    <Descriptions title={
                        DescriptionsTitle
                    } bordered column={12} className={'student_content_2'}>
                        <Descriptions.Item label="姓名" span={3}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {
                                        initialValue:this.state.student_info.name,
                                    })(
                                        //  <Input style={{
                                        //      borderStyle:'none'
                                        //  }} disabled={this.state.FormDisabled}/>
                                        <div>
                                            {getFieldValue('name')}
                                        </div>
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label="性别" span={3}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('gender', {
                                        initialValue:gender_arr[this.state.student_info.gender],
                                    })(
                                        <div>
                                            {getFieldValue('gender')}
                                        </div>
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label="民族" span={3}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('nation', {
                                        initialValue:this.state.student_info.nation || '汉',
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入民族'
                                            }
                                        ],
                                    })(
                                        <Input style={{
                                            borderStyle:'none'
                                        }} disabled={this.state.FormDisabled}/>
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label="照片" span={3}>
                            <img src={local_url+this.state.student_info.img_addr} alt="avatar" style={{ width: 50 }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="籍贯" span={3}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('hometown', {
                                        initialValue:this.state.student_info.hometown || "",
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入籍贯'
                                            }
                                        ],
                                    })(
                                        <Input style={{
                                            borderStyle:'none'
                                        }} disabled={this.state.FormDisabled}/>
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label="政治面貌" span={3}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('parties', {
                                        initialValue: this.state.student_info.parties || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入政治面貌'
                                            }
                                        ],
                                    })(
                                        <Input style={{
                                            borderStyle:'none'
                                        }} disabled={this.state.FormDisabled}/>
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label="出生日期" span={3}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('birthday', {
                                        initialValue:moment(timestamp2Date('Y-m-d',this.state.student_info.birthday || new Date().getTime()/1000), 'YYYY-MM-DD'),
                                    })(
                                        <DatePicker showToday={false} disabled={this.state.FormDisabled} suffixIcon={
                                            <div/>
                                        }/>
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label="婚姻状况" span={3}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('married', {
                                        initialValue:this.state.student_info.married || '未婚',
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入婚姻状况'
                                            }
                                        ],
                                    })(
                                        <Input style={{
                                            borderStyle:'none'
                                        }} disabled={this.state.FormDisabled}/>
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label="联系电话" span={6}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('phone', {
                                        initialValue:this.state.student_info.phone,
                                        rules: [
                                            {
                                                len: 11,
                                                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                                                // required: true,
                                                message: '请输入正确的11位手机号码'
                                            }
                                        ]
                                    })(
                                        <Input style={{
                                            borderStyle:'none'
                                        }} disabled={this.state.FormDisabled} />
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label="电子邮箱" span={6}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('email', {
                                        initialValue:this.state.student_info.email || "orangels0313@163.com",
                                        rules: [
                                            {
                                                type: 'email',
                                                message: '请输入正确的邮箱地址'
                                            },
                                            {
                                                required: true,
                                                message: '请填写邮箱地址'
                                            }
                                        ]
                                    })(
                                        <Input style={{
                                            borderStyle:'none'
                                        }} disabled={this.state.FormDisabled} />
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label='教育经历' className={'education_experience'} span={12}>
                            <Table dataSource={this.state.education_data} columns={columns} pagination={false} bordered/>
                        </Descriptions.Item>
                        <Descriptions.Item label='实习经历' span={12}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('practice', {
                                        initialValue:this.state.student_info.practice || '',
                                    })(
                                        <TextArea placeholder="" autoSize className={'student_2_form_testArea'} disabled={this.state.FormDisabled} />
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label='技能证书' span={12}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('skill', {
                                        initialValue:this.state.student_info.skill || '',
                                    })(
                                        <TextArea placeholder="" autoSize className={'student_2_form_testArea'} disabled={this.state.FormDisabled} />
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label='获奖情况' span={12}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('awards', {
                                        initialValue:this.state.student_info.awards || '',
                                    })(
                                        <TextArea placeholder="" autoSize className={'student_2_form_testArea'} disabled={this.state.FormDisabled} />
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label='自我评价' span={12}>
                            <FormItem {...formItemLayout}>
                                {
                                    getFieldDecorator('evaluation', {
                                        initialValue:this.state.student_info.evaluation || '',
                                    })(
                                        <TextArea placeholder="" autoSize className={'student_2_form_testArea'} disabled={this.state.FormDisabled} />
                                    )
                                }
                            </FormItem>
                        </Descriptions.Item>
                    </Descriptions>
                </Form>
            </Spin>
        )
    }


}