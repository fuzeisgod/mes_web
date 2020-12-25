import React from 'react'
import './part_configuration.less'
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
            part_name: '零件1'
        },
        {
            key: 2,
            part_name: '零件2'
        },
        {
            key: 3,
            part_name: '零件3'
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
                <Form form={form}>
                    <Form.Item label="设备类型" name="device_type" className="form-item">
                        <Select style={{ width: '200px' }}>
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
                <Card
                    title="零件清单"
                    headStyle={{fontWeight:'bold', padding: 0}}
                    bodyStyle={{ padding: 0 }}
                    bordered={false}
                >
                    <Table bordered columns={columns} dataSource={dataSource} />
                </Card>
            </Card>
        </>
    )
}
