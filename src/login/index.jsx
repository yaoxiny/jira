import React,{useState, useEffect} from 'react'
import { Form, Input, Button, message as msg } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./login.less"
import {accountLogin} from '../services/login'
import {encrypt} from '../utils/tool'
import  {history}  from 'umi';
export default function Login(){
    
    const [loading,setLoading] = useState(false)
    const onFinish = async (values) => {
        setLoading(true)
        let params={
            userAccount:values.username,
            userPwd:encrypt(values.password)
        }
         const {code,data,message} =await accountLogin(params)
         if(code===200){
             localStorage.setItem('user',JSON.stringify(data))
             localStorage.setItem('effectiveTime',Date.now())
             history.replace('/createActivity')
         }else{
            msg.error(message);
         }
         setLoading(false)
    }
    useEffect(async ()=>{
        localStorage.clear()
        window.history.pushState(null, null, document.URL);
        window.onpopstate = function (e) {
            window.history.pushState(null, null, document.URL);
        };
        return () => {
        // 回退事件只用于当前组件，则需要在组件销毁时把回退事件销毁
        window.onpopstate = null;
        };
    },[])
    return(
        <div className='login'>
            <div className='login_box'>
                <div className='login_title'>
                    秦学后台管理
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入账号!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} className='login_inputs' size='large' placeholder="请输入账号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入登录密码!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        size='large'
                        className='login_inputs'
                        type="password"
                        placeholder="请输入登录密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size='large' loading={loading} block={true} htmlType="submit" className="login-form-button">
                        登录
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <p className='login_tops'>使用手机小程序提示的账号密码登录</p>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}