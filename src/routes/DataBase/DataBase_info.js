import React from 'react'
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import {BackTop, Card, Table, Tag, Tooltip, message, Icon, Drawer, Row, Col, Divider} from "antd";
import {_fetch, getGrade, timestamp2Date} from "../../utils/utils";
import {HOST, ALL_DATABASE, SERVER_STU} from "../../utils/url_config";

let local_url = HOST()

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};
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


        <Tag color={'#2db7f5'} >
            {content}
        </Tag>
        {/*{content}*/}
    </div>
);


export default class DataBase_info extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data8:[],
            selectDataBase:null,
            visible: false,
        };
      }

      componentDidMount() {
          let query_url = local_url + ALL_DATABASE
          _fetch(query_url,{},(json)=>{
              if (json.status === 200) {
                  message.success('加载成功')
                  this.setState({
                      data8:json.err_msg,
                      server_conf:json.server_conf,
                      data_class_conf:json.data_class_conf
                  },()=>{
                      console.log(this.state.data8)
                  })
              }else {
                  message.error('加载失败')
              }
          })
      }

    columns_details = [
        {
          title:'任务',
          dataIndex:'task'
        },
        {
            title:'annotations_format',
            dataIndex:'annotations_format',
            render:(text, row) => {
                return (
                    <div>
                        <Icon type="file-text" theme="filled" />
                        {text}
                    </div>
                )
            }
        },
        {
            title:'data_format',
            dataIndex:'data_format',
            width:'20%',
            render:(text, row) => {
                return (
                    <div>
                        <Icon type="file-image" theme="filled" />
                        {text}
                    </div>
                )
            }
        },
        {
            title:'train',
            dataIndex:'train',
            render:(text, row) => {
                return (
                    <Tag color={'#87d068'} >
                        {text}
                    </Tag>
                )
            }
        },
        {
            title:'val',
            dataIndex:'val',
            render:(text, row) => {
                return (
                    <Tag color={'#87d068'} >
                        {text}
                    </Tag>
                )
            }
        },
        {
            title:'test',
            dataIndex:'test',
            render:(text, row) => {
                return (
                    <Tag color={'#87d068'} >
                        {text}
                    </Tag>
                )
            }
        },
    ]

    columns8 = [
        {
            title: '服务器',
            dataIndex: 'group_server_name',
            // width: '15%',
            render:(text, row, index) => {
                let obj = {
                    children: this.state.server_conf[text],
                    props: {},
                };
                if (row.group_server_index === 0){
                    obj.props.rowSpan = row.group_server_len;
                }else {
                    obj.props.rowSpan = 0;
                }
                return obj
            }
        },
        {
            title: '数据集',
            dataIndex: 'group_name',
            // width: '15%',
            render:(text, row, index) => {
                let obj = {
                    children: text,
                    props: {},
                };
                if (row.group_index === 0){
                    obj.props.rowSpan = row.group_len;
                }else {
                    obj.props.rowSpan = 0;
                }
                return obj
            }
        },
        {
            title: '数据集',
            dataIndex: 'name',
            // width: '15%',
        },
        {
            title: '发布时间',
            dataIndex: 'year',
            // width: '10%',
        },
        {
            title: '官网地址',
            dataIndex: 'url',
            // width: '15%',
            render:(text, row, index) => {
                return (
                    <a href={text} target="_Blank">
                        <Icon type="tag" theme="twoTone" style={{marginRight:10}}/>
                        链接
                    </a>
                )
            }
        },
    ]

    columns_data_server = [
        {
            title: '数据集',
            dataIndex: 'group_name',
            // width: '15%',
            render:(text, row, index) => {
                let obj = {
                    children: text,
                    props: {},
                };
                if (row.group_index === 0){
                    obj.props.rowSpan = row.group_len;
                }else {
                    obj.props.rowSpan = 0;
                }
                return obj
            }
        },
        {
            title: '子集',
            dataIndex: 'name',
            // width: '15%',
            render:(text, row, index) => {
                return (
                    <a href={row.url} target="_Blank">
                        {text}
                    </a>
                )
            }
        },
        {
            title: '发布时间',
            dataIndex: 'year',
            width: '10%',
            render:(text, row) => {
                let result = text
                if (result === 'None') {
                    result = '无'
                }
                return result
            }
        },
        {
          title:'大小',
          dataIndex:'size',
            sorter: (a, b)=>{
                let unit_type = {
                    'G':1024*1024,
                    'T':1024*1024*1024,
                };

                let a_size;
                let b_size;
                if (a.size.length === 0){
                    a_size = 0
                }else {
                    let a_unit = a.size.substr(a.size.length-1, 1)
                    let a_num = Number(a.size.substr(0, a.size.length-1 || 1))
                    a_size = a_num*unit_type[[a_unit]]
                }

                if (b.size.length === 0){
                    b_size = 0
                }else {
                    let b_unit = b.size.substr(b.size.length-1, 1)
                    let b_index = b.size.length-2
                    let b_num = Number(b.size.substr(0, b.size.length-1 || 1))
                    b_size = b_num*unit_type[[b_unit]]
                }

                return a_size-b_size
            },
            defaultSortOrder: 'descend',
            render:(text, row) => {
              return (
                  <Tag color={'#87d068'} style={{width:50}}>
                      {text}
                  </Tag>
              )
            }
        },
        {
          title:'类别',
            width: '10%',
          dataIndex:'class',
            sorter: (a, b)=>{
              let class_type = {
                  'C':0,
                  'B':10,
                  'A':100,
              }
              return class_type[[a.class]] - class_type[[b.class]]
            },
            defaultSortOrder: 'descend',
        },
        {
            title: '服务器',
            dataIndex: 'group_server_name',
            // width: '15%',
            render:(text, row, index) => {

                let server_info = row.group_server_name.map((item, index)=>{
                    let colorType = 'purple'
                    return (
                        <Tag color={colorType} style={{marginTop:5}}>
                            {this.state.server_conf[item]}
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
            title: '详情',
            dataIndex: 'url',
            width: '10%',
            render:(text, row, index) => {
                return (
                    <a onClick={()=>{
                        this.setState({
                            visible: true,
                            selectDataBase:row
                        })
                    }}>
                        <Icon type="appstore" theme="twoTone" style={{marginRight:10}}/>
                        详情
                    </a>
                )
            }
        },
    ]

    onClose = () => {
        this.setState({
            visible: false,
        });
    };


      render() {
          return (
              <div>
                  <CustomBreadcrumb arr={['数据管理']}/>
                  <Card bordered={false} title='数据集列表' style={{marginBottom: 10, minHeight: 440}} id='editTable'>
                      <Table style={style.tableStyle} dataSource={this.state.data8}
                             // columns={this.columns8}
                             columns={this.columns_data_server}
                             bordered
                             pagination={false}
                      />
                  </Card>
                  <Drawer
                      width={800}
                      placement="right"
                      closable={false}
                      onClose={this.onClose}
                      visible={this.state.visible}
                  >
                      {this.state.selectDataBase !== null ?
                          <div>
                              <p style={{ ...pStyle, marginBottom: 24 }}>数据集信息</p>
                              <Row>
                                  <Col span={12}>
                                      <DescriptionItem title="名称" content={this.state.selectDataBase.name} />
                                  </Col>
                                  <Col span={12}>
                                      <DescriptionItem title="大小" content={this.state.selectDataBase.size} />
                                  </Col>
                              </Row>
                              <Row>
                                  <Col span={12}>
                                      <DescriptionItem title="类别" content={`${this.state.selectDataBase.class}类(${this.state.data_class_conf[this.state.selectDataBase.class]})`} />
                                  </Col>
                                  <Col span={12}>
                                      <DescriptionItem title="日期" content={this.state.selectDataBase.year} />
                                  </Col>
                              </Row>
                              <Divider />
                              <p style={pStyle}>任务</p>
                              <Row>
                                  <Col span={24}>
                                      <Table style={style.tableStyle} dataSource={this.state.selectDataBase.details}
                                             columns={this.columns_details}
                                             pagination={false}
                                      />
                                  </Col>
                              </Row>
                              <Divider />
                          </div>
                              : null}
                  </Drawer>
                  <BackTop visibilityHeight={200} style={{right: 50}}/>
              </div>
          )
      }
}

const style = {
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