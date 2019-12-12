import React from 'react'
import { Carousel, Card, BackTop, Tabs, Spin } from 'antd'
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import LoadableComponent from "../../utils/LoadableComponent";

const Step_Chart = LoadableComponent(()=>import('../../components/Charts/Step'))
const Server_content_1 = LoadableComponent(()=>import('./server_content_1'))
const Server_content_2 = LoadableComponent(()=>import('./server_content_2'))
const { TabPane } = Tabs;

class Server_detail extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        console.log(this.props.location.state)
    }

    render() {
        return (
            <div className='student_detail' >
                <CustomBreadcrumb arr={[{title:'服务器管理', to:'/server_info'}, '服务器详情']}/>
                <Card bordered={false} title='服务器详情'  >
                    <Tabs defaultActiveKey='1' tabPosition={'left'}
                          style={{height: 'auto' ,}}>
                        <TabPane tab="服务器配置" key="1" >
                            <Server_content_1 server_info={this.props.location.state}/>
                        </TabPane>
                        <TabPane tab="服务器信息" key="2" >
                            <Server_content_2 server_info={this.props.location.state} />
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

export default Server_detail