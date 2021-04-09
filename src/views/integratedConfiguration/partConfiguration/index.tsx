import React, { useEffect, useReducer, useState } from 'react'
import './part_configuration.less'
import {
    Form,
    Card,
    Button,
    Space,
    Select,
    Table,
    Input,
    Divider,
    Breadcrumb,
    message,
    Popconfirm
} from 'antd'
import {
    ExclamationCircleOutlined
} from '@ant-design/icons'
import { getBomList, deleteBom } from '../../../api/integratedconfig'
import { dataSourceReducer } from './reducer'
import { ACTION_TYPE } from './typings'
import { useDeviceTypes } from '../../../hooks'

export default function DeviceConfiguration(props) {
    const [form] = Form.useForm()
    const [deviceTypes, updateDeviceTypes] = useDeviceTypes([])
    const [state, dispatch] = useReducer(dataSourceReducer, {
        tableData: [],
        searchInfo: {
            limit: 10,
            page: 1
        },
        total: 0,
        freshFlag: false
    })

    const columns = [
        { title: '方案名称', dataIndex: 'Name', key: 'Name' },
        {
            title: '设备类型', dataIndex: 'TypeId', key: 'TypeId', render: (text, record) => {
                let target = []
                if (deviceTypes.length > 0) {
                    target = deviceTypes.filter(deviceType => {
                        return deviceType.Id === record.TypeId
                    })
                }
                return (
                    <div>{target.length > 0 ? target[0].Name : ''}</div>
                )
            }
        },
        {
            title: '操作', render: (text, record) => (
                <Space size={16}>
                    <Button size="small" shape="round" onClick={handlePreview.bind(null, record)}>预览</Button>
                    <Popconfirm title="确认删除？" icon={<ExclamationCircleOutlined style={{ color: 'red' }} />} onConfirm={handleDelete.bind(null, record)}>
                        <Button size="small" type="primary" shape="round" danger>删除</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    const handleAdd = () => {
        props.history.push('/' + 'my-userid' + '/dc/add')
    }

    const handlePreview = (record) => {
        if (record.Id) {
            props.history.push('/' + 'my-userid' + '/dc/add?bomprogrameId=' + record.Id)
        }
    }

    const handleDelete = (record) => {
        if (record.Id) {
            deleteBom(record.Id).then((res: any) => {
                if (res.code === 200) {
                    message.success(res.msg)
                    dispatch({
                        type: ACTION_TYPE.CHANGE_FRESH_FLAG
                    })
                }
            })
        }
    }

    const handleSearch = (values) => {
        let { bom_name, device_type } = values;
        let payload = {
            typeId: device_type,
            name: bom_name
        }
        dispatch({
            type: ACTION_TYPE.SET_SEARCH_INFO,
            payload
        })
    }

    useEffect(() => {
        console.log('effct')
        getBomList({
            page: state.searchInfo.page,
            limit: state.searchInfo.limit,
            typeId: state.searchInfo.typeId || '',
            name: state.searchInfo.name || ''
        }).then((res: any) => {
            if (res.code === 200) {
                let n = res.data.map((item, index) => ({
                    ...item,
                    key: index
                }))
                dispatch({
                    type: ACTION_TYPE.SET_TABLE_DATA, payload: {
                        tableData: n,
                        total: res.count
                    }
                })
            }
        })
    }, [state.searchInfo.page, state.searchInfo.limit, state.searchInfo.typeId, state.searchInfo.name, state.freshFlag])

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item">零件 BOM 列表</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="零件 BOM 列表"
                    extra={
                        <Space size={16}>
                            {/* <Button shape="round" type="default" icon={<FolderOpenOutlined />}>导入方案</Button> */}
                            <Button shape="round" type="primary" onClick={handleAdd}>添加 BOM</Button>
                        </Space>
                    }
                >
                    <Form form={form} layout="inline" onFinish={handleSearch}>
                        <Form.Item label="设备类型" name="device_type" className="form-item">
                            <Select style={{ width: '200px' }} allowClear>
                                {
                                    deviceTypes.length > 0 && deviceTypes.map(deviceType => (
                                        <Select.Option key={deviceType.Id} value={deviceType.Id}>{deviceType.Name + '(' + deviceType.MaterialCode + ')'}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="方案名称" name="bom_name" className="form-item">
                            <Input allowClear />
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
