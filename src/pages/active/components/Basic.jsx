import react from 'react'
import HeadTitle from './Head_title'
import styles from './enroll.less';
import { Form, Select } from 'antd';
import { DatePicker, } from 'antd';

const { RangePicker } = DatePicker;
export default function Enroll({title}){

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
                     label={title}
                     name={title}
                     className={styles.margin_left}
                     rules={[{ required: true, message: 'Please input your username!' }]}>
                         <Select style={{ width: 200 }}>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
            </div>
        </div>
    )
}
