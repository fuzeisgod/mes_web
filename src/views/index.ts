import React from 'react'

const login = React.lazy(()=>import('./login'))
const production_orders = React.lazy(() => import('./productionOrders'))
const process_configuration = React.lazy(() => import('./integratedConfiguration/processConfiguration'))
const orders_standingBook = React.lazy(() => import('./ordersStandingBook'))
const staff_management = React.lazy(() => import('./staffManagement'))
const production_orders_add = React.lazy(() => import('./productionOrders/productionOrdersAdd'))
const not_found = React.lazy(() => import('./notFound'))

const production_orders_add_work = React.lazy(() => import('./productionOrders/productionOrdersAddWork/index.js'))
const part_configuration = React.lazy(() => import('./integratedConfiguration/partConfiguration'))
const form_configuration = React.lazy(() => import('./integratedConfiguration/formConfiguration/index.js'))

export {
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
}