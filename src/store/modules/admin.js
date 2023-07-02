import { login } from "@/api/admin";
import { setToken, getToken } from "@/util/auth";

// 在需要重置状态时使用 getDefaultState() 函数来恢复初始值
const getDefaultState = () => {
  return {
    token: getToken(),
    username: '',
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // 把token存储于vuex
        commit('SET_TOKEN', data.password)
        commit('SET_NAME', data.username)
        // 把token存储于cookie
        setToken(data.password)
        // 把token存储于session
        window.sessionStorage.setItem("token", data.password);
        // 表示异步操作成功完成
        resolve()
      }).catch(error => {
        // 表示异步操作被拒绝
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}