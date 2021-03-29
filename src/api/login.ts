import { service2 as service } from './index'

export const login = (options) => {
    let { ac, pwd } = options;
    return service.post('/api/Login/Login', {
        Account: ac,
        Password: pwd
    });
}