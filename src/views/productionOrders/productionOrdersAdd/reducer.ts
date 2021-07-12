import { ACTION_TYPE, IState, MODE_TYPE } from './typings'
import { fromJS } from 'immutable'

/**
 * 
 * state:
 * {
 *      tableData: [],
 *      mode,
 *      orderId: 0,
 *      freshFlag: false
 * }
 * 
 */

function productDeviceListReducer(state: IState, action) {
    const { type, payload } = action;
    const _state = fromJS(state)

    switch (type) {
        case ACTION_TYPE.SET_DEVICE_LIST:
            return _state.set('tableData', payload).toJS()
        case ACTION_TYPE.SET_MODE_TYPE:
            return _state.set('mode', payload.type).set('orderId', payload.orderId).toJS()
        case ACTION_TYPE.SET_ORDERID:
            return _state.set('orderId', payload).toJS()
        case ACTION_TYPE.CHANGE_FRESH_FLAG:
            return _state.set('freshFlag', !_state.get('freshFlag')).toJS()
        case ACTION_TYPE.SET_SELECT_ROWS:
            return _state.set('selectRows', payload).toJS()
        default:
            return _state.toJS()
    }
}

export {
    productDeviceListReducer
}