import React from 'react'
import {BackTop, Card, Col, Row, Table, message, Tooltip, Icon, Divider, Tag} from 'antd'
import {HOST, HOME_ALL_SERVER,HOME_ALL_STUDENT, FREE_SERVER, QUERY_WEEK_SERVER_HOURS, QUERY_EACH_SERVER_HOURS} from '../../utils/url_config'
import LoadableComponent from "../../utils/LoadableComponent";
import {_fetch, deepCopy, timestamp2Date} from "../../utils/utils";

const Chart_step = LoadableComponent(()=>import('../../components/Charts/Student_Chart_server'))
const Histogram_chart = LoadableComponent(()=>import('../../components/Charts/Histogram_chart'))
const WaterWave = LoadableComponent(()=>import('../../components/WaterWave/index'))

let local_url = HOST()
const col_height = 680
const chart_height = 350
const timer_interval = 1000 * 60 *30 // 30 min

class Home extends React.Component {
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        server_hours :0,
        server_hours_percent:0,
        free_servers : [],
        server_chart_data: []
      };
      this.server_query = this.server_query.bind(this)
      this.student_query = this.student_query.bind(this)
    }

  student_query(){

  }

  server_query(){
      let query_url = local_url + QUERY_WEEK_SERVER_HOURS
      _fetch(query_url,{}, (json)=>{
        if (json.status === 200){
          this.setState({
            server_hours_week:json.err_msg.total_hours_week + 'h',
            server_hours_percent_week:Math.round(json.err_msg.hours_percent_week*100),
            server_hours_day:json.err_msg.total_hours_day + 'h',
            server_hours_percent_day:Math.round(json.err_msg.hours_percent_day*100),
          }, ()=>{
            console.log(this.state.server_hours)
            console.log(this.state.server_hours_percent)
          })
        }else {
          message.error(json.err_msg)
        }
      })
      let query_url_1 = local_url + FREE_SERVER
      _fetch(query_url_1, {}, (json)=>{
        if (json.status === 200){
          this.setState({
            free_servers : json.err_msg
          }, ()=>{
            console.log(this.state.free_servers)
          })
        }else {
          message.error(json.err_msg)
        }
      })

    let query_url_2 = local_url + QUERY_EACH_SERVER_HOURS
    _fetch(query_url_2, {}, (json)=>{
      if (json.status === 200){
        let chart_data = deepCopy(json.err_msg)
        // 排序 降序
        console.log(chart_data)
        let server_chart_data = chart_data.servers
        let student_chart_data = chart_data.students
        server_chart_data.sort((a, b)=> {
          return b.total_hours - a.total_hours
        })

        student_chart_data.sort((a, b)=> {
          return b.total_hours - a.total_hours
        })
        this.setState({
          server_chart_data,
          student_chart_data
        }, ()=>{
          console.log(this.state.free_servers)
        })
      }else {
        message.error(json.err_msg)
      }
    })
  }


    componentDidMount() {
      // this.server_query()
      // this.student_query()
      console.log('开始 timer')
      this.timer = setInterval(this.server_query(), timer_interval);

    }

    componentWillUnmount() {
      this.timer && clearInterval(this.timer)
      console.log('清除 timer')
    }


  free_server_columns = [
    {
      title: '服务器',
      dataIndex: 'name',
      render:(text, row) =>{
        return (
            <Tag color={'#87d068'}>
              {text}
            </Tag>
        )
      }
    },
    {
      title: 'ip',
      dataIndex: 'net_ip',
    },
    {
      title:'检测时间',
      dataIndex:'timestamp',
      render:(text, row) =>{
        return timestamp2Date('H:i', row.timestamp)
      }
    },
    {
      title: '空余显卡',
      dataIndex: 'fan',
      render:(text, row) =>{
        let tag_type = 'purple'
        let gpus = row.fan.map((gpu, index)=>{
          return (
              <Tag color={tag_type} >
                {gpu}
              </Tag>
          )
        })
        return (
            <div>
              {gpus}
            </div>
        )
      }
    },
  ];


  render() {
    return (
      <div style={styles.bg} className='home'>
        <Row gutter={16} style={{backgroundColor:'#F0F2F5', padding:10}}>
          <Col span={24} >
            <div style={{...styles.col_div, height:"auto"}}>
              <span style={{marginLeft:20}}>
                当前空闲服务器&nbsp;
                <Tooltip title='当天空闲服务器状态'>
                  <Icon type='question-circle-o'/>
                </Tooltip>
              </span>
              {
                this.state.free_servers.length > 0 ? <Table columns={this.free_server_columns} dataSource={this.state.free_servers} pagination={false} /> : <h2 style={{alignSelf:'center'}}>无显卡空闲</h2>
              }
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{backgroundColor:'#F0F2F5', padding:10}}>
          <Col span={12} style={{height:col_height}}>
            <div style={styles.col_div}>
              <span style={{marginLeft:20}}>
                服务器&nbsp;
                <Tooltip title='本周服务器运行时长统计'>
                  <Icon type='question-circle-o'/>
                </Tooltip>
              </span>
              <Divider />
              <div style={styles.wave_wrap}>
                <Tooltip title='今日所有服务器显卡已运行时间'>
                  <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                    <WaterWave type="circle" width={100} height={100} showText={this.state.server_hours_day}
                               rangeValue={this.state.server_hours_percent_day} />
                    <span>当日</span>
                  </div>
                </Tooltip>
                <Tooltip title='本周所有服务器显存总占用平均值'>
                  <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                    <WaterWave type="circle" width={100} height={100} showText={this.state.server_hours_week}
                               rangeValue={this.state.server_hours_percent_week} />
                    <span>当周</span>
                  </div>
                </Tooltip>
              </div>
              <Divider />
              <Tag style={{marginTop:2, marginLeft:50, marginBottom:10, width:150}} color={'#87d068'}>
                本周服务器运行时长
              </Tag>
              <Histogram_chart data={this.state.server_chart_data} cols={{
              }}
                               height={chart_height}
                               offsetY={-5}/>
            </div>
          </Col>
          <Col span={12} style={{height:col_height}}>
            <div style={styles.col_div}>
              <span style={{marginLeft:20}}>
                学生&nbsp;
                <Tooltip title='本周同学运行服务器时长统计'>
                  <Icon type='question-circle-o'/>
                </Tooltip>
              </span>
              <Divider />
              <div style={styles.wave_wrap}>
                <Tooltip title='今日所有同学使用服务器显卡总运行时间'>
                  <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                    <WaterWave type="circle" width={100} height={100} showText={this.state.server_hours_day}
                               rangeValue={this.state.server_hours_percent_day} />
                    <span>当日</span>
                  </div>
                </Tooltip>
                <Tooltip title='本周所有同学使用服务器显卡总运行时间'>
                  <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                    <WaterWave type="circle" width={100} height={100} showText={this.state.server_hours_week}
                               rangeValue={this.state.server_hours_percent_week} />
                    <span>当周</span>
                  </div>
                </Tooltip>
              </div>
              <Divider />
              <Tag style={{marginTop:2, marginLeft:50, marginBottom:10, width:180}} color={'#87d068'}>
                本周各同学运行服务器时长
              </Tag>
              <Histogram_chart data={this.state.student_chart_data} cols={{
              }}
                               height={chart_height}
                               offsetY={20}/>
            </div>
          </Col>
        </Row>

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
  },
  col_div:{
    backgroundColor:'#FFFFFF',
    height:'100%',
    paddingTop:10,
    display:'flex',
    flexDirection:'column'
  },
  tableStyle: {
    width: '100%'
  },
  wave_wrap:{
    display: 'flex',
    justifyContent:'space-around'
  }
}

export default Home