import { useEffect, useState } from 'react'
import { getPositions } from '../api/orderbook'

const usePositions = (initialState) => {
    const [positions, updatePositions] = useState(initialState)

    useEffect(() => {
        getPositions().then((res: any) => {
            if (res.code === 200) {
                updatePositions(res.data)
            }
        })
    }, [])

    return [positions, updatePositions]
}

export default usePositions