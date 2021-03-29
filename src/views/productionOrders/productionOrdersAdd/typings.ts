export enum ACTION_TYPE {
    SET_DEVICE_LIST = "setDeviceList",
    SET_USER_LIST = "setUserList",
    SET_MODE_TYPE = "setModeType",
    SET_ORDERID = "setOrderId"
}

export enum MODE_TYPE {
    CREATE = 0,
    EDIT = 1
}

export interface IState {
    tableData: any[],
    userList: any[],
    mode: number,
    orderId: number
}