import React from 'react'

const production_orders = React.lazy(() => import('./productionOrders'))
const process_configuration = React.lazy(() => import('./processConfiguration'))
const integrated_configuration = React.lazy(() => import('./integratedConfiguration'))
const orders_standingBook = React.lazy(() => import('./ordersStandingBook'))
const staff_management = React.lazy(() => import('./staffManagement'))
const production_orders_add = React.lazy(() => import('./productionOrders/productionOrdersAdd'))

const production_orders_add_work = React.lazy(() => import('./productionOrders/productionOrdersAddWork'))


export {
    production_orders,
    process_configuration,
    integrated_configuration,
    orders_standingBook,
    staff_management,
    production_orders_add,
    production_orders_add_work
}