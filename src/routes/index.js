import {
    production_orders,
    process_configuration,
    integrated_configuration,
    orders_standingBook,
    staff_management
} from '../views'

import {
    SnippetsOutlined,
    BarsOutlined,
    TableOutlined,
    FileSearchOutlined,
    TeamOutlined
} from '@ant-design/icons';

const mainRoutes = [

]

const adminRoutes = [
    {
        pathName: '/:userID/po',
        component: production_orders,
        isNav: true,
        icon: SnippetsOutlined,
        title: '生产订单'
    },
    {
        pathName: '/:userID/pc',
        component: process_configuration,
        isNav: true,
        icon: BarsOutlined,
        title: '流程配置'
    },
    {
        pathName: '/:userID/ic',
        component: integrated_configuration,
        isNav: true,
        icon: TableOutlined,
        title: '综合配置'
    },
    {
        pathName: '/:userID/os',
        component: orders_standingBook,
        isNav: true,
        icon: FileSearchOutlined,
        title: '工单台账'
    },
    {
        pathName: '/:userID/sm',
        component: staff_management,
        isNav: true,
        icon: TeamOutlined,
        title: '员工管理'
    },
]

export {
    mainRoutes,
    adminRoutes
}