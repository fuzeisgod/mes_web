import React from 'react'
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


const { RangePicker } = DatePicker

export default function ProductionOrders(props) {
    const [form] = Form.useForm()
    const onFinish = values => {
        console.log(values)
    }

    const add_new_order = () => {
        props.history.push('/:userID/po/edit_order')
    }

    const columns = [
        { title: '订单编号', dataIndex: 'order_id', key: 'order_id' },
        { title: '工单数量', dataIndex: 'order_amount', key: 'order_amount' },
        { title: '开单时间', dataIndex: 'order_start_time', key: 'order_start_time' },
        { title: '计划完成时间', dataIndex: 'order_finish_time', key: 'order_finish_time' },
        { title: '是否加急', dataIndex: 'order_in_need', key: 'order_in_need' },
        { title: '项目负责人', dataIndex: 'order_response_man', key: 'order_response_man' },
        { title: '操作', key: 'order_action', render: () => (<a>编辑</a>) },
    ]

    const expandedRowRender = () => {
        const columns = [
            { title: '工单单号', dataIndex: 'work_id', key: 'work_id' },
            { title: '表单名称', dataIndex: 'work_name', key: 'work_name' },
            { title: '填写人员', dataIndex: 'work_man', key: 'work_man' },
            { title: '填写时间', dataIndex: 'work_time', key: 'work_time' },
        ]

        const data = [
            { key: 0, work_id: '123456', work_name: '测试工单', work_man: '张三', work_time: '2020年11月1日' },
        ]
        return <Table bordered={true} columns={columns} dataSource={data} pagination={false} />;
    }


    const data = [
        { key: 0, order_id: '123456789', order_amount: 5, order_start_time: '2020年1月1日', order_finish_time: '2020年12月12日', order_in_need: '是', order_response_man: '张三' },
        { key: 1, order_id: '123456789', order_amount: 5, order_start_time: '2020年1月1日', order_finish_time: '2020年12月12日', order_in_need: '否', order_response_man: '李四' },
        { key: 2, order_id: '123456789', order_amount: 5, order_start_time: '2020年1月1日', order_finish_time: '2020年12月12日', order_in_need: '否', order_response_man: '王五' },
        { key: 3, order_id: '123456789', order_amount: 5, order_start_time: '2020年1月1日', order_finish_time: '2020年12月12日', order_in_need: '否', order_response_man: '赵六' },
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
                    bodyStyle={{ background: '#fafafa' }}
                    extra={
                        <Button icon={<PlusOutlined />} shape="round" type="primary" onClick={add_new_order}>添加新订单</Button>
                    }
                >
                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout="inline"
                    >
                        <Form.Item label="订单编号" name="order_num">
                            <Input placeholder="请输入订单编号" />
                        </Form.Item>
                        <Form.Item label="订单时间" name="order_time">
                            <RangePicker />
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
                    />
                </Card>
            </Space>
        </>
    )
}
