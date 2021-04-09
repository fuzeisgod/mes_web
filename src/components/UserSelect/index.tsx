import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Select } from 'antd'
import { getUsersList } from '../../api/staff'

interface IProps {
    form: any,
    name: string
}

const UserSelect: FC<IProps> = ({ form, name }) => {
    const [userList, updateUserList] = useState([])

    useEffect(() => {
        getUsersList().then((res: any) => {
            if (res.code === 200) {
                let n = res.data.map(item => ({
                    Name: item.Name,
                    Id: item.Id
                }))
                updateUserList(n)
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
                    userList.length !== 0 && userList.map(user => {
                        return <Select.Option value={user.Id} key={user.Id}>{user.Name}</Select.Option>
                    })
                }
            </Select>
        </>
    )
}

export default UserSelect