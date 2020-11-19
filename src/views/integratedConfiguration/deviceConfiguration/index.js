import React from 'react'
import './device_configuration.less'
import {
    Form,
    Card,
    Button,
    Space,
    Select,
    Table
} from 'antd'
export default function DeviceConfiguration() {
    const [form] = Form.useForm()
    const columns = [
        { title: '零件名称', dataIndex: 'part_name', key: 'part_name' },
        { title: '零件ID', dataIndex: 'part_id', key: 'part_id' },
        {
            title: '操作', render: () => (
                <Space size={16}>
                    <Button type="primary" shape="round">编辑</Button>
                    <Button type="primary" shape="round" danger>删除</Button>
                </Space>
            )
        },
    ]
    const dataSource = [
        {
            key: 1,
            part_name: '零件1',
            part_id: '123'
        },
        {
            key: 2,
            part_name: '零件2',
            part_id: '123'
        },
        {
            key: 3,
            part_name: '零件3',
            part_id: '123'
        }
    ]
    return (
        <>
            <Card
                title="设备配置"
                extra={
                    <Space size={16}>
                        <Button shape="round" type="default">添加零部件</Button>
                        <Button shape="round" type="primary">保存修改</Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="设备类型" name="device_type" className="form-item">
                        <Select style={{ width: '200px' }}>
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="零件列表" className="form-item">
                        <Table bordered columns={columns} dataSource={dataSource} />
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}
