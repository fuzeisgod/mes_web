import React from 'react'
import {
    Divider,
    Input,
    Select,
    Image
} from 'antd'
import './preview_form.less'

export default function PreviewForm(props: any) {
    console.log(props)
    return (
        <>
            <div className="form_title">{props.basicOptions.form_name || '工单名称'}</div>
            <Divider />
            <div className="form_content">
                {
                    props.formItemProps.map((itemProps: any, index: number) => (
                        <div className="form_item" key={index} style={
                            (() => {
                                switch (itemProps.item_span) {
                                    case '8':
                                        return { width: '33.33%' }
                                    case '12':
                                        return { width: '50%' }
                                    case '24':
                                        return { width: '100%' }
                                }
                            })()
                        }>
                            <div className={itemProps.item_submit_type === 'upload' ? 'form_item_area_pic' : 'form_item_area'}>
                                <div className="form_item_label">{itemProps.item_name}:</div>
                                <div className="form_item_input">
                                    {
                                        (() => {
                                            switch (itemProps.item_submit_type) {
                                                case 'input':
                                                    return <Input />
                                                case 'select':
                                                    return (
                                                        <Select style={{ width: '100%' }}>
                                                            {
                                                                itemProps.item_select_items.map((item, index) => (
                                                                    <Select.Option key={index} value={index}>{item}</Select.Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    )
                                                case 'upload':
                                                    return (
                                                        <Image
                                                            width={150}
                                                            height={150}
                                                            src="error"
                                                        />
                                                    )
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
