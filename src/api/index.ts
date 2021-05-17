import axios from 'axios'
import { message } from 'antd'
import { decryptAES } from '../tools/aes'

const isDev = process.env.NODE_ENV === 'development'

const service1 = axios.create({
    // baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/277696' : ''
    baseURL: isDev ? 'http://192.168.100.12:8888' : ''
})

const service2 = axios.create({
    // baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/277696' : ''
    baseURL: isDev ? 'http://192.168.100.12:8888' : ''
})

service1.interceptors.request.use((config) => {
    if (true) {
        config.headers['Authorization'] = 'BasicAuth ' + decryptAES(localStorage.getItem('key')) // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, err => {
    return Promise.reject(err)
})


service1.interceptors.response.use((res) => {
    if (res.status === 200) {
        return res.data
    } else {
        // 全局处理错误
        message.info('connection timed out!');
    }
}, err => {
    return Promise.reject(err)
})

service2.interceptors.response.use((res) => {
    if (res.status === 200) {
        return res.data
    } else {
        // 全局处理错误
        message.info('connection timed out!');
    }
}, err => {
    return Promise.reject(err)
})

export {
    service1,
    service2
}