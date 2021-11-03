import React,{useState,useEffect} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import CreateActive from './components/create_active'  //新增活动
import BasicInformation from './components/Basic_Information.jsx'   //基本信息
import { saveDrafts ,addActivity,queryByUpdate} from '@/services/active';
import { history } from 'umi';
import { message as messageTips } from 'antd';
export default () => {
  let [showOrClose,setShowOrClose] = useState(false)
  let [params,setParams] = useState({})
  let [checkArr,setCheckArr] = useState([])
  let [ticketArr,setTicketArr] = useState([])
  let id = history.location.query.activityBasicId
  let [data,setData] = useState({})
  let [tagObj,setTagObj]=useState({
    isSignUp:false,
    isRobTickets:false,
    isSignIn:false,
    isVote:false,
    isLuckyDraw:false,
    scheduleDate:[]
  })

  useEffect(async ()=>{
    if(id){
        let activityId={
            activityBasicId:id
          }
          const{data,code} = await queryByUpdate(activityId)
          if(code!==200) return
          setData(data)
    }

},[])
    function ArrChange(val,type){
        if(type==1){
          setCheckArr(val)
        }else{
          setTicketArr(val)
        }
    }
  
  function getParams(val){
    let newParams = val
    setParams(newParams)
  }
  function getTag(name,bol){
    let newTagObj=_.cloneDeep(tagObj)
    newTagObj[name] = bol
    setTagObj(newTagObj)
  }
    function choise(bol){
        setShowOrClose(bol)
    }
    async function draftsSave(obj,type,bol){
      console.log(obj,'objobj');
      let draftsParams=_.cloneDeep(params)
      let activityVOS=[]
      if(obj.activityTime){
        activityVOS=[{
              activityType:'1',
              startDate:obj.activityTime[0],
              endDate:obj.activityTime[1],
              requiredEntryForms:checkArr
        }]
      }
      if(id){
        draftsParams.activityBasicId=id
      }
        draftsParams.activityVOS=activityVOS
        if(obj.voteActivityVOS){
          draftsParams.activityVOS=[...draftsParams.activityVOS,obj.voteActivityVOS]
          delete obj.voteActivityVOS
        }
      Object.assign(draftsParams,obj,tagObj)
      const {data,code,message} = type==1?await addActivity(draftsParams):await saveDrafts(draftsParams)
      if(code !==200 ){
        messageTips.warning(message);
        return
      }
      messageTips.success('提交成功！');
      history.replace('/createActivity')
      console.log(data,'保存草稿返回');
    }
  return (
    <PageContainer title={false}>
        <div className={styles.activity}>
            <div style={{display:(showOrClose?'none':'block')}}>
                <BasicInformation choise={choise} getParams={getParams} data={data}></BasicInformation>
            </div>
            <div style={{display:(showOrClose?'block':'none')}} >
                <CreateActive choise={choise} getTag={getTag} draftsSave={draftsSave} ArrChange={ArrChange} data={data}></CreateActive>
            </div>
        </div>
    </PageContainer>
  );
};
