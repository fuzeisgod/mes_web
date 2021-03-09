import React, { useEffect, useReducer, useState } from 'react'
import './part_configuration.less'
import {
    Form,
    Card,
    Button,
    Space,
    Select,
    Table,
    Input,
    Divider,
    Breadcrumb
} from 'antd'
import {
    FolderOpenOutlined
} from '@ant-design/icons'
import { getBomList } from '../../../api/integratedconfig'
import { dataSourceReducer } from './reducer'
import { ACTION_TYPE } from './typings'

export default function DeviceConfiguration(props) {
    const [form] = Form.useForm()
    const [sProjectName, setSProjectName] = useState<string>("")
    const [sCpspcode, setSCpspcode] = useState<string>("")
    const [state, dispatch] = useReducer(dataSourceReducer, [])

    const columns = [
        { title: '方案名称', dataIndex: 'customizename', key: 'customizename' },
        { title: '母件编码', dataIndex: 'cpspcodeH', key: 'cpspcodeH' },
        {
            title: '操作', render: () => (
                <Space size={16}>
                    <Button type="primary" shape="round">编辑</Button>
                    <Button type="primary" shape="round" danger>删除</Button>
                </Space>
            )
        },
    ]

    const expandedRowRender = (e) => {
        console.log(e)
        const columns = [
            // { title: '母件编码 *(cpspcode)H', dataIndex: 'cpspcodeH', key: 'cpspcodeH', width: 100 },
            // { title: '母件名称 *(cinvname)H', dataIndex: 'cinvnameH', key: 'cinvnameH', width: 100 },
            // { title: '规格型号(cinvstd)H', dataIndex: 'cinvstdH', key: 'cinvstdH', width: 100 },
            // { title: '是否展开(bexpand)H', dataIndex: 'bexpandH', key: 'bexpandH', width: 100 },
            // { title: '部门名称(cdepname)H', dataIndex: 'cdepnameH', key: 'cdepnameH', width: 100 },
            // { title: '部门编码(cdepcode)H', dataIndex: 'cdepcodeH', key: 'cdepcodeH', width: 100 },
            // { title: '默认成本BOM(bmrcbbom)H', dataIndex: 'bmrcbbomH', key: 'bmrcbbomH', width: 100 },
            // { title: '版本号(csocode)H', dataIndex: 'csocodeH', key: 'csocodeH', width: 100 },
            // { title: '备注(cmemo)H', dataIndex: 'cmemoH', key: 'cmemoH', width: 100 },
            { title: '子件编码(cpscode)', dataIndex: 'cpscode', key: 'cpscode', width: 100 },
            { title: '子件名称(cinvname)', dataIndex: 'cinvname', key: 'cinvname', width: 100 },
            { title: '规格型号(cinvstd)', dataIndex: 'cinvstd', key: 'cinvstd', width: 150 },
            // { title: '版本号(csocode)', dataIndex: 'csocode', key: 'csocode', width: 100 },
            { title: '主计量(ccomunitname)', dataIndex: 'ccomunitname', key: 'ccomunitname', width: 100 },
            { title: '基本用量分子(ipsquantity)', dataIndex: 'ipsquantity', key: 'ipsquantity', width: 200 },
            { title: '基本用量分母(tdqtyd)', dataIndex: 'tdqtyd', key: 'tdqtyd', width: 200 },
            // { title: '标准单价(fbzdj)', dataIndex: 'fbzdj', key: 'fbzdj', width: 150 },
            // { title: '标准物料成本(fbzwlcb)', dataIndex: 'fbzwlcb', key: 'fbzwlcb', width: 200 },
            // { title: '损耗率%(iwasterate)', dataIndex: 'iwasterate', key: 'iwasterate', width: 100 },
            // { title: '存放仓库(cwhname)', dataIndex: 'cwhname', key: 'cwhname', width: 100 },
            // { title: '库管员(cpersonname)', dataIndex: 'cpersonname', key: 'cpersonname', width: 100 },
            // { title: '用料车间(usedept)', dataIndex: 'usedept', key: 'usedept', width: 100 },
            // { title: '物料类型(wiptype)', dataIndex: 'wiptype', key: 'wiptype', width: 100 },
            // { title: '替代标示(replaceflag)', dataIndex: 'replaceflag', key: 'replaceflag', width: 100 },
            // { title: '图片(ginvpicture)', dataIndex: 'ginvpicture', key: 'ginvpicture', width: 100 },
        ]

        return <Table bordered={true} columns={columns} dataSource={[e]} pagination={false} />;
    }

    const handleAdd = () => {
        props.history.push('/' + 'my-userid' + '/dc/add')
    }

    const handleSearch = (values) => {
        let { bom_name, device_type } = values;
        if (bom_name) setSProjectName(bom_name)
        if (device_type) setSCpspcode(device_type)
    }

    useEffect(() => {
        console.log('effct')
        getBomList({ projectName: sProjectName, cpspcode: sCpspcode }).then((res: any) => {
            console.log(res)
            if (res.code === 200) {
                let payload = res.data.map((item, index) => ({
                    ...item,
                    key: index
                }))
                dispatch({ type: ACTION_TYPE.SET_DATA_SOURCE, payload })
            }
        })
    }, [sProjectName, sCpspcode])

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item">零件 BOM 列表</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="零件 BOM 列表"
                    extra={
                        <Space size={16}>
                            {/* <Button shape="round" type="default" icon={<FolderOpenOutlined />}>导入方案</Button> */}
                            <Button shape="round" type="primary" onClick={handleAdd}>添加 BOM</Button>
                        </Space>
                    }
                >
                    <Form form={form} layout="inline" onFinish={handleSearch}>
                        <Form.Item label="设备类型" name="device_type" className="form-item">
                            <Select style={{ width: '400px' }}>
                                <Select.Option value="02020103">智能防盗型保护接地箱（直立式）无监测(02020103)</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="方案名称" name="bom_name" className="form-item">
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                查询
                        </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <Card
                        headStyle={{ fontWeight: 'bold', padding: 0 }}
                        bodyStyle={{ padding: 0 }}
                        bordered={false}
                    >
                        <Table bordered columns={columns} dataSource={state} expandable={{ expandedRowRender }} />
                    </Card>
                </Card>
            </Space>
        </>
    )
}
