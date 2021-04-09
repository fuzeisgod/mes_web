import React, { useRef, useReducer, useEffect, useState, useMemo } from 'react'
import {
    Form,
    Card,
    Button,
    Space,
    Select,
    Table,
    Input,
    Divider,
    Breadcrumb,
    message
} from 'antd'
import {
    FolderOpenOutlined
} from '@ant-design/icons'
import './part_configuration_add.less'
import XLSX from 'xlsx'
import { getDataSource } from '../../../../tools/index'
import { dataSourceReducer } from './reducer'
import { ACTION_TYPE, MODE_TYPE } from './typings'
import { addBom, getBom } from '../../../../api/integratedconfig'
import { getSearchObj } from '../../../../tools/index'
import { useDeviceTypes } from '../../../../hooks'

export default function PartConfigurationAdd(props) {
    const [form] = Form.useForm()
    const inputRef = useRef(null)
    const [state, dispatch] = useReducer(dataSourceReducer, [])
    const [deviceTypes, updateDeviceTypes] = useDeviceTypes([])
    const [mode, updateMode] = useState<number>(-1)

    const columns = [
        { title: '母件编码 *(cpspcode)H', dataIndex: 'cpspcodeH', key: 'cpspcodeH', width: 100 },
        { title: '母件名称 *(cinvname)H', dataIndex: 'cinvnameH', key: 'cinvnameH', width: 100 },
        { title: '规格型号(cinvstd)H', dataIndex: 'cinvstdH', key: 'cinvstdH', width: 100 },
        { title: '是否展开(bexpand)H', dataIndex: 'bexpandH', key: 'bexpandH', width: 100 },
        { title: '部门名称(cdepname)H', dataIndex: 'cdepnameH', key: 'cdepnameH', width: 100 },
        { title: '部门编码(cdepcode)H', dataIndex: 'cdepcodeH', key: 'cdepcodeH', width: 100 },
        { title: '默认成本BOM(bmrcbbom)H', dataIndex: 'bmrcbbomH', key: 'bmrcbbomH', width: 100 },
        { title: '版本号(csocode)H', dataIndex: 'csocodeH', key: 'csocodeH', width: 100 },
        { title: '备注(cmemo)H', dataIndex: 'cmemoH', key: 'cmemoH', width: 100 },
        { title: '子件编码(cpscode)', dataIndex: 'cpscode', key: 'cpscode', width: 100 },
        { title: '子件名称(cinvname)', dataIndex: 'cinvname', key: 'cinvname', width: 100 },
        { title: '规格型号(cinvstd)', dataIndex: 'cinvstd', key: 'cinvstd', width: 150 },
        { title: '版本号(csocode)', dataIndex: 'csocode', key: 'csocode', width: 100 },
        { title: '主计量(ccomunitname)', dataIndex: 'ccomunitname', key: 'ccomunitname', width: 100 },
        { title: '基本用量分子(ipsquantity)', dataIndex: 'ipsquantity', key: 'ipsquantity', width: 200 },
        { title: '基本用量分母(tdqtyd)', dataIndex: 'tdqtyd', key: 'tdqtyd', width: 200 },
        { title: '标准单价(fbzdj)', dataIndex: 'fbzdj', key: 'fbzdj', width: 150 },
        { title: '标准物料成本(fbzwlcb)', dataIndex: 'fbzwlcb', key: 'fbzwlcb', width: 200 },
        { title: '损耗率%(iwasterate)', dataIndex: 'iwasterate', key: 'iwasterate', width: 100 },
        { title: '存放仓库(cwhname)', dataIndex: 'cwhname', key: 'cwhname', width: 100 },
        { title: '库管员(cpersonname)', dataIndex: 'cpersonname', key: 'cpersonname', width: 100 },
        { title: '用料车间(usedept)', dataIndex: 'usedept', key: 'usedept', width: 100 },
        { title: '物料类型(wiptype)', dataIndex: 'wiptype', key: 'wiptype', width: 100 },
        { title: '替代标示(replaceflag)', dataIndex: 'replaceflag', key: 'replaceflag', width: 100 },
        { title: '图片(ginvpicture)', dataIndex: 'ginvpicture', key: 'ginvpicture', width: 100 },
    ]

    const handleSave = () => {
        if (state.length === 0) return message.warn('请导入bom！')
        let { bom_name, device_type } = form.getFieldsValue()
        if (!bom_name || !device_type) return message.warn('类型或方案名称未填！')
        addBom({
            list: state,
            Name: bom_name,
            TypeId: device_type
        }).then((res: any) => {
            if (res.code === 200) {
                message.success(res.msg)
            }
        })
    }

    const handleAdd = () => {
        inputRef.current.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }

    const handleChange = () => {
        let file = inputRef.current.files[0]
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });
            var worksheet = workbook.Sheets[workbook.SheetNames[0]];
            var json = XLSX.utils.sheet_to_json(worksheet);
            let payload = getDataSource(json)
            dispatch({
                type: ACTION_TYPE.SET_DATA_SOURCE,
                payload
            })
            message.success('数据导入成功！')
        };
        if (file) {
            reader.readAsBinaryString(file);
        }
    }

    // prepare
    useEffect(() => {
        if (props.location.search) {
            let { bomprogrameId } = getSearchObj(props.location.search)
            if (bomprogrameId) {
                updateMode(MODE_TYPE.PREVIEW)
                getBom(bomprogrameId).then((res: any) => {
                    let n = res.data.map((item, index) => {
                        return {
                            ...item,
                            key: index
                        }
                    })
                    dispatch({
                        type: ACTION_TYPE.SET_DATA_SOURCE,
                        payload: n
                    })
                })
            }
        } else {
            updateMode(MODE_TYPE.CREATE)
        }
    }, [])

    /**
     * 
     * @param cb1 create 模式下的回调
     * @param cb2 preview 模式下的回调
     */
    const distinguish_mode = (cb1, cb2) => {
        if (mode === MODE_TYPE.CREATE) {
            return cb1()
        } else if (mode === MODE_TYPE.PREVIEW) {
            return cb2()
        }
    }

    const getTitle = useMemo(() => {
        return distinguish_mode(() => {
            return 'BOM 方案编辑'
        }, () => {
            return 'BOM 方案预览'
        })
    }, [mode])

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item" onClick={() => { props.history.go(-1) }}>零件 BOM 列表</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-item">{getTitle}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title={getTitle}
                    extra={
                        mode === 0 ?
                            <Space size={16}>
                                <Button shape="round" type="default" icon={<FolderOpenOutlined />} onClick={handleAdd}>导入方案</Button>
                                <input type="file" id="file" name="file" accept=".XLS" onChange={handleChange} ref={inputRef} style={{ display: 'none' }} />
                                <Button shape="round" type="primary" onClick={handleSave}>保存修改</Button>
                            </Space>
                            : null
                    }
                >
                    {
                        mode === 0 ?
                            <>
                                <Form form={form} layout="inline">
                                    <Form.Item label="设备类型" name="device_type" className="form-item">
                                        <Select style={{ width: '200px' }} allowClear>
                                            {
                                                deviceTypes.length > 0 && deviceTypes.map(deviceType => (
                                                    <Select.Option key={deviceType.Id} value={deviceType.Id}>{deviceType.Name + '(' + deviceType.MaterialCode + ')'}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="BOM 方案名称" name="bom_name" className="form-item" style={{ width: '450px' }}>
                                        <Input />
                                    </Form.Item>
                                </Form>
                                <Divider />
                            </>
                            : null
                    }
                    <Table bordered scroll={{ x: 2900 }} columns={columns} dataSource={state} />
                </Card>
            </Space>
        </>
    )
}