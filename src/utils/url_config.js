
// export let HOST = 'http://www.petcv.net:9000'
// export let HOST_TEST = 'http://192.168.88.61:9000'
export let HOST = function () {
    let url = window.location.origin
    if (url==='http://localhost:3000'){
        url = 'http://192.168.88.91:5010'
    }
    return url
}

export let ALL_SERVER = '/all_server'
export let ADD_SERVER = '/add_server'
export let EDI_SERVER = '/edi_server'
export let DEL_SERVER = '/server_del'
export let WEEK_SERVER_DATA = '/week_data'

export let ADD_STUDENT = '/stu_add'

export let TEST = '/test_json'
export let UPLOAD_IMG_TMP = '/upload_tmp'