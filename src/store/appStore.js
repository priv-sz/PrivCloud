import {observable, action} from 'mobx'
import {isAuthenticated,authenticateSuccess,logout} from '../utils/Session'
import {HOST, USER_LOGIN} from "../utils/url_config";
import {_fetch} from "../utils/utils";

let local_url = HOST()

class AppStore {


  @observable isLogin = !!isAuthenticated()  //利用cookie来判断用户是否登录，避免刷新页面后登录状态丢失
  @observable users = [
      {username: 'soeaver', password: 'priv123', auth:0},
      {username: 'songqing', password: 'priv123', auth:0},
      {username: 'priv', password: 'd09d09d09', auth:0},
      {username: 'test', password: 'test', auth:1},
      ]

    // @observable users = []

  @observable loginUser = {}  //当前登录用户信息


  @action toggleLogin(flag,info={}) {
    console.log('登录')
    this.loginUser = info  //设置登录用户信息
    if (flag) {
      // ls changed
      authenticateSuccess(info.username)
      // authenticateSuccess(info)
      this.isLogin = true
    } else {
      logout()
      this.isLogin = false
    }

  }
  @action initUsers() {
    const localUsers = localStorage['users']?JSON.parse(localStorage['users']):[]
    this.users = [{username: 'admin', password: 'admin', auth:0},...localUsers, ...this.users]
  }
}

export default new AppStore()