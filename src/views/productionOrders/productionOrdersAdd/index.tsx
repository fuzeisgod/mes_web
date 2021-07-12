import React, { useEffect, useReducer, useRef, useState } from 'react'
import {
    Card,
    Button,
    Space,
    Form,
    Input,
    DatePicker,
    Switch,
    Select,
    Divider,
    Table,
    Breadcrumb,
    message,
    Popconfirm,
    Modal,
    Carousel,
    InputNumber
} from 'antd'
import {
    PlusOutlined,
    ExclamationCircleOutlined,
    PrinterOutlined
} from '@ant-design/icons'
import './production_order_add.less'
import { addProductOrder, getDeviceListByOrderId, getProductOrderInfoByOrderId, upDateOrderInfo, deleteDevice } from '../../../api/product'
import { getSearchObj } from '../../../tools/index'
import { productDeviceListReducer } from './reducer'
import { ACTION_TYPE, MODE_TYPE } from './typings'
import moment from 'moment'
import { useUsers } from '../../../hooks'
import { useLocation } from 'react-router-dom'

export default function ProductionOrdersAdd(props: any) {
    const location = useLocation()
    const [form] = Form.useForm()
    const [users, updateUsers] = useUsers([])
    const [isModalVisible, updateIsModalVisible] = useState<boolean>(false)
    // const refBarContainer = useRef<HTMLCanvasElement>(null)
    const [_state, dispatch] = useReducer(productDeviceListReducer, {
        tableData: [],
        mode: 0,
        orderId: 0,
        freshFlag: false,
        selectRows: []
    })

    const columns = [
        { title: '产品序列号', dataIndex: 'SerialNo', key: 'SerialNo' },
        { title: 'TerminalID', dataIndex: 'TerminalId', key: 'TerminalId' },
        { title: '产品料号', dataIndex: 'MaterialCode', key: 'MaterialCode' },
        { title: '产品名称', dataIndex: 'Name', key: 'Name' },
        { title: '开始时间', dataIndex: 'CreateTime', key: 'CreateTime' },
        { title: '计划完成时间', dataIndex: 'PlanTime', key: 'PlanTime' },
        {
            title: '操作', key: 'orderAction', render: (text, record) => (
                <Space size={16}>
                    <Button onClick={handleClickEdit.bind(null, record)} type="primary" size="small" shape="round">编辑</Button>
                    <Popconfirm title="确认删除？" icon={<ExclamationCircleOutlined style={{ color: 'red' }} />} onConfirm={handleDelete.bind(null, record)}>
                        <Button danger type="primary" size="small" shape="round">删除</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    const handleClickEdit = (record) => {
        props.history.push('/' + 'my-userid' + '/po/edit_order/edit_work?SerialNo=' + record.SerialNo + '&orderId=' + _state.orderId + '&Id=' + record.Id + '&td=' + record.TerminalId)
    }

    const handleDelete = (record) => {
        if (record.Id) {
            deleteDevice(record.Id).then((res: any) => {
                if (res.code === 200) {
                    dispatch({
                        type: ACTION_TYPE.CHANGE_FRESH_FLAG
                    })
                    message.success(res.msg)
                }
            })
        }

    }

    const add_new_work = () => {
        // you need add userid here
        props.history.push('/' + 'my-userid' + '/po/edit_order/edit_work?orderId=' + _state.orderId)
    }

    // add or edit orderInfo
    const handleAdd = () => {
        let {
            order_finish_time,
            order_id,
            order_in_need,
            order_response_man,
            order_start_time
        } = form.getFieldsValue()
        if (!order_finish_time || !order_id || !order_response_man || !order_start_time) {
            return message.warning('信息未填写完整！')
        }
        if (_state.mode === MODE_TYPE.CREATE) {
            addProductOrder({
                OrderNo: order_id,
                PlanTime: order_finish_time,
                CreateTime: order_start_time,
                ChargeUserId: order_response_man,
                isUrgent: !order_in_need,
            }).then((res: any) => {
                if (res.code === 200) {
                    dispatch({
                        type: ACTION_TYPE.SET_ORDERID,
                        payload: res.data[0].Id
                    })
                    message.success(res.msg);
                }
            })
        } else if (_state.mode === MODE_TYPE.EDIT && _state.orderId !== 0) {
            upDateOrderInfo({
                Id: _state.orderId,
                OrderNo: order_id,
                PlanTime: order_finish_time,
                CreateTime: order_start_time,
                ChargeUserId: order_response_man,
                isUrgent: !order_in_need
            }).then((res: any) => {
                if (res.code === 200) {
                    message.success(res.msg)
                }
            })
        }
    }

    const handlePrintBtn = () => {
        console.log(_state.selectRows)
        updateIsModalVisible(true)
    }

    const handleModalOk = () => {
        updateIsModalVisible(false)
    }

    const handleModalCancel = () => {
        updateIsModalVisible(false)
    }

    // 1. prepare work
    // get orderId, set mode type and get user select options
    useEffect(() => {
        if (props.location.search) {
            let { orderId } = getSearchObj(props.location.search)
            let _orderId = parseInt(orderId)
            // set edit mode
            dispatch({
                type: ACTION_TYPE.SET_MODE_TYPE,
                payload: {
                    type: MODE_TYPE.EDIT,
                    orderId: _orderId
                }
            })
        }
    }, [location])

    // 2. getdata work
    // if EDIT_MODE, get DeviceList and orderInfo
    useEffect(() => {
        if (_state.mode !== (MODE_TYPE.CREATE || MODE_TYPE.EDIT) || _state.orderId === 0) return;

        // get OrderBasicInfo by orderId
        getProductOrderInfoByOrderId(_state.orderId).then((res: any) => {
            if (res.code === 200) {
                form.setFieldsValue({
                    order_id: res.data[0].OrderNo,
                    order_start_time: moment(res.data[0].CreateTime),
                    order_finish_time: moment(res.data[0].PlanTime),
                    order_in_need: !res.data[0].isUrgent,
                    order_response_man: res.data[0].ChargeUserId
                })
            }
        })



        // get DeviceList by orderId
        getDeviceListByOrderId(_state.orderId).then((res: any) => {
            if (res.code === 200) {
                let payload = res.data.map(item => ({
                    ...item,
                    CreateTime: moment(item.CreateTime).format('YYYY年 MM月 DD日 HH:mm:ss'),
                    PlanTime: moment(item.PlanTime).format('YYYY年 MM月 DD日 HH:mm:ss'),
                    key: item.Id
                }))
                dispatch({ type: ACTION_TYPE.SET_DEVICE_LIST, payload })
            }
        })
    }, [_state.orderId, _state.mode, _state.freshFlag])

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item" onClick={() => { props.history.go(-1) }}>生产订单列表</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-item">生产订单编辑</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="订单配置"
                    loading={false}
                    // bodyStyle={{ background: '#fafafa' }}
                    headStyle={{ fontWeight: 'bold' }}
                    extra={
                        <Space size={16}>
                            <Button type="primary" shape="round" onClick={handleAdd}>提交保存</Button>
                            <Button type="default" shape="round">取消</Button>
                        </Space>
                    }
                >
                    <Form
                        form={form}
                        layout="inline"
                        initialValues={{ order_in_need: true }}
                    >
                        <Form.Item label="生产订单编号" name="order_id">
                            <Input placeholder="请输入生产订单编号" />
                        </Form.Item>
                        <Form.Item label="开单时间" name="order_start_time">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="计划完成时间" name="order_finish_time">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="是否加急" name="order_in_need" valuePropName="checked">
                            <Switch checkedChildren="正常" unCheckedChildren="加急" className="order-form-switch" />
                        </Form.Item>
                        <Form.Item label="订单负责人" name="order_response_man">
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
                    </Form>
                    <Divider />
                    <Card
                        title="生产订单包含产品"
                        headStyle={{ fontWeight: 'bold' }}
                        bodyStyle={{ padding: 0 }}
                        extra={
                            <Space size={16}>
                                <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={add_new_work} disabled={!_state.orderId}>添加新产品</Button>
                                <Button style={{ background: '#52c41a', borderColor: '#52c41a' }} type="primary" shape="round" icon={<PrinterOutlined />} onClick={handlePrintBtn} disabled={_state.selectRows.length === 0}>条码打印</Button>
                            </Space>
                        }
                    >
                        <Table
                            bordered={true}
                            columns={columns}
                            dataSource={_state.tableData}
                            rowSelection={{
                                onChange: (_, selectedRows) => {
                                    dispatch({
                                        type: ACTION_TYPE.SET_SELECT_ROWS,
                                        payload: selectedRows
                                    })
                                }
                            }}
                            rowClassName={(record, index) => {
                                let className = 'light-row';
                                if (index % 2 === 1) className = 'dark-row';
                                return className;
                            }}
                        />
                    </Card>
                </Card>
            </Space>
            <Modal title="条码打印队列" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
                <Carousel>
                    <div>
                        <div style={{ height: '160px', background: '#cccccc', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <div style={{ fontSize: '16px', paddingRight: '10px' }}>打印数量:</div>
                                <InputNumber min={1} max={10} defaultValue={3} onChange={(value) => {
                                    console.log(value)
                                }} />
                            </div>
                            {/* 批量打印功能还在开发中... */}
                            {/* <div className="bar-area">
                                <canvas ref={refBarContainer} className="barcode-container" />
                            </div> */}
                        </div>
                    </div>
                </Carousel>
            </Modal>
        </>
    )
}
