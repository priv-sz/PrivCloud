import React from 'react'
import {Drawer, List, Avatar, Divider, Col, Row, Button, Popconfirm, message} from 'antd';
import {_fetch, deepCopy, getGrade, timestamp2Date} from "../../utils/utils";
import {EDI_SERVER, EDI_STUDENT, HOST, SERVER_STU} from '../../utils/url_config'
const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};
let local_url = HOST()

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

class Server_content_3 extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            visible: false,
            selectPerson:null,
            users:[]
        };
        this.onDelete = this.onDelete.bind(this)
    }
    onDelete(item){
        let users = deepCopy(this.state.users)
        users = users.filter((value, index)=>{
            if (value.name === item.name && value.grade === item.grade){
                item.server = item.server.filter((value, index)=>{
                    if (item.server_info.host === value.host){
                        return false
                    }else {
                        return  true
                    }
                })
                delete item['server_info']
                console.log(item)
                let query_url = local_url + EDI_STUDENT
                let new_data = {
                    server: item.server,
                    name:item.name,
                    grade:item.grade,
                    stuid:item.stuid,
                }
                // console.log(new_data)
                _fetch(query_url,{
                    old_data:{
                        name:item.name,
                        grade:item.grade,
                        stuid:item.stuid,
                    },
                    new_data
                },(json)=>{
                    console.log(json)
                    this.setState({
                        loading: false
                    },()=>{
                        if (json.status === 200){
                            message.success('提交成功')
                        }
                        else {
                            message.error(json.err_msg)
                        }
                    })
                });
                return false
            }else {
                return true
            }

        })
        this.setState({
            users
        })
    }

    showDrawer = (item) => {
        console.log(item)
        this.setState({
            visible: true,
            selectPerson:item
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        //TODO 暂时写到这里 这里加载了两次
        console.log('did 加载')
        let { name,  host } = this.props.server_info
        let query_url = HOST() + SERVER_STU
        _fetch(query_url, {
            'ip_list':[
                {
                    host,
                    name
                }
            ]
        },(json)=>{
            console.log(json)
            if (json.status === 200) {
                let users = json.err_msg[0].data_info.map((value, index)=>{
                    for (let item of value.server){
                        if (item.host === host){
                            value.server_info = item
                            break;
                        }
                    }
                    return value
                })
                this.setState({
                    users:users
                },()=>{
                    console.log(users)
                })
            }else {
                console.log(json.err_msg)
            }

        })
    }


    componentWillMount() {

    }

    render() {
        return (
            <div>
                <List
                    dataSource={this.state.users}
                    bordered
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <a onClick={this.showDrawer.bind(this, item)} key={`a-${item.id}`}>
                                    详情
                                </a>,
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(item)}>
                                    <a>删除</a>
                                </Popconfirm>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={`${HOST()}${item.img_addr}`} />
                                }
                                title={<a href="https://ant.design/index-cn">{item.name}</a>}
                                description={`用户名: ${item.server_info.user}`}
                            />
                        </List.Item>
                    )}
                />
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {this.state.selectPerson !== null ? <div>
                        <p style={{ ...pStyle, marginBottom: 24 }}>学生信息</p>
                        <p style={pStyle}>个人信息</p>
                        <Row>
                            <Col span={12}>
                                <DescriptionItem title="名字" content={this.state.selectPerson.name} />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="账号" content={this.state.selectPerson.server_info.user} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <DescriptionItem title="籍贯" content={this.state.selectPerson.hometown} />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="国家" content="China🇨🇳" />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <DescriptionItem title="生日" content={timestamp2Date('Y-m-d',this.state.selectPerson.birthday || new Date().getTime()/1000)} />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="年级" content={getGrade(this.state.selectPerson.grade)} />
                            </Col>
                        </Row>
                        <Divider />
                        <p style={pStyle}>履历</p>
                        <Row>
                            <Col span={12}>
                                <DescriptionItem title="专业" content={
                                    this.state.selectPerson.educationExperience.length > 0 ? this.state.selectPerson.educationExperience[0].education_speciality : "无"
                                } />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem
                                    title="专业技能"
                                    content={this.state.selectPerson.skill || "无"}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <DescriptionItem
                                    title="获得奖项"
                                    content={this.state.selectPerson.awards || "无"}
                                />
                            </Col>
                        </Row>
                        <Divider />
                        <p style={pStyle}>联络方式</p>
                        <Row>
                            <Col span={12}>
                                <DescriptionItem title="邮箱" content={this.state.selectPerson.email || "无"} />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="电话" content={this.state.selectPerson.phone || "无"} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <DescriptionItem
                                    title="Github"
                                    content={
                                        <a href={`https://github.com/${this.state.selectPerson.github}`} target="_Blank">
                                            {this.state.selectPerson.github}
                                        </a>
                                    }
                                />
                            </Col>
                        </Row>
                    </div> : null}
                </Drawer>

            </div>
        );
    }
}

export default Server_content_3;
