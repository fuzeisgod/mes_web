import React, { useRef } from 'react'
import {
    Card,
    Button,
    Row,
    Col,
    Form,
    Select,
    Space,
    Tooltip,
    Input,
    Table,
    List,
    Breadcrumb
} from 'antd'
import {
    PrinterTwoTone,
    PlusOutlined
} from '@ant-design/icons'
import './production_order_add_work.less'
import * as JsBarcode from 'jsbarcode'

const _barcode_options = {
    format: "CODE128",//选择要使用的条形码类型
    width: 3,//设置条之间的宽度
    height: 100,//高度
    displayValue: true,//是否在条形码下方显示文字
    fontOptions: 'bold',// 设置字体加粗
    textAlign: "middle",//设置文本的水平对齐方式
    textPosition: "bottom",//设置文本的垂直位置
    textMargin: 5,//设置条形码和文本之间的间距
    fontSize: 22,//设置文本的大小
    background: "#eee",//设置条形码的背景
    margin: 25//设置条形码周围的空白边距
}

export default function ProductionOrdersAddWork(props) {
    const [form] = Form.useForm()
    const refBarContainer = useRef(null)

    const create_barcode = (values) => {
        console.log(values)
        JsBarcode(refBarContainer.current, '020201112220A001', { ..._barcode_options, text: '02020111 2220A001' })
    }

    const columns = [
        {
            title: '零件名称',
            dataIndex: 'part_name',
            key: 'part_name',
        },
        {
            title: '零件ID',
            dataIndex: 'part_id',
            key: 'part_id',
        },
        {
            title: '领料数量',
            dataIndex: 'part_amount',
            key: 'part_amount',
        },
        {
            title: '领料时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '领料人',
            dataIndex: 'man_name',
            key: 'man_name',
        },
        {
            title: '操作',
            render: () => (
                <Button type="primary" danger shape="round">删除</Button>
            )
        }
    ];

    const dataSource = [
        { key: 1, part_name: '零件a', part_id: '123', part_amount: 5, time: '2020年12月1日', man_name: '张三' },
        { key: 2, part_name: '零件b', part_id: '321', part_amount: 5, time: '2020年12月1日', man_name: '李四' },
        { key: 3, part_name: '零件c', part_id: '000', part_amount: 6, time: '2020年12月1日', man_name: '王五' }
    ]

    const listData = [
        '零件a',
        '零件b',
        '零件c',
        '零件d'
    ]

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <span className="bread-item" onClick={() => { props.history.go(-2) }}>生产订单列表</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-item" onClick={() => { props.history.go(-1) }}>订单编辑</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-item">工单编辑</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="工单配置"
                    extra={
                        <Space size={16}>
                            <Button type="primary" shape="round">提交保存</Button>
                            <Button type="default" shape="round">取消</Button>
                        </Space>
                    }
                >
                    <Row gutter={16}>
                        <Col span={18}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Card>
                                    <Form
                                        layout="inline"
                                        onFinish={create_barcode}
                                    >
                                        <Form.Item label="设备类别" name="device_type">
                                            <Select style={{ width: '120px' }}>
                                                <Select.Option value="1">1</Select.Option>
                                                <Select.Option value="2">2</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                生成
                                        </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                                <Card
                                    title="设备属性"
                                >
                                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                        <Form
                                            form={form}
                                            layout="inline"
                                        >
                                            <Form.Item label="用友编号" name="work_id">
                                                <Input placeholder="请输入用友编号" />
                                            </Form.Item>
                                        </Form>
                                        <Card
                                            title="设备零部件清单"
                                            bodyStyle={{ padding: 0 }}
                                            bordered={false}
                                            headStyle={{ padding: 0 }}
                                        >
                                            <Table columns={columns} dataSource={dataSource} bordered />
                                        </Card>
                                    </Space>
                                </Card>
                            </Space>
                        </Col>
                        <Col span={6}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Card
                                    title="条码生成区"
                                    extra={<Tooltip title="打印条形码" color="#40a9ff"><Button icon={<PrinterTwoTone />} shape="circle"></Button></Tooltip>}
                                    bodyStyle={{ minHeight: '150px', padding: 0, overflow: 'hidden', position: 'relative' }}
                                >
                                    <canvas ref={refBarContainer} className="barcode-container" />
                                </Card>
                                <Card
                                    title="零部件列表"
                                    bodyStyle={{ padding: 0 }}
                                >
                                    <List
                                        size="small"
                                        dataSource={listData}
                                        renderItem={item => (
                                            <List.Item actions={[<Button type="ghost" shape="circle" icon={<PlusOutlined />}></Button>]}>
                                                {item}
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            </Space>
        </>
    )
}
