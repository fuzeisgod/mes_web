import React, { FC, ReactElement, useEffect, useReducer, useState } from 'react'
import {
    Card,
    Button,
    Form,
    Input,
    DatePicker,
    Select,
    Divider,
    Table,
    Breadcrumb,
    Space,
    Popconfirm,
    message
} from 'antd'
import {
    PlusOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons'
import './production_order.less'
import { ISearch } from './typings'
import moment from 'moment';
import { getProductOrdersList, deleteProductOrder } from '../../api/product'
import { getUsersList } from '../../api/staff'
import { productOrderListReducer } from './reducer'
import { ACTION_TYPE } from './typings'

const { RangePicker } = DatePicker

const ProductionOrders: FC = (props: any): ReactElement => {
    const [form] = Form.useForm()

    const [_state, dispatch] = useReducer(productOrderListReducer, {
        tableData: [],
        page: 1,
        limit: 10,
        total: 0,
        searchInfo: {
            orderNo: null,
            startTime: null,
            endTime: null,
            chargeUserId: null
        },
        userList: [],
        freshFlag: false
    })

    const onFinish = (values: ISearch) => {
        let { orderNo, chargeUserId, orderTime } = values;
        dispatch({
            type: ACTION_TYPE.SET_SEARCH_INFO,
            payload: {
                orderNo,
                startTime: orderTime ? orderTime[0].toJSON() : '',
                endTime: orderTime ? orderTime[1].toJSON() : '',
                chargeUserId
            }
        })
    }

    const add_new_order = () => {
        // you need insert userid here
        props.history.push('/' + 'my-userid' + '/po/edit_order')
    }

    const editRender = (record) => {

        const handleClickEdit = () => {
            props.history.push('/' + 'my-userid' + '/po/edit_order/?orderId=' + record.Id)
        }
        const handleDelete = () => {
            deleteProductOrder(record.Id).then((res: any) => {
                if (res.code === 200) {
                    message.success('删除成功！')
                    dispatch({
                        type: ACTION_TYPE.CHANGE_FRESH_FLAG
                    })
                }
            })
        }

        return (
            <Space size={16}>
                <Button onClick={handleClickEdit} type="primary" size="small" shape="round">编辑</Button>
                <Popconfirm title="确认删除？" icon={<ExclamationCircleOutlined style={{ color: 'red' }} />} onConfirm={handleDelete}>
                    <Button danger type="primary" size="small" shape="round">删除</Button>
                </Popconfirm>
            </Space>
        )
    }

    const columns = [
        { title: '生产订单编号', dataIndex: 'OrderNo', key: 'OrderNo' },
        { title: '产品数量', dataIndex: 'ProductCount', key: 'ProductCount' },
        { title: '开单时间', dataIndex: 'CreateTime', key: 'CreateTime' },
        { title: '计划完成时间', dataIndex: 'PlanTime', key: 'PlanTime' },
        { title: '是否加急', dataIndex: 'IsUrgent', key: 'IsUrgent' },
        { title: '订单负责人', dataIndex: 'ChargeUser', key: 'ChargeUser' },
        { title: '操作', key: 'OrderAction', render: editRender },
    ]

    const expandedRowRender = (record) => {
        const columns = [
            { title: '产品序列号', dataIndex: 'SerialNo', key: 'SerialNo' },
            { title: 'TerminalID', dataIndex: 'TerminalId', key: 'TerminalId' },
            { title: '产品料号', dataIndex: 'MaterialCode', key: 'MaterialCode' },
            { title: '产品名称', dataIndex: 'Name', key: 'Name' },
            { title: '开始时间', dataIndex: 'CreateTime', key: 'CreateTime' },
            { title: '计划完成时间', dataIndex: 'PlanTime', key: 'PlanTime' },
        ]

        let data = record.Devices.map(item => ({
            ...item,
            CreateTime: moment(item.CreateTime).format('YYYY年 MM月 DD日 HH:mm:ss'),
            PlanTime: moment(item.PlanTime).format('YYYY年 MM月 DD日 HH:mm:ss'),
            key: item.SerialNo
        }))

        return <Table className="sub-table" bordered={true} columns={columns} dataSource={data} pagination={false} />;
    }

    useEffect(() => {
        console.log('search data ...')
        getProductOrdersList({
            startTime: _state.searchInfo.startTime || '',
            endTime: _state.searchInfo.endTime || '',
            orderNo: _state.searchInfo.orderNo || '',
            chargeUserId: _state.searchInfo.chargeUserId || '',
            page: _state.page,
            limit: _state.limit
        }).then((res: any) => {
            if (res.code === 200) {
                let n = res.data.map(item => ({
                    ...item,
                    CreateTime: moment(item.CreateTime).format('YYYY年 MM月 DD日 HH:mm:ss'),
                    PlanTime: moment(item.PlanTime).format('YYYY年 MM月 DD日 HH:mm:ss'),
                    ProductCount: item.Devices.length,
                    key: item.Id,
                    IsUrgent: item.isUrgent ? <span style={{ color: 'red' }}>加急</span> : <span style={{ color: 'green' }}>正常</span>
                }))
                dispatch({
                    type: ACTION_TYPE.SET_ORDER_LIST,
                    payload: {
                        tableData: n,
                        total: res.count
                    }
                })
            }
        })
    }, [_state.page, _state.limit, _state.searchInfo.orderNo, _state.searchInfo.startTime, _state.searchInfo.endTime, _state.searchInfo.chargeUserId, _state.freshFlag])

    useEffect(() => {
        getUsersList().then((res: any) => {
            if (res.code === 200) {
                let n = res.data.map(item => ({
                    Name: item.Name,
                    Id: item.Id
                }))
                dispatch({
                    type: ACTION_TYPE.SET_USER_LIST,
                    payload: n
                })
            }
        })
    }, [])

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item">生产订单列表</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="生产订单列表"
                    loading={false}
                    // bodyStyle={{ background: '#fafafa' }}
                    headStyle={{ fontWeight: 'bold' }}
                    extra={
                        <Button icon={<PlusOutlined />} shape="round" type="primary" onClick={add_new_order}>添加新订单</Button>
                    }
                >
                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout="inline"
                    >
                        <Form.Item label="生产订单编号" name="orderNo">
                            <Input placeholder="请输入生产订单编号" allowClear />
                        </Form.Item>
                        <Form.Item label="订单时间" name="orderTime">
                            <RangePicker
                                ranges={{
                                    '今天': [moment(), moment()],
                                    '本月': [moment().startOf('month'), moment().endOf('month')],
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="订单责任人" name="chargeUserId">
                            <Select style={{ width: '120px' }} allowClear>
                                {
                                    _state.userList.length !== 0 && _state.userList.map(item => {
                                        return <Select.Option value={item.Id} key={item.Id}>{item.Name}</Select.Option>
                                    })
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
                    <Table
                        bordered={true}
                        columns={columns}
                        expandable={{ expandedRowRender }}
                        dataSource={_state.tableData}
                        rowClassName={(record, index) => {
                            let className = 'light-row';
                            if (index % 2 === 1) className = 'dark-row';
                            return className;
                        }}
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
                            total: _state.total,
                            pageSizeOptions: ['5', '10', '15', '20']
                        }}
                    />
                </Card>
            </Space>
        </>
    )
}

export default ProductionOrders;