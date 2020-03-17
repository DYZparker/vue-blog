import request from '../utils/request'

export function getUserListApi(payload) {
  return request({
    url: `/user/list`,
    method: 'post',
    data: {
      payload
    }
  })
}

export function delUserApi(searchId) {
    return request({
        url: `/user/delete`,
        method: 'post',
        data: {
            searchId
        }
    })
}

export function editUserApi(user) {
  return request({
    url: `/user/edit`,
    method: 'post',
    data: {
      user
    }
  })
}