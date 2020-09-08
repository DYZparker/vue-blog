import { getToken, setToken, getUser, setUser, removeUser } from '@/utils/auth'
import { loginApi } from '@/api/login'
import { SET_TOKEN, SET_USER, REMOVE_USER} from '../mutation_types'

const login = {
  state: {
    //避免刷新页面丢失值
    token: getToken(),
    user: getUser()
  },

  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token,
      setToken(token)
    },

    [SET_USER](state, user) {
      state.user = user,
      setUser(user)
    },

    [REMOVE_USER](state) {
      state.token = '',
      state.user = '',
      removeUser()
    }
  },

  actions: {
    //登录成功则将返回的token、用户信息存入localStorage和vuex
    Login({commit}, payload) {
      return new Promise((resolve, reject) => {
        loginApi(payload).then(response => {
          const res = response.data
          if(res.code === 200 && res.data.user.admin === 1) {
            commit(SET_TOKEN, res.data.token)
            commit(SET_USER, res.data.user)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default login