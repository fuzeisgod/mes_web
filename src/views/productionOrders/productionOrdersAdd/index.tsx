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
    Table,
    Breadcrumb
} from 'antd'
import {
    PlusOutlined
} from '@ant-design/icons'
import './production_order_add.less'

export default function ProductionOrdersAdd(props: any) {
    const [form] = Form.useForm()
    const columns = [
        { title: '设备ID', dataIndex: 'device_id', key: 'device_id' },
        { title: '设备名称', dataIndex: 'device_name', key: 'device_name' },
        { title: '开始时间', dataIndex: 'device_start_time', key: 'device_start_time' },
        { title: '计划完成时间', dataIndex: 'device_finish_time', key: 'device_finish_time' },
    ]

    const add_new_work = () => {
        // you need add userid here
        props.history.push('/' + 'my-userid' + '/po/edit_order/edit_work')
    }

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item" onClick={() => { props.history.go(-1) }}>流水订单列表</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-item">订单编辑</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="添加新订单"
                    loading={false}
                    // bodyStyle={{ background: '#fafafa' }}
                    headStyle={{ fontWeight: 'bold' }}
                    extra={
                        <Space size={16}>
                            <Button type="primary" shape="round">提交保存</Button>
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
                        title="流水订单包含设备"
                        headStyle={{ fontWeight: 'bold' }}
                        extra={<Button type="primary" shape="round" icon={<PlusOutlined />} onClick={add_new_work}>添加新设备</Button>}
                    >
                        <Table
                            bordered={true}
                            columns={columns}
                        />
                    </Card>
                </Card>
            </Space>
        </>
    )
}
