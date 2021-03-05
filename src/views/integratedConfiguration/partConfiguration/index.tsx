import React from 'react'
import './part_configuration.less'
import {
    Form,
    Card,
    Button,
    Space,
    Select,
    Table,
    Input,
    Divider,
    Breadcrumb
} from 'antd'
import {
    FolderOpenOutlined
} from '@ant-design/icons'

export default function DeviceConfiguration(props) {
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

    const handleAdd = () => {
        props.history.push('/' + 'my-userid' + '/dc/add')
    }

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item">零件 BOM 列表</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="零件 BOM 列表"
                    extra={
                        <Space size={16}>
                            {/* <Button shape="round" type="default" icon={<FolderOpenOutlined />}>导入方案</Button> */}
                            <Button shape="round" type="primary" onClick={handleAdd}>添加 BOM</Button>
                        </Space>
                    }
                >
                    <Form form={form} layout="inline">
                        <Form.Item label="设备类型" name="device_type" className="form-item">
                            <Select style={{ width: '400px' }}>
                                <Select.Option value="02020103">智能防盗型保护接地箱（直立式）无监测(02020103)</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="方案名称" name="bom_name" className="form-item">
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                查询
                        </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <Card
                        headStyle={{ fontWeight: 'bold', padding: 0 }}
                        bodyStyle={{ padding: 0 }}
                        bordered={false}
                    >
                        <Table bordered columns={columns} dataSource={dataSource} expandable={{ expandedRowRender }} />
                    </Card>
                </Card>
            </Space>
        </>
    )
}
