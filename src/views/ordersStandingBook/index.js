import React from 'react'
import {
    Card,
    Form,
    Button,
    DatePicker,
    Input,
    Select,
    Divider,
    Table
} from 'antd'


const { RangePicker } = DatePicker;

export default function OrdersStandingBook() {
    const search_work = (values) => {
        console.log(values)
    }

    const dataSource = [
        {
            key: 1,
            order_id: 123456,
            work_id: 123456,
            device_name: '局放',
            man_name: 'Chen',
            man_position: '安装',
            check_time: '2020年1月1日'
        },
        {
            key: 2,
            order_id: 123456,
            work_id: 123456,
            device_name: '局放',
            man_name: 'Chen',
            man_position: '安装',
            check_time: '2020年1月1日'
        },
        {
            key: 3,
            order_id: 123456,
            work_id: 123456,
            device_name: '局放',
            man_name: 'Chen',
            man_position: '安装',
            check_time: '2020年1月1日'
        }
    ]

    const columns = [
        { title: '订单编号', dataIndex: 'order_id', key: 'order_id' },
        { title: '工单单号', dataIndex: 'work_id', key: 'work_id' },
        { title: '设备名称', dataIndex: 'device_name', key: 'device_name' },
        { title: '填写人员', dataIndex: 'man_name', key: 'man_name' },
        { title: '岗位', dataIndex: 'man_position', key: 'man_position' },
        { title: '填写时间', dataIndex: 'check_time', key: 'check_time' }
    ]

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
                <Divider />
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{ '这里是工单' }</p>,
                    }}
                />
            </Card>
        </>
    )
}
