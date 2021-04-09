import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Select } from 'antd'
import { getPositions } from '../../api/orderbook'

interface IProps {
    form: any,
    name: string
}

const PositionSelect: FC<IProps> = ({ form, name }) => {
    const [positions, updatePositions] = useState([])

    useEffect(() => {
        getPositions().then((res: any) => {
            if (res.code === 200) {
                updatePositions(res.data)
            }
        })
    }, [])

    const handleSelect = (value) => {
        let newVal = new Object
        newVal[name] = value
        form.setFieldsValue(newVal)
    }


    return (
        <>
            <Select
                style={{ width: '120px' }}
                allowClear
                value={form.getFieldValue(name)}
                onChange={handleSelect}
            >
                {
                    positions.length > 0 && positions.map((position) => (
                        <Select.Option value={position.Id} key={position.Id}>{position.Name}</Select.Option>
                    ))
                }
            </Select>
        </>
    )
}

export default PositionSelect