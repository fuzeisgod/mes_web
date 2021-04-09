export enum ACTION_TYPE {
    SET_TABLE_DATA = "setTableData",
    SET_LIMIT_COUNT = "setLimitCount",
    SET_CURRENT_PAGE = "setCurrentPage",
    SET_SEARCH_INFO = "setSearchInfo",
    CHANGE_FRESH_FLAG = "changeFreshFlag"
}


export interface IState {
    tableData: ITableItem[],
    searchInfo: ISearchInfo,
    total: number,
    freshFlag: boolean
}

export interface ITableItem {
    Name: string,
    cpspcodeH: string
}

export interface ISearchInfo {
    typeId: number,
    name: string,
    limit: number,
    page: number,
}