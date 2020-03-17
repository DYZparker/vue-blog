import request from '../utils/request'

//topic
export function getTopicListApi(payload) {
  return request({
    url: `/common/topic/list`,
    method: 'post',
    data: {
      payload
    }
  })
}

export function delTopicApi(searchId) {
  return request({
    url: `/common/topic/delete`,
    method: 'post',
    data: {
      searchId
    }
  })
}

export function editTopicApi(topic) {
  return request({
    url: `/common/topic/edit`,
    method: 'post',
    data: {
      topic
    }
  })
}

//tag
// export function getAllTagListApi() {
//   return request({
//     url: `/side/tag/list`,
//     method: 'get'
//   })
// }

export function getTagListApi(payload) {
  return request({
    url: `/side/tag/list`,
    method: 'post',
    data: {
      payload
    }
  })
}

export function delTagApi(searchId) {
  return request({
    url: `/side/tag/delete`,
    method: 'post',
    data: {
      searchId
    }
  })
}

export function editTagApi(tag) {
  return request({
    url: `/side/tag/edit`,
    method: 'post',
    data: {
      tag
    }
  })
}