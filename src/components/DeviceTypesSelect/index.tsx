import React, { FC, useEffect, useState } from 'react'
import { Select } from 'antd'
import { getDeviceTypes } from '../../api/product'

interface IProps {
    form: any,
    name: string,
    dispatch?: any
}

const DeviceTypesSelect: FC<IProps> = ({ form, name, dispatch }) => {
    const [deviceTypes, updateDeviceTypes] = useState([])

    useEffect(() => {
        getDeviceTypes().then((res: any) => {
            if (res.code === 200) {
                updateDeviceTypes(res.data)
            }
        })
    }, [])

    const handleSelect = (value) => {
        let newVal = new Object
        newVal[name] = value
        form.setFieldsValue(newVal)
        if (dispatch) {
            dispatch(value)
        }
    }

    useEffect(() => {
        let val = form.getFieldValue(name)
        if (val && dispatch) {
            dispatch(val)
        }
    }, [form.getFieldValue(name)])


    return (
        <Select
            style={{ width: '200px' }}
            allowClear
            value={form.getFieldValue(name)}
            onChange={handleSelect}
        >
            {
                deviceTypes.length > 0 && deviceTypes.map((deviceType) => (
                    <Select.Option value={deviceType.Id} key={deviceType.Id}>{deviceType.Name + '(' + deviceType.MaterialCode + ')'}</Select.Option>
                ))
            }
        </Select>
    )
}

export default DeviceTypesSelect