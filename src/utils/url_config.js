
// export let HOST = 'http://www.petcv.net:9000'
// export let HOST_TEST = 'http://192.168.88.61:9000'
export let HOST = function () {
    let url = window.location.origin
    if (url.indexOf("192.168.88") !== -1 ){
        url = 'http://192.168.88.191:5000'
    }
    else if (url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1){
        url = 'http://127.0.0.1:5000'
        // url = 'http://127.0.0.1:9000'
    }else {
        // //测试
        // url = 'http://127.0.0.1:9000'
        url = 'http://140.143.137.79:5000'
        // url = 'http://192.168.88.191:9000'
    }

    return url
}
//Login
export let USER_LOGIN = '/user_login'
export let QUERY_USERINFO = '/query_userInfo'

//Home
export let HOME_ALL_SERVER = '/home_all_server'
export let HOME_ALL_STUDENT = '/home_all_student'
export let FREE_SERVER = '/free_server'
export let QUERY_WEEK_SERVER_HOURS = '/query_week_server_hours'
export let QUERY_EACH_SERVER_HOURS = '/query_each_server_hours'


// 服务器
export let ALL_SERVER = '/all_server'
export let ADD_SERVER = '/add_server'
export let EDI_SERVER = '/edi_server'
export let DEL_SERVER = '/server_del'
export let WEEK_SERVER_DATA = '/week_data'
export let SERVER_STU = '/server_stu'
//服务器 24 小时
export let ONE_DAY = '/one_day'
// 服务器 分页 查询时间段 分成 count 段
export let PREIOD_TIME = '/period_time'


// 学生
// export let ALL_STUDENT = '/stu_all_ss'
export let ALL_STUDENT = '/stu_all'
// export let ALL_STUDENT = '/stu_sel'
export let EDI_STUDENT = '/stu_edi'
export let ADD_STUDENT = '/stu_add'
export let DEL_STUDENT = '/stu_del'


//数据集

export let ALL_DATABASE = '/all_database'

export let TEST = '/test_json'
export let UPLOAD_IMG_TMP = '/upload_tmp'