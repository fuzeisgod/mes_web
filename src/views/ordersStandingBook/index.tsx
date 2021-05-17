import React, { useEffect, useReducer, useState } from 'react'
import {
    Card,
    Form,
    Button,
    DatePicker,
    Input,
    Divider,
    Table,
    Select
} from 'antd'
import { searchOrderBookByOptions } from '../../api/orderbook'
import { ACTION_TYPE } from './typings'
import { orderStandingBookReducer } from './reducer'
import moment from 'moment'
import { useUsers, usePositions } from '../../hooks'
import { PreviewForm } from '../../components'

const { RangePicker } = DatePicker;

export default function OrdersStandingBook() {
    const [form] = Form.useForm()
    const [users, updateUsers] = useUsers([])
    const [positions, updatePositions] = usePositions([])
    const [_state, dispatch] = useReducer(orderStandingBookReducer, {
        tableData: [],
        total: 0,
        searchInfo: {
            limit: 10,
            currentPage: 1,
        }
    })

    const columns = [
        { title: '生产订单编号', dataIndex: 'OrderNo', key: 'OrderNo' },
        { title: '产品序列号', dataIndex: 'SerialNo', key: 'SerialNo' },
        { title: 'TerminalID', dataIndex: 'TerminalId', key: 'TerminalId' },
        { title: '产品名称', dataIndex: 'DeviceName', key: 'DeviceName' },
        { title: '填写人员', dataIndex: 'UserName', key: 'UserName' },
        { title: '岗位', dataIndex: 'PositionName', key: 'PositionName' },
        { title: '填写时间', dataIndex: 'Time', key: 'Time' }
    ]

    const search_work = (values: any) => {
        let { SerialNo, TerminalId, Time, orderNo, positionId, userId } = values
        let payload = {
            startTime: Time ? moment(Time[0]).toJSON() : '',
            endTime: Time ? moment(Time[1]).toJSON() : '',
            orderNo,
            userId,
            positionId,
            TerminalId,
            SerialNo
        }
        dispatch({
            type: ACTION_TYPE.SET_SEARCH_INFO,
            payload
        })
    }

    useEffect(() => {
        searchOrderBookByOptions({
            startTime: _state.searchInfo.startTime || '',
            endTime: _state.searchInfo.endTime || '',
            orderNo: _state.searchInfo.orderNo || '',
            userId: _state.searchInfo.userId || '',
            positionId: _state.searchInfo.positionId || '',
            TerminalId: _state.searchInfo.TerminalId || '',
            SerialNo: _state.searchInfo.SerialNo || '',
            limit: _state.searchInfo.limit,
            page: _state.searchInfo.currentPage
        }).then((res: any) => {
            console.log(res)
            if (res.code === 200) {
                let n = res.data.map((item, index) => ({
                    ...item,
                    key: index,
                    Time: moment(item.Time).format('YYYY年 M月D日'),
                }))
                dispatch({
                    type: ACTION_TYPE.SET_TABLE_DATA,
                    payload: {
                        tableData: n,
                        total: res.count
                    }
                })
            }
        })
    }, [_state.searchInfo.startTime, _state.searchInfo.endTime, _state.searchInfo.orderNo, _state.searchInfo.userId, _state.searchInfo.positionId, _state.searchInfo.TerminalId, _state.searchInfo.SerialNo, _state.searchInfo.limit, _state.searchInfo.currentPage])

    return (
        <>
            <Card>
                <Form
                    layout="inline"
                    onFinish={search_work}
                    form={form}
                >
                    <Form.Item label="时间范围" name="Time">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item label="生产订单编号" name="orderNo">
                        <Input placeholder="请输入生产订单编号" allowClear />
                    </Form.Item>
                    <Form.Item label="产品序列号" name="SerialNo">
                        <Input placeholder="请输入产品序列号" allowClear />
                    </Form.Item>
                    <Form.Item label="TerminalID" name="TerminalId">
                        <Input placeholder="请输入TerminalID" allowClear />
                    </Form.Item>
                    <Form.Item label="员工姓名" name="userId">
                        <Select
                            style={{ width: '120px' }}
                            allowClear
                        >
                            {
                                users.length !== 0 && users.map(user => {
                                    return <Select.Option value={user.Id} key={user.Id}>{user.Name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="工作岗位" name="positionId">
                        <Select
                            style={{ width: '120px' }}
                            allowClear
                        >
                            {
                                positions.length > 0 && positions.map((position) => (
                                    <Select.Option value={position.Id} key={position.Id}>{position.Name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </Form.Item>
                </Form>
                <Divider />
                <Table
                    dataSource={_state.tableData}
                    columns={columns}
                    bordered
                    expandable={{
                        expandedRowRender: record => {
                            let formProps = JSON.parse(record.Content)
                            console.log(JSON.parse(record.Content))
                            return <PreviewForm basicOptions={null} formItemProps={formProps} />
                        },
                    }}
                    footer={() => <div style={{ color: '#ffa39e', textAlign: 'right' }}>默认展示一周内的工单数据</div>}
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
        </>
    )
}
