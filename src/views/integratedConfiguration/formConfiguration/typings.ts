export enum ACTION_TYPE {
    SET_DATA_SOURCE = "setDataSource",
    SET_SEARCH_INFO = "setSearchInfo",
    SET_CURRENT_PAGE = "setCurrentPage",
    SET_LIMIT_COUNT = "setLimitCount",
    CHANGE_FRESH_FLAG = "changeFreshFlag"
}


export interface IState {
    tableData: any[],
    searchInfo: ISearchInfo,
    total:number,
    freshFlag:boolean
}

export interface ISearchInfo {
    typeId: number,
    positionId: number,
    limit: number,
    page: number
}