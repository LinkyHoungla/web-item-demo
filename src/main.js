import Vue from 'vue'

//样式导入
import '@/assets/css/global.css'

//字体导入
import '@/assets/fonts/iconfont.css'

//Vue-router 导入
import router from '@/router'
import App from './App.vue'

//Element-ui 导入
import ElementUI from 'element-ui'
import '@/plugins/element.js'
Vue.use(ElementUI)

//axios 导入
import axios from 'axios'
//配置请求路径
// axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.baseURL = '/api'

//拦截器配置token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
