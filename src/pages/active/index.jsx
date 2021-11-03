import React,{useEffect,useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Breadcrumb } from 'antd';
import styles from './index.less';
import {getActiveList} from '../../services/active'
import _ from 'lodash'
import {HeadTab} from './components/Tab_list'
export default (props) => {
let [listData,setListData] =useState([])
let [total,setTotal] =useState(0)
let [pages,setPages]=useState(1)
let [pageSize,setPageSize]=useState(10)
let [load,setLoad]=useState(false)
  async function getList(params){
      setLoad(true)
      const {data,code} = await getActiveList(params)
      if(code !==200) return
      let newData = _.cloneDeep(data.rows)
      newData.forEach(x=>{
        x.activeTime = `${x.startDate} - ${x.endDate}`
      })
      setLoad(false)
      setListData(newData)
      setTotal(data.total)
  }
   useEffect(()=>{
    let params={
      page:pages,
      pageSize:pageSize
    }
    getList(params)
   },[])
  return (
    <PageContainer title={false}>
        <div className={styles.activity}>
            <div className={styles.activity_card}>
                <div className={styles.activity_head}>活动管理</div>
                <div className={styles.activity_bread}>
                  <HeadTab listData={listData} total={total} setPages={setPages} getList={getList} setPageSize={setPageSize} load={load} pages={pages} pageSize={pageSize}></HeadTab>
                </div>
            </div>
        </div>
    </PageContainer>
  );
};
