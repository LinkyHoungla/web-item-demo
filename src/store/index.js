import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储用户信息
    user: null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    loginUser({ commit }, user) {
      // 登录成功后调用该方法保存用户信息到状态中
      commit('setUser', user);
    }
  },
  modules: {

  }
})
