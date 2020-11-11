import React from 'react'

const production_orders = React.lazy(() => import('./productionOrders'))
const process_configuration = React.lazy(() => import('./processConfiguration'))
const orders_standingBook = React.lazy(() => import('./ordersStandingBook'))
const staff_management = React.lazy(() => import('./staffManagement'))
const production_orders_add = React.lazy(() => import('./productionOrders/productionOrdersAdd'))

const production_orders_add_work = React.lazy(() => import('./productionOrders/productionOrdersAddWork'))
const device_configuration = React.lazy(() => import('./integratedConfiguration/deviceConfiguration'))
const form_configuration = React.lazy(() => import('./integratedConfiguration/formConfiguration'))

export {
    production_orders,
    process_configuration,
    orders_standingBook,
    staff_management,
    production_orders_add,
    production_orders_add_work,
    device_configuration,
    form_configuration
}