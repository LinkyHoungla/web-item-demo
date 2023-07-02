import { login } from "@/api/admin";
import { setToken, getToken } from "@/util/auth";

// 在需要重置状态时使用 getDefaultState() 函数来恢复初始值
const getDefaultState = () => {
  return {
    token: getToken(),
    username: '',
  }
}

// 共同维护的一个状态，state里面可以是很多个全局状态
const state = getDefaultState()

// 处理数据的唯一途径，state的改变或赋值只能在这里
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
}

// 数据的异步操作
const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const token = 'Bearer ' + response.data.data.token
        // 把token存储于vuex
        commit('SET_TOKEN', token)
        // 把token存储于cookie
        setToken(token)
        // 把token存储于session
        window.sessionStorage.setItem("token", token);
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