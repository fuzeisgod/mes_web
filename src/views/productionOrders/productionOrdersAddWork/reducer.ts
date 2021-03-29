import { ACTION_TYPE, IState } from './typings'
import { fromJS } from 'immutable'

/**
 * state:
 * {
 *      count: number,
 *      types: [],
 *      typeId: number,
 *      plans: []
 * }
 */

function productionOrderAddWorkReducer(state: IState, action) {
    const { type, payload } = action
    const _state = fromJS(state)

    switch (type) {
        case ACTION_TYPE.SET_COUNT:
            return _state.set("count", payload).toJS()
        case ACTION_TYPE.SET_TYPES:
            return _state.set("types", payload).toJS()
        case ACTION_TYPE.SET_TYPEID:
            return _state.set("typeId", payload).toJS()
        case ACTION_TYPE.SET_PLANS:
            return _state.set("plans", payload).toJS()
        default:
            return _state.toJS()
    }
}

export {
    productionOrderAddWorkReducer
}