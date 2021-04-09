import { ACTION_TYPE } from "./typings";
import { fromJS } from 'immutable'

function dataSourceReducer(state, action) {
    const { type, payload } = action;
    const _state = fromJS(state)

    switch (type) {
        case ACTION_TYPE.SET_TABLE_DATA:
            return _state.set('tableData', payload.tableData).set('count', payload.total).toJS()
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
        case ACTION_TYPE.CHANGE_FRESH_FLAG:
            return _state.set('freshFlag', !_state.get('freshFlag')).toJS()
        default:
            return state;
    }
}

export {
    dataSourceReducer
}