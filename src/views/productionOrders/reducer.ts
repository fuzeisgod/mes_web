import { ACTION_TYPE, IState } from './typings'
import { fromJS } from 'immutable'

/**
 * state: 
    { 
        tableData: any[], 
        page:number, 
        limit:number, 
        total: number,
        searchInfo: {
            orderNo: number,
            startTime: string,
            endTime: string,
            chargeUserId: string || number
        },
        userList:[],
        freshFlag: boolean 
    }
 */

function productOrderListReducer(state: IState, action) {
    const { type, payload } = action;
    let _state = fromJS(state)

    switch (type) {
        case ACTION_TYPE.SET_ORDER_LIST:
            return _state.set('tableData', payload.tableData).set('total', payload.total).toJS()
        case ACTION_TYPE.SET_LIMIT_COUNT:
            return _state.set('limit', payload).toJS()
        case ACTION_TYPE.SET_CURRENT_PAGE:
            return _state.set('page', payload).toJS()
        case ACTION_TYPE.SET_SEARCH_INFO:
            return _state.set('searchInfo', {
                orderNo: payload.orderNo || null,
                startTime: payload.startTime || null,
                endTime: payload.endTime || null,
                chargeUserId: payload.chargeUserId || null
            }).toJS()
        case ACTION_TYPE.SET_USER_LIST:
            return _state.set('userList', payload).toJS()
        case ACTION_TYPE.CHANGE_FRESH_FLAG:
            return _state.set('freshFlag', !_state.get('freshFlag')).toJS()
        default:
            return _state.toJS()
    }
}

export {
    productOrderListReducer
}