import {
    production_orders,
    process_configuration,
    integrated_configuration,
    orders_standingBook,
    staff_management,
    production_orders_add
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
        title: '生产订单',
        exact: true
    },
    {
        pathName: '/:userID/os',
        component: orders_standingBook,
        isNav: true,
        icon: FileSearchOutlined,
        title: '工单台账',
        exact: true
    },
    {
        pathName: '/:userID/pc',
        component: process_configuration,
        isNav: true,
        icon: BarsOutlined,
        title: '流程配置',
        exact: true
    },
    {
        pathName: '/:userID/ic',
        component: integrated_configuration,
        isNav: true,
        icon: TableOutlined,
        title: '综合配置',
        exact: true
    },
    {
        pathName: '/:userID/sm',
        component: staff_management,
        isNav: true,
        icon: TeamOutlined,
        title: '员工管理',
        exact: true
    },
    {
        pathName: '/:userID/po/add',
        component: production_orders_add
    }
]

export {
    mainRoutes,
    adminRoutes
}