import { service1 as service } from './index'

// 订单查询
export const getProductOrdersList = (options) => {
    return service.post(`/api/Order/SearchOrder?startTime=${options.startTime}&endTime=${options.endTime}&orderId=${options.orderId}&chargeUserId=${options.chargeUserId}`)
}

// 添加订单
export const addProductOrder = ({ ProductNo, PlanTime, CreateTime, ChargeUserId, isUrgent }) => {
    return service.post(`/api/Order/AddOrder`, {
        ProductNo,
        PlanTime,
        CreateTime,
        ChargeUserId,
        isUrgent
    })
}

// 根据订单ID获取设备列表
export const getDeviceListByOrderId = (productId) => {
    return service.post(`/api/Order/GetOrder?productId=${productId}`)
}