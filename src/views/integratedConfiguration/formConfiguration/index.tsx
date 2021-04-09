import {
    Space,
    Breadcrumb,
    Card,
    Button,
    Form,
    Select,
    Input,
    Divider,
    Table,
    message,
    Popconfirm
} from 'antd'
import {
    ExclamationCircleOutlined
} from '@ant-design/icons'
import './form_configuration.less'
import { getMouldList, deleteMould } from '../../../api/integratedconfig'
import React, { useEffect, useReducer, useState } from 'react'
import { mouldListReducer } from './reducer'
import { ACTION_TYPE } from './typings'
import { PreviewForm } from '../../../components'
import { useDeviceTypes, usePositions } from '../../../hooks'

export default function FormConfiguration(props) {
    const [form] = Form.useForm()
    const [positionList, updatePositionList] = usePositions([])
    const [deviceTypeList, updateDeviceTypeList] = useDeviceTypes([])

    const [state, dispatch] = useReducer(mouldListReducer, {
        tableData: [],
        searchInfo: {
            limit: 10,
            page: 1
        },
        total: 0,
        freshFlag: false
    })

    const handleAdd = () => {
        props.history.push('/' + 'my-userid' + '/fc/add')
    }

    const columns = [
        { title: '工单模板名称', dataIndex: 'Name', key: 'Name' },
        { title: '岗位', dataIndex: 'PositionName', key: 'PositionName' },
        { title: '设备类型', dataIndex: 'TypeName', key: 'TypeName' },
        {
            title: '操作', render: (text, record) => (
                <Space size={16}>
                    <Button type="primary" shape="round" size="small" onClick={handleEdit.bind(null, record)}>编辑</Button>
                    <Popconfirm title="确认删除？" icon={<ExclamationCircleOutlined style={{ color: 'red' }} />} onConfirm={handleDelete.bind(null, record)}>
                        <Button type="primary" shape="round" danger size="small">删除</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    const handleDelete = (record) => {
        if (record.Id) {
            deleteMould(record.Id).then((res: any) => {
                if (res.code === 200) {
                    message.success(res.msg)
                    dispatch({
                        type: ACTION_TYPE.CHANGE_FRESH_FLAG
                    })
                }
            })
        }
    }

    const handleEdit = (record) => {
        if (record.Id) {
            props.history.push('/' + 'my-userid' + '/fc/add?Id=' + record.Id)
        }
    }

    const handleSearch = (values) => {
        const { typeId, positionId } = values
        dispatch({
            type: ACTION_TYPE.SET_SEARCH_INFO,
            payload: {
                typeId,
                positionId
            }
        })
    }

    const expandedRowRender = (e) => {
        if (e.Mould) {
            let state = JSON.parse(e.Mould)
            console.log(JSON.parse(e.Mould))
            return <PreviewForm basicOptions={state.basicOptions} formItemProps={state.formProps} />
        }
        return null
    }

    useEffect(() => {
        console.log('effect')
        getMouldList({
            limit: state.searchInfo.limit,
            page: state.searchInfo.page,
            typeId: state.searchInfo.typeId || '',
            positionId: state.searchInfo.positionId || ''
        }).then((res: any) => {
            if (res.code === 200) {
                let n = res.data.map((item) => ({
                    ...item,
                    key: item.Id
                }))
                dispatch({
                    type: ACTION_TYPE.SET_DATA_SOURCE,
                    payload: {
                        tableData: n,
                        total: res.count
                    }
                })
            }
        })
    }, [state.searchInfo.typeId, state.searchInfo.positionId, state.searchInfo.limit, state.searchInfo.page, state.freshFlag])

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item">工单模板列表</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="工单模板列表"
                    extra={
                        <Space size={16}>
                            {/* <Button shape="round" type="default" icon={<FolderOpenOutlined />}>导入方案</Button> */}
                            <Button shape="round" type="primary" onClick={handleAdd}>添加模板</Button>
                        </Space>
                    }
                >
                    <Form form={form} layout="inline" onFinish={handleSearch}>
                        <Form.Item label="设备类型" name="typeId" className="form-item">
                            <Select style={{ width: '200px' }} allowClear>
                                {
                                    deviceTypeList.length > 0 && deviceTypeList.map(deviceType => (
                                        <Select.Option key={deviceType.Id} value={deviceType.Id}>{deviceType.Name + '(' + deviceType.MaterialCode + ')'}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="岗位" name="positionId" className="form-item">
                            <Select style={{ width: '200px' }} allowClear>
                                {
                                    positionList.length > 0 && positionList.map(position => (
                                        <Select.Option key={position.Id} value={position.Id}>{position.Name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                查询
                        </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <Card
                        headStyle={{ fontWeight: 'bold', padding: 0 }}
                        bodyStyle={{ padding: 0 }}
                        bordered={false}
                    >
                        <Table
                            bordered
                            columns={columns}
                            dataSource={state.tableData}
                            expandable={{ expandedRowRender }}
                            pagination={{
                                showSizeChanger: true,
                                onShowSizeChange: (current, size) => {
                                    dispatch({
                                        type: ACTION_TYPE.SET_LIMIT_COUNT,
                                        payload: size
                                    })
                                },
                                onChange: (page, pageSize) => {
                                    dispatch({
                                        type: ACTION_TYPE.SET_CURRENT_PAGE,
                                        payload: page
                                    })
                                },
                                showTotal: total => `共 ${total} 条`,
                                total: state.total,
                                pageSizeOptions: ['5', '10', '15', '20']
                            }}
                        />
                    </Card>
                </Card>
            </Space>
        </>
    )
}