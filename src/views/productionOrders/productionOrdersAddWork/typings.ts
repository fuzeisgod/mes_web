export enum ACTION_TYPE {
    SET_COUNT = 'setCount',
    SET_TYPES = 'setTypes',
    SET_TYPEID = 'setTypeId',
    SET_PLANS = 'setPlans'
}

export interface IState {
    count: number,
    types: any[],
    typeId: number,
    plans: any[]
}