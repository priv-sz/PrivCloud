import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'

const Home = LoadableComponent(()=>import('../../routes/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分

const ListDemo = LoadableComponent(()=>import('../../routes/Display/ListDemo/index'))
//关于
const About = LoadableComponent(()=>import('../../routes/About/index'))

//服务器管理
const ServerDemo = LoadableComponent(()=>import('../../components/Charts/Step'))
//学生管理
const StudentInfo = LoadableComponent(()=>import('../../routes/Student/student_info'))
const StudentDetail = LoadableComponent(()=>import('../../routes/Student/student_detail'))



@withRouter
class ContentMain extends React.Component {
  render () {
    return (
      <div style={{padding: 16, position: 'relative'}} className={'test_stu'}>
        <Switch>
          <PrivateRoute exact path='/home' component={Home}/>
          <PrivateRoute exact path='/server_info' component={ServerDemo}/>
          <PrivateRoute exact path='/student_info' component={StudentInfo}/>
          <PrivateRoute exact path='/student_info/student_detail' component={StudentDetail}/>
          <PrivateRoute exact path='/home/about' component={About}/>
          <Redirect exact from='/' to='/home'/>
        </Switch>
      </div>
    )
  }
}

export default ContentMain