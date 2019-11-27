import { getToken, setToken, getUser, setUser, removeUser } from '@/utils/auth'
import { loginApi, getUserInfoApi} from '@/api/login'
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
              loginApi(payload.username, payload.password).then(response => {
                  const res = response.data
                  if(res.err_code === 0) {
                      commit(SET_TOKEN, res.token)
                      commit(SET_USER, res.user)
                  }
                  resolve(res)
              }).catch(error => {
                  reject(error)
              })
          })
      },

      //主要判断token是否过期，如过期则清除token和user
      GetUserInfo({commit}) {
          return new Promise((resolve, reject) => {
              getUserInfoApi().then(response => {
                  resolve(response)
              }).catch(error => {
                  if(error.response.status === 401) {
                      commit('REMOVE_USER')
                  }
                  reject(error)
              })
          })
      }

  }
}

export default login