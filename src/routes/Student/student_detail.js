import React from 'react'
import {Carousel} from 'antd'
import CustomBreadcrumb from "../../components/CustomBreadcrumb";

class Student_detail extends React.Component {
    render() {
        return (
            <div className='student_detail'>
                <CustomBreadcrumb arr={[{title:'学生管理', to:'/student_info'}, '学生详情']}/>
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