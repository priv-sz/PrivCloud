import Clusteredstacked from './Clusteredstacked'
import { dateFormat } from '../../utils/utils'

export let Generate_Clus = (test_data) =>{
    console.log(test_data)
    let dataSource = []
    for (let item of test_data.data_info){
        dataSource = dataSource.concat(item)
    }

    let timestamp_arr = []
    let server_age_obj = {}

    for (let item of dataSource) {
        if (timestamp_arr.indexOf(item.timestamp) === -1) {
            timestamp_arr.push(item.timestamp)
        }
        let server_age = `${item.net_ip}-${item.gpu_use}`

        if (!server_age_obj.hasOwnProperty(item.net_ip)) {
            server_age_obj[item.net_ip] = []
        }
        // 这里不能用 else if 会少算一个值
        if (server_age_obj[item.net_ip].indexOf(server_age) === -1) {
            server_age_obj[item.net_ip].push(server_age)
        }
    }
    let server_age_arr = []
    let key_arr = []
    for (let ip_key in server_age_obj){
        key_arr.push(ip_key)
        server_age_arr = server_age_arr.concat(server_age_obj[[ip_key]].sort((a,b)=>{
            a = Number(a.split('-')[1])
            b = Number(b.split('-')[1])
            return a-b
        }))
    }
    timestamp_arr.sort()
    console.log(timestamp_arr)
    console.log(server_age_arr)
    timestamp_arr = timestamp_arr.map((value, index)=>{
        // 这里 time 是时间戳 timestamp 是日期, 为了和 Histogram 数据源对应, 这里 key 未做修改
        let obj_tmp = {time:value, timestamp:dateFormat(value*1000,'m-d H:i:s')}
        for (let server_age_value of server_age_arr){
            obj_tmp[[server_age_value]] = 0
        }
        return obj_tmp
    })
    console.log(timestamp_arr)
    console.log(dataSource)
    timestamp_arr = timestamp_arr.map((timestamp_arr_item, index)=>{
        dataSource = dataSource.filter((data, index)=>{
            let server_age = `${data.net_ip}-${data.gpu_use}`
            //这里可以不做判断
            if (timestamp_arr_item.hasOwnProperty(server_age) && (timestamp_arr_item.time===data.timestamp)){
                timestamp_arr_item[server_age] = data.gpu_mem
                return false
            }
            return true
        })
        return timestamp_arr_item
    })
    console.log(timestamp_arr)
    console.log(dataSource)
    return {
        ages:server_age_arr,
        key_arr:key_arr,
        dataSource:timestamp_arr
    }
    // return (
    //     <Clusteredstacked ages={server_age_arr} key_arr={key_arr} dataSource={timestamp_arr}/>
    // )
}