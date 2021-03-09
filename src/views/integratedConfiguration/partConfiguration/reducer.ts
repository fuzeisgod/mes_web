import { ACTION_TYPE } from "./typings";

function dataSourceReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPE.SET_DATA_SOURCE:
            return [].concat(payload)
        default:
            return state;
    }
}

export {
    dataSourceReducer
}