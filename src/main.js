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

// tree 导入
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

//axios 导入
import axios from 'axios'

// 自定义 组件
import FormDialog from '@/components/Dialog/FormDialog.vue'
import TablePage from '@/components/Table.vue'

Vue.component('table-page', TablePage)
Vue.component('form-dialog', FormDialog)

import store from './store'
//配置请求路径
// axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
