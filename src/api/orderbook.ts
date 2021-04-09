import { service1 as service } from './index'

// 查询工单
export const searchOrderBookByOptions = ({ startTime, endTime, orderNo, userId, positionId, TerminalId, SerialNo, limit, page }) => {
    return service.post(`/api/WorkOrder/GetWorkOrders?startTime=${startTime}&endTime=${endTime}&orderNo=${orderNo}&userId=${userId}&positionId=${positionId}&TerminalId=${TerminalId}&SerialNo=${SerialNo}&limit=${limit}&page=${page}`)
}

// 获取岗位
export const getPositions = () => {
    return service.post('/api/Position/GetPositions')
}