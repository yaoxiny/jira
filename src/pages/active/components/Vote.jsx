import react,{useState} from "react"
import HeadTitle from './Head_title'
import styles from './enroll.less';
import { Form, Select,Button,Input,Upload } from 'antd';
import { DatePicker, } from 'antd';
import { PlusOutlined  } from '@ant-design/icons';
const { RangePicker } = DatePicker;
export default function Vote({form}){
    const [fileList, setFileList] = useState([
      ]);
    let [flag,setFlag] = useState(1)
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
    
      const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };
    function change(val){
        console.log(val);
        setFlag(val)
    }
    console.log(form.getFieldValue('voteObjectVOS'));
    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };
    return(
        <div>
            <div className={styles.time}>
                <HeadTitle title={'基本信息'}></HeadTitle>
                <div className={styles.time_box}>
                    <Form.Item
                     label="活动时间"
                     name="time2"
                     style={{width:'50%'}}
                     rules={[{ required: true, message: '请选择活动时间!' }]}>
                         <RangePicker showTime />
                    </Form.Item>
                    <Form.Item
                     label={'投票方式'}
                     name='voteType'
                     style={{width:'50%'}}
                     rules={[{ required: true, message: '请选择投票方式!' }]}>
                         <Select style={{ width: 200 }} onChange={change}>
                            <Select.Option value={1}>只可投一次</Select.Option>
                            <Select.Option value={2}>每日均可投</Select.Option>
                        </Select>
                    </Form.Item>
                        <Form.Item
                        label="单日可投上限"
                        name="today"
                        style={{width:'50%',display:(flag===2?'block':'none')}}
                        rules={[{ required: flag===2?true:false, message: '请输入单日可投上限!' }]}>
                            <Input style={{width:'50%'}}/>
                        </Form.Item>
                        <Form.Item
                        label="重复投票上限"
                        name="repeat"
                        style={{width:'50%',display:(flag===2?'block':'none')}}
                        rules={[{ required:  flag===2?true:false, message: '请输入重复投票上限!' }]}>
                            <Input style={{width:'50%'}}/>
                        </Form.Item>
                    
                </div>
            </div>
            <div className={styles.time}>
            <HeadTitle title={'投票对象'}></HeadTitle>
            <Form.List
                    name='voteObjectVOS'
                >
                    {(fields, { add, remove}, { errors }) => (
                    <>
                        {fields.map((field,index) => (
                         <div className={styles.time_box} key={field.key}>
                            <Form.Item
                                {...field}
                                key={field.key+'name'}
                                label={'名称'}
                                name={[field.name, 'name']}
                                fieldKey={[field.fieldKey, 'name']}
                                required={true}
                                style={{ width: '50%' }}
                                rules={[
                                    {
                                    required: true,
                                    whitespace: true,
                                    message: "请输入名称！",
                                    },
                                ]}
                            >
                                    <Input  style={{ width: '40%' }} />
                            </Form.Item>
                            <Form.Item
                                {...field}
                                key={field.key+'instructions'}
                                label={'说明'}
                                name={[field.name, 'instructions']}
                                fieldKey={[field.fieldKey, 'instructions']}
                                required={true}
                                style={{ width: '50%' }}
                                rules={[
                                    {
                                    required: true,
                                    whitespace: true,
                                    message: "请输入说明！",
                                    },
                                ]}
                            >
                                    <Input  style={{ width: '40%' }} />
                            </Form.Item>
                            <Form.Item
                                {...field}
                                label={'图片'}
                                key={field.key+'pictureKey'}
                                name={[field.name, 'pictureKey']}
                                fieldKey={[field.fieldKey, 'pictureKey']}
                                required={true}
                                style={{ width: '50%' }}
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                    {
                                    required: true,
                                    message: "请上传图片！",
                                    },
                                ]}
                            >
                                    <Upload
                                        name="multipartFile"
                                        action="/campus/campusweb/upload/pictureUpload"
                                        listType="picture-card"
                                        onChange={onChange}
                                        onPreview={onPreview}
                                    >
                                       {form.getFieldValue('voteObjectVOS')[index]?.pictureKey.length>0?null:'+添加图片'}
                                        {/* {fileList.length < 1 && '+添加图片'} */}
                                    </Upload>
                            </Form.Item>
                        </div>
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
    )
}