import {useEffect,useState} from 'react'
import HeadStep from './Head_step';
import HeadTitle from './Head_title'
import styles from './create_active.less';
import {getAddress,queryByUpdate} from '../../../services/active'
import basicStyles from './basic_information.less';
import { Form, Input, Cascader ,Button,DatePicker } from 'antd';
import { PlusOutlined,DeleteOutlined } from '@ant-design/icons';
import UploadImg from './UploadImg';
import _ from 'lodash'
import moment from 'moment';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
let createParams={
    activityName:'',
    provinceCode:'',
    cityCode:'',
    startDate:'',
    endDate:'',
    activitySite:'',
    activityOrganizers:'',
    activityContent:'',
    // pictureUrl:'',
    pictureKey:'',
    // thumbnailPictureUrl:'',
    thumbnailPictureKey:'',
    // schedules:[],
}
//省市区
const LazyOptions = ({value=[], onChange ,address,data}) => {
    const [options, setOptions] = useState([]);
    useEffect(async ()=>{
        setOptions(address)
        if(JSON.stringify(data)!=='{}'){
            let params={
                addressLevel:2,
                parentId:value[0]
            }
            const {data,code} =await getAddress(params)
            if(code!==200) return
            address.forEach((x,index)=>{
                if(x.value==value[0]){
                    address[index].children=[
                        {label: `${data[0].addressName}`,value: data[0].addressCode,}
                    ];
                }
            })
            setOptions(address)
        }
        },[address,value])
    const change = (changeValue, selectedOptions) => {
        onChange(changeValue)
    };
    const loadData =async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        let params={
            addressLevel:2,
            parentId:selectedOptions[0].value
        }
        const {data,code} =await getAddress(params)
        if(code!==200) return
        targetOption.loading = false;
        targetOption.children = [
        {
            label: `${data[0].addressName}`,
            value: data[0].addressCode,
        }
        ];
        setOptions([...options]);
    };
    return <Cascader options={options} value={value}  loadData={loadData} onChange={change} changeOnSelect allowClear={false}/>
}
export default function Basic({choise,getParams,data}){
    const [address,setAddress] = useState([])
    const [form] = Form.useForm()
    const [imgShow,setImgShow] = useState(false)
    useEffect(()=>{
        if(JSON.stringify(data)!=='{}'){
            setImgShow(true)
            form.setFieldsValue({
                activityName:data.activityName,
                city:[data.provinceCode,data.cityCode],
                time:[moment(data.startDate),moment(data.endDate)],
                pictureKey:data.pictureUrl,
                thumbnailPictureKey:data.thumbnailPictureUrl,
                activitySite:data.activitySite,
                activityOrganizers:data.activityOrganizers,
                activityContent:data.activityContent
            })
        }

    },[data])
    const onFinish = (values) => {
        console.log(values,'basicValue');
            values.names?.forEach((x,index)=>{
                createParams.schedules[index].scheduleName =x.first
            })
        createParams.activityName = values.activityName
        createParams.activitySite = values.activitySite
        createParams.activityOrganizers = values.activityOrganizers
        createParams.activityContent = values.activityContent
        createParams.pictureKey = values.pictureKey
        createParams.thumbnailPictureKey = values.thumbnailPictureKey
        createParams.provinceCode = values.city[0]
        createParams.cityCode = values.city[1]
        createParams.startDate = moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss')
        createParams.endDate = moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss')
        if(JSON.stringify(data)!=='{}'){
            createParams.pictureKey = data.pictureKey
            createParams.thumbnailPictureKey = data.thumbnailPictureKey
        }
        choise(true)
        getParams(createParams)
      };
    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
      };
    function onDateChange(time,index){
        createParams.schedules[index] = {
            scheduleDate:moment(time).format('YYYY-MM-DD')
        }
    }
    useEffect(async ()=>{
        let params={
            addressLevel: 1,
        }
        const {data,code} =await getAddress(params)
        if(code!==200) return
        let addressArr=[]
        data.map(x=>{
            addressArr.push({value:x.addressCode,label:x.addressName,isLeaf:false})
        })
        setAddress(addressArr)
    },[])
    return (
        <div className={styles.create_box}>
            <HeadStep step={1}/>
            <div className={styles.information}>
                <HeadTitle title={"请填写活动基本信息"}></HeadTitle>
                <div className={basicStyles.flex}>
                    <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                    >
                        <Form.Item
                            label="活动名称"
                            name="activityName"
                            rules={[{ required: true, message: '请输入活动名称!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="地区选择"
                            name="city"
                            rules={[{ required:true, message: '请选择地区!' }]}
                        >
                             <LazyOptions address={address} data={data}/>
                        </Form.Item>
                        <Form.Item
                            label="活动时间"
                            name="time"
                            rules={[{ required: true, message: '请选择活动时间!' }]}
                        >
                            <RangePicker showTime/>
                        </Form.Item>
                        <Form.Item
                            label="活动地点"
                            name="activitySite"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="活动主办方"
                            name="activityOrganizers"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="活动内容"
                            name="activityContent"
                            rules={[{ required: true, message: '请输入活动内容!' }]}
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item
                            label="活动图"
                            name="pictureKey"
                            rules={[{required:true, message: '请上传活动图!' }]}
                        >
                            <UploadImg imgShow={imgShow}/>
                        </Form.Item>
                        <Form.Item
                            label="缩略图"
                            name="thumbnailPictureKey"
                            rules={[{required:true, message: '请上传缩略图!' }]}
                        >
                            <UploadImg imgShow={imgShow}/>
                        </Form.Item>
                        <HeadTitle title={"请编辑活动日程规划"} tips={'（可添加多条）'}></HeadTitle>
                        <Form.List
                            name="names"
                        >
                            {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, name,index,fieldKey,...restField) => (
                                <Form.Item
                                    {...restField}
                                    label={'日程名称'}
                                    key={field.key}
                                    name={[name, 'first']}
                                    fieldKey={[fieldKey, 'first']}
                                    style={{width:"100%"}}
                                >
                                    <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                    <Input style={{marginRight:'2rem'}}/>
                                    <DatePicker onChange={(e)=>onDateChange(e,name)} style={{width:'50%'}}/>
                                    <DeleteOutlined
                                        style={{color: 'red',marginLeft:'1rem' }}
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                    </div>
                                </Form.Item>
                                ))}
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '51%' }}
                                    icon={<PlusOutlined />}
                                >
                                    添加
                                </Button>
                            </>
                            )}
                        </Form.List>
                        <Form.Item
                        style={{width:"100%"}}
                        >
                            <Button htmlType="submit" style={{background:'#1A267B',color:'#fff'}}>下一步</Button>
                            <Button>预览</Button>
                            <Button htmlType="submit">保存草稿</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}