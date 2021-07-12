export enum ACTION_TYPE {
    SET_DEVICE_LIST = "setDeviceList",
    SET_MODE_TYPE = "setModeType",
    SET_ORDERID = "setOrderId",
    CHANGE_FRESH_FLAG = "changeFreshFlag",
    SET_SELECT_ROWS = "setSelectRows"
}

export enum MODE_TYPE {
    CREATE = 0,
    EDIT = 1
}

export interface IState {
    tableData: any[],
    mode: number,
    orderId: number,
    freshFlag: boolean,
    selectRows: any[]
}