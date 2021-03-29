import React, { ReactNode, useRef, useState, useCallback, useEffect, useReducer } from 'react'
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
    Divider,
    InputNumber
} from 'antd'
import {
    PrinterTwoTone,
    PlusOutlined
} from '@ant-design/icons'
import './production_order_add_work.less'
import JsBarcode from 'jsbarcode'
import { getSearchObj, isIFrame } from '../../../tools'
import { productionOrderAddWorkReducer } from './reducer'
import { ACTION_TYPE } from './typings'
import { getDeviceTypes, getPlanList, addDevice } from '../../../api/product'

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
    const [form1] = Form.useForm()
    const [form2] = Form.useForm()
    const refBarContainer = useRef<HTMLCanvasElement>(null)
    const mainRef = useRef<HTMLDivElement>(null)
    const [isBarcodeExist, setIsBarcodeExist] = useState<boolean>(false)
    const [_state, dispatch] = useReducer(productionOrderAddWorkReducer, {
        count: 0,
        types: [],
        typeId: null,
        plans: []
    })

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

    const handleSave = () => {
        let { CreateTime, Name, PlanTime, ProgrammeId, TypeId } = form1.getFieldsValue()
        let { num } = form2.getFieldsValue()
        let { orderId } = getSearchObj(props.location.search)
        if (CreateTime && Name && PlanTime && ProgrammeId && TypeId && num) {
            addDevice({
                num,
                OrderID: orderId,
                Name,
                PlanTime,
                CreateTime,
                TypeId,
                ProgrammeId
            }).then((res: any) => {
                if (res.code === 200) message.success(res.msg)
            })
        } else {
            message.warning('信息未填写完整！')
        }
    }

    const customizeSelectNode = useCallback((originNode) => {
        console.log(originNode);
        return (
            <div>
                {originNode}
                <Divider style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', padding: 2 }}>
                    <Button type="primary" icon={<PlusOutlined />}>导入 BOM</Button>
                </div>
            </div>
        )
    }, [])

    const handleChange = (changedValues, allValues) => {
    }

    useEffect(() => {
        getDeviceTypes().then((res: any) => {
            if (res.code === 200) {
                dispatch({
                    type: ACTION_TYPE.SET_TYPES,
                    payload: res.data
                })
            }

        })
    }, [])

    useEffect(() => {
        if (_state.typeId) {
            getPlanList(_state.typeId).then((res: any) => {
                console.log(res)
                dispatch({
                    type: ACTION_TYPE.SET_PLANS,
                    payload: res.data
                })
            })
        }
    }, [_state.typeId])

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
                            <Button type="primary" shape="round" onClick={handleSave}>提交保存</Button>
                            <Button type="default" shape="round">取消</Button>
                        </Space>
                    }
                >
                    <Row gutter={16}>
                        <Col span={16}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Card title="基本信息" headStyle={{ fontWeight: 'bold' }} extra={<Button type="primary" shape="round" onClick={create_barcode}>生成条形码</Button>}>
                                    <Form
                                        layout="inline"
                                        form={form1}
                                        initialValues={{ product_count: 1 }}
                                        onValuesChange={(changedValues) => {
                                            if (changedValues.hasOwnProperty("TypeId")) {
                                                dispatch({
                                                    type: ACTION_TYPE.SET_TYPEID,
                                                    payload: parseInt(changedValues.TypeId)
                                                })
                                            }
                                        }}
                                    >

                                        <Form.Item label="设备类型" name="TypeId">
                                            <Select style={{ width: '200px' }}>
                                                {
                                                    _state.types.length > 0 && _state.types.map((type, index) => (
                                                        <Select.Option value={type.MaterialCode} key={index}>{type.Name + '(' + type.MaterialCode + ')'}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="产品名称" name="Name">
                                            <Input placeholder="请输入产品名称" />
                                        </Form.Item>
                                        <Form.Item label="开始时间" name="CreateTime">
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item label="计划完成时间" name="PlanTime">
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item label="综合方案选择" name="ProgrammeId">
                                            <Select style={{ width: '250px' }} placeholder="请先选择设备类型" disabled={!_state.typeId}>
                                                {
                                                    _state.plans.length > 0 && _state.plans.map((plan, index) => (
                                                        <Select.Option value={plan.TypeId} key="index">{plan.Name}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Card>
                                <Card
                                    title="设备属性"
                                    headStyle={{ fontWeight: 'bold' }}
                                >

                                </Card>
                            </Space>
                        </Col>
                        <Col span={8}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Card
                                    title="产品序列号"
                                >
                                    <Form
                                        form={form2}
                                        initialValues={{ num: 1 }}
                                        onValuesChange={handleChange}
                                    >
                                        <Form.Item label="产品数量" name="num">
                                            <InputNumber min={1} />
                                        </Form.Item>
                                    </Form>
                                </Card>
                                <Card
                                    title="条码生成区"
                                    extra={<Tooltip title="打印条形码" color="#40a9ff"><Button onClick={handlePrint} icon={<PrinterTwoTone />} shape="circle"></Button></Tooltip>}
                                    bodyStyle={{ minHeight: '150px', padding: 0, overflow: 'hidden', position: 'relative' }}
                                >
                                    <div className="bar-area" ref={mainRef}>
                                        <canvas ref={refBarContainer} className="barcode-container" />
                                    </div>
                                </Card>

                            </Space>
                        </Col>
                    </Row>
                </Card>
            </Space>
        </>
    )
}
