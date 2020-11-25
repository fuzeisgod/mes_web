import React from 'react'
import {
    Form,
    Input,
    Button,
    Checkbox
} from 'antd'
import './login.less'

export default function Login(props) {
    const handleLogin = (values) => {
        console.log(values)
        // need save userid here ...
        props.history.push('/')
    }
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
