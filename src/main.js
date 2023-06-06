import Vue from 'vue'

//Vue-router 导入
import router from '@/router'
import App from './App.vue'

//Element-ui 导入
import ElementUI from 'element-ui'

import './plugins/element.js'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
