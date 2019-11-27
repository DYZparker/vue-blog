// import { getStudentList, addStudent, delStudent, getUserListApi } from '@/api/user'
import { getUserListApi, editUserApi, delUserApi } from '@/api/user'
import { SET_USERLIST } from '../mutation_types'

const user = {
  state: {
    // student: [],
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
    // GetStudentList({commit}, payload) {
    //     return new Promise((resolve, reject) => {
    //         getStudentList(payload.page, payload.size, payload.search).then(response => {
    //             if(response.status === 200) {
    //                 const res = response.data
    //                 if(res.flag) {
    //                     commit(SET_STUDENT, {student: res.student, total: res.total})
    //                 }
    //                 resolve(response)
    //             }
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },

    GetUserList({commit}, payload) {
      return new Promise((resolve, reject) => {
          getUserListApi(payload).then(response => {
              if(response.status === 200) {
                  const res = response.data.data
                  // if(res.flag) {
                      commit(SET_USERLIST, {userList: res.userList, total: res.total})
                  // }
                  // resolve(response)
              }
          }).catch(error => {
              reject(error)
          })
      })

    },

    EditUser(context, payload) {
        return new Promise((resolve, reject) => {
          editUserApi(payload).then(response => {
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

    DelUser(context, searchId) {
        return new Promise((resolve, reject) => {
            delUserApi(searchId).then(response => {
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

export default user