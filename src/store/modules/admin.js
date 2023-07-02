import { login, getInfo, logout } from "@/api/admin";
import { setToken, getToken, removeToken } from "@/util/auth";
import router from "@/router";

// 在需要重置状态时使用 getDefaultState() 函数来恢复初始值
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    role: '',
  }
}

// 共同维护的一个状态，state里面可以是很多个全局状态
const state = getDefaultState()

// 处理数据的唯一途径，state的改变或赋值只能在这里
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
}

// 数据的异步操作
const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const token = response.data.data.token
        // 把token存储于vuex
        commit('SET_TOKEN', token)
        // 把token存储于session
        setToken(token)
        // 表示异步操作成功完成
        resolve()
      }).catch(error => {
        // 表示异步操作被拒绝
        reject(error)
      })
    })
  },
  // 获取用户信息
  getAdminInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response.data

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, roleName, avatar } = data

        commit('SET_ROLE', roleName)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户登出
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        removeToken()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        // dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}