import {
    Card,
    Form,
    DatePicker,
    Input,
    Select,
    Button,
    Divider,
    Space,
    Table,
    Breadcrumb
} from 'antd'
import {
    FilterTwoTone
} from '@ant-design/icons'
import moment from 'moment'
import React from 'react'
import './check_form.less'

const { RangePicker } = DatePicker

const CheckFormData = [
    { key: '1', check_form_id: 123456, order_number: 'GD202001060001', device_ID: '02020103', device_type: '智能防盗型保护接地箱（直立式）无监测', device_count: 10, response_man: '张三', post_time: '2021-03-11', check_man: '李四', check_time: "2020-03-12", status: '已送检' },
    { key: '2', check_form_id: 123455, order_number: 'GD202001060001', device_ID: '02020103', device_type: '智能防盗型保护接地箱（直立式）无监测', device_count: 10, response_man: '张三', post_time: '2021-03-12', check_man: '李四', check_time: "2020-03-12", status: '待确认' }
]

const CheckForm = (props) => {
    const columns = [
        { title: '送检单ID', dataIndex: 'check_form_id', key: 'check_form_id', width: 100 },
        { title: '生产订单号', dataIndex: 'order_number', key: 'order_number', width: 150 },
        { title: '产品料号', dataIndex: 'device_ID', key: 'device_ID', width: 100 },
        { title: '产品类型', dataIndex: 'device_type', key: 'device_type', width: 300 },
        { title: '产品数量', dataIndex: 'device_count', key: 'device_count', width: 100 },
        { title: '生产人员', dataIndex: 'response_man', key: 'response_man', width: 100 },
        { title: '上传时间', dataIndex: 'post_time', key: 'post_time', width: 150 },
        { title: '确认人员', dataIndex: 'check_man', man: 'check_man', width: 100 },
        { title: '确认时间', dataIndex: 'check_time', key: 'check_time', width: 150 },
        {
            title: '状态', dataIndex: 'status', key: 'status', filters: [
                {
                    text: '已送检',
                    value: '已送检',
                },
                {
                    text: '待确认',
                    value: '待确认',
                },
            ],
            filterMultiple: false,
            filterIcon: <FilterTwoTone style={{ fontSize: '15px' }} />,
            onFilter: (value, record) => record.status === value,
            width: 100,
            fixed: 'right' as 'right',
            render: (text, record) => {
                return (
                    <div style={record.status === '已送检' ? { color: "green" } : { color: "red" }}>{record.status}</div>
                )
            }
        },
        {
            title: '操作', width: 100, fixed: 'right' as 'right', render: (text, record) => {
                return (
                    <Button type="primary" size="small" shape="round" onClick={handleCheck.bind(null, record)}>查看</Button>
                )
            }
        },
    ]

    const handleCheck = (record) => {
        props.history.push(`/:userID/cf/check/${record.check_form_id}`)
    }

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item">送检单台账</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card title="送检单台账" headStyle={{ fontWeight: 'bold' }}>
                    <Form layout="inline">
                        <Form.Item label="生产订单编号" name="order_num">
                            <Input placeholder="请输入生产订单编号" />
                        </Form.Item>
                        <Form.Item label="订单时间" name="order_time">
                            <RangePicker
                                ranges={{
                                    '今天': [moment(), moment()],
                                    '本月': [moment().startOf('month'), moment().endOf('month')],
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <Table scroll={{ x: 1450 }} bordered columns={columns} dataSource={CheckFormData}></Table>
                </Card>

            </Space>
        </>
    )
}

export default CheckForm