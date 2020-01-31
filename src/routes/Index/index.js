import React from 'react'
import {Form, Layout, message} from 'antd'
import SiderNav from '../../components/SiderNav'
import SiderNav_auth_1 from '../../components/SiderNav/index_auth_1'
import ContentMain from '../../components/ContentMain'
import ContentMain_auth_1 from '../../components/ContentMain/index_auth_1'
import HeaderBar from '../../components/HeaderBar'
import {inject, observer} from "mobx-react";
import {isAuthenticated} from '../../utils/Session'
import {HOST, QUERY_USERINFO} from '../../utils/url_config'
import {_fetch} from "../../utils/utils";

const {Sider, Header, Content, Footer} = Layout

let local_url = HOST()

@inject('appStore') @observer
class Index extends React.Component{
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        collapsed: false,
        loginUser:{
          username: '', password: '', auth:1
        }
      };

    }

  toggle = () => {
    // console.log(this)  状态提升后，到底是谁调用的它
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  componentDidMount() {
    let sessionId = isAuthenticated()
    let query_url = local_url + QUERY_USERINFO
    // TODO 这里会有丢失 cookie 的问题, 暂时传参
    _fetch(query_url,{
      sessionId:sessionId
    },(json)=>{
      if (json.status === 200){
        this.setState({
          loginUser: json.err_msg
        }, ()=>{
          console.log(this.state.loginUser)
        })
      }
      else {
        console.log(json.err_msg)
        message.error('cookie 查询失败')
      }
    })
    console.log('***************')
    console.log(sessionId)
    console.log('***************')
  }

  render() {
     let { auth } = this.state.loginUser
    console.log(auth)
    // 设置Sider的minHeight可以使左右自适应对齐
    return (
      <div id='page'>
        <Layout>
          <Sider collapsible
                 trigger={null}
                 collapsed={this.state.collapsed}
                 >
            {auth === 0 ? <SiderNav/> : <SiderNav_auth_1/>}
          </Sider>
          <Layout>
            <Header style={{background: '#fff', padding: '0 16px'}}>
              <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle}/>
            </Header>
            <Content>
              {auth === 0 ? <ContentMain/> : <ContentMain_auth_1/>}
              {/*<ContentMain/>*/}
            </Content>
            <Footer style={{textAlign: 'center'}}>LaMer ©2019 Created by Priv </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default Index