import React from 'react'
import {
    Card,
    Button,
    Table,
    Space
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
                extra={
                    <Space size={16}>
                        <Button type="default" shape="round" onClick={handleAdd}>添加工艺步骤</Button>
                        <Button type="primary" shape="round">提交保存</Button>
                    </Space>
                }
            >
                <Table bordered columns={columns} dataSource={dataSource}></Table>
            </Card>
        </>
    )
}
