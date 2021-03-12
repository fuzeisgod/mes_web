import {
    Space,
    Breadcrumb,
    Card,
    Button,
    Form,
    Select,
    Input,
    Divider,
    Table
} from 'antd'
import './form_configuration.less'
import { getMouldList } from '../../../api/integratedconfig'
import { useEffect, useReducer } from 'react'
import { mouldListReducer } from './reducer'
import { ACTION_TYPE } from './typings'

export default function FormConfiguration(props) {
    const [form] = Form.useForm()

    const [state, dispatch] = useReducer(mouldListReducer, [])

    const handleAdd = () => {
        props.history.push('/' + 'my-userid' + '/fc/add')
    }

    const columns = [
        { title: '模板名称', dataIndex: 'mouldName', key: 'mouldName' },
        { title: '模板ID', dataIndex: 'typeId', key: 'typeId' },
        { title: '岗位', dataIndex: 'position', key: 'position' },
        { title: '设备类型', dataIndex: 'deviceType', key: 'deviceType' },
        {
            title: '操作', render: () => (
                <Space size={16}>
                    <Button type="primary" shape="round">编辑</Button>
                    <Button type="primary" shape="round" danger>删除</Button>
                </Space>
            )
        },
    ]


    const handleSearch = () => {

    }

    const expandedRowRender = (e) => {
        console.log(e)
        return <div>1</div>
    }

    useEffect(() => {
        getMouldList().then((res: any) => {
            if (res.code === 200) {
                let payload = res.data.map((item) => ({
                    ...item,
                    key: item.typeId
                }))
                dispatch({
                    type: ACTION_TYPE.SET_DATA_SOURCE,
                    payload: payload
                })
            }
        })
    }, [])

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item">工单模板列表</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="工单模板列表"
                    extra={
                        <Space size={16}>
                            {/* <Button shape="round" type="default" icon={<FolderOpenOutlined />}>导入方案</Button> */}
                            <Button shape="round" type="primary" onClick={handleAdd}>添加模板</Button>
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