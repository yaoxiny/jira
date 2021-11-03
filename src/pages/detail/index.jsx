import react,{useState,useEffect} from 'react'
import { Tabs ,Button,Collapse,Tag  } from 'antd';
import HeadTitle from '../active/components/Head_title'
import { queryByUpdate} from '@/services/active';
import {history} from 'umi'
import styles from './index.less'
const { TabPane } = Tabs;
const { Panel } = Collapse;
export default function Detail(){
    const [data,setData] = useState([])
    const [voteArr,setVoteArr] = useState([])
    const [list,setList] = useState([{name:'姓名',key:1,bol:false},
    {name:'性别',key:2,bol:false},
    {name:'图片',key:3,bol:false},
    {name:'手机号',key:4,bol:false},
    {name:'生日',key:5,bol:false},
    {name:'QQ号',key:6,bol:false},
    {name:'邮箱',key:7,bol:false},
    {name:'学院',key:8,bol:false},
    {name:'年级',key:9,bol:false},
    {name:'班级',key:10,bol:false},
    {name:'学号',key:11,bol:false},
    {name:'特长',key:12,bol:false},
    {name:'备注',key:13,bol:false},])
    let id=history.location.query.activityBasicId
    function btnMap(){
        return list.map(x=>{
            return <Tag color={x.bol?'blue':''} key={x.key}>{x.name}</Tag>
        })
    }
    function mapArr(){
        return voteArr.map(x=>{
            return <div className={styles.vote} key={x.id}>
            <p>姓名:{x.creator}</p>
            <p>说明:{x.modifier}</p>
            <div>
                图片: <img src={x.pictureUrl} alt="" />
            </div>
        </div>
        })
    }
    function back(){
        history.replace('/createActivity')
    }
    function tagChange(val){
        val.enrollArr.requiredEntryForms.map(x=>{
            const a=list.findIndex(obj=>obj.name==x.key)
            let arr=[...list]
            arr[a].bol=true
            setList(arr)
        })  
    }
    useEffect(async ()=>{
          let params={
            activityBasicId:id?id:''
          }
          let enrollArr=[]
          let voteArr=[]
          let str=''
          const{data,code} = await queryByUpdate(params)
          if(code!==200) return
          console.log(data);
          data.activityVOS?.map(x=>{
              if(x.activityType==1){
                  enrollArr=x
              }else if(x.activityType==2){
                  voteArr=x
                  setVoteArr(x.voteObjectVOS)
              }
          })
          data.enrollArr=enrollArr
          data.voteArr=voteArr
          data.scheduleVOS.map(x=>{
              data.str=str+x.scheduleDate
          })
          setData(data)
          tagChange(data)
    },[id])
    return (
        <div className={styles.detail}>
            <div className={styles.head}>
                <h1>详情</h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="基本信息" key="1">
                        <p>活动名称:{data.activityName}</p>
                        <p>活动地点:{data.activitySite}</p>
                        <p>活动时间:{data.startDate + '-' + data.endDate}</p>
                        <p>活动内容:{data.activityContent}</p>
                        <p>日程安排:{data.str}</p>
                        <Button onClick={back}>返回</Button>
                    </TabPane>
                    <TabPane tab="活动信息" key="2">
                        <Collapse defaultActiveKey={['1','2']} expandIconPosition='right'>
                            <Panel header="报名" key="1" style={{display:data.enrollArr?.length<1?'none':'block'}}>
                            <div>
                                <HeadTitle title={'基本信息'}></HeadTitle>
                                <p>活动时间:{data.enrollArr?.gmtCreated+''+data.enrollArr?.gmtModified}</p>
                                <p>报名人数:{data.enrollArr?.numberLimit}</p>
                                <HeadTitle title={'活动参加者填写的信息'}></HeadTitle>
                                {btnMap()}
                                <HeadTitle title={'补充项目'}></HeadTitle>
                                <p>项目名称:{data.enrollArr?.modifier}</p>
                            </div>
                            </Panel>
                            <Panel header="投票" key="2" style={{display:data.voteArr?.length<1?'none':'block'}}>
                                <HeadTitle title={'基本信息'}></HeadTitle>
                                    <p>活动时间:{data.voteArr?.gmtCreated+''+data.voteArr?.gmtModified}</p>
                                    <p>投票方式:{data.voteArr?.activityType==1?'只可投一次':'可重复投票'}</p>
                                <HeadTitle title={'投票对象'}></HeadTitle>
                                    {mapArr()}
                            </Panel>
                        </Collapse>,
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}