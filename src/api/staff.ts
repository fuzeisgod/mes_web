import { service1 as service } from './index'

export const login = (options) => {
    
    return service.post(`/api/User/GetUsers`);
}