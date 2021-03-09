import { ACTION_TYPE } from './typings'
import { fromJS } from 'immutable'

const formOptionsReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case ACTION_TYPE.SET_BASIC_OPTIONS:
            return state.set("basicOptions", payload)
        case ACTION_TYPE.SET_FORM_PROPS:
            return state.set("formProps", payload)
        case ACTION_TYPE.ADD_FORM_PROPS_INDEX:
            return state.set("formPropsIndex", state.get("formPropsIndex") + 1)
        case ACTION_TYPE.DELETE_FORM_PROP:
            let target: number = state.get("formProps").findIndex((item) => {
                return item.key === payload.key
            })
            return state.set("formProps", fromJS(state.get('formProps')).delete(target))
        default:
            return state
    }
}

export {
    formOptionsReducer
}