import React from 'react'
import {
    Card,
    Form,
    Button,
    DatePicker,
    Input,
    Select
} from 'antd'


const { RangePicker } = DatePicker;

export default function OrdersStandingBook() {
    const search_work = (values) => {
        console.log(values)
    }

    return (
        <>
            <Card>
                <Form
                    layout="inline"
                    onFinish={search_work}
                >
                    <Form.Item label="时间范围">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item label="工单单号">
                        <Input placeholder="请输入工单单号" />
                    </Form.Item>
                    <Form.Item label="员工姓名">
                        <Select style={{ width: '120px' }}>
                            <Select.Option value="zhangsan">张三</Select.Option>
                            <Select.Option value="lisi">李四</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="工作岗位">
                        <Select style={{ width: '120px' }}>
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="订单查询">
                        <Input placeholder="请输入订单单号" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}
