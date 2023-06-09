import Vue from "vue";
import VueRouter from "vue-router";

//组件导入
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'

//页面导入
import Welcome from '@/view/Welcome.vue'
import Users from '@/view/User/Users.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: "/welcome",
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
      ]
    }
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router