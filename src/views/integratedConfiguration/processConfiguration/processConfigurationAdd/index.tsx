import React, { FC, useEffect, useState } from 'react'
import {
    Space,
    Breadcrumb,
    Card,
    Button,
    Form,
    Select,
    Input,
    message
} from 'antd'
import './process_configuration_add.less'
import { getBomPropsByTypeId, getMouldByTypeIdAndPositionId, addProgramme, getProgrammeById, updateProgramme } from '../../../../api/integratedconfig'
import { useDeviceTypes } from '../../../../hooks'
import { getSearchObj } from '../../../../tools'

const ProcessConfigurationAdd = (props:any) => {
    const [deviceTypes, updateDeviceTypes] = useDeviceTypes([])
    const [boms, updateBoms] = useState([])
    const [products, updateProducts] = useState([])
    const [tests, updateTests] = useState([])
    const [stores, updateStores] = useState([])
    const [typeId, updateTypeId] = useState(null)
    const [form1] = Form.useForm()

    const handleChange = (changeField) => {
        if (Object.hasOwnProperty.call(changeField, 'typeId')) {
            updateTypeId(changeField.typeId || null)
        }
    }

    const handleSave = () => {
        let { name, typeId, bom, product, test, store } = form1.getFieldsValue()
        if (!name || !typeId || !bom || !product || !test || !store) return message.warn('信息未填写完整!')
        if (props.location.search) { // edit mode
            let { Id } = getSearchObj(props.location.search)
            updateProgramme({
                Id,
                Name: name,
                BomProgrammeId: bom,
                ProducerMouldId: product,
                QualityInspectorMouldId: test,
                GodownKeeperMouldId: store,
                TypeId: typeId
            }).then((res: any) => {
                if (res.code == 200) {
                    message.success(res.msg)
                }
            })
        } else { // create mode
            addProgramme({
                Name: name,
                BomProgrammeId: bom,
                ProducerMouldId: product,
                QualityInspectorMouldId: test,
                GodownKeeperMouldId: store,
                TypeId: typeId
            }).then((res: any) => {
                if (res.code == 200) {
                    message.success(res.msg)
                }
            })
        }
    }

    useEffect(() => {
        if (!typeId) return
        // bom
        getBomPropsByTypeId(typeId).then((res: any) => {
            if (res.code === 200) updateBoms(res.data)
        })
        // 生产 1
        getMouldByTypeIdAndPositionId(typeId, 1).then((res: any) => {
            if (res.code === 200) updateProducts(res.data)
        })
        // 质检 2
        getMouldByTypeIdAndPositionId(typeId, 2).then((res: any) => {
            if (res.code === 200) updateTests(res.data)
        })
        // 仓库 3
        getMouldByTypeIdAndPositionId(typeId, 3).then((res: any) => {
            if (res.code === 200) updateStores(res.data)
        })
    }, [typeId])

    useEffect(() => {
        if (props.location.search) {
            let { Id } = getSearchObj(props.location.search)
            Id && getProgrammeById(Id).then((res: any) => {
                console.log(res)
                if (res.code === 200) {
                    let { Name, TypeId, BomProgrammeId, ProducerMouldId, QualityInspectorMouldId, GodownKeeperMouldId } = res.data[0]
                    form1.setFieldsValue({
                        name: Name,
                        typeId: TypeId,
                        bom: BomProgrammeId,
                        product: ProducerMouldId,
                        test: QualityInspectorMouldId,
                        store: GodownKeeperMouldId
                    })
                    updateTypeId(TypeId)
                }
            })
        }
    }, [])

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
                            <Button type="primary" shape="round" onClick={handleSave}>提交保存</Button>
                        </Space>
                    }
                >
                    <Form form={form1} onValuesChange={handleChange}>
                        <Form.Item label="方案名称" name="name">
                            <Input placeholder="请输入方案名称" style={{ width: '250px' }} />
                        </Form.Item>
                        <Form.Item label="设备类型" name="typeId">
                            <Select style={{ width: '250px' }} allowClear>
                                {
                                    deviceTypes.length > 0 && deviceTypes.map(deviceType => (
                                        <Select.Option key={deviceType.Id} value={deviceType.Id}>{deviceType.Name + '(' + deviceType.MaterialCode + ')'}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <div className={typeId ? "warn-text hide-text" : "warn-text"}>请先选择设备类型</div>
                        <Form.Item label="BOM方案" name="bom">
                            <Select style={{ width: '250px' }} disabled={!typeId}>
                                {
                                    boms.length > 0 && boms.map(bom => (
                                        <Select.Option key={bom.Id} value={bom.Id}>{bom.Name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="生产工单模板" name="product">
                            <Select style={{ width: '250px' }} disabled={!typeId}>
                                {
                                    products.length > 0 && products.map(product => (
                                        <Select.Option key={product.Id} value={product.Id}>{product.Name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="质检工单模板" name="test">
                            <Select style={{ width: '250px' }} disabled={!typeId}>
                                {
                                    tests.length > 0 && tests.map(test => (
                                        <Select.Option key={test.Id} value={test.Id}>{test.Name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="仓库工单模板" name="store">
                            <Select style={{ width: '250px' }} disabled={!typeId}>
                                {
                                    stores.length > 0 && stores.map(store => (
                                        <Select.Option key={store.Id} value={store.Id}>{store.Name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </>
    )
}

export default ProcessConfigurationAdd