import React, { useState, FC, ReactElement } from 'react'
import { Layout, Menu, Button } from 'antd'
import {
    UserOutlined
} from '@ant-design/icons';
import './Frame.less'
import { adminRoutes } from '../../routes'
import { useHistory } from 'react-router-dom'
import { insertUserId, cutURLForSelectedKeys } from '../../tools'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu;

interface Iprops {
    children: ReactElement
}

const Frame: FC<Iprops> = ({ children }): ReactElement => {

    const [collapsed, setCollapsed] = useState<boolean>(false)

    const history = useHistory()

    const onCollapse = (collapsed: boolean): void => {
        setCollapsed(collapsed)
    };
    const handleLogOff = (): void => {
        localStorage.removeItem("key")
        localStorage.removeItem("user")
        history.push('/login')
    }

    return (
        <div className="Frame-page">
            <Layout style={{ height: '100vh' }}>
                <Header className="header">
                    <h1>新图维追溯管理系统</h1>
                    <div className="login-section">
                        <UserOutlined className="user-logo" />
                        <span className="user-name">欢迎您，管理员！</span>
                        <Button type="ghost" className="user-logoff" onClick={handleLogOff}>退出登录</Button>
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
                            selectedKeys={[cutURLForSelectedKeys(insertUserId(history.location.pathname, ':userID'))]}
                            defaultOpenKeys={['sub1', 'sub2']}
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
                                                            // you need insert userid here
                                                            onClick={() => { history.push(insertUserId(subRoute.pathName, 'my-userid')) }}
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
                                                onClick={() => { history.push(insertUserId(route.pathName, 'my-userid')) }}
                                            >
                                                {route.title}
                                            </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={!collapsed ? { padding: '10px 16px 0 166px' } : { padding: '10px 16px 0 96px' }} className="frame-content">
                        <Content>
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}


export default Frame;