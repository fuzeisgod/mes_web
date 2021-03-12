import React from 'react'

const login = React.lazy(() => import('./login'))
const production_orders = React.lazy(() => import('./productionOrders'))
const process_configuration = React.lazy(() => import('./integratedConfiguration/processConfiguration'))
const process_configuration_add = React.lazy(() => import('./integratedConfiguration/processConfiguration/processConfigurationAdd'))

const orders_standingBook = React.lazy(() => import('./ordersStandingBook'))
const staff_management = React.lazy(() => import('./staffManagement'))
const production_orders_add = React.lazy(() => import('./productionOrders/productionOrdersAdd'))
const not_found = React.lazy(() => import('./notFound'))

const production_orders_add_work = React.lazy(() => import('./productionOrders/productionOrdersAddWork'))
const part_configuration = React.lazy(() => import('./integratedConfiguration/partConfiguration'))
const part_configuration_add = React.lazy(() => import('./integratedConfiguration/partConfiguration/partConfigurationAdd'))

const form_configuration = React.lazy(() => import('./integratedConfiguration/formConfiguration'))
const form_configuration_add = React.lazy(() => import('./integratedConfiguration/formConfiguration/formConfigurationAdd'))

const check_form = React.lazy(() => import('./todoThings/checkForm'))
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