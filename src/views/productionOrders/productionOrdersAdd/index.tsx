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
        { title: '产品序列号', dataIndex: 'device_id', key: 'device_id' },
        { title: '产品料号', dataIndex: 'device_type', key: 'device_type'  },
        { title: '产品名称', dataIndex: 'device_name', key: 'device_name' },
        { title: '开始时间', dataIndex: 'device_start_time', key: 'device_start_time' },
        { title: '计划完成时间', dataIndex: 'device_end_time', key: 'device_end_time' },
        { title: '操作', key: 'order_action', render: () => (<a>编辑</a>) },
    ]

    const data = [
        { key: 0, device_id: '123456', device_type: '02020103', device_name: '接地箱1', device_start_time: '2020年10月15日', device_end_time: '2020年11月1日' },
        { key: 1, device_id: '123456', device_type: '02020103', device_name: '接地箱2', device_start_time: '2020年10月15日', device_end_time: '2020年11月1日' }
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
                            <span className="bread-item" onClick={() => { props.history.go(-1) }}>生产订单列表</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-item">生产订单编辑</span>
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
                        <Form.Item label="生产订单编号" name="order_id">
                            <Input placeholder="请输入生产订单编号" />
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
                        <Form.Item label="订单负责人" name="order_response_man">
                            <Select style={{ width: '120px' }}>
                                <Select.Option value="zhangsan">张三</Select.Option>
                                <Select.Option value="lisi">李四</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <Card
                        title="生产订单包含产品"
                        headStyle={{ fontWeight: 'bold' }}
                        bodyStyle={{ padding: 0 }}
                        extra={<Button type="primary" shape="round" icon={<PlusOutlined />} onClick={add_new_work}>添加新产品</Button>}
                    >
                        <Table
                            bordered={true}
                            columns={columns}
                            dataSource={data}
                            rowClassName={(record, index) => {
                                let className = 'light-row';
                                if (index % 2 === 1) className = 'dark-row';
                                return className;
                            }}
                        />
                    </Card>
                </Card>
            </Space>
        </>
    )
}
