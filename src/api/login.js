import request from '../utils/request'

export function loginApi (user){
	return request({
		url: '/user/login',
		method: 'post',
		data: {
			user
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