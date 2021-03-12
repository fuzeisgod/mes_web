import React, { FC } from 'react'
import {
    Space,
    Breadcrumb,
    Card,
    Button,
    Form,
    Select
} from 'antd'
import './process_configuration_add.less'

const processConfigurationAdd = (props) => {
    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item" onClick={() => { props.history.go(-1) }}>综合方案列表</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-item">方案编辑</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Card
                    title="方案编辑"
                    headStyle={{ fontWeight: 'bold' }}
                    extra={
                        <Space size={16}>
                            <Button type="primary" shape="round">提交保存</Button>
                        </Space>
                    }
                >
                    <Form>
                        <Form.Item label="设备类型">
                            <Select style={{ width: '250px' }}>
                                <Select.Option value="1">1</Select.Option>
                                <Select.Option value="2">2</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="BOM方案">
                            <Select style={{ width: '250px' }}>
                                <Select.Option value="1">1</Select.Option>
                                <Select.Option value="2">2</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="生产工单模板">
                            <Select style={{ width: '250px' }}>
                                <Select.Option value="1">1</Select.Option>
                                <Select.Option value="2">2</Select.Option>
                            </Select>
                            <Button className="preview_btn" type="primary" shape="round" size="small">预览</Button>
                        </Form.Item>
                        <Form.Item label="质检工单模板">
                            <Select style={{ width: '250px' }}>
                                <Select.Option value="1">1</Select.Option>
                                <Select.Option value="2">2</Select.Option>
                            </Select>
                            <Button className="preview_btn" type="primary" shape="round" size="small">预览</Button>
                        </Form.Item>
                        <Form.Item label="仓库工单模板">
                            <Select style={{ width: '250px' }}>
                                <Select.Option value="1">1</Select.Option>
                                <Select.Option value="2">2</Select.Option>
                            </Select>
                            <Button className="preview_btn" type="primary" shape="round" size="small">预览</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </>
    )
}

export default processConfigurationAdd