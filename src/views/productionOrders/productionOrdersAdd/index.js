import React from 'react'
import {
    Card,
    Button,
    Space,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Switch,
    Select,
    Divider,
    Table
} from 'antd'
import {
    PlusOutlined
} from '@ant-design/icons'
import './production_order_add.less'

export default function ProductionOrdersAdd() {
    const [form] = Form.useForm()
    const columns = [
        { title: '工单名称', dataIndex: 'work_name', key: 'work_name' }
    ]
    return (
        <>
            <Card
                title="添加新订单"
                loading={false}
                extra={
                    <Space size={16}>
                        <Button type="primary" shape="round">提交</Button>
                        <Button type="default" shape="round">取消</Button>
                    </Space>
                }
            >
                <Form
                    form={form}
                    layout="inline"
                >
                    <Form.Item label="订单编号" name="order_id">
                        <Input placeholder="请输入订单编号" />
                    </Form.Item>
                    <Form.Item label="工单数量" name="order_amount">
                        <InputNumber min={0} defaultValue={0} />
                    </Form.Item>
                    <Form.Item label="开单时间" name="order_start_time">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="计划完成时间" name="order_finish_time">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="是否加急" name="order_in_need">
                        <Switch checkedChildren="加急" unCheckedChildren="正常" className="order-form-switch" />
                    </Form.Item>
                    <Form.Item label="项目负责人" name="order_response_man">
                        <Select style={{ width: '120px' }}>
                            <Select.Option value="zhangsan">张三</Select.Option>
                            <Select.Option value="lisi">李四</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
                <Divider />
                <Card
                    title="订单包含工单"
                    extra={<Button type="primary" shape="round" icon={<PlusOutlined />}>添加新工单</Button>}
                >
                    <Table
                        bordered={true}
                        columns={columns}
                    />
                </Card>
            </Card>
        </>
    )
}
