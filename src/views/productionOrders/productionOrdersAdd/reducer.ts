import { ACTION_TYPE } from './typings'

function productDeviceListReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPE.SET_DEVICE_LIST:
            return [].concat(payload)
        default:
            return state
    }
}

export {
    productDeviceListReducer
}