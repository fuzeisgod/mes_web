import React, { useEffect, useMemo, useReducer, useState } from 'react'
import {
    Card,
    Space,
    Row,
    Col,
    Button,
    Form,
    Input,
    Select,
    Switch,
    Table,
    message,
    Popconfirm,
    Breadcrumb,
    List
} from 'antd'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move';
import './form_configuration.less'
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import {
    PreviewForm
} from '../../../../components'
import { formOptionsReducer } from './reducer'
import { ACTION_TYPE } from './typings'
import { addMould } from '../../../../api/integratedconfig'
import { usePositions, useDeviceTypes } from '../../../../hooks'


const SortableItem = SortableElement(props => <tr {...props} />);
const SortableList = SortableContainer(props => <tbody {...props} />);
const { Option } = Select;

export default function FormConfigurationAdd(props) {
    const [positionList, updatePositionList] = usePositions([])
    const [deviceTypeList, updateDeviceTypeList] = useDeviceTypes([])
    const [needSelct, updateNeedSelect] = useState<boolean>(false)

    const DragHandle = SortableHandle(() => (
        <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
    ));

    const columns = [
        { dataIndex: 'sort', width: 50, className: 'drag-visible', render: () => <DragHandle /> },
        { title: '工单子项名称', dataIndex: 'item_name', className: 'drag-visible', },
        {
            title: '操作', width: 150, render: (text, record) => (
                <Space size={16}>
                    <Button type="default" size="small" shape="round" onClick={handleEditFormProps.bind(null, record)}>编辑</Button>
                    <Popconfirm
                        placement="right"
                        title="确定要删除该项？"
                        onConfirm={handleDeleteFormProps.bind(null, record)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="primary" size="small" shape="round" danger>删除</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    // reducer
    const [state, dispatch] = useReducer(formOptionsReducer, {
        basicOptions: {},
        formProps: [],
        formPropsIndex: 0
    })

    const [form1] = Form.useForm()
    const [form2] = Form.useForm()

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const newData = arrayMove([].concat(state.formProps), oldIndex, newIndex).filter(el => !!el);
            console.log('Sorted items: ', newData);
            dispatch({
                type: ACTION_TYPE.SET_FORM_PROPS,
                payload: newData
            })
        }
    };

    const DraggableBodyRow = ({ className, style, ...restProps }) => {
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = state.formProps.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };

    const DraggableContainer = props => (
        <SortableList
            useDragHandle
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
            {...props}
        />
    );

    const handleEditFormProps = () => {

    }

    const handleDeleteFormProps = (e) => {
        dispatch({
            type: ACTION_TYPE.DELETE_FORM_PROP,
            payload: e
        })
        message.info('工单项已删除！')
    }

    // 工单基本配置提交
    const handleSaveOptions = () => {
        let { form_name, belong_work, device_type } = form1.getFieldsValue()
        dispatch({
            type: ACTION_TYPE.SET_BASIC_OPTIONS,
            payload: {
                form_name,
                belong_work,
                device_type
            }
        })
    }

    // 添加工单子项提交
    const handleAddItem = () => {
        const {
            item_name,
            item_submit_type,
            item_is_required,
            item_is_readonly,
            item_span,
            item_select_items
        } = form2.getFieldsValue()
        if (item_name && item_submit_type && item_span) {
            dispatch({
                type: ACTION_TYPE.SET_FORM_PROPS,
                payload: [
                    ...state.formProps,
                    {
                        item_name,
                        item_submit_type,
                        item_is_required,
                        item_is_readonly,
                        item_span,
                        item_select_items,
                        key: state.formPropsIndex,
                        index: state.formPropsIndex
                    }
                ]
            })
            dispatch({
                type: ACTION_TYPE.ADD_FORM_PROPS_INDEX
            })
        } else {
            message.warning("必要信息未填！")
        }
    }

    const handleSaveFormModel = () => {
        if (!state.basicOptions.form_name || !state.basicOptions.belong_work || !state.basicOptions.device_type) return message.warn('工单基本配置未填写完整或未保存！')
        if (state.formProps.length === 0) return message.warn('尚未添加工单子项！')
        addMould({
            Name: state.basicOptions.form_name,
            TypeId: state.basicOptions.device_type,
            PositionId: state.basicOptions.belong_work,
            Mould: JSON.stringify(state)
        }).then((res: any) => {
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
            }
        })
    }

    const handleChange = (changedValues) => {
        if (Object.hasOwnProperty.call(changedValues, 'item_submit_type')) {
            console.log(changedValues)
            const { item_submit_type } = changedValues
            if (item_submit_type === 'select') {
                return updateNeedSelect(true)
            }
            updateNeedSelect(false)
        }
    }

    return (
        <>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div className="bread-area">
                    <div style={{ paddingRight: '5px' }}>当前路径：</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <span className="bread-item" onClick={() => { props.history.go(-1) }}>工单模板列表</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span className="bread-item">工单配置</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Card
                    title="工单配置"
                    bodyStyle={{ padding: '2px 16px 14px 16px', background: '#fafafa' }}
                    extra={<Button type="primary" shape="round" onClick={handleSaveFormModel}>提交保存</Button>}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Card
                                    title="工单基本配置"
                                    bodyStyle={{ padding: '12px 20px' }}
                                    extra={<Button type='primary' shape="round" onClick={handleSaveOptions}>提交保存</Button>}
                                >
                                    <Form
                                        layout="inline"
                                        form={form1}
                                    >
                                        <Form.Item label="工单名称" name="form_name">
                                            <Input placeholder="请输入工单名称" />
                                        </Form.Item>
                                        <Form.Item label="所属岗位" name="belong_work">
                                            <Select style={{ width: '200px' }}>
                                                {
                                                    positionList.length > 0 && positionList.map(position => (
                                                        <Select.Option key={position.Id} value={position.Id}>{position.Name}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="所属设备类型" name="device_type">
                                            <Select style={{ width: '200px' }}>
                                                {
                                                    deviceTypeList.length > 0 && deviceTypeList.map(deviceType => (
                                                        <Select.Option key={deviceType.Id} value={deviceType.Id}>{deviceType.Name + '(' + deviceType.MaterialCode + ')'}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Card>
                                <Card
                                    title="新增工单子项"
                                    bodyStyle={{ padding: '12px 20px' }}
                                    extra={<Button type="primary" shape="round" onClick={handleAddItem}>添加子项</Button>}
                                >
                                    <Form
                                        form={form2}
                                        layout="inline"
                                        initialValues={{
                                            ['item_is_required']: true,
                                            ['item_is_readonly']: false
                                        }}
                                        onValuesChange={handleChange}
                                    >
                                        <Form.Item label="工单子项名称" name="item_name">
                                            <Input placeholder="请输入工单子项名称" />
                                        </Form.Item>
                                        <Form.Item label="工单子项输入形式" name="item_submit_type">
                                            <Select style={{ width: '200px' }} allowClear>
                                                <Select.Option value="input">文字输入</Select.Option>
                                                <Select.Option value="select">下拉选择</Select.Option>
                                                <Select.Option value="upload">图片上传</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="是否必填" name="item_is_required" valuePropName="checked">
                                            <Switch />
                                        </Form.Item>
                                        <Form.Item label="是否只读" name="item_is_readonly" valuePropName="checked">
                                            <Switch />
                                        </Form.Item>
                                        <Form.Item label="子项所占行距" name="item_span">
                                            <Select style={{ width: '200px' }}>
                                                <Select.Option value="8">1/3 行</Select.Option>
                                                <Select.Option value="12">1/2 行</Select.Option>
                                                <Select.Option value="24">1 行</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        {
                                            needSelct ?
                                                <Form.Item label="下拉选项" name="item_select_items" style={{ width: '400px' }}>
                                                    <Select mode="tags" style={{ width: '100%' }} placeholder="请输入选项后回车确认">
                                                    </Select>
                                                </Form.Item>
                                                : null
                                        }
                                    </Form>
                                </Card>
                                <Card
                                    title="工单子项列表"
                                    bodyStyle={{ padding: '0' }}
                                >
                                    <Table
                                        pagination={false}
                                        columns={columns}
                                        dataSource={state.formProps}
                                        rowKey="index"
                                        bordered
                                        components={{
                                            body: {
                                                wrapper: DraggableContainer,
                                                row: DraggableBodyRow,
                                            },
                                        }}
                                    />
                                </Card>
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Card
                                    title="工单预览"
                                    bodyStyle={{ padding: '0 25px 25px 25px' }}
                                >
                                    <PreviewForm basicOptions={state.basicOptions} formItemProps={state.formProps} />
                                </Card>
                            </Space>
                        </Col>
                    </Row>

                </Card>
            </Space>
        </>
    )
}
