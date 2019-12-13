import React from 'react'
import {Card, Cascader, Tooltip, Icon, Form, Checkbox, Select, Input, Button, Col, Row, message, BackTop, Spin} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'
import {HOST, EDI_SERVER, TEST, HOST_TEST} from '../../utils/url_config'
import {_fetch, match_obj} from "../../utils/utils"
import { servers_device_info_template } from '../../data/server'

const FormItem = Form.Item
const Option = Select.Option


@Form.create()
class Server_content_1 extends React.Component {
    state = {
        text: '获取验证码',
        disabled: false,
        loading:false
    }
    timer = 0
    countdown = (e) => {
        let time = 60
        this.setState({
            text: --time + 's',
            disabled: true
        })
        this.timer = setInterval(() => {
            if (time > 0) {
                this.setState({
                    text: --time + 's',
                    disabled: true
                })
            } else {
                this.setState({
                    text: '获取验证码',
                    disabled: false
                })
            }
        }, 1000)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请先填写正确的表单')
            } else {
                if (match_obj(this.show_info, values)){
                    message.warning('无修改')
                }else {
                    let query_url = HOST + EDI_SERVER
                    let { name, interval, user, pwd, host } = values
                    let new_data = {
                        name,
                        interval,
                        user,
                        pwd,
                        host,
                    }
                    this.setState({
                        loading: true
                    },()=>{
                        _fetch(query_url,{
                            old_data:{...this.show_info},
                            new_data
                        },(json)=>{
                            this.setState({
                                loading: false
                            },()=>{
                                // console.log(json)
                                if (json.status === 200){
                                    message.success('提交成功')
                                }
                                else {
                                    console.log(json.err_msg)
                                    message.error(json.err_msg)
                                }
                                this.show_info = new_data
                            })
                        })
                    })

                }

            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    componentWillMount() {

        let { name, interval, user, pwd, host } = this.props.server_info
        this.show_info = {
            name,
            interval,
            user,
            pwd,
            host,
            confirm: pwd
        }
    }

    render() {

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
        return (
            <div >
                <Spin spinning={this.state.loading}>
                <Card bordered={false} title='服务器配置'>
                    <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} required label={(
                            <span>
                简称&nbsp;
                                <Tooltip title='请输入服务器简称 例: 服务器 80'>
                                    <Icon type='question-circle-o'/>
                                </Tooltip>
                            </span>
                        )}>
                            {
                                getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入服务器名称'
                                        }
                                    ],
                                    initialValue:this.show_info.name
                                })(
                                    <Input/>
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
                                    initialValue: this.show_info.user
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
                                    initialValue:this.show_info.pwd
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
                        <FormItem label='ip 地址' {...formItemLayout} required>
                            {
                                getFieldDecorator('host', {
                                    rules: [
                                        {
                                            pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
                                            required: true,
                                            message: '请输入正确 ip 地址'
                                        }
                                    ],
                                    initialValue:this.show_info.host
                                })(
                                <Input />
                                )
                            }
                        </FormItem>
                        <FormItem label='信息采集间隔' {...formItemLayout} required>
                            {
                                getFieldDecorator('interval', {
                                    rules: [
                                    ],
                                    initialValue: this.show_info.interval
                                })(
                                    <Select>
                                        <Option value={10*60}>10 分钟</Option>
                                        <Option value={30*60}>30 分钟</Option>
                                        <Option value={60*60}>60 分钟</Option>
                                    </Select>
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