export interface ISearch {
    orderNo: string;
    orderTime: any;
    chargeUserId: string;
}

export interface ISearchInfo {
    orderNo: number | String;
    startTime: string;
    endTime: string;
    chargeUserId: string | number;
}

export interface IState {
    tableData: any[];
    page: number;
    limit: number;
    total: number;
    searchInfo: ISearchInfo;
    userList: any[];
    freshFlag: boolean;
}

export enum ACTION_TYPE {
    SET_ORDER_LIST = "setOrderList",
    SET_CURRENT_PAGE = "setCurrentPage",
    SET_LIMIT_COUNT = "setLimitCount",
    SET_SEARCH_INFO = "setSearchInfo",
    SET_USER_LIST = "setUserList",
    CHANGE_FRESH_FLAG = "changeFreshFlag"
}