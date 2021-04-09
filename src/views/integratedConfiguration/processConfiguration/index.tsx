import React, { useEffect, useState } from 'react'
import {
    Card,
    Button,
    Table,
    Space,
    Form,
    Select,
    Breadcrumb,
    Divider
} from 'antd'
import './process_configuration.less'
import { getProgrammeList } from '../../../api/integratedconfig'
import { useDeviceTypes } from '../../../hooks'

export default function ProcessConfiguration(props) {
    const [deviceTypes, updateDeviceTypes] = useDeviceTypes([])
    const [typeId, updateTypeId] = useState(null)
    const [programme, updateProgramme] = useState([])

    const columns = [
        { title: '方案名称', dataIndex: 'Name', key: 'Name' },
        { title: '设备类型', dataIndex: 'TypeName', key: 'TypeName' },
        { title: '生产工单模板', dataIndex: 'ProducerMouldName', key: 'ProducerMouldName' },
        { title: '质检工单模板', dataIndex: 'QualityInspectorMouldName', key: 'QualityInspectorMouldName' },
        { title: '仓库工单模板', dataIndex: 'GodownKeeperMouldName', key: 'GodownKeeperMouldName' },
        { title: 'bom模板', dataIndex: 'BomProgrammeName', key: 'BomProgrammeName' },
        {
            title: '操作', render: () => (
                <Space size={16}>
                    <Button size="small" shape="round" type="primary">编辑</Button>
                    <Button size="small" shape="round" type="default">预览</Button>
                    <Button size="small" shape="round" danger type="primary">删除</Button>
                </Space>
            )
        },
    ]

    const handleAdd = () => {
        props.history.push('/' + 'my-userid' + '/pc/add')
    }

    useEffect(() => {
        let _typeId = typeId || '';
        getProgrammeList(_typeId).then((res: any) => {
            if (res.code === 200) {
                let n = res.data.map(item => ({
                    ...item,
                    key: item.Id
                }))
                updateProgramme(n)
            }
        })
    }, [typeId])

    const handleChange = (changedFields) => {
        if (changedFields.typeId) updateTypeId(changedFields.typeId)
    }

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item">综合方案列表</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Card
                    title="综合方案"
                    headStyle={{ fontWeight: 'bold' }}
                    extra={
                        <Space size={16}>
                            <Button type="primary" shape="round" onClick={handleAdd}>创建新方案</Button>
                        </Space>
                    }
                >
                    <Form
                        layout="inline"
                        onValuesChange={handleChange}
                    >
                        <Form.Item label="选择设备类型" name="typeId">
                            <Select style={{ width: '200px' }} allowClear>
                                {
                                    deviceTypes.length > 0 && deviceTypes.map(deviceType => (
                                        <Select.Option key={deviceType.Id} value={deviceType.Id}>{deviceType.Name + '(' + deviceType.MaterialCode + ')'}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <Card
                        bodyStyle={{ padding: 0 }}
                        bordered={false}
                        headStyle={{ padding: 0, fontWeight: 'bold' }}
                    >
                        <Table bordered columns={columns} dataSource={programme}></Table>
                    </Card>

                </Card>
            </Space>
        </>
    )
}
