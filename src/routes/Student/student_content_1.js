import React from 'react'
import {Card, Upload, Tooltip, Icon, Form, Checkbox, Select, Input, Button, Col, Row, message, BackTop,
    Spin, Modal, Radio} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'
import {HOST, ADD_STUDENT, ALL_SERVER, UPLOAD_IMG_TMP, EDI_STUDENT} from '../../utils/url_config'
import {_fetch, match_obj } from "../../utils/utils"

const FormItem = Form.Item
const Option = Select.Option

let local_url = HOST()

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


@Form.create()
class Server_content_1 extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text: '获取验证码',
            disabled: false,
            loading: false,
            server:[],
            imageUrl:undefined,
            student_info:{

            },
        };
        this.server_struct = {}
        this._generateStuInfo = this._generateStuInfo.bind(this)
    }

    _generateStuInfo(dataSource) {
        let { name, gender, grade, stuid, phone, server, img_addr, github, email } = dataSource
        let server_list = server.map((value, index)=>{
            return value.host
        })
        let server_user = 'user'
        let server_pwd = 'priv123'
        if (server.length > 0){
            server_user = server[0].user
            server_pwd = server[0].pwd
        }
        this.show_info = {
            name, gender, grade, stuid, phone,  img_addr, github, email,
            server :server_list,
            // user :server[0].user,
            // pwd : server[0].pwd
            user:server_user,
            pwd:server_pwd
        }
        this.setState({
            imageUrl:local_url+img_addr,
            student_info:this.show_info
        })
        console.log(this.show_info)
    }

    beforeUpload(file, fileList) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传JPG格式的图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不超过 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }))
        } else if (info.file.status === 'error') {
            // console.log(info.file)
            message.error(`${info.file.name} 文件上传失败（${info.file.error.message}）`);
            this.setState({
                loading: false
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log(err)
                message.warning('请先填写正确的表单')
            } else {
                let { name, gender, grade, stuid, phone, github, email } = values
                let query_url = local_url + EDI_STUDENT
                // let query_url = 'http://127.0.0.1:9000' + EDI_STUDENT
                let server = values.server.map((value, index)=>{
                    // console.log(this.server_struct)
                    // console.log(this.server_struct[value])
                    return {
                        host:value,
                        name:this.server_struct[value],
                        user:values.user,
                        pwd:values.pwd,
                    }
                })

                let new_data = {
                    name, gender, grade, stuid, phone, github, server, email,
                    img_addr: this.state.imageUrl
                }

                console.log({
                    name:values.name,
                    stuid:values.stuid,
                    grade:values.grade,
                    gender:values.gender,
                    github:values.github,
                    phone:values.phone,
                    server:server,
                    img_addr:this.state.imageUrl
                })


                this.setState({
                    loading: true
                },()=>{
                    _fetch(query_url,{
                        old_data:{
                            name:this.show_info.name,
                            grade:this.show_info.grade,
                            stuid:this.show_info.stuid,
                        },
                        new_data
                    },(json)=>{
                        console.log(json)
                        this.setState({
                            loading: false
                        },()=>{
                            if (json.status === 200){
                                message.success('提交成功')
                                // 更新 show_info
                                this._generateStuInfo(json.err_msg)
                                this.props.changeStudnetInfo(this.show_info)
                            }
                            else {
                                message.error(json.err_msg)
                            }
                        })
                    })
                })
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    componentWillMount() {

        console.log(this.props.student_info)
        this._generateStuInfo(this.props.student_info)

        let query_url = HOST() + ALL_SERVER
        _fetch(query_url, {
        }, (json)=>{
            let server_data = json.err_msg
            if (json.status === 200){
                server_data = server_data.map((value,index)=>{
                    return Object.assign({}, {host:value.host, name:value.name, interval:value.interval})
                })
                this.setState({
                    server: server_data
                },()=>{
                    this.state.server.forEach((value, index)=>{
                        this.server_struct[value.host] = value.name
                    });
                })
            }
            else {
                message.error(json.err_msg)
            }
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {student_info} = nextProps;
        this._generateStuInfo(student_info)
    }
    render() {
        // config_server
        let { server } = this.state || []
        server = server.map((value, index)=>{
            return (
                <Option key={`select_server_${index}`} value={value.host}>{value.name}</Option>
            )
        })

        // config img
        const { imageUrl } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const {getFieldDecorator, getFieldValue} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 4,
                },
            },
        }
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: 86,
        })(
            <Select style={{width: 70}}>
                <Option value={86}>+86</Option>
            </Select>
        );

        const Upload_img = getFieldDecorator('upload_img', {
            initialValue:this.state.imageUrl,
            rules: [
                {
                    required: true,
                    message: '请上传图片'
                }
            ],
        })(
            <div style={{
                position:'absolute',
                top:0,
                right:-150
            }}>

                <Upload
                    name="avatar"
                    showUploadList={false}
                    action={`${HOST()+UPLOAD_IMG_TMP}`}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    listType="picture-card">
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </div>
        );

        return (
            <div >
                <Spin spinning={this.state.loading}>
                    <Card bordered={false} title='学生配置'>
                        <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                            <FormItem {...formItemLayout} required label={(
                                <span>
                                    姓名&nbsp;
                                </span>
                            )}>
                                {
                                    getFieldDecorator('name', {
                                        initialValue:this.state.student_info.name,
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入学生姓名'
                                            }
                                        ],
                                    })(
                                        <Input/>
                                    )
                                }
                                { Upload_img }
                            </FormItem>
                            <FormItem {...formItemLayout} required label={(
                                <span>
                                    性别&nbsp;
                                </span>
                            )}>
                                {
                                    getFieldDecorator('gender', {
                                        // initialValue:this.show_info.gender,
                                        initialValue:this.state.student_info.gender,
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择性别'
                                            }
                                        ],
                                    })(
                                        <Radio.Group name="gender_radiogroup" >
                                            <Radio value={0}>男</Radio>
                                            <Radio value={1}>女</Radio>
                                        </Radio.Group>
                                    )
                                }
                            </FormItem>
                            <FormItem label='年级' {...formItemLayout} required>
                                {
                                    getFieldDecorator('grade', {
                                        initialValue:this.state.student_info.grade,
                                        rules: [
                                        ],
                                    })(
                                        <Select>
                                            <Option value={0}>研 0</Option>
                                            <Option value={1}>研 1</Option>
                                            <Option value={2}>研 2</Option>
                                            <Option value={3}>研 3</Option>
                                            <Option value={10}>博 0</Option>
                                            <Option value={11}>博 1</Option>
                                            <Option value={12}>博 2</Option>
                                            <Option value={13}>博 3</Option>
                                            <Option value={14}>博 4</Option>
                                            <Option value={15}>博 5</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                            <FormItem label='学号' {...formItemLayout}>
                                {
                                    getFieldDecorator('stuid', {
                                        initialValue:this.state.student_info.stuid,
                                        rules: [
                                            {
                                                pattern: /^[0-9]+$/,
                                                required: true,
                                                message: '请输入正确的学号'
                                            }
                                        ]
                                    })(
                                        <Input />
                                    )
                                }
                            </FormItem>
                            <FormItem label='电话' {...formItemLayout}>
                                {
                                    getFieldDecorator('phone', {
                                        initialValue:this.state.student_info.phone,
                                        rules: [
                                            {
                                                len: 11,
                                                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                                                // required: true,
                                                message: '请输入正确的11位手机号码'
                                            },
                                            {
                                                required: true,
                                                message: '请填写电话'
                                            }
                                        ]
                                    })(
                                        <Input addonBefore={prefixSelector}/>
                                    )
                                }
                            </FormItem>
                            <FormItem label='邮箱' {...formItemLayout}>
                                {
                                    getFieldDecorator('email', {
                                        initialValue:this.state.student_info.email || "orangels0313@gmail.com",
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
                                        <Input/>
                                    )
                                }
                            </FormItem>
                            <FormItem label='github 昵称' {...formItemLayout}>
                                {
                                    getFieldDecorator('github', {
                                        initialValue:this.state.student_info.github,
                                        rules: [

                                        ]
                                    })(
                                        <Input />
                                    )
                                }
                            </FormItem>
                            <FormItem label='服务器' {...formItemLayout} required>
                                {
                                    getFieldDecorator('server', {
                                        initialValue:this.state.student_info.server,
                                        rules: [
                                        ],
                                    })(
                                        <Select mode="multiple">
                                            {server}
                                        </Select>
                                    )
                                }
                            </FormItem>
                            <FormItem label='账号' {...formItemLayout}>
                                {
                                    getFieldDecorator('user', {
                                        initialValue:this.state.student_info.user,
                                        rules: [
                                            // {
                                            //     whitespace: true,
                                            //     message: '账号不能包含空格'
                                            // },
                                            {
                                                pattern: /^[a-zA-Z0-9]+$/,
                                                message: '账号不能包含空格及特殊字符'
                                            },
                                            {
                                                required: true,
                                                message: '请填写登录账号'
                                            }
                                        ],
                                    })(
                                        <Input/>
                                    )
                                }
                            </FormItem>
                            <FormItem label='密码' {...formItemLayout}>
                                {
                                    getFieldDecorator('pwd', {
                                        initialValue:this.state.student_info.pwd,
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入密码'
                                            },
                                            {
                                                min: 6,
                                                message: '密码至少为6个字符'
                                            },
                                            {
                                                max: 16,
                                                message: '密码最多为16个字符'
                                            },
                                            {
                                                whitespace: true,
                                                message: '密码中不能有空格'
                                            }
                                        ],
                                    })(
                                        <Input type='password'/>
                                    )
                                }
                            </FormItem>
                            <FormItem label='确认密码' {...formItemLayout} required>
                                {
                                    getFieldDecorator('confirm', {
                                        rules: [
                                            {
                                                validator: (rule, value, callback) => {
                                                    const {getFieldValue} = this.props.form
                                                    if (!getFieldValue('pwd')) {
                                                        callback('请先输入上面的密码！')
                                                    }
                                                    if (value && value !== getFieldValue('pwd')) {
                                                        callback('两次输入不一致！')
                                                    }
                                                    callback()
                                                }
                                            },
                                            {
                                                required: true,
                                                message: '请确认密码'
                                            },
                                        ]
                                    })(
                                        <Input type='password'/>
                                    )
                                }
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                {getFieldDecorator('agreement', {
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox>我已阅读并同意<a>协议</a></Checkbox>
                                )}
                            </FormItem>
                            <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" disabled={!getFieldValue('agreement')}>修改</Button>
                            </FormItem>
                        </Form>
                    </Card>
                    <BackTop visibilityHeight={200} style={{right: 50}}/>
                </Spin>
            </div>
        )
    }
}

export default Server_content_1