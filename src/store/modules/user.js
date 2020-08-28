import { getUserListApi, editUserApi, delUserApi } from '@/api/user'
import { SET_USERLIST } from '../mutation_types'

const user = {
  state: {
    total: null,
    userList: []
  },

  mutations: {
    [SET_USERLIST](state, data) {
			state.userList = data.userList
			state.total = data.total
    }
  },

  actions: {
    GetUserList({commit}, payload) {
      return new Promise((resolve, reject) => {
				getUserListApi(payload).then(response => {
					if(response.status === 200) {
						const res = response.data.data
						commit(SET_USERLIST, {userList: res.userList, total: res.total})
					}
				}).catch(error => {
					reject(error)
				})
      })

    },

    EditUser(context, payload) {
			return new Promise((resolve, reject) => {
				editUserApi(payload).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
    },

    DelUser(context, searchId) {
			return new Promise((resolve, reject) => {
				delUserApi(searchId).then(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
    },

  }
}

export default user