import React, { FC, ReactElement, useEffect, useReducer } from 'react'
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
    Space
} from 'antd'
import {
    PlusOutlined
} from '@ant-design/icons'
import './production_order.less'
import { ISearch } from './typings'
import moment from 'moment';
import { getProductOrdersList } from '../../api/product'
import { productOrderListReducer } from './reducer'
import { ACTION_TYPE } from './typings'

const { RangePicker } = DatePicker

const ProductionOrders: FC = (props: any): ReactElement => {
    const [form] = Form.useForm()
    const onFinish = (values: ISearch) => {
        let { order_num, order_response, order_time } = values;
        let startTime = order_time[0].toJSON()
        let endTime = order_time[1].toJSON()
        getProductOrdersList({
            startTime: startTime || "",
            endTime: endTime || "",
            orderId: order_num || "",
            chargeUserId: order_response || ""
        }).then((res: any) => {
            if (res.code === 200) {
                let n = res.data.map(item => ({
                    ...item,
                    order_amount: item.Devices.length,
                    key: item.Id,
                    isUrgent: item.isUrgent ? '是' : '否'
                }))
                dispatch({
                    type: ACTION_TYPE.SET_ORDER_LIST,
                    payload: n
                })
            }
        })
    }

    const [state, dispatch] = useReducer(productOrderListReducer, [])

    const add_new_order = () => {
        // you need insert userid here
        props.history.push('/' + 'my-userid' + '/po/edit_order')
    }

    const editRender = (record) => {
        const handleClickEdit = () => {
            props.history.push('/' + 'my-userid' + '/po/edit_order/?productId=' + record.ProductNo)
        }
        return <a onClick={handleClickEdit}>编辑</a>
    }

    const columns = [
        { title: '生产订单编号', dataIndex: 'ProductNo', key: 'order_id' },
        { title: '产品数量', dataIndex: 'order_amount', key: 'order_amount' },
        { title: '开单时间', dataIndex: 'CreateTime', key: 'order_start_time' },
        { title: '计划完成时间', dataIndex: 'PlanTime', key: 'order_finish_time' },
        { title: '是否加急', dataIndex: 'isUrgent', key: 'order_in_need' },
        { title: '订单负责人', dataIndex: 'ChargeUser', key: 'order_response_man' },
        { title: '操作', key: 'order_action', render: editRender },
    ]

    const expandedRowRender = (record) => {
        const columns = [
            { title: '产品序列号', dataIndex: 'SerialNo', key: 'device_id' },
            { title: 'TerminalID', dataIndex: 'TerminalId', key: 'device_terminalId' },
            { title: '产品料号', dataIndex: 'ProductID', key: 'device_type' },
            { title: '产品名称', dataIndex: 'Name', key: 'device_name' },
            { title: '开始时间', dataIndex: 'CreateTime', key: 'device_start_time' },
            { title: '计划完成时间', dataIndex: 'PlanTime', key: 'device_end_time' },
        ]

        let data = record.Devices.map(item => ({
            ...item,
            key: item.SerialNo
        }))

        return <Table className="sub-table" bordered={true} columns={columns} dataSource={data} pagination={false} />;
    }

    useEffect(() => {
        getProductOrdersList({
            startTime: '',
            endTime: '',
            orderId: '',
            chargeUserId: ''
        }).then((res: any) => {
            if (res.code === 200) {
                let n = res.data.map(item => ({
                    ...item,
                    order_amount: item.Devices.length,
                    key: item.Id,
                    isUrgent: item.isUrgent ? '是' : '否'
                }))
                dispatch({
                    type: ACTION_TYPE.SET_ORDER_LIST,
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
                        <Form.Item label="生产订单编号" name="order_num">
                            <Input placeholder="请输入生产订单编号" />
                        </Form.Item>
                        <Form.Item label="订单时间" name="order_time">
                            <RangePicker
                                ranges={{
                                    '今天': [moment(), moment()],
                                    '本月': [moment().startOf('month'), moment().endOf('month')],
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="订单责任人" name="order_response">
                            <Select style={{ width: '120px' }}>
                                <Select.Option value="1">张三</Select.Option>
                                <Select.Option value="2">李四</Select.Option>
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
                        dataSource={state}
                        rowClassName={(record, index) => {
                            let className = 'light-row';
                            if (index % 2 === 1) className = 'dark-row';
                            return className;
                        }}
                    />
                </Card>
            </Space>
        </>
    )
}

export default ProductionOrders;