import { fromJS } from 'immutable'
import { ACTION_TYPE, IState } from './typings'

function orderStandingBookReducer(state: IState, action) {
    const { type, payload } = action;
    const _state = fromJS(state)

    switch (type) {
        case ACTION_TYPE.SET_TABLE_DATA:
            return _state.set('tableData', payload.tableData).set('total', payload.total).toJS()
        case ACTION_TYPE.SET_CURRENT_PAGE:
            return _state.setIn(['searchInfo', 'page'], payload).toJS()
        case ACTION_TYPE.SET_LIMIT_COUNT:
            return _state.setIn(['searchInfo', 'limit'], payload).toJS()
        case ACTION_TYPE.SET_SEARCH_INFO:
            let newState = _state
            Object.keys(payload).map(key => {
                newState = newState.setIn(['searchInfo', key], payload[key])
            })
            return newState.toJS()
        default:
            return _state.toJS()
    }
}

export {
    orderStandingBookReducer
}