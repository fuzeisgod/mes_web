import React, { FC, ReactElement } from 'react'
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

const { RangePicker } = DatePicker

const ProductionOrders: FC = (props: any): ReactElement => {
    const [form] = Form.useForm()
    const onFinish = (values: ISearch) => {
        console.log(values)
    }

    const add_new_order = () => {
        // you need insert userid here
        props.history.push('/' + 'my-userid' + '/po/edit_order')
    }

    const columns = [
        { title: '生产订单编号', dataIndex: 'order_id', key: 'order_id' },
        { title: '包含产品数量', dataIndex: 'order_amount', key: 'order_amount' },
        { title: '开单时间', dataIndex: 'order_start_time', key: 'order_start_time' },
        { title: '计划完成时间', dataIndex: 'order_finish_time', key: 'order_finish_time' },
        { title: '是否加急', dataIndex: 'order_in_need', key: 'order_in_need' },
        { title: '订单负责人', dataIndex: 'order_response_man', key: 'order_response_man' },
        { title: '操作', key: 'order_action', render: () => (<a>编辑</a>) },
    ]

    const expandedRowRender = () => {
        const columns = [
            { title: '产品序列号', dataIndex: 'device_id', key: 'device_id' },
            { title: '产品料号', dataIndex: 'device_type', key: 'device_type' },
            { title: '产品名称', dataIndex: 'device_name', key: 'device_name' },
            { title: '开始时间', dataIndex: 'device_start_time', key: 'device_start_time' },
            { title: '计划完成时间', dataIndex: 'device_end_time', key: 'device_end_time' },
        ]

        const data = [
            { key: 0, device_id: '123456', device_type: '02020103', device_name: '接地箱1', device_start_time: '2020年10月15日', device_end_time: '2020年11月1日' },
            { key: 1, device_id: '123456', device_type: '02020103', device_name: '接地箱2', device_start_time: '2020年10月15日', device_end_time: '2020年11月1日' }
        ]
        return <Table className="sub-table" bordered={true} columns={columns} dataSource={data} pagination={false} />;
    }


    const data = [
        { key: 0, order_id: '123456789', order_amount: 2, order_start_time: '2020年1月1日', order_finish_time: '2020年12月12日', order_in_need: '是', order_response_man: '张三' },
        { key: 1, order_id: '123456789', order_amount: 2, order_start_time: '2020年1月1日', order_finish_time: '2020年12月12日', order_in_need: '否', order_response_man: '李四' },
        { key: 2, order_id: '123456789', order_amount: 2, order_start_time: '2020年1月1日', order_finish_time: '2020年12月12日', order_in_need: '否', order_response_man: '王五' },
        { key: 3, order_id: '123456789', order_amount: 2, order_start_time: '2020年1月1日', order_finish_time: '2020年12月12日', order_in_need: '否', order_response_man: '赵六' },
    ]

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
                                <Select.Option value="zhangsan">张三</Select.Option>
                                <Select.Option value="lisi">李四</Select.Option>
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
                        dataSource={data}
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