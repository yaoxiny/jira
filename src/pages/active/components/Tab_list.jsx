import react, { useState } from 'react'
import { Tabs } from 'antd';
import styles from '../index.less';
import ActiveList from './Active_list';
const { TabPane } = Tabs;
const TabList=[
  {title:'全部',id:'0',key:'1' },
  {title:'待审核',id:'1',key:'2'},
  {title:'进行中',id:'2',key:'3'},
  {title:'未开始',id:'3',key:'4'},
  {title:'已驳回',id:'4',key:'5'},
  {title:'已结束',id:'5',key:'6'},
  {title:'草稿箱',id:'7',key:'7'},
]

export const HeadTab = ({listData,total,setPages,setPageSize,getList,load,pages,pageSize})=>{
    let [tagFlg,setTagFlg] = useState('')
    function callback(tag){
        setPages(1)
        let params={
            page:1,
            pageSize:10,
            activityStatus:tagFlg
        }
        if(tag==5){
            setTagFlg([5,6])
            params.activityStatus=[5,6]
        }else if(tag==0){
            setTagFlg('')
            params.activityStatus=''
        }else if(tag==7){
            setTagFlg(10)
            params.activityStatus=''
            params.isDraft=1
        }else{
            setTagFlg([tag])
            params.activityStatus=[tag]
        }
        getList(params)
    }
  return <div className={styles.tab_style}>
    <Tabs defaultActiveKey="" onTabClick={callback}>
      {
        TabList.map(x=>(
            <TabPane tab={x.title} key={x.id}>
              <ActiveList listData={listData} total={total} setPages={setPages} setPageSize={setPageSize} tabFlg={tagFlg} getList={getList} pages={pages} load={load}></ActiveList>
            </TabPane>
        ))
      }
    </Tabs>
  </div>
}
