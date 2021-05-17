import { Table } from 'antd'
import React from 'react'

const PartTable = (props) => {
    const columns = [
        { title: '母件编码 *(cpspcode)H', dataIndex: 'cpspcodeH', key: 'cpspcodeH', width: 100 },
        { title: '母件名称 *(cinvname)H', dataIndex: 'cinvnameH', key: 'cinvnameH', width: 100 },
        { title: '规格型号(cinvstd)H', dataIndex: 'cinvstdH', key: 'cinvstdH', width: 100 },
        { title: '是否展开(bexpand)H', dataIndex: 'bexpandH', key: 'bexpandH', width: 100 },
        { title: '部门名称(cdepname)H', dataIndex: 'cdepnameH', key: 'cdepnameH', width: 100 },
        { title: '部门编码(cdepcode)H', dataIndex: 'cdepcodeH', key: 'cdepcodeH', width: 100 },
        { title: '默认成本BOM(bmrcbbom)H', dataIndex: 'bmrcbbomH', key: 'bmrcbbomH', width: 100 },
        { title: '版本号(csocode)H', dataIndex: 'csocodeH', key: 'csocodeH', width: 100 },
        { title: '备注(cmemo)H', dataIndex: 'cmemoH', key: 'cmemoH', width: 100 },
        { title: '子件编码(cpscode)', dataIndex: 'cpscode', key: 'cpscode', width: 100 },
        { title: '子件名称(cinvname)', dataIndex: 'cinvname', key: 'cinvname', width: 100 },
        { title: '规格型号(cinvstd)', dataIndex: 'cinvstd', key: 'cinvstd', width: 150 },
        { title: '版本号(csocode)', dataIndex: 'csocode', key: 'csocode', width: 100 },
        { title: '主计量(ccomunitname)', dataIndex: 'ccomunitname', key: 'ccomunitname', width: 100 },
        { title: '基本用量分子(ipsquantity)', dataIndex: 'ipsquantity', key: 'ipsquantity', width: 200 },
        { title: '基本用量分母(tdqtyd)', dataIndex: 'tdqtyd', key: 'tdqtyd', width: 200 },
        { title: '标准单价(fbzdj)', dataIndex: 'fbzdj', key: 'fbzdj', width: 150 },
        { title: '标准物料成本(fbzwlcb)', dataIndex: 'fbzwlcb', key: 'fbzwlcb', width: 200 },
        { title: '损耗率%(iwasterate)', dataIndex: 'iwasterate', key: 'iwasterate', width: 100 },
        { title: '存放仓库(cwhname)', dataIndex: 'cwhname', key: 'cwhname', width: 100 },
        { title: '库管员(cpersonname)', dataIndex: 'cpersonname', key: 'cpersonname', width: 100 },
        { title: '用料车间(usedept)', dataIndex: 'usedept', key: 'usedept', width: 100 },
        { title: '物料类型(wiptype)', dataIndex: 'wiptype', key: 'wiptype', width: 100 },
        { title: '替代标示(replaceflag)', dataIndex: 'replaceflag', key: 'replaceflag', width: 100 },
        { title: '图片(ginvpicture)', dataIndex: 'ginvpicture', key: 'ginvpicture', width: 100 },
    ]

    return (
        <Table bordered scroll={{ x: 2900 }} columns={columns} dataSource={props.dataSource} />
    )
}

export default PartTable