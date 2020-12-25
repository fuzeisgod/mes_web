import React, { useState } from 'react'
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
    Table
} from 'antd'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move';
import './form_configuration.less'
import { MenuOutlined } from '@ant-design/icons';
import {
    PreviewForm
} from '../../../components'

const data = [
    { key: 1, form_item_name: '表单子项1', index: 0 },
    { key: 2, form_item_name: '表单子项2', index: 1 },
    { key: 3, form_item_name: '表单子项3', index: 2 },
]

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

export default function FormConfiguration() {

    const DragHandle = sortableHandle(() => (
        <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
    ));

    const columns = [
        { dataIndex: 'sort', width: 50, className: 'drag-visible', render: () => <DragHandle /> },
        { title: '表单子项名称', dataIndex: 'form_item_name', className: 'drag-visible', },
        {
            title: '操作', render: () => (
                <Space size={16}>
                    <Button type="default" shape="round">编辑</Button>
                    <Button type="primary" shape="round" danger>删除</Button>
                </Space>
            )
        },
    ]

    const [dataSource, setDataSource] = useState(data)
    const [formItemProps, setFormItemProps] = useState([])
    const [basicOptions, setBasicOptions] = useState({})

    const [form1] = Form.useForm()
    const [form2] = Form.useForm()

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
            console.log('Sorted items: ', newData);
            setDataSource(newData)
        }
    };

    const DraggableBodyRow = ({ className, style, ...restProps }) => {
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };

    const DraggableContainer = props => (
        <SortableContainer
            useDragHandle
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
            {...props}
        />
    );

    // 表单基本配置提交
    const handleSaveOptions = () => {
        console.log(form1.getFieldsValue())
        let { form_name } = form1.getFieldsValue()
        setBasicOptions({
            ...basicOptions,
            form_name
        })
    }

    // 添加表单子项提交
    const handleAddItem = () => {
        console.log(form2.getFieldsValue())
        const {
            item_name,
            item_submit_type,
            item_is_required,
            item_is_readonly,
            item_span
        } = form2.getFieldsValue()
        setFormItemProps([
            ...formItemProps,
            {
                item_name,
                item_submit_type,
                item_is_required,
                item_is_readonly,
                item_span
            }
        ])
    }

    return (
        <>
            <Card
                title="表单配置"
                bodyStyle={{ padding: '2px 16px 14px 16px', background: '#fafafa' }}
                extra={<Button type="primary" shape="round">提交保存</Button>}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                            <Card
                                title="表单基本配置"
                                bodyStyle={{ padding: '12px 20px' }}
                                extra={<Button type='primary' shape="round" onClick={handleSaveOptions}>提交保存</Button>}
                            >
                                <Form
                                    layout="inline"
                                    form={form1}
                                >
                                    <Form.Item label="表单名称" name="form_name">
                                        <Input placeholder="请输入表单名称" />
                                    </Form.Item>
                                    <Form.Item label="所属岗位" name="belong_work">
                                        <Select style={{ width: '200px' }}>
                                            <Select.Option value="1">1</Select.Option>
                                            <Select.Option value="2">2</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="所属步骤" name="belong_step">
                                        <Select style={{ width: '200px' }}>
                                            <Select.Option value="1">1</Select.Option>
                                            <Select.Option value="2">2</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="表单简称" name="form_abbreviation">
                                        <Input placeholder="请输入表单简称" />
                                    </Form.Item>
                                </Form>
                            </Card>
                            <Card
                                title="新增表单子项"
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
                                >
                                    <Form.Item label="表单子项名称" name="item_name">
                                        <Input placeholder="请输入表单子项名称" />
                                    </Form.Item>
                                    <Form.Item label="表单子项输入形式" name="item_submit_type">
                                        <Select style={{ width: '200px' }}>
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
                                </Form>
                            </Card>
                            <Card
                                title="表单子项列表"
                                bodyStyle={{ padding: '0' }}
                            >
                                <Table
                                    pagination={false}
                                    columns={columns}
                                    dataSource={dataSource}
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
                                title="表单预览"
                                bodyStyle={{ padding: '0 25px 25px 25px' }}
                            >
                                <PreviewForm basicOptions={basicOptions} formItemProps={formItemProps} />
                            </Card>
                        </Space>
                    </Col>
                </Row>

            </Card>
        </>
    )
}
