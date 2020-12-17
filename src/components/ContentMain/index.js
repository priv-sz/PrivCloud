import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'

const Home = LoadableComponent(()=>import('../../routes/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分

const ListDemo = LoadableComponent(()=>import('../../routes/Display/ListDemo/index'))
//关于
const About = LoadableComponent(()=>import('../../routes/About/index'))

//服务器管理
const ServerInfo = LoadableComponent(()=>import('../../routes/Server/server_info'))
const ServerDetail = LoadableComponent(()=>import('../../routes/Server/server_detail'))
const ServerAdd = LoadableComponent(()=>import('../../routes/Server/server_add'))

//学生管理
const StudentInfo = LoadableComponent(()=>import('../../routes/Student/student_info'))
const StudentDetail = LoadableComponent(()=>import('../../routes/Student/student_detail'))
const StudentAdd = LoadableComponent(()=>import('../../routes/Student/student_add'))

//数据集管理
const DataBaseInfo = LoadableComponent(()=>import('../../routes/DataBase/DataBase_info'))

//Model Zoo
const Model_Zoo_Classification = LoadableComponent(()=>import('../../routes/Model_Zoo/Classification'))
const Model_Zoo_Detection = LoadableComponent(()=>import('../../routes/Model_Zoo/Detection'))

@withRouter
class ContentMain extends React.Component {
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {};
    }

  componentDidMount() {

  }


  render () {
    return (
      <div style={{padding: 16, position: 'relative'}} className={'test_stu'}>
        <Switch>
          <PrivateRoute exact path='/home' component={Home}/>
          <PrivateRoute exact path='/server_info' component={ServerInfo}/>
          <PrivateRoute exact path='/server_info/server_detail' component={ServerDetail}/>
          <PrivateRoute exact path='/server_info/add_server' component={ServerAdd}/>
          <PrivateRoute exact path='/student_info' component={StudentInfo}/>
          <PrivateRoute exact path='/student_info/student_detail' component={StudentDetail}/>
          <PrivateRoute exact path='/student_info/add_student' component={StudentAdd}/>
          <PrivateRoute exact path='/data_info' component={DataBaseInfo}/>
          <PrivateRoute exact path='/model_zoo/classification_sub' component={Model_Zoo_Classification}/>
          <PrivateRoute exact path='/model_zoo/detection_sub' component={Model_Zoo_Detection}/>
          <PrivateRoute exact path='/about' component={About}/>
          <Redirect exact from='/' to='/home'/>
        </Switch>
      </div>
    )
  }
}

export default ContentMain