import { ReactElement } from 'react'

export interface ITreeNode {
    title: string;
    key: string;
    icon?: ReactElement;
    children?: ITreeNode[];
    id?: number;
}

export interface ITree {
    treeData: ITreeNode[];
}

export interface IAction {
    type: ACTION_TYPE;
    payload: any;
}

export enum ACTION_TYPE {
    GET_TREE = "getTree",
}