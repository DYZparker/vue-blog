import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import login from './modules/login'
import common from './modules/common'
import article from './modules/article'

Vue.use(Vuex)

const store = new Vuex.Store ({
	modules: {
		user,
		login,
		common,
		article
	}
}) 

export default store
