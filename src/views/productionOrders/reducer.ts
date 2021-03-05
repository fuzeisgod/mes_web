import { ACTION_TYPE } from './typings'

function productOrderListReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPE.SET_ORDER_LIST:
            return [].concat(payload)
        default:
            return state
    }
}

export {
    productOrderListReducer
}