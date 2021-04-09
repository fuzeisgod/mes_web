import { useEffect, useState } from "react"
import { getUsersList } from '../api/staff'


const useUsers = (initialState) => {
    const [users, updateUsers] = useState(initialState)

    useEffect(() => {
        getUsersList().then((res: any) => {
            if (res.code === 200) {
                let n = res.data.map(item => ({
                    Name: item.Name,
                    Id: item.Id
                }))
                updateUsers(n)
            }
        })
    }, [])

    return [users, updateUsers]
}

export default useUsers