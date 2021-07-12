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
import { PartTable } from '../../../../components'

export default function PartConfigurationAdd(props:any) {
    const [form] = Form.useForm()
    const inputRef = useRef(null)
    const [state, dispatch] = useReducer(dataSourceReducer, [])
    const [deviceTypes, updateDeviceTypes] = useDeviceTypes([])
    const [mode, updateMode] = useState<number>(null)

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
                    <PartTable dataSource={state} />
                </Card>
            </Space>
        </>
    )
}