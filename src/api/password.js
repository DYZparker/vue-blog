import request from '../utils/request'

export function checkPassword(userId, password) {
    return new request({
        url: '/user/pwd',
        method: 'post',
        data: {
            userId,
            password
        }
    })
}

export function changePassword(userId, password) {
    return new request({
        url: '/user/pwd',
        method: 'put',
        data: {
            userId,
            password
        }
    })
}