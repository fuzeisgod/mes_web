import { service1 as service } from './index'

export const getBomList = (option) => {
    return service.post(`/api/Bom/GetBoms?projectName=${option.projectName}&cpspcode=${option.cpspcode}`)
}

export const addMould = (mould) => {
    return service.post(`/api/AddMould`, {
        Mould: mould
    })
}