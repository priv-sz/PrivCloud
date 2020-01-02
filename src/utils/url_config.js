
// export let HOST = 'http://www.petcv.net:9000'
// export let HOST_TEST = 'http://192.168.88.61:9000'
export let HOST = function () {
    let url = window.location.origin
    if (url==='http://localhost:3000'){
        url = 'http://192.168.88.91:5010'
    }
    // //测试
    url = 'http://127.0.0.1:5000'
    return url
}

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


// export let ALL_STUDENT = '/stu_all_ss'
export let ALL_STUDENT = '/stu_all'
// export let ALL_STUDENT = '/stu_sel'
export let EDI_STUDENT = '/stu_edi'
export let ADD_STUDENT = '/stu_add'
export let DEL_STUDENT = '/stu_del'

export let TEST = '/test_json'
export let UPLOAD_IMG_TMP = '/upload_tmp'