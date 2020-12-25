import React from 'react'
import {
    Card,
    Button,
    Table,
    Space,
    Form,
    Select
} from 'antd'

export default function ProcessConfiguration() {
    const columns = [
        { title: '工艺步骤', dataIndex: 'work_step', key: 'work_step' },
        { title: '模板表格', dataIndex: 'module', key: 'module' },
        {
            title: '操作', render: () => (
                <Space size={16}>
                    <Button shape="round" type="primary">编辑</Button>
                    <Button shape="round" type="default">预览</Button>
                    <Button shape="round" danger type="primary">删除</Button>
                </Space>
            )
        },
    ]

    const dataSource = [
        {
            key: 1,
            work_step: '下板组装',
            module: '模板一'
        },
        {
            key: 2,
            work_step: '上板组装',
            module: '模板二'
        }
    ]


    const handleAdd = () => {

    }

    return (
        <>
            <Card
                title="流程配置"
                headStyle={{ fontWeight: 'bold' }}
                extra={
                    <Space size={16}>
                        <Button type="default" shape="round" onClick={handleAdd}>添加工艺步骤</Button>
                        <Button type="primary" shape="round">提交保存</Button>
                    </Space>
                }
            >
                <Form
                    layout="inline"
                >
                    <Form.Item label="选择设备类型">
                        <Select style={{ width: '120px' }}>
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="选择岗位">
                        <Select style={{ width: '120px' }}>
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
                <Card
                    title="工艺步骤"
                    bodyStyle={{ padding: 0 }}
                    bordered={false}
                    headStyle={{ padding: 0, fontWeight: 'bold' }}
                >
                    <Table bordered columns={columns} dataSource={dataSource}></Table>
                </Card>

            </Card>
        </>
    )
}
