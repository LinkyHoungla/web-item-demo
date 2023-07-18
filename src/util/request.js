// 网络请求 axios 封装

import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/util/auth'

// 添加一个标志变量，避免多个弹窗
let errorShown = false;

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,// api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 在请求发送前保存token
  const token = getToken();
  config.headers['Authorization'] = 'Bearer ' + token// 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  return config
}, error => {
  // 在请求放生错误是如何处理
  console.log("request" + error)
  // 信息提示框
  Message({
    message: error.response.data.message,
    type: 'error',
    duration: 5 * 1000
  });
  // 用于显式地将一个 Promise 对象标记为拒绝状态，并传递拒绝原因。
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log("response" + error)
    if (!errorShown) {
      // 通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
      const res = error.response.data
      let errorMessage = res.message
      // 401：用户名不存在或密码错误
      if (res.status === 401)
        errorMessage = '用户名或密码错误'
      Message({
        message: errorMessage,
        type: 'error',
        duration: 5 * 1000
      });
      // 450:非法的token; 451:Token 过期;
      if (res.status === 450 || res.status === 451) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('admin/resetToken').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        }).catch(() => { }).finally(() => { errorShown = false })
        // throw new Error("令牌无效")

        errorShown = true; // 设置标志变量为true，表示已经弹出了错误提示
      }
    }

    return Promise.reject(error)
  }
)

export default service