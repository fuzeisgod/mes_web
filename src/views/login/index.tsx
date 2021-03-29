import React, { useEffect } from 'react'
import {
    Form,
    Input,
    Button,
    Checkbox,
    message
} from 'antd'
import { encryptAES, decryptAES } from '../../tools/aes'
import './login.less'
import { login } from '../../api/login'

interface UserInfo {
    account: string | undefined;
    password: string | undefined;
    remember: boolean;
}

export default function Login(props: any) {
    const handleLogin = (values: UserInfo) => {
        let { account, password, remember } = values;
        if (remember) {
            localStorage.setItem('user', encryptAES(JSON.stringify({ ac: account, pwd: password })))
        }
        login({ ac: account, pwd: encryptAES(password) }).then((res: any) => {
            console.log(res)
            if (res.bRes) {
                localStorage.setItem('key', encryptAES(res.Ticket))
                props.history.push('/')
            } else {
                message.error('login error!');
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const { ac, pwd } = decryptAES(localStorage.getItem('user'))
            login({ ac, pwd }).then((res: any) => {
                if (res.bRes) {
                    localStorage.setItem('key', encryptAES(res.Ticket))
                    props.history.push('/')
                } else {
                    message.error('login error!');
                }
            })
        }
    }, [])

    return (
        <div className="login-page">
            <div className="login-box">
                <h1 className="login-title">新图维追溯管理系统</h1>
                <Form className="login-form" onFinish={handleLogin} initialValues={{ ['remember']: false }}>
                    <Form.Item name="account" style={{ paddingBottom: '0px' }}>
                        <Input
                            addonBefore="账号"
                            allowClear
                            placeholder="请输入账号"
                            className="first-input"
                        />
                    </Form.Item>
                    <Form.Item name="password" style={{ paddingTop: '0px' }}>
                        <Input.Password
                            addonBefore="密码"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
