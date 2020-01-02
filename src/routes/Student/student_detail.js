import React from 'react'
import { Carousel, Card, BackTop, Tabs, Spin } from 'antd'
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import LoadableComponent from "../../utils/LoadableComponent";
import { withRouter } from 'react-router-dom'

const Step_Chart = LoadableComponent(()=>import('../../components/Charts/Step'))
const Server_content_1 = LoadableComponent(()=>import('./student_content_1'))
const Server_content_2 = LoadableComponent(()=>import('./student_content_2'))
const { TabPane } = Tabs;

@withRouter
class Student_detail extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            student_info:null
        }
        this.changeStudnetInfo = this.changeStudnetInfo.bind(this)
    }

    componentWillMount() {
        console.log(this.props.location.state)
        if (this.props.location.state === undefined){
            this.props.history.push('/student_info', )
        }else {
            this.setState({
                student_info:this.props.location.state
            })
        }
    }

    changeStudnetInfo(student_info){
        this.setState({
            student_info
        })
    }

    render() {
        if (this.props.location.state === undefined){
            this.props.history.push('/student_info', )
            return <div className='student_detail' >
                        <CustomBreadcrumb arr={[{title:'服务器管理', to:'/server_info'}, '服务器详情']}/>
                        <div>
                            跳转回服务器管理
                        </div>
                        <BackTop visibilityHeight={200} style={{right: 50}}/>
                  </div>
        }
        return (
            <div className='student_detail' >
                <CustomBreadcrumb arr={[{title:'学生管理', to:'/student_info'}, '学生详情']}/>
                <Card bordered={false} title='学生详情'  >
                    <Tabs defaultActiveKey='1' tabPosition={'left'}
                          style={{height: 'auto' ,}}>
                        <TabPane tab="学生配置" key="1" >
                            <Server_content_1 student_info={this.state.student_info} changeStudnetInfo={this.changeStudnetInfo}/>
                        </TabPane>
                        <TabPane tab="学生信息" key="2" >
                            <Server_content_2 student_info={this.state.student_info} changeStudnetInfo={this.changeStudnetInfo}/>
                        </TabPane>
                    </Tabs>
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
    }
}

export default Student_detail