import request from '../utils/request'

export function getArticleListApi(payload) {
  return request({
    url: `/article/list`,
    method: 'post',
    data: {
      payload
    }
  })
}

export function getArticleApi(id) {
  return request({
    url: `/article/id`,
    method: 'post',
    data: {
      id
    }
  })
}

export function editArticleApi(article) {
  return request({
    url: `/article/edit`,
    method: 'post',
    data: {
      article
    }
  })
}

export function delArticleApi(searchId) {
  return request({
    url: `/article/delete`,
    method: 'post',
    data: {
        searchId
    }
  })
}