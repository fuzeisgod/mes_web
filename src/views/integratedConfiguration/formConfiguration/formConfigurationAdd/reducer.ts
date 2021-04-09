import { ACTION_TYPE } from './typings'
import { fromJS } from 'immutable'

const formOptionsReducer = (state, action) => {
    const { type, payload } = action
    const _state = fromJS(state)
    switch (type) {
        case ACTION_TYPE.SET_BASIC_OPTIONS:
            return _state.set("basicOptions", payload).toJS()
        case ACTION_TYPE.SET_FORM_PROPS:
            return _state.set("formProps", payload).toJS()
        case ACTION_TYPE.ADD_FORM_PROPS_INDEX:
            return _state.set("formPropsIndex", _state.get("formPropsIndex") + 1).toJS()
        case ACTION_TYPE.DELETE_FORM_PROP:
            let target: number = _state.get("formProps").findIndex((item) => {
                return item.key === payload.key
            })
            return _state.set("formProps", _state.get('formProps').delete(target)).toJS()
        default:
            return _state.toJS()
    }
}

export {
    formOptionsReducer
}