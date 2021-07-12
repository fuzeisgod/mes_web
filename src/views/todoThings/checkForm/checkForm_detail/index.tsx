import { Card, Form, Input, Space, Breadcrumb, Button, Popconfirm, Col, Row, Table } from 'antd'
import React from 'react'
import './check_form_detail.less'
import { PreviewForm } from '../../../../components'

const CheckFormDetail = (props:any) => {

    const columns = [
        { title: '产品序列号', dataIndex: 'device_order', key: 'device_order' },
        {
            title: '操作', render: () => (
                <Button size="small" shape="round" type="primary">查看</Button>
            )
        },
    ]

    const dataSource = [
        { device_order: '10200101' },
        { device_order: '10200110' },
    ]

    const handleCheck = () => {

    }
    
    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item" onClick={() => { props.history.go(-1) }}>送检单台账</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-item">送检单详情</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Card title="送检单详情" headStyle={{ fontWeight: 'bold' }} bodyStyle={{ padding: '2px 16px 14px 16px', background: '#FAFAFA' }} extra={
                    <Space size={16}>
                        <Popconfirm placement="left" title={() => (
                            <>
                                <div>工单确认无误,确认送检?</div>
                                <div style={{ fontWeight: 'bold', color: 'red' }}>此操作不可逆,请谨慎操作</div>
                            </>
                        )} onConfirm={handleCheck} okText="确认" cancelText="取消">
                            <Button type="primary" danger shape="round">确认送检</Button>
                        </Popconfirm>
                        <Button shape="round">取消</Button>
                    </Space>
                }>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Card bodyStyle={{ padding: '12px 20px' }} title="送检单信息">
                                    <Form layout="inline">
                                        <Form.Item label="生产订单号">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="产品料号">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="产品名称">
                                            <Input readOnly />
                                        </Form.Item>
                                    </Form>
                                </Card>
                                <Card bodyStyle={{ padding: '12px 20px' }} title="订单产品列表">
                                    <Table bordered columns={columns} dataSource={dataSource}></Table>
                                </Card>
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Card
                                    title="工单查看"
                                    bodyStyle={{ padding: '0 25px 25px 25px' }}
                                >
                                    <PreviewForm basicOptions={{}} formItemProps={[]} />
                                </Card>
                            </Space>
                        </Col>
                    </Row>

                </Card>
            </Space>
        </>
    )
}

export default CheckFormDetail