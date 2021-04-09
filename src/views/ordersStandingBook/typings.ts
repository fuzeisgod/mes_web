export enum ACTION_TYPE {
    SET_TABLE_DATA = 'setTableData',
    SET_LIMIT_COUNT = 'setLimitCount',
    SET_CURRENT_PAGE = 'setCurrentPage',
    SET_SEARCH_INFO = 'setSearchInfo'
}

export interface IState {
    tableData: ITabledata[],
    total: number,
    searchInfo: ISearchInfo
}

export interface ISearchInfo {
    startTime: string,
    endTime: string,
    orderNo: string,
    userId: number,
    positionId: number,
    TerminalId: string,
    SerialNo: string,
    limit: number,
    page: number
}

export interface ITabledata {
    OrderNo: string,
    TerminalId: string,
    SerialNo: string,
    DeviceName: string,
    UserName: string,
    PositionName: string,
    Time: string,
    Content: string
}