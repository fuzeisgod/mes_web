import React from 'react'
import {
    Card,
    Space,
    Row,
    Col,
    Button
} from 'antd'

export default function FormConfiguration() {
    return (
        <>
            <Card
                title="表单配置"
                bodyStyle={{ padding: '2px 16px 14px 16px', background: '#fafafa' }}
                extra={<Button type="primary" shape="round">提交保存</Button>}
            >
                <Row gutter={16}>
                    <Col span={16}>
                        <Space direction="vertical" size={16} style={{width:'100%'}}>
                            <Card
                                title="表单基本配置"
                            >

                            </Card>
                            <Card
                                title="新增表单子项"
                            >

                            </Card>
                            <Card
                                title="表单子项列表"
                            >

                            </Card>
                        </Space>
                    </Col>
                    <Col span={8}>
                        <Space direction="vertical" size={16} style={{width:'100%'}}>
                            <Card
                                title="表单预览"
                            ></Card>
                        </Space>
                    </Col>
                </Row>

            </Card>
        </>
    )
}
