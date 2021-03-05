import React, { useRef, useReducer } from 'react'
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
import { ACTION_TYPE } from './typings'

export default function PartConfigurationAdd(props) {
    const [form] = Form.useForm()
    const inputRef = useRef(null)
    const [state, dispatch] = useReducer(dataSourceReducer, [])

    const columns = [
        { title: '母件编码', dataIndex: 'bom_a', key: 'bom_a', width: 100 },
        { title: '母件名称', dataIndex: 'bom_b', key: 'bom_b', width: 100 },
        { title: '规格型号', dataIndex: 'bom_c', key: 'bom_c', width: 100 },
        { title: '是否展开', dataIndex: 'bom_d', key: 'bom_d', width: 100 },
        { title: '部门名称', dataIndex: 'bom_e', key: 'bom_e', width: 100 },
        { title: '部门编码', dataIndex: 'bom_f', key: 'bom_f', width: 100 },
        { title: '默认成本', dataIndex: 'bom_g', key: 'bom_g', width: 100 },
        { title: '版本号', dataIndex: 'bom_h', key: 'bom_h', width: 100 },
        { title: '备注', dataIndex: 'bom_i', key: 'bom_i', width: 100 },
        { title: '子件编码', dataIndex: 'bom_j', key: 'bom_j', width: 100 },
        { title: '子件名称', dataIndex: 'bom_k', key: 'bom_k', width: 100 },
        { title: '规格型号', dataIndex: 'bom_l', key: 'bom_l', width: 100 },
        { title: '版本号', dataIndex: 'bom_m', key: 'bom_m', width: 100 },
        { title: '主计量', dataIndex: 'bom_n', key: 'bom_n', width: 100 },
        { title: '基本用量分子', dataIndex: 'bom_o', key: 'bom_o', width: 100 },
        { title: '基本用量分母', dataIndex: 'bom_p', key: 'bom_p', width: 100 },
        { title: '标准单间', dataIndex: 'bom_q', key: 'bom_q', width: 100 },
        { title: '标准物料成本', dataIndex: 'bom_r', key: 'bom_r', width: 100 },
        { title: '损耗率', dataIndex: 'bom_s', key: 'bom_s', width: 100 },
        { title: '存放仓库', dataIndex: 'bom_t', key: 'bom_t', width: 100 },
        { title: '库管员', dataIndex: 'bom_u', key: 'bom_u', width: 100 },
        { title: '用料车间', dataIndex: 'bom_v', key: 'bom_v', width: 100 },
        { title: '物料类型', dataIndex: 'bom_w', key: 'bom_w', width: 100 },
        { title: '替代标示', dataIndex: 'bom_x', key: 'bom_x', width: 100 },
        { title: '图片', dataIndex: 'bom_y', key: 'bom_y', width: 100 },
    ]

    const handleSave = () => {

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
                            <span className="bread-item">BOM 方案编辑</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="BOM 方案编辑"
                    extra={
                        <Space size={16}>
                            <Button shape="round" type="default" icon={<FolderOpenOutlined />} onClick={handleAdd}>导入方案</Button>
                            <input type="file" id="file" name="file" accept=".XLS" onChange={handleChange} ref={inputRef} style={{ display: 'none' }} />
                            <Button shape="round" type="primary" onClick={handleSave}>保存修改</Button>
                        </Space>
                    }
                >
                    <Form form={form} layout="inline">
                        <Form.Item label="BOM 方案名称" name="bom_name" className="form-item" style={{ width: '450px' }}>
                            <Input />
                        </Form.Item>
                    </Form>
                    <Divider />
                    <Table bordered scroll={{ x: 2500 }} columns={columns} dataSource={state} />
                </Card>
            </Space>
        </>
    )
}