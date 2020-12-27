// insert userID
// parameter: [需要修改的path， 需要插入的userid]
// attention: 只对routeArr第二位做修改
export const insertUserId = (prevPath: any, userId: string) => {
    let routeArr = prevPath.split('/')
    routeArr.splice(1, 1, userId)
    return routeArr.join('/')
}