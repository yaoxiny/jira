import react,{useState,useEffect} from 'react'
import { Tag  } from 'antd';
import styles from './create_active.less';
import Information from './Information';
import HeadStep from './Head_step';
import Enroll from './enroll';
import Vote from './Vote';
import Basic from './Basic';
import LotteryDraw from './Lottery_draw';
import _ from 'lodash'
import {  Form} from 'antd';

export default function Create({choise,getTag,draftsSave,ArrChange,data}){
    const [form] = Form.useForm()
    useEffect(()=>{
        let oldArr = _.cloneDeep(panelArr)
        oldArr.map(x=>{
            if(data[x.name]){
                x.flag=true
            }else{
                x.flag=false
            }
        })
        setPanelArr(oldArr)
    },[data])
    const [panelArr,setPanelArr]=useState([
        {title:'报名',key:'1',name:'isSignUp',flag:false,component:<Enroll ArrChange={ArrChange} data={data} type={1} title={'报名人数'} name={'enroll'}/>},
        {title:'投票',key:'2',name:'isVote',flag:false,component:<Vote form={form}/>},
        {title:'门票',key:'3',name:'isRobTickets',flag:false,component:<Enroll ArrChange={ArrChange} type={2} title={'门票数量'} name={'ticket'}/>},
        {title:'签到',key:'4',name:'isSignIn',flag:false,component:<Basic title={'签到方式'}/>},
        {title:'抽奖',key:'5',name:'isLuckyDraw',flag:false,component:<LotteryDraw />},])
    
    function TagMap(){
        return panelArr.map((x,index)=>(
                <Tag style={{background:x.flag?"#1890ff":'#1A267B',color:"#fff"}} onClick={()=>showTag(index)}  key={x.key}>{x.title}</Tag>
            ))
    }
    function showTag(index){
        let tagArr = _.cloneDeep(panelArr)
        tagArr[index].flag=!tagArr[index].flag
        setPanelArr(tagArr)
        getTag(tagArr[index].name,tagArr[index].flag)
    }
    return(
        <div className={styles.create_box}>
            <HeadStep step={2} />
            <div className={styles.choose_tag}>
                <p className={styles.create_title}>选择你想要创建的活动（可多选）</p>
                <div className={styles.tag_box}>
                   {TagMap()}
                </div>
            </div>
            <div className={styles.information}>
                <Information choise={choise} form={form} panelArr={panelArr} getTag={getTag}  draftsSave={draftsSave}></Information>
            </div>
        </div>
    )
}