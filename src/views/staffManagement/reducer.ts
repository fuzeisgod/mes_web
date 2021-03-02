import { ACTION_TYPE, IAction, ITree } from "./typings";

function treeReducer(state: ITree, action: IAction): ITree {
    const { type, payload } = action;

    switch (type) {
        case ACTION_TYPE.GET_TREE:
            return {
                treeData: payload
            }
        default:
            return state;
    }
}

export {
    treeReducer
}