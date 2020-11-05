import React, { useState } from 'react'
import { Layout, Menu, Button } from 'antd'
import {
    SnippetsOutlined,
    BarsOutlined,
    TableOutlined,
    FileSearchOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import './Frame.less'

const { Header, Content, Sider } = Layout

export default function Frame(props) {

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    return (
        <div className="Frame-page">
            <Layout style={{ height: '100vh' }}>
                <Header className="header">
                    <h1>新图维追溯管理系统</h1>
                    <div className="login-section">
                        <UserOutlined className="user-logo" />
                        <span className="user-name">欢迎您，管理员！</span>
                        <Button type="ghost" className="user-logoff">退出登录</Button>
                    </div>
                </Header>
                <Layout>
                    <Sider
                        width={150}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                        className="site-layout-background"
                        collapsible
                        collapsed={collapsed}
                        onCollapse={onCollapse}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0, fontSize: '16px' }}
                        >
                            <Menu.Item key="1" icon={<SnippetsOutlined style={{ fontSize: '16px' }} />}>
                                生产订单
                            </Menu.Item>
                            <Menu.Item key="2" icon={<BarsOutlined style={{ fontSize: '16px' }} />}>
                                流程配置
                            </Menu.Item>
                            <Menu.Item key="3" icon={<TableOutlined style={{ fontSize: '16px' }} />}>
                                综合配置
                            </Menu.Item>
                            <Menu.Item key="4" icon={<FileSearchOutlined style={{ fontSize: '16px' }} />}>
                                工单台账
                            </Menu.Item>
                            <Menu.Item key="5" icon={<TeamOutlined style={{ fontSize: '16px' }} />}>
                                员工管理
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px 174px' }}>
                        <Content>
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
