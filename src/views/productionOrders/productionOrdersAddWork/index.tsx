import React, { ReactNode, useRef, useState, useCallback } from 'react'
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
    Breadcrumb,
    message,
    DatePicker,
    Divider
} from 'antd'
import {
    PrinterTwoTone,
    PlusOutlined
} from '@ant-design/icons'
import './production_order_add_work.less'
import JsBarcode from 'jsbarcode'
import { isIFrame } from '../../../tools'

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
    const refBarContainer = useRef<HTMLCanvasElement>(null)
    const mainRef = useRef<HTMLDivElement>(null)
    const [isBarcodeExist, setIsBarcodeExist] = useState<boolean>(false)

    const create_barcode = (values) => {
        JsBarcode(refBarContainer.current, '020201112220A001', { ..._barcode_options, text: '02020111 2220A001' })
        setIsBarcodeExist(true)
    }

    const handlePrint = () => {
        // 判断是否生成条码
        if (!isBarcodeExist) {
            message.warning('请生成条形码！');
            return true;
        }

        const mainCanvas = refBarContainer.current

        // 将 canvas 转为图片
        const mainImg = new Image()
        const mainImgSrc = mainCanvas.toDataURL('image/png')
        mainImg.src = mainImgSrc

        // 图片加载完成后
        mainImg.onload = () => {
            var iframe = document.getElementById("print-iframe");
            if (!iframe) {
                iframe = document.createElement('IFRAME');
                var doc = null;
                iframe.setAttribute("id", "print-iframe");
                iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
                document.body.appendChild(iframe);
                doc = (iframe as HTMLIFrameElement).contentWindow.document;
                //这里可以自定义样式
                //doc.write("<LINK rel="stylesheet" type="text/css" href="css/print.css">");
                doc.write("<img src='" + mainImgSrc + "' />");
                doc.close();
                (iframe as HTMLIFrameElement).contentWindow.focus();
            }

            (iframe as HTMLIFrameElement).contentWindow.print();
            if (navigator.userAgent.indexOf("MSIE") > 0) {
                document.body.removeChild(iframe);
            }
        }
    }

    const customizeSelectNode = useCallback((originNode) => {
        console.log(originNode);
        return (
            <div>
                {originNode}
                <Divider style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent:'center', padding: 2 }}>
                    <Button type="primary" icon={<PlusOutlined />}>导入 BOM</Button>
                </div>
            </div>
        )
    }, [])

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
                            <span className="bread-item" onClick={() => { props.history.go(-1) }}>生产订单编辑</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-item">产品配置</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="产品配置"
                    bodyStyle={{ padding: '2px 16px 14px 16px', background: '#fafafa' }}
                    headStyle={{ fontWeight: 'bold' }}
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
                                <Card title="基本信息" headStyle={{ fontWeight: 'bold' }} extra={<Button type="primary" shape="round" onClick={create_barcode}>生成条形码</Button>}>
                                    <Form
                                        layout="inline"
                                    >
                                        <Form.Item label="产品序列号" name="device_id">
                                            <Input placeholder="请输入产品序列号" />
                                        </Form.Item>
                                        <Form.Item label="产品料号" name="friend_id">
                                            <Input placeholder="请输入产品料号" />
                                        </Form.Item>

                                        <Form.Item label="产品名称" name="device_name">
                                            <Input placeholder="请输入产品名称" />
                                        </Form.Item>
                                        <Form.Item label="开始时间" name="device_start_time">
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item label="计划完成时间" name="device_finish_time">
                                            <DatePicker />
                                        </Form.Item>
                                    </Form>
                                </Card>
                                <Card
                                    title="设备属性"
                                    headStyle={{ fontWeight: 'bold' }}
                                >
                                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                        <Form
                                            form={form}
                                            // layout="inline"
                                            initialValues={{ have_position: ['1', '2', '3', '4', '5', '6'] }}
                                        >
                                            <Form.Item
                                                label="包含岗位"
                                                name="have_position"
                                            >
                                                <Select
                                                    mode="multiple"
                                                    allowClear
                                                    style={{ width: '500px' }}
                                                    placeholder="请选择此设备包含岗位"
                                                >
                                                    <Select.Option value="1">装配</Select.Option>
                                                    <Select.Option value="2">调试</Select.Option>
                                                    <Select.Option value="3">质检</Select.Option>
                                                    <Select.Option value="4">仓库</Select.Option>
                                                    <Select.Option value="5">安装</Select.Option>
                                                    <Select.Option value="6">运维</Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item label="零部件 BOM 方案" name="device_bom">
                                                <Select style={{ width: '130px' }} dropdownRender={customizeSelectNode}>
                                                    <Select.Option value="1">BOM 方案一</Select.Option>
                                                    <Select.Option value="2">BOM 方案二</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Form>
                                    </Space>
                                </Card>
                            </Space>
                        </Col>
                        <Col span={6}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Card
                                    title="条码生成区"
                                    extra={<Tooltip title="打印条形码" color="#40a9ff"><Button onClick={handlePrint} icon={<PrinterTwoTone />} shape="circle"></Button></Tooltip>}
                                    bodyStyle={{ minHeight: '150px', padding: 0, overflow: 'hidden', position: 'relative' }}
                                >
                                    <div className="bar-area" ref={mainRef}>
                                        <canvas ref={refBarContainer} className="barcode-container" />
                                    </div>
                                </Card>
                                <Card
                                    title="零部件 BOM 方案预览"
                                >

                                </Card>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            </Space>
        </>
    )
}
