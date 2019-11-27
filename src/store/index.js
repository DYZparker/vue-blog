import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import login from './modules/login'

Vue.use(Vuex)

const store = new Vuex.Store ({
    modules: {
        user,
        login
    }
}) 

export default store
