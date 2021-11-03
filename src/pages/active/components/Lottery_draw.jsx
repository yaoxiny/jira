import react from "react"
import HeadTitle from './Head_title'
import styles from './enroll.less';
import { Form, Select,Button,Input } from 'antd';
import { DatePicker, } from 'antd';
import { PlusOutlined  } from '@ant-design/icons';
import UploadImg from "./UploadImg";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
export default function Vote(){
    return(
        <div>
            <div className={styles.time}>
                <HeadTitle title={'基本信息'}></HeadTitle>
                <div className={styles.time_box}>
                    <Form.Item
                     label="活动时间"
                     name="username"
                     rules={[{ required: true, message: '请选择活动时间!' }]}>
                         <RangePicker showTime />
                    </Form.Item>
                    <Form.Item
                     label={'每人抽奖次数'}
                     name={'投票方式'}
                     className={styles.margin_left}
                     rules={[{ required: true, message: '请输入每人抽奖次数!' }]}>
                         <Input />
                    </Form.Item>
                    <Form.Item
                     label={'兑奖规则'}
                     name={'投票方式'}
                     style={{width:"100%"}}
                     rules={[{ required: true, message: '请输入兑奖规则!' }]}>
                        <TextArea style={{width:"50%"}}/>
                    </Form.Item>
                </div>
            </div>
            <div className={styles.time}>
                <HeadTitle title={'奖品设置'} tips={"(未中奖)"}></HeadTitle>
                <div className={styles.time_box} style={{minHeight:"1rem"}}>
                    <p style={{margin:"0"}}>奖品总数：无限制</p>
                </div>
            </div>
            <div className={styles.time}>
            <HeadTitle title={'奖品设置'} tips={"(一等奖)"}></HeadTitle>
            <Form.List
                    name='Vote'
                >
                    {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                         <div className={styles.time_box} key={field.key}>
                            <Form.Item
                                label={'奖品名称'}
                                required={true}
                                style={{ width: '50%' }}
                            >
                                <Form.Item
                                    {...field}
                                    rules={[
                                        {
                                        required: true,
                                        whitespace: true,
                                        message: "请输入奖品名称'",
                                        },
                                    ]}
                                    noStyle
                                    >
                                    <Input  style={{ width: '40%' }} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item
                                label={'奖品总数'}
                                required={true}
                                style={{ width: '50%' }}
                            >
                                <Form.Item
                                    {...field}
                                    rules={[
                                        {
                                        required: true,
                                        whitespace: true,
                                        message: "请输入奖品总数'",
                                        },
                                    ]}
                                    noStyle
                                    >
                                    <Input  style={{ width: '40%' }} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item
                                label={'中奖率(%)'}
                                required={true}
                                style={{ width: '50%' }}
                            >
                                <Form.Item
                                    {...field}
                                    rules={[
                                        {
                                        required: true,
                                        whitespace: true,
                                        message: "请输入中奖率'",
                                        },
                                    ]}
                                    noStyle
                                    >
                                    <Input  style={{ width: '40%' }} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item
                                label={'图片'}
                                required={true}
                                style={{ width: '50%' }}
                            >
                                <Form.Item
                                    {...field}
                                    rules={[
                                        {
                                        required: true,
                                        whitespace: true,
                                        message: "Please input passenger'",
                                        },
                                    ]}
                                    noStyle
                                    >
                                    <UploadImg></UploadImg>
                                </Form.Item>
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