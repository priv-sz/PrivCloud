import React from 'react'
import {Carousel, Card, BackTop} from 'antd'
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import LoadableComponent from "../../utils/LoadableComponent";

const Step_Chart = LoadableComponent(()=>import('../../components/Charts/Step'))

class Server_detail extends React.Component {
    render() {
        return (
            <div className='student_detail'>
                <CustomBreadcrumb arr={[{title:'服务器管理', to:'/server_info'}, '服务器详情']}/>
                <Card bordered={false} title='服务器详情' style={{marginBottom: 10, minHeight: 440}} id='editTable'>
                    <Step_Chart />
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