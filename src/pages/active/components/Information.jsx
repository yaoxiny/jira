import react,{useState,useEffect} from 'react'
import styles from './information.less';
import moment from 'moment';
import {queryByUpdate} from '@/services/active';
import {history} from 'umi'

import { Collapse, Form,Button} from 'antd';

  const { Panel } = Collapse;

export default function Information({choise,panelArr,draftsSave,form,getTag}){
    let [flag,setFlag] = useState(0)
    let [activityData,setActivityData] = useState(false)
    
    function PanelArr(){
      return panelArr.map(x=>{
        return x.flag?<Panel  header={x.title} key={x.key}>
        {x.component}
          </Panel>:''
      })
    }
    const onFinish = (values) => {
      console.log(values,'Finishvalues');
      let obj={
        activityTime:values.time1?[]:'',
        activityTimeVote:values.time2?[]:'',
        numberLimit:'',
      }
      
      if(values.time1){
        obj.activityTime[0] = moment(values.time1[0]).format('YYYY-MM-DD HH:mm:ss')
        obj.activityTime[1] = moment(values.time1[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      if(values.time2){
        obj.activityTimeVote[0] = moment(values.time2[0]).format('YYYY-MM-DD HH:mm:ss')
        obj.activityTimeVote[1] = moment(values.time2[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      obj.voteway = values.voteType
      obj.dayVoteLimit = values.today
      obj.singlePlayerLimit = values.repeat
      if(values.voteObjectVOS&&!activityData){
        console.log(values.voteObjectVOS,'voteObject');
        values.voteObjectVOS.forEach(x=>{
          x.pictureUrl=x.pictureKey[0].response.data.imgUrl
          x.pictureKey=x.pictureKey[0].response.data.imgKey
        })
      }
      if(activityData){
        values.voteObjectVOS.forEach(x=>{
          console.log(x);
          x.pictureUrl=x.pictureKey[0].url
          x.pictureKey=x.pictureKey[0].uid
        })
      }
      let voteActivityVOS={
        activityType:2,
        startDate:obj.activityTimeVote[0] ,
        endDate:obj.activityTimeVote[1],
        voteWay:obj.voteway,
        dayVoteLimit:obj.dayVoteLimit,
        singlePlayerLimit:obj.singlePlayerLimit,
        voteObjectVOS:values.voteObjectVOS
      }
      
      if(values.time2){
        obj.voteActivityVOS=voteActivityVOS
      }
      obj.voteObjectVOS=values.voteObjectVOS
        obj.numberLimit=values.people1
        draftsSave(obj,flag,activityData)
      };
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    function goBack(){
      choise(false)
    }
    useEffect(async ()=>{
      if(history.location.query.activityBasicId){
       let activityId={
           activityBasicId:history.location.query.activityBasicId
         }
         const{data,code} = await queryByUpdate(activityId)
         if(code!==200) return
         setActivityData(true)
         let a={}
         let b={}
         let c=[]
        data.activityVOS?.map(x=>{
          if(x.activityType==1){
            a=x
          }else if(x.activityType==2){
            b=x
            console.log(x,'vptessssss');
            x.voteObjectVOS.map(x=>{
              c.push({name:x.name,instructions:x.instructions,pictureKey:[{
                uid: x.pictureKey,
                url: x.pictureUrl
              }],key:x.pictureKey})
            })
          }
        })
        console.log(data,'data');
        getTag('isSignUp',data.isSignUp)
        getTag('isVote',data.isVote)
       form.setFieldsValue({
        time1:[moment(a.gmtCreated),moment(a.gmtModified)],
        people1:a.numberLimit,
        time2:[moment(b.gmtCreated),moment(b.gmtModified)],
        voteType:b.voteWay,
        today:b.dayVoteLimit,
        repeat:b.singlePlayerLimit,
        voteObjectVOS:c,
      })
      }
  },[])
    return (
        <div>
             <Form
                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                form={form}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
                >
            <div className={styles.card}>
                <Collapse defaultActiveKey={['1','2','3','4','5']} expandIconPosition='right'>
                    {PanelArr()}
                </Collapse>
            </div>
            <div className={styles.btn_box}>
              <Button htmlType="submit" onClick={()=>setFlag(1)} style={{background:'#1A267B',color:'#fff'}}>发布</Button>
              <Button onClick={goBack}>上一步</Button>
              <Button>预览</Button>
              <Button htmlType="submit" onClick={()=>setFlag(2)}>保存草稿</Button>
            </div>
            </Form>
        </div>
    )
}