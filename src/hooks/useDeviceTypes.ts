import { useEffect, useState } from 'react'
import { getDeviceTypes } from '../api/product'

const useDeviceTypes = (initialState) => {
    const [deviceTypes, updateDeviceTypes] = useState(initialState)

    useEffect(() => {
        getDeviceTypes().then((res: any) => {
            if (res.code === 200) {
                updateDeviceTypes(res.data)
            }
        })
    }, [])

    return [deviceTypes, updateDeviceTypes]

}

export default useDeviceTypes