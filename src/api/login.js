import request from '../utils/request'

export function loginApi (username, password){
    return request({
        url: '/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function registApi(username, password) {
    return request({
        url: '/regist',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function getUserInfoApi (){
    return request({
        url: '/user/info',
        method: 'get'
    })
}