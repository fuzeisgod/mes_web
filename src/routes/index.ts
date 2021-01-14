import {
    login,
    production_orders,
    process_configuration,
    orders_standingBook,
    staff_management,
    production_orders_add,
    production_orders_add_work,
    part_configuration,
    form_configuration,
    not_found
} from '../views'

import {
    SnippetsOutlined,
    TableOutlined,
    FileSearchOutlined,
    TeamOutlined
} from '@ant-design/icons';

const mainRoutes = [
    {
        pathName: '/login',
        component: login
    }
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
        isSubMenu: true,
        title: '综合配置',
        isNav: true,
        icon: TableOutlined,
        subMenuKey: 'sub1',
        subMenu: [
            {
                pathName: '/:userID/dc',
                component: part_configuration,
                isNav: true,
                title: '零件配置',
                exact: true
            },
            {
                pathName: '/:userID/fc',
                component: form_configuration,
                isNav: true,
                title: '表单配置',
                exact: true
            },
            {
                pathName: '/:userID/pc',
                component: process_configuration,
                isNav: true,
                title: '岗位配置',
                exact: true
            },
        ]
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
        pathName: '/:userID/po/edit_order',
        component: production_orders_add,
        exact: true
    },
    {
        pathName: '/:userID/po/edit_order/edit_work',
        component: production_orders_add_work
    },
    {
        pathName: '/404',
        component: not_found
    }
]

export {
    mainRoutes,
    adminRoutes
}