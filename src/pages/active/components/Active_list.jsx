import react,{useEffect,useState} from 'react'
import styles from './active_list.less';
import moment from 'moment';
import {status, btnAuth} from './active_tool'
import { history } from 'umi';
import { Input, Button, DatePicker, Table, Space, Pagination, Spin } from 'antd';
const { RangePicker } = DatePicker;
const columns = [
    {
      title: '活动名称',
      dataIndex: 'activityName',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'gmtModified',
    },
    {
        title: '活动时间',
        dataIndex: 'activeTime',
    },
    {
        title: '状态',
        render:(text,record)=>(
          status(record)
        )
    },
    {
      title: '操作',
      key: 'activityBasicId',
      render: (text, record) => (
         btnAuth(record)
      ),
    },
  ];
  

export default function ActiveList({listData,total,setPages,load,pages,pageSize,setPageSize,getList,tabFlg}){
  const [name,setName] = useState('')
  const [time,setTime] = useState('')
  let params={
    activityName:name,
    queryStartDate:time[0],
    queryEndDate:time[1],
    page:pages,
    pageSize:pageSize,
    activityStatus:tabFlg
  }
  function pageChange(page,showTotal){
    setPages(page)
    setPageSize(showTotal)
    params.page=page
    params.pageSize=showTotal
    
    search(params)
  }
  function search(){
    if(tabFlg==10){
      params.activityStatus=''
      params.isDraft=1
    }
    getList(params)
  }
  function reset(){
    setName('')
    setTime('')
    setPages(1)
    setPageSize(10)
    params.activityName=''
    params.queryStartDate=''
    params.queryEndDate=''
    search(params)
  }
  function okTime(val){
    setTime([moment(val[0]).format('YYYY-MM-DD HH:mm:ss'),moment(val[1]).format('YYYY-MM-DD HH:mm:ss')])
  }
  function goActive(){
    history.push('/active')
  }
    return(
        <div className={styles.active}>
            <div className={styles.head}>
                <div className={styles.left_box}>
                    <div className={styles.input_box}>
                        <span>活动名称：</span>
                        <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="活动名称" />
                    </div>
                    <div className={styles.input_box}>
                        <span>创建时间：</span>
                        <RangePicker showTime onOk={okTime}/>
                    </div>
                </div>
                <div className={styles.btn_box}>
                    <Button className={styles.search} onClick={search}>搜索</Button>
                    <Button className={styles.reset} onClick={reset}>重置</Button>
                </div>
            </div>
            <div className={styles.add}>
            <Button onClick={goActive}>+ 创建活动</Button>
            </div>
            <div className={styles.list}>
              <Spin spinning={load}>
                <Table pagination={false} rowKey={record=>record.id} columns={columns} dataSource={listData} />
              </Spin>
            </div>
            <div className={styles.pages}>
            <Pagination
                total={total}
                current={pages}
                onChange={pageChange}
                showSizeChanger
                showQuickJumper
                showTotal={total => `共 ${total} 条`}
                />
            </div>
        </div>
    )
}