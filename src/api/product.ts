import { service1 as service } from './index'

// 生产订单 api

// 订单查询
export const getProductOrdersList = (options) => {
    return service.post(`/api/Order/SearchOrder?page=${options.page}&limit=${options.limit}&startTime=${options.startTime}&endTime=${options.endTime}&orderNo=${options.orderNo}&chargeUserId=${options.chargeUserId}`)
}

// 删除订单
export const deleteProductOrder = (orderId) => {
    return service.post(`/api/Order/DelOrder?orderId=${orderId}`)
}

// 添加订单
export const addProductOrder = ({ OrderNo, PlanTime, CreateTime, ChargeUserId, isUrgent }) => {
    return service.post(`/api/Order/AddOrder`, {
        OrderNo,
        PlanTime,
        CreateTime,
        ChargeUserId,
        isUrgent
    })
}

// 根据订单ID获取设备列表
export const getDeviceListByOrderId = (orderId) => {
    return service.post(`/api/Device/GetDevicesByOrderId?orderId=${orderId}`)
}

// 根据订单ID获取订单信息
export const getProductOrderInfoByOrderId = (orderId) => {
    return service.post(`/api/Order/GetOrderById?OrderId=${orderId}`)
}

// 更新订单基本信息
export const upDateOrderInfo = ({ Id, OrderNo, PlanTime, CreateTime, ChargeUserId, isUrgent }) => {
    return service.post('/api/Order/UpdateOrder', {
        Id,
        OrderNo,
        PlanTime,
        CreateTime,
        ChargeUserId,
        isUrgent
    })
}

// 获取设备类型
export const getDeviceTypes = () => {
    return service.post('/api/Device/GetTypes')
}

// 添加设备
export const addDevice = ({ num, OrderID, Name, PlanTime, CreateTime, TypeId, ProgrammeId }) => {
    return service.post(`/api/Device/AddDevice?num=${num}`, {
        OrderID,
        Name,
        PlanTime,
        CreateTime,
        TypeId,
        ProgrammeId
    })
}

// 获取方案列表
export const getPlanList = (typeId) => {
    return service.post(`/api/Programme/GetProgrammes?typeId=${typeId}`)
}

// 根据序列号获取设备信息
export const getDeviceInfoById = (Id) => {
    return service.post(`/api/Device/GetDeviceById/${Id}`)
}

// 更新设备信息
export const updateDevice = ({
    Id,
    SerialNo,
    OrderID,
    Name,
    PlanTime,
    CreateTime,
    TerminalId,
    TypeId,
    ProgrammeId
}) => {
    return service.post('api/Device/UpdateDevice', {
        Id,
        SerialNo,
        OrderID,
        Name,
        PlanTime,
        CreateTime,
        TerminalId,
        TypeId,
        ProgrammeId
    })
}

// 删除设备
export const deleteDevice = (deviceId) => {
    return service.post(`/api/Device/DelDevice?deviceId=${deviceId}`)
}

// 根据ID获取设备类型
export const getDeviceTypeById = (Id) => {
    return service.post(`/api/Device/GetType/${Id}`)
}