import React from 'react'
import {
    Card,
    Button,
    Table,
    Space,
    Form,
    Select,
    Breadcrumb
} from 'antd'
import './process_configuration.less'

export default function ProcessConfiguration(props) {
    const columns = [
        { title: '方案名称', dataIndex: 'plan_name', key: 'plan_name' },
        { title: '设备类型', dataIndex: 'device_type', key: 'device_type' },
        { title: '生产工单模板', dataIndex: 'module_s', key: 'module_s' },
        { title: '质检工单模板', dataIndex: 'module_z', key: 'module_z' },
        { title: '仓库工单模板', dataIndex: 'module_c', key: 'module_C' },
        { title: 'bom模板', dataIndex: 'bom', key: 'bom' },
        {
            title: '操作', render: () => (
                <Space size={16}>
                    <Button size="small" shape="round" type="primary">编辑</Button>
                    <Button size="small" shape="round" type="default">预览</Button>
                    <Button size="small" shape="round" danger type="primary">删除</Button>
                </Space>
            )
        },
    ]

    const dataSource = [
        {
            key: 1,
            plan_name: '综合方案一',
            device_type: '接地箱',
            module_s: '生产方案一',
            module_z: '质检方案一',
            module_c: '仓库方案一',
            bom: 'bom方案一'
        },
        {
            key: 2,
            plan_name: '综合方案二',
            device_type: '接地箱',
            module_s: '生产方案二',
            module_z: '质检方案二',
            module_c: '仓库方案二',
            bom: 'bom方案二'
        },
    ]


    const handleAdd = () => {
        props.history.push('/' + 'my-userid' + '/pc/add')
    }

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item">综合方案列表</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Card
                    title="综合方案"
                    headStyle={{ fontWeight: 'bold' }}
                    extra={
                        <Space size={16}>
                            <Button type="primary" shape="round" onClick={handleAdd}>创建新方案</Button>
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
                    </Form>
                    <Card
                        title="方案列表"
                        bodyStyle={{ padding: 0 }}
                        bordered={false}
                        headStyle={{ padding: 0, fontWeight: 'bold' }}
                    >
                        <Table bordered columns={columns} dataSource={dataSource}></Table>
                    </Card>

                </Card>
            </Space>
        </>
    )
}
