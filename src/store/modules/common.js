import { getTagListApi, editTagApi, delTagApi, getTopicListApi, editTopicApi, delTopicApi } from '@/api/common'
import { SET_ALLTAGLIST, SET_TAGLIST, SET_TOPICLIST } from '../mutation_types'

const common = {
  state: {
    total: null,
    topicList: [],
    // allTagList: [],
    tagList: []
  },

  mutations: {
    [SET_ALLTAGLIST](state, data) {
        state.allTagList = data.allTagList
    },
    [SET_TAGLIST](state, data) {
        state.tagList = data.tagList
        state.total = data.total
    },
    [SET_TOPICLIST](state, data) {
        state.topicList = data.topicList
        state.total = data.total
    }
  },

  actions: {

    // GetAllTagList({commit}) {
    //   return new Promise((resolve, reject) => {
    //     getAllTagListApi().then(response => {
    //       if(response.status === 200) {
    //         const res = response.data
    //         // if(res.flag) {
    //             commit(SET_ALLTAGLIST, {allTagList: res})
    //         // }
    //         // resolve(response)
    //       }
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    GetTagList({commit}, payload) {
      return new Promise((resolve, reject) => {
        getTagListApi(payload).then(response => {
          if(response.status === 200) {
            const res = response.data.data
            // if(res.flag) {
                commit(SET_TAGLIST, {tagList: res.tagList, total: res.total})
            // }
            // resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    EditTag(context, payload) {
      return new Promise((resolve, reject) => {
        editTagApi(payload).then(response => {
          // if(response.status === 200) {
          //     const res = response.data
          //     if(res.flag) {
          //       commit(SET_USERLIST, {userList: res})
          //     }
            resolve(response)
          // }
        }).catch(error => {
          reject(error)
        })
      })
    },

    DelTag(context, searchId) {
      return new Promise((resolve, reject) => {
        delTagApi(searchId).then(response => {
          // if(response.status === 200) {
              resolve(response)
          // }
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetTopicList({commit}, payload) {
      return new Promise((resolve, reject) => {
        getTopicListApi(payload).then(response => {
          if(response.status === 200) {
            const res = response.data.data
            // if(res.flag) {
                commit(SET_TOPICLIST, {topicList: res.topicList, total: res.total})
            // }
            // resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })

    },

    EditTopic(context, payload) {
      return new Promise((resolve, reject) => {
        editTopicApi(payload).then(response => {
          // if(response.status === 200) {
          //     const res = response.data
          //     if(res.flag) {
          //       commit(SET_USERLIST, {userList: res})
          //     }
            resolve(response)
          // }
        }).catch(error => {
          reject(error)
        })
      })
    },

    DelTopic(context, searchId) {
      return new Promise((resolve, reject) => {
        delTopicApi(searchId).then(response => {
          // if(response.status === 200) {
              resolve(response)
          // }
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default common