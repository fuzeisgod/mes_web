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