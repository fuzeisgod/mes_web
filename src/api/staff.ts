import { service1 as service } from './index'

export const getUsersList = () => {
    return service.post(`/api/User/GetUsers`);
}