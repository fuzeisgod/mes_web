import { service2 as service } from './index'

export const login = (options) => {
    let { ac, pwd } = options;
    return service.post(`/api/Login?userAccount=${ac}&userPwd=${pwd}`);
}