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

export function getUserInfoApi (){
	return request({
		url: '/user/info',
		method: 'get'
	})
}