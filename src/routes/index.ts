import {
    login,
    production_orders,
    process_configuration,
    process_configuration_add,
    orders_standingBook,
    staff_management,
    production_orders_add,
    production_orders_add_work,
    part_configuration,
    part_configuration_add,
    form_configuration,
    form_configuration_add,
    not_found,
    check_form,
    check_form_detail
} from '../views'

import {
    SnippetsOutlined,
    TableOutlined,
    FileSearchOutlined,
    TeamOutlined,
    ProfileOutlined
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
                title: '工单配置',
                exact: true
            },
            {
                pathName: '/:userID/pc',
                component: process_configuration,
                isNav: true,
                title: '方案配置',
                exact: true
            },
        ]
    },
    {
        isSubMenu: true,
        title: '待办事项',
        isNav: true,
        icon: ProfileOutlined,
        subMenuKey: 'sub2',
        subMenu: [
            {
                pathName: '/:userID/cf',
                component: check_form,
                isNav: true,
                title: '送检确认',
                exact: true
            },
        ]
    },
    {
        pathName: '/:userID/dc/add',
        component: part_configuration_add,
        exact: true
    },
    {
        pathName: '/:userID/fc/add',
        component: form_configuration_add,
        exact: true
    },
    {
        pathName: '/:userID/pc/add',
        component: process_configuration_add,
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
        pathName: '/:userID/po/edit_order',
        component: production_orders_add,
        exact: true
    },
    {
        pathName: '/:userID/po/edit_order/edit_work',
        component: production_orders_add_work
    },
    {
        pathName: '/:userID/cf/check/:checkID',
        component: check_form_detail,
        exact: true
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