import { getArticleListApi, editArticleApi, getArticleApi } from '@/api/article'
import { SET_ARTICLELIST } from '../mutation_types'

const article = {
  state: {
    total: null,
    articleData: {},
    articleList: []
  },

  mutations: {
    [SET_ARTICLELIST](state, data) {
      state.articleList = data.articleList
      state.total = data.total
    },
  },

  actions: {

    // GetArticleInfo({commit}, payload) {
    //   return new Promise((resolve, reject) => {
    //     getArticleInfoApi(payload).then(response => {
    //       if(response.status === 200) {
    //         const res = response.data
    //         // if(res.flag) {
    //             commit(SET_ALLTAGLIST, {allTagList: res.allTagList})
    //             commit(SET_ARTICLELIST, {articleList: res.articleList, total: res.total})
    //         // }
    //         // resolve(response)
    //       }
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    GetArticleList({commit}, payload) {
      return new Promise((resolve, reject) => {
        getArticleListApi(payload).then(response => {
          if(response.status === 200) {
            const res = response.data.data
            // if(res.flag) {
                commit(SET_ARTICLELIST, {articleList: res.articleList, total: res.total})
            // }
            // resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetArticle({commit}, payload) {
      return new Promise((resolve, reject) => {
        getArticleApi(payload).then(response => {
          if(response.status === 200) {
            const res = response.data
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    EditArticle(context, payload) {
      return new Promise((resolve, reject) => {
        editArticleApi(payload).then(response => {
          if(response.status === 200) {
            const res = response.data
            // if(res.flag) {
                // commit(SET_ARTICLELIST, {articleList: res.articleList, total: res.total})
            // }
            // resolve(response)
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

//     EditTag(context, payload) {
//       return new Promise((resolve, reject) => {
//         editTagApi(payload).then(response => {
//           // if(response.status === 200) {
//           //     const res = response.data
//           //     if(res.flag) {
//           //       commit(SET_USERLIST, {userList: res})
//           //     }
//             resolve(response)
//           // }
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     DelTag(context, searchId) {
//       return new Promise((resolve, reject) => {
//         delTagApi(searchId).then(response => {
//           // if(response.status === 200) {
//               resolve(response)
//           // }
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     GetTopicList({commit}, payload) {
//       return new Promise((resolve, reject) => {
//         getTopicListApi(payload).then(response => {
//           if(response.status === 200) {
//             const res = response.data.data
//             // if(res.flag) {
//                 commit(SET_TOPICLIST, {topicList: res.topicList, total: res.total})
//             // }
//             // resolve(response)
//           }
//         }).catch(error => {
//           reject(error)
//         })
//       })

//     },

//     EditTopic(context, payload) {
//       return new Promise((resolve, reject) => {
//         editTopicApi(payload).then(response => {
//           // if(response.status === 200) {
//           //     const res = response.data
//           //     if(res.flag) {
//           //       commit(SET_USERLIST, {userList: res})
//           //     }
//             resolve(response)
//           // }
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     DelTopic(context, searchId) {
//       return new Promise((resolve, reject) => {
//         delTopicApi(searchId).then(response => {
//           // if(response.status === 200) {
//               resolve(response)
//           // }
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

  }
}

export default article