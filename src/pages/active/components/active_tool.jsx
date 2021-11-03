import { Space } from 'antd';
import { history } from 'umi';
import { queryByUpdate} from '@/services/active';

export function status({activityStatus,isDraft}){
    if(isDraft){
      return <div style={{color:"#A0A0A0"}}>草稿</div>
    }else{
      switch(activityStatus){
        case 1:
          return <div style={{color:"#0C9682"}}>待审核</div>
          break;
        case 2:
          return <div style={{color:"#862DFB"}}>进行中</div>
          break;
        case 3:
          return <div style={{color:'#A0A0A0'}}>未开始</div>
          break;
        case 4:
          return <div style={{color:"#FE4D5C"}}>已驳回</div>
          break;  
        case 5:
        case 6:
          return <div style={{color:"#FE4D5C"}}>已结束</div>
          break;
        default:
          break;
      }
    }
}

export function btnAuth(record){
  function detail(){
    history.push({
      pathname:'/detail',
      query:{
        activityBasicId:record.activityBasicId
      }
    })
  }
  async function edit(){
    let params={
      activityBasicId:record.activityBasicId
    }
    const{code} = await queryByUpdate(params)
    if(code!==200) return
    history.push({
      pathname:'/active',
      query:{
        activityBasicId:record.activityBasicId
      }
    })
  }
    if(record.isDraft){
        return (
        <Space size='small'>
        <a onClick={edit}>编辑</a> 
        <a>删除</a>
        </Space>
        )
    }else{
        switch(record.activityStatus){
            case 1:
              return <Space size='small'>
                        <a onClick={detail}>详情</a> 
                     </Space>
              break;
            case 2:
              return <Space size='small'>
                        <a>详情</a> 
                        <a>关闭</a>
                     </Space>
              break;
            case 3:
                return <Space size='small'>
                            <a>编辑</a> 
                            <a>删除</a>
                        </Space>
              break;

            case 4:
                return <Space size='small'>
                            <a>详情</a> 
                            <a>重新发布</a> 
                            <a>删除</a>
                        </Space>
              break;
            case 5:
            case 6:
                return <Space size='small'>
                            <a>详情</a> 
                            <a>删除</a>
                        </Space>
              break;
            default:
              break;
          }
    }
}
