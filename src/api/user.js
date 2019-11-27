import request from '../utils/request'

export function getStudentList(page, size, search) {
    return request({
        url: `/student/list`,
        method: 'post',
        data: {
            page,
            size,
            search
        }
    })
}

export function registerApi(user) {
  return request({
    url: `/users/register`,
    method: 'post',
    data: {
      user
    }
  })
}

export function editUserApi(user) {
  return request({
    url: `/users/edit`,
    method: 'post',
    data: {
      user
    }
  })
}

export function getUserListApi(payload) {
  return request({
    url: `/users/list`,
    method: 'post',
    data: {
      payload
    }
  })
}

// export function getStudent(searchData) {
//     return request({
//         url: `/student/search`,
//         method: 'post',
//         data: {
//             searchData
//         }
//     })
// }

// export function setStudent(searchId, student) {
//     return request({
//         url: `/student`,
//         method: 'put',
//         data: {
//             searchId,
//             student
//         }
//     })
// }

export function delUserApi(searchId) {
    return request({
        url: `/users/delete`,
        method: 'post',
        data: {
            searchId
        }
    })
}