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
    Empty
} from 'antd'
import { FormOutlined, UserOutlined } from '@ant-design/icons';
import './staff_management.less';
import { ACTION_TYPE, ITree } from './typings';
import { treeReducer } from './reducer';

const initialState: ITree = {
    treeData: []
};

const StaffManagement: FC = (): ReactElement => {
    const [form] = Form.useForm()

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const handleChange = () => {
        console.log(form.getFieldsValue())
    }

    const [state, dispatch] = useReducer(treeReducer, initialState)

    useEffect(() => {
        // TODO... get treeData here （result）
        let result = [
            {
                title: '车间A',
                key: '0-0',
                children: [
                    {
                        title: '工人1',
                        key: '0-0-0',
                        id: 1,
                        icon: <UserOutlined />
                    },
                    {
                        title: '工人2',
                        key: '0-0-1',
                        id: 2,
                        icon: <UserOutlined />
                    }
                ],
            },
            {
                title: '车间B',
                key: '0-1',
                children: [
                    {
                        title: '工人3',
                        key: '0-1-0',
                        id: 4,
                        icon: <UserOutlined />
                    },
                    {
                        title: '工人4',
                        key: '0-1-1',
                        id: 5,
                        icon: <UserOutlined />
                    }
                ],
            }
        ]

        dispatch({
            type: ACTION_TYPE.GET_TREE,
            payload: result
        })

    }, [])

    return (
        <div className="staff-manage-page">
            <div className="tree-slider">
                <Card
                    title="员工列表"
                    extra={<Tooltip title="编辑员工列表" color="#40a9ff"><FormOutlined style={{ fontSize: '16px', cursor: 'pointer' }} /></Tooltip>}
                    headStyle={{ textAlign: 'center' }}
                    bodyStyle={{ padding: '0' }}
                >
                    <div className="search-box">
                        <Input placeholder="请输入员工姓名或工号" />
                    </div>
                    <div className="tree-box">
                        {
                            state.treeData.length > 0
                                ?
                                <Tree
                                    showLine={{ showLeafIcon: false }}
                                    showIcon={true}
                                    defaultExpandAll={true}
                                    onSelect={onSelect}
                                    treeData={state.treeData}
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