import * as Api from '@/api/common'
import { SET_ALLTAGLIST, SET_TOPICLIST, SET_TAGLIST, SET_LINKLIST } from '../mutation_types'

const common = {
  state: {
    total: null,
    topicList: [],
    tagList: [],
    linkList: []
  },

  mutations: {
    [SET_ALLTAGLIST](state, data) {
        state.allTagList = data.allTagList
    },
    [SET_TOPICLIST](state, data) {
        state.topicList = data.topicList
        state.total = data.total
    },
    [SET_TAGLIST](state, data) {
        state.tagList = data.tagList
        state.total = data.total
    },
    [SET_LINKLIST](state, data) {
        state.linkList = data.linkList
    },
  },

  actions: {
    //topic
    GetTopicList({commit}, payload) {
      return new Promise((resolve, reject) => {
        Api.getTopicListApi(payload).then(response => {
          if(response.status === 200) {
            const res = response.data.data
            commit(SET_TOPICLIST, {topicList: res.topicList, total: res.total})
          }
        }).catch(error => {
          reject(error)
        })
      })

    },

    EditTopic(context, payload) {
      return new Promise((resolve, reject) => {
        Api.editTopicApi(payload).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DelTopic(context, searchId) {
      return new Promise((resolve, reject) => {
        Api.delTopicApi(searchId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    //tag
    GetTagList({commit}, payload) {
      return new Promise((resolve, reject) => {
        Api.getTagListApi(payload).then(response => {
          if(response.status === 200) {
            const res = response.data.data
            commit(SET_TAGLIST, {tagList: res.tagList, total: res.total})
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    EditTag(context, payload) {
      return new Promise((resolve, reject) => {
        Api.editTagApi(payload).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DelTag(context, searchId) {
      return new Promise((resolve, reject) => {
        Api.delTagApi(searchId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    //link
    GetLinkList({commit}) {
      return new Promise((resolve, reject) => {
        Api.getLinkListApi().then(response => {
          if(response.status === 200) {
            const res = response.data.data
            commit(SET_LINKLIST, {linkList: res.linkList})
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    EditLink(context, payload) {
      return new Promise((resolve, reject) => {
        Api.editLinkApi(payload).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DelLink(context, searchId) {
      return new Promise((resolve, reject) => {
        Api.delLinkApi(searchId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default common