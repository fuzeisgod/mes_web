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
            work_id: 123456,
            work_name: '表单名称1',
            work_man: '张三',
            work_time: '2020年1月1日'
        },
        {
            key: 2,
            work_id: 123456,
            work_name: '表单名称2',
            work_man: '张三',
            work_time: '2020年1月1日'
        },
        {
            key: 3,
            work_id: 123456,
            work_name: '表单名称3',
            work_man: '张三',
            work_time: '2020年1月1日'
        }
    ]

    const columns = [
        { title: '工单单号', dataIndex: 'work_id', key: 'work_id' },
        { title: '表单名称', dataIndex: 'work_name', key: 'work_name' },
        { title: '填写人员', dataIndex: 'work_man', key: 'work_man' },
        { title: '填写时间', dataIndex: 'work_time', key: 'work_time' }
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
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.work_name}</p>,
                    }}
                />
            </Card>
        </>
    )
}
