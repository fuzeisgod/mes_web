import React, { FC, ReactElement, useReducer, useEffect, useState } from 'react'
import {
    Tree,
    Card,
    Tooltip,
    Input,
    Button,
    Form,
    Select,
    Divider,
    Empty,
    Space,
    Alert
} from 'antd'
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import './staff_management.less';
import { ACTION_TYPE, ITree, ITreeDataNode, ITreeNode } from './typings';
import { treeReducer } from './reducer';
import { getUsersList } from '../../api/staff'

const initialState: ITree = {
    treeData: []
};

const StaffManagement: FC = (): ReactElement => {
    const [form] = Form.useForm()
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const handleChange = () => {
        console.log(form.getFieldsValue())
    }

    const [state, dispatch] = useReducer(treeReducer, initialState)

    const onCheck = (checkedKeys: React.Key[]) => {
        console.log('onCheck', checkedKeys);
    };

    const toggleIsEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    // 处理树结构返回数据
    const handleTreeData = (treeData: ITreeDataNode[]): ITreeNode[] => {
        let result = []
        treeData.forEach((item1) => {
            let children = []
            item1.Users.forEach((item2) => {
                children.push({
                    title: item2.Name,
                    key: 'u_' + item2.Id,
                    id: item2.Id,
                    icon: <UserOutlined />
                })
            })
            result.push({
                title: item1.Department,
                key: 'd_' + item1.DepartId,
                children: children
            })
        })
        return result
    }

    useEffect(() => {
        let result = []
        getUsersList().then((res: any) => {
            if (res.code === 200) {
                let result = handleTreeData(res.data)
                dispatch({
                    type: ACTION_TYPE.GET_TREE,
                    payload: result
                })
            }
        })
    }, [])

    return (
        <div className="staff-manage-page">
            <div className="tree-slider">
                <Card
                    title="员工列表"
                    extra={<Tooltip title="编辑模式" color="#40a9ff"><Button icon={<EditOutlined />} onClick={toggleIsEditMode} type="primary" shape="round" size="small">{isEditMode ? '退出编辑' : '编辑模式'}</Button></Tooltip>}
                    headStyle={{ padding: '0 20px' }}
                    bodyStyle={{ padding: '0' }}
                >
                    <div className="search-box">
                        <Input placeholder="请输入员工姓名或工号" />
                    </div>
                    {
                        isEditMode ?
                            <div className="edit-box">
                                <Space>
                                    <Button size="small" type="primary">添加</Button>
                                    <Button size="small" type="primary" danger>删除</Button>
                                </Space>
                            </div>
                            :
                            null
                    }

                    <div className="tree-box">
                        {
                            state.treeData.length > 0
                                ?
                                <Tree
                                    checkable={isEditMode}
                                    showLine={{ showLeafIcon: false }}
                                    showIcon={!isEditMode}
                                    defaultExpandAll={true}
                                    onSelect={onSelect}
                                    treeData={state.treeData}
                                    onCheck={onCheck}
                                />
                                :
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        }
                    </div>
                </Card>
            </div>
            <div className="staff-info">
                <Card
                    title="员工信息"
                    extra={<Button type="primary" shape="round" onClick={handleChange}>保存修改</Button>}
                >
                    <Form
                        form={form}
                    >
                        <Form.Item
                            label="员工姓名"
                            name="staff-name"
                        >
                            <Input style={{ width: '200px' }} placeholder="请输入姓名" allowClear />
                        </Form.Item>
                        <Form.Item
                            label="员工岗位"
                            name="staff-station"
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '250px' }}
                                placeholder="请选择岗位"
                            >
                                <Select.Option value="1">岗位1</Select.Option>
                                <Select.Option value="2">岗位2</Select.Option>
                                <Select.Option value="3">岗位3</Select.Option>
                                <Select.Option value="4">岗位4</Select.Option>
                                <Select.Option value="5">岗位5</Select.Option>
                                <Select.Option value="6">岗位6</Select.Option>
                            </Select>
                        </Form.Item>
                        <Divider orientation="left">可选分配账号</Divider>
                        <Form.Item
                            label="员工账号"
                            name="staff-account"
                        >
                            <Input style={{ width: '200px' }} placeholder="请输入账号" allowClear />
                        </Form.Item>
                        <Form.Item
                            label="账号密码"
                            name="staff-password"
                        >
                            <Input.Password style={{ width: '200px' }} placeholder="请输入密码" />
                        </Form.Item>
                        <Divider orientation="left">权限分配</Divider>
                        <Form.Item
                            label="权限选择"
                            name="staff-authority"
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '500px' }}
                                placeholder="请选择此角色拥有权限"
                            >
                                <Select.Option value="1">权限1</Select.Option>
                                <Select.Option value="2">权限2</Select.Option>
                                <Select.Option value="3">权限3</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}


export default StaffManagement;