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
    Breadcrumb,
    message,
    DatePicker,
    InputNumber
} from 'antd'
import {
    PrinterTwoTone
} from '@ant-design/icons'
import './production_order_add_work.less'
import JsBarcode from 'jsbarcode'
import { getSearchObj, isIFrame } from '../../../tools'
import { productionOrderAddWorkReducer } from './reducer'
import { ACTION_TYPE, MODE_TYPE } from './typings'
import { getPlanList, addDevice, getDeviceInfoById, updateDevice, getDeviceTypeById } from '../../../api/product'
import moment from 'moment'
import { useDeviceTypes } from '../../../hooks'

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

export default function ProductionOrdersAddWork(props: any) {
    const [form1] = Form.useForm()
    const [form2] = Form.useForm()
    const refBarContainer = useRef<HTMLCanvasElement>(null)
    const [isBarcodeExist, setIsBarcodeExist] = useState<boolean>(false)
    const [deviceTypes, updateDeviceTypes] = useDeviceTypes([])
    const [_state, dispatch] = useReducer(productionOrderAddWorkReducer, {
        count: 0,
        typeId: null,
        plans: [],
        mode: 0,
        serialNo: 0,
        Id: 0
    })

    // 创建条形码
    const create_barcode = () => {
        console.log(_state.typeId)
        let target = null
        if (_state.typeId) {
            getDeviceTypeById(_state.typeId).then((res: any) => {
                console.log(res)
                if (res.code === 200) {
                    target = res.data[0] || null
                    let { productId, friendCode } = create_code(target)
                    if (!productId || !friendCode) return;
                    JsBarcode(refBarContainer.current, friendCode + productId, { ..._barcode_options, text: friendCode + ' ' + productId })
                    setIsBarcodeExist(true)
                }
            })
        }
    }

    // 创建code码
    const create_code = (target) => {
        let serial = form2.getFieldValue('serialNo') // 产品编号
        let year = form1.getFieldValue('CreateTime').format('YY') // 生产年份
        let month = parseInt(form1.getFieldValue('CreateTime').format('MM')).toString(16).toUpperCase() // 16 进制月

        let friendCode = target ? target.MaterialCode : null // 用友编码
        let productId = (serial && year && month) ? '22' + year + month + serial : null // 成品ID
        return { productId, friendCode }
    }

    // 打印事件
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
        let { orderId, SerialNo, Id, td } = getSearchObj(props.location.search)
        if (!CreateTime || !Name || !PlanTime || !ProgrammeId || !TypeId) {
            return message.warning('信息未填写完整！')
        }
        if (_state.mode === MODE_TYPE.CREATE) {
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
        } else if (_state.mode === MODE_TYPE.EDIT && orderId && SerialNo && Id && td) {
            updateDevice({
                Id,
                SerialNo,
                OrderID: orderId,
                Name,
                PlanTime,
                CreateTime,
                TerminalId: td,
                TypeId,
                ProgrammeId
            }).then((res: any) => {
                if (res.code === 200) message.success(res.msg)
            })
        }
    }

    // prepare work 2
    useEffect(() => {
        if (_state.typeId) {
            getPlanList(_state.typeId).then((res: any) => {
                dispatch({
                    type: ACTION_TYPE.SET_PLANS,
                    payload: res.data
                })
            })
        }
    }, [_state.typeId])

    // prepare work 1
    useEffect(() => {
        if (props.location.search) {
            let { SerialNo, Id } = getSearchObj(props.location.search)
            if (SerialNo && Id) {
                let _SerialNo = parseInt(SerialNo)
                let _Id = parseInt(Id)
                dispatch({
                    type: ACTION_TYPE.SET_MODE,
                    payload: {
                        type: MODE_TYPE.EDIT,
                        serialNo: _SerialNo,
                        Id: _Id
                    }
                })
            }
        }
    }, [])

    useEffect(() => {
        if (_state.mode !== MODE_TYPE.EDIT || _state.Id === 0) return;
        // edit mode
        getDeviceInfoById(_state.Id).then((res: any) => {
            let { TypeId, Name, CreateTime, PlanTime, ProgrammeId } = res.data[0]
            form1.setFieldsValue({
                TypeId,
                Name,
                CreateTime: moment(CreateTime),
                PlanTime: moment(PlanTime),
                ProgrammeId
            })
            dispatch({
                type: ACTION_TYPE.SET_TYPEID,
                payload: TypeId
            })
            form2.setFieldsValue({
                serialNo: _state.serialNo
            })
        })
    }, [_state.mode, _state.serialNo, _state.Id])

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
                            <span className="bread-item">{_state.mode === 0 ? "批次配置" : "产品配置"}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title={_state.mode === 0 ? "批次配置" : "产品配置"}
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
                                <Card title="基本信息" headStyle={{ fontWeight: 'bold' }}>
                                    <Form
                                        layout="inline"
                                        form={form1}
                                        initialValues={{ product_count: 1 }}
                                        onValuesChange={(changedValues) => {
                                            console.log(changedValues)
                                            if (changedValues.hasOwnProperty("TypeId")) {
                                                dispatch({
                                                    type: ACTION_TYPE.SET_TYPEID,
                                                    payload: parseInt(changedValues.TypeId)
                                                })
                                            }
                                        }}
                                    >

                                        <Form.Item label="产品类型" name="TypeId">
                                            <Select
                                                style={{ width: '200px' }}
                                                allowClear
                                            >
                                                {
                                                    deviceTypes.length > 0 && deviceTypes.map((deviceType) => (
                                                        <Select.Option value={deviceType.Id} key={deviceType.Id}>{deviceType.Name + '(' + deviceType.MaterialCode + ')'}</Select.Option>
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
                                            <Select style={{ width: '250px' }} placeholder="请先选择产品类型" disabled={_state.mode === 0 && !_state.typeId}>
                                                {
                                                    _state.plans.length > 0 && _state.plans.map((plan) => (
                                                        <Select.Option value={plan.Id} key={plan.Id}>{plan.Name}</Select.Option>
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
                                    extra={<Button type="primary" size="small" shape="round" onClick={create_barcode}>生成条形码</Button>}
                                >
                                    <Form
                                        form={form2}
                                        initialValues={{ num: 1 }}
                                    >
                                        {
                                            // create mode
                                            _state.mode === 0 ?
                                                <Form.Item label="产品数量" name="num">
                                                    <InputNumber min={1} />
                                                </Form.Item>
                                                : null
                                        }
                                        {
                                            // edit mode
                                            _state.mode === 1 ?
                                                <Form.Item label="产品序列号" name="serialNo">
                                                    <Input placeholder="请输入产品序列号" readOnly bordered={false} />
                                                </Form.Item>
                                                : null
                                        }
                                    </Form>
                                </Card>
                                <Card
                                    title="条码生成区"
                                    extra={<Tooltip title="打印条形码" color="#40a9ff"><Button onClick={handlePrint} icon={<PrinterTwoTone />} shape="circle"></Button></Tooltip>}
                                    bodyStyle={{ height: '150px', padding: 0, overflow: 'hidden', position: 'relative' }}
                                >
                                    <div className="bar-area">
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
