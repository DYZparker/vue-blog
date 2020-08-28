import { getArticleListApi, editArticleApi, getArticleApi, delArticleApi } from '@/api/article'
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
    GetArticleList({commit}, payload) {
      return new Promise((resolve, reject) => {
        getArticleListApi(payload).then(response => {
          if(response.status === 200) {
            const res = response.data.data
            commit(SET_ARTICLELIST, {articleList: res.articleList, total: res.total})
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetArticle(context, payload) {
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
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    DelArticle(context, searchId) {
      return new Promise((resolve, reject) => {
        delArticleApi(searchId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default article