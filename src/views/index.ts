import React from 'react'
// 登录页
const login = React.lazy(() => import('./login'))
// 生产订单列表
const production_orders = React.lazy(() => import('./productionOrders'))
// 方案配置/综合方案列表
const process_configuration = React.lazy(() => import('./integratedConfiguration/processConfiguration'))
// 方案配置/综合方案列表/方案编辑
const process_configuration_add = React.lazy(() => import('./integratedConfiguration/processConfiguration/processConfigurationAdd'))
// 工单台账
const orders_standingBook = React.lazy(() => import('./ordersStandingBook'))
// 员工管理
const staff_management = React.lazy(() => import('./staffManagement'))
// 生产订单/生产订单列表/生产订单编辑
const production_orders_add = React.lazy(() => import('./productionOrders/productionOrdersAdd'))
// 404
const not_found = React.lazy(() => import('./notFound'))

// 生产订单列表/生产订单编辑/批次配置
const production_orders_add_work = React.lazy(() => import('./productionOrders/productionOrdersAddWork'))
// 零件配置/零件 BOM 列表
const part_configuration = React.lazy(() => import('./integratedConfiguration/partConfiguration'))
// 零件配置/零件 BOM 列表/BOM 方案编辑
const part_configuration_add = React.lazy(() => import('./integratedConfiguration/partConfiguration/partConfigurationAdd'))
// 工单配置/工单模板列表
const form_configuration = React.lazy(() => import('./integratedConfiguration/formConfiguration'))
// 工单配置/工单模板列表/工单配置
const form_configuration_add = React.lazy(() => import('./integratedConfiguration/formConfiguration/formConfigurationAdd'))

// 送检确认/送检单台账
const check_form = React.lazy(() => import('./todoThings/checkForm'))
// 送检确认/送检单台账/送检单详情
const check_form_detail = React.lazy(() => import('./todoThings/checkForm/checkForm_detail'))

export {
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
}