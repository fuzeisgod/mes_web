// insert userID
// parameter: [需要修改的path， 需要插入的userid]
// attention: 只对routeArr第二位做修改
export const insertUserId = (prevPath: string, userId: string): string => {
    let routeArr: Array<string> = prevPath.split('/')
    routeArr.splice(1, 1, userId)
    return routeArr.join('/')
}

export const cutURLForSelectedKeys = (url: string): string => {
    let routeArr: Array<string> = url.split('/')
    routeArr.length = 3;
    return routeArr.join('/')
}

export const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement => {
    return input !== null && input.tagName === 'IFRAME';
}

export const getSearchObj = (str: string): { [key: string]: any } => {
    if (!str) return
    let target = {}
    let n = str.split('?')[1].split('&')
    n.map((item) => {
        let m = item.split('=')
        target[m[0]] = m[1]
    })
    return target
}

export const getDataSource = (json) => {
    let target = []
    json.forEach((item, index) => {
        target.push({
            key: index,
            cpspcodeH: item["母件编码 *(cpspcode)H"] || "",
            cinvnameH: item["母件名称 *(cinvname)H"] || "",
            cinvstdH: item["规格型号(cinvstd)H"] || "",
            bexpandH: item["是否展开(bexpand)H"] || "",
            cdepnameH: item["部门名称(cdepname)H"] || "",
            cdepcodeH: item["部门编码(cdepcode)H"] || "",
            bmrcbbomH: item["默认成本BOM(bmrcbbom)H"] || "",
            csocodeH: item["版本号(csocode)H"] || "",
            cmemoH: item["备注(cmemo)H"] || "",
            cpscode: item["子件编码(cpscode)"] || "",
            cinvname: item["子件名称(cinvname)"] || "",
            cinvstd: item["规格型号(cinvstd)"] || "",
            csocode: item["版本号(csocode)"] || "",
            ccomunitname: item["主计量(ccomunitname)"] || "",
            ipsquantity: item["基本用量分子(ipsquantity)"] || "",
            tdqtyd: item["基本用量分母(tdqtyd)"] || "",
            fbzdj: item["标准单价(fbzdj)"] || "",
            fbzwlcb: item["标准物料成本(fbzwlcb)"] || "",
            iwasterate: item["损耗率%(iwasterate)"] || "",
            cwhname: item["存放仓库(cwhname)"] || "",
            cpersonname: item["库管员(cpersonname)"] || "",
            usedept: item["用料车间(usedept)"] || "",
            wiptype: item["物料类型(wiptype)"] || "",
            replaceflag: item["替代标示(replaceflag)"] || "",
            ginvpicture: item["图片(ginvpicture)"] || "",
        })
    })

    return target
}

export const transformBase64ToPicture = (base64Str) => {

}