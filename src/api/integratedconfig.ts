import { service1 as service } from './index'

export const getBomList = ({ page, limit, typeId, name }) => {
    return service.post(`/api/Bom/GetBomPros?page=${page}&limit=${limit}&typeId=${typeId}&name=${name}`)
}

// 添加 mould
export const addMould = ({ Name, TypeId, PositionId, Mould }) => {
    return service.post(`/api/Mould/AddMould`, {
        Name,
        TypeId,
        PositionId,
        Mould
    })
}

export const getMouldList = ({ limit, page, typeId, positionId }) => {
    return service.post(`/api/Mould/GetMouldList?limit=${limit}&page=${page}&typeId=${typeId}&positionId=${positionId}`)
}

// 添加 bom
export const addBom = ({ list, Name, TypeId }) => {
    return service.post('/api/Bom/AddBom', {
        list,
        Name,
        TypeId
    })
}

// 获取 bom
export const getBom = (BomProgrammeId) => {
    return service.post(`/api/Bom/GetBoms?BomProgrammeId=${BomProgrammeId}`)
}

// 删除 bom
export const deleteBom = (Id) => {
    return service.post(`/api/Bom/DelBom/${Id}`)
}

// 删除 mould
export const deleteMould = (Id) => {
    return service.post(`api/Mould/DelMould/${Id}`)
}

// 获取方案列表
export const getProgrammeList = (typeId) => {
    return service.post(`/api/Programme/GetProgrammes?typeId=${typeId}`)
}

// 根据设备类型ID获取BOM方案
export const getBomPropsByTypeId = (typeId) => {
    return service.post(`/api/Bom/GetBomProsByTypeId?typeId=${typeId}`)
}

// 根据设备类型和岗位ID获取mould方案
export const getMouldByTypeIdAndPositionId = (typeId, positionId) => {
    return service.post(`/api/Mould/GetMouldList?typeId=${typeId}&positionId=${positionId}`)
}

// 添加方案
export const addProgramme = ({
    Name,
    BomProgrammeId,
    ProducerMouldId,
    QualityInspectorMouldId,
    GodownKeeperMouldId,
    TypeId
}) => {
    return service.post(`/api/Programme/AddProgramme`, {
        Name,
        BomProgrammeId,
        ProducerMouldId,
        QualityInspectorMouldId,
        GodownKeeperMouldId,
        TypeId
    })
}

// 编辑方案
export const updateProgramme = ({
    Id,
    Name,
    BomProgrammeId,
    ProducerMouldId,
    QualityInspectorMouldId,
    GodownKeeperMouldId,
    TypeId
}) => {
    return service.post(`/api/Programme/UpdateProgramme`, {
        Id,
        Name,
        BomProgrammeId,
        ProducerMouldId,
        QualityInspectorMouldId,
        GodownKeeperMouldId,
        TypeId
    })
}

// 根据 Id 获取模板
export const getMouldById = (Id) => {
    return service.get(`/api/Mould/GetMould/${Id}`)
}

// 更新 mould
export const updateMould = ({ Id, Name, TypeId, PositionId, Mould }) => {
    return service.post(`/api/Mould/UpdateMould`, {
        Id,
        Name,
        TypeId,
        PositionId,
        Mould
    })
}

// 根据Id获取方案列表
export const getProgrammeById = (Id) => {
    return service.post(`/api/Programme/GetProgramme/${Id}`)
}