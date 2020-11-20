import React, { useState } from 'react'
import { Layout, Menu, Button } from 'antd'
import {
    UserOutlined
} from '@ant-design/icons';
import './Frame.less'
import { adminRoutes } from '../../routes'
import { useHistory } from 'react-router-dom'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu;
export default function Frame(props) {

    const [collapsed, setCollapsed] = useState(false)

    const history = useHistory()

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
                            {
                                adminRoutes.map(route => {
                                    return route.isNav && (
                                        route.isSubMenu ?
                                            <SubMenu
                                                title={route.title}
                                                icon={<route.icon style={{ fontSize: '16px' }} />}
                                                key={route.subMenuKey}
                                            >
                                                {
                                                    route.subMenu.map(subRoute => (
                                                        <Menu.Item
                                                            key={subRoute.pathName}
                                                            onClick={() => { history.push(subRoute.pathName) }}
                                                        >
                                                            {subRoute.title}
                                                        </Menu.Item>
                                                    ))
                                                }
                                            </SubMenu>
                                            :
                                            <Menu.Item
                                                key={route.pathName}
                                                icon={<route.icon style={{ fontSize: '16px' }} />}
                                                onClick={() => { history.push(route.pathName) }}
                                            >
                                                {route.title}
                                            </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={!collapsed ? { padding: '16px 16px 16px 166px' } : { padding: '16px 16px 16px 96px' }} className="frame-content">
                        <Content>
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
