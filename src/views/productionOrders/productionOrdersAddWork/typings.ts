export enum ACTION_TYPE {
    SET_COUNT = 'setCount',
    SET_TYPEID = 'setTypeId',
    SET_PLANS = 'setPlans',
    SET_MODE = 'setMode'
}

export enum MODE_TYPE {
    CREATE = 0,
    EDIT = 1
}

export interface IState {
    count: number,
    typeId: number,
    plans: any[],
    mode: MODE_TYPE,
    serialNo: number,
    Id: number
}