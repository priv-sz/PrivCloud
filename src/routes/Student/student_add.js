import React from 'react'
import {Card, Upload, Tooltip, Icon, Form, Checkbox, Select, Input, Button, Col, Row, message, BackTop,
    Spin, Modal} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'
import {HOST, ADD_STUDENT, ALL_SERVER, UPLOAD_IMG_TMP} from '../../utils/url_config'
import {_fetch, match_obj} from "../../utils/utils"

const FormItem = Form.Item
const Option = Select.Option


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


@Form.create()
class Server_add extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text: '获取验证码',
            disabled: false,
            loading: false,
            server:[]
        };
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
                // let query_url = HOST() + ADD_STUDENT
                let query_url = 'http://127.0.0.1:9000' + ADD_STUDENT
                let server = values.server.map((value, index)=>{
                    return {
                        host:value,
                        user:values.user,
                        pwd:values.pwd
                    }
                })
                console.log({
                    name:values.name,
                    grade:values.grade,
                    gender:'1',
                    github:values.github,
                    phone:values.phone,
                    server:server,
                    img_addr:this.state.imageUrl
                })
                this.setState({
                    loading: true
                },()=>{
                    _fetch(query_url,{
                        name:values.name,
                        grade:values.grade,
                        gender:'1',
                        github:values.github,
                        phone:values.phone,
                        server:server,
                        img_addr:this.state.imageUrl
                    },(json)=>{
                        this.setState({
                            loading: false
                        },()=>{
                            // console.log(json)
                            if (json.status === 200){
                                message.success('提交成功')
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
                },)
            }
            else {
                message.error(json.err_msg)
            }
        })
    }

    render() {
        // config_server
        let { server } = this.state || []
        server = server.map((value, index)=>{
            return (
                <Option value={value.host}>{value.name}</Option>
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
                <Option value={87}>+87</Option>
            </Select>
        );

        const Upload_img = getFieldDecorator('upload_img', {
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
                <CustomBreadcrumb arr={[{title:'学生管理', to:'/student_info'}, '添加学生']}/>
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
                            <FormItem label='年级' {...formItemLayout} required>
                                {
                                    getFieldDecorator('grade', {
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
                            <FormItem label='电话' {...formItemLayout}>
                                {
                                    getFieldDecorator('phone', {
                                        rules: [
                                            {
                                                len: 11,
                                                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                                                // required: true,
                                                message: '请输入正确的11位手机号码'
                                            }
                                        ]
                                    })(
                                        <Input addonBefore={prefixSelector}/>
                                    )
                                }
                            </FormItem>
                            <FormItem label='github 昵称' {...formItemLayout}>
                                {
                                    getFieldDecorator('github', {
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
                                <Button type="primary" htmlType="submit" disabled={!getFieldValue('agreement')}>提交</Button>
                            </FormItem>
                        </Form>
                    </Card>
                    <BackTop visibilityHeight={200} style={{right: 50}}/>
                </Spin>
            </div>
        )
    }
}

export default Server_add