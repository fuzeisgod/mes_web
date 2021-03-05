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
            bom_a: item["母件编码 *(cpspcode)H"] || "",
            bom_b: item["母件名称 *(cinvname)H"] || "",
            bom_c: item["规格型号(cinvstd)H"] || "",
            bom_d: item["是否展开(bexpand)H"] || "",
            bom_e: item["部门名称(cdepname)H"] || "",
            bom_f: item["部门编码(cdepcode)H"] || "",
            bom_g: item["默认成本BOM(bmrcbbom)H"] || "",
            bom_h: item["版本号(csocode)H"] || "",
            bom_i: item["备注(cmemo)H"] || "",
            bom_j: item["子件编码(cpscode)"] || "",
            bom_k: item["子件名称(cinvname)"] || "",
            bom_l: item["规格型号(cinvstd)"] || "",
            bom_m: item["版本号(csocode)"] || "",
            bom_n: item["主计量(ccomunitname)"] || "",
            bom_o: item["基本用量分子(ipsquantity)"] || "",
            bom_p: item["基本用量分母(tdqtyd)"] || "",
            bom_q: item["标准单价(fbzdj)"] || "",
            bom_r: item["标准物料成本(fbzwlcb)"] || "",
            bom_s: item["损耗率%(iwasterate)"] || "",
            bom_t: item["存放仓库(cwhname)"] || "",
            bom_u: item["库管员(cpersonname)"] || "",
            bom_v: item["用料车间(usedept)"] || "",
            bom_w: item["物料类型(wiptype)"] || "",
            bom_x: item["替代标示(replaceflag)"] || "",
            bom_y: item["图片(ginvpicture)"] || "",
        })
    })

    return target
}