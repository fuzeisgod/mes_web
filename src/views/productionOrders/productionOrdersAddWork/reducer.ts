import { ACTION_TYPE, IState } from './typings'
import { fromJS } from 'immutable'

/**
 * state:
 * {
 *      count: number,
 *      typeId: number,
 *      plans: [],
 *      mode: number,
 *      serialNo: number,
 *      Id: number
 * }
 */

function productionOrderAddWorkReducer(state: IState, action) {
    const { type, payload } = action
    const _state = fromJS(state)

    switch (type) {
        case ACTION_TYPE.SET_COUNT:
            return _state.set("count", payload).toJS()
        case ACTION_TYPE.SET_TYPEID:
            return _state.set("typeId", payload).toJS()
        case ACTION_TYPE.SET_PLANS:
            return _state.set("plans", payload).toJS()
        case ACTION_TYPE.SET_MODE:
            return _state.set("mode", payload.type).set("serialNo", payload.serialNo).set("Id", payload.Id).toJS()
        default:
            return _state.toJS()
    }
}

export {
    productionOrderAddWorkReducer
}