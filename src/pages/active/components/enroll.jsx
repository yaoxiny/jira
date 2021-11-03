import react,{useState,useEffect} from 'react'
import HeadTitle from './Head_title'
import styles from './enroll.less';
import { Form, Input, Button,Tag } from 'antd';
import { DatePicker } from 'antd';
import { PlusOutlined,DeleteOutlined  } from '@ant-design/icons';

const { CheckableTag } = Tag;
const { RangePicker } = DatePicker;
const tagsData = ['姓名', '性别', '图片', '手机号','生日','QQ号','邮箱','学院','年级','班级','学号','特长','备注'];
export default function Enroll({title,name,type,ArrChange}){
    let [checkArr1,setCheckArr1] = useState([])
    let [checkArr2,setCheckArr2] = useState([])
    
   function handleChange(tag, checked) {
       if(type==1){
        const nextSelectedTags = checked ? [...checkArr1, tag] : checkArr1.filter(t => t !== tag);
        setCheckArr1([...nextSelectedTags])
       }else{
        const nextSelectedTags = checked ? [...checkArr2, tag] : checkArr2.filter(t => t !== tag);
        setCheckArr2([...nextSelectedTags])
       }
      }
      useEffect(()=>{
        
            let requiredEntryForms=[]
          checkArr1.forEach(x=>{
              requiredEntryForms.push({key:x})
          })
        ArrChange(requiredEntryForms,type)
      },[checkArr1])
      useEffect(()=>{
        ArrChange(checkArr2,type)
    },[checkArr2])
    return(
        <div>
            <div className={styles.time}>
                <HeadTitle title={'基本信息'}></HeadTitle>
                <div className={styles.time_box}>
                    <Form.Item
                     label="活动时间"
                     name={`time${type}`}
                     style={{width:"50%"}}
                     rules={[{ required: true, message: '请选择活动时间!' }]}>
                         <RangePicker showTime style={{width:'50%'}}/>
                    </Form.Item>
                    <Form.Item
                     label={title}
                     name={`people${type}`}
                     className={styles.margin_left}
                     rules={[{ required: true, message: `请输入${title}!` }]}>
                         <Input />
                    </Form.Item>
                   
                </div>
            </div>
            <div className={styles.time}>
                <HeadTitle title={'选择您希望活动参加者填写的信息'}></HeadTitle>
                <div className={styles.time_box}>
                    <Form.Item>
                    {tagsData.map(tag => (
                        <CheckableTag
                            key={tag}
                            checked={(type==1?checkArr1:checkArr2).indexOf(tag) > -1}
                            onChange={checked =>handleChange(tag, checked)}
                        >
                            {tag}
                        </CheckableTag>
                    ))}
                    </Form.Item>
                </div>
            </div>
            <div className={styles.time}>
                <HeadTitle title={'可添加补充项目'}></HeadTitle>
                <div className={styles.spical}>
                <Form.List
                    name={name}
                >
                    {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                        <Form.Item
                            label={'项目名称'}
                            required={true}
                            key={field.key}
                            style={{ width: '50%' }}
                        >
                            <Form.Item
                            {...field}
                            rules={[
                                {
                                required: true,
                                whitespace: true,
                                message: "请输入项目名称!'",
                                },
                            ]}
                            noStyle
                            >
                            <Input style={{ width: '40%' }} />
                            </Form.Item>
                            <DeleteOutlined
                                style={{color: 'red' }}
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                            />
                        </Form.Item>
                        ))}
                        <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '100%' }}
                                icon={<PlusOutlined />}
                            >
                                添加
                        </Button>
                    </>
                    )}
                </Form.List>
                </div>
            </div>
        </div>
    )
}
