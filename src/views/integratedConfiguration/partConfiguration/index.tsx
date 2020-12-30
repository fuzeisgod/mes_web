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
import {
    FolderOpenOutlined
} from '@ant-design/icons'

export default function DeviceConfiguration() {
    const [form] = Form.useForm()
    const columns = [
        { title: '方案名称', dataIndex: 'plan_name', key: 'plan_name' },
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
            plan_name: '方案1'
        },
        {
            key: 2,
            plan_name: '方案2'
        },
        {
            key: 3,
            plan_name: '方案3'
        }
    ]

    const expandedRowRender = () => {
        const columns = [
            { title: '零件名称', dataIndex: 'part_name', key: 'part_name' },
            { title: '零件ID', dataIndex: 'part_id', key: 'part_id' },
            { title: '零件数量', dataIndex: 'part_count', key: 'part_count' },
        ]

        const data = [
            { key: 0, part_name: '零件a', part_id: '123456', part_count: '3' },
            { key: 1, part_name: '零件b', part_id: '234567', part_count: '5' }
        ]
        return <Table bordered={true} columns={columns} dataSource={data} pagination={false} />;
    }

    return (
        <>
            <Card
                title="零件配置"
                extra={
                    <Space size={16}>
                        <Button shape="round" type="default" icon={<FolderOpenOutlined />}>导入方案</Button>
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
                    title="预设方案"
                    headStyle={{ fontWeight: 'bold', padding: 0 }}
                    bodyStyle={{ padding: 0 }}
                    bordered={false}
                >
                    <Table bordered columns={columns} dataSource={dataSource} expandable={{ expandedRowRender }} />
                </Card>
            </Card>
        </>
    )
}
