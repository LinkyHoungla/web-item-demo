import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "@/util/auth";

//组件导入
import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'

//页面导入
import NotFound from '@/view/NotFound.vue'
import Home from '@/view/Home.vue'

import Admins from '@/view/User/Admins.vue'
import Users from '@/view/User/Users.vue'
import Info from '@/view/User/Info.vue'

import Rights from '@/view/Power/Rights.vue'
import Roles from '@/view/Power/Roles.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/main' },
    { path: '/login', component: Login },
    {
      path: '/main',
      component: Main,
      redirect: "/home",
      children: [
        { path: '/home', component: Home },
        { path: '/admins', component: Admins },
        { path: '/users', component: Users },
        { path: '/info', component: Info },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
      ]
    },
    { path: '/404', component: NotFound },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 检查目标路由是否存在
  if (to.matched.length === 0) {
    next('/404'); // 跳转到 404 页面
  }

  const token = getToken(); // 获取登录状态的标识（例如 token）

  // 如果目标页面是登录页面
  if (to.path === '/login') {
    // 如果已经登录过，则跳转到主页
    if (token) {
      if (from.path !== '/') {
        next('/');
      } else {
        next(false); // 中断导航
      }
    } else {
      next(); // 继续导航到登录页面
    }
  } else {
    // 如果未登录，则跳转到登录页面
    if (!token) {
      next('/login');
    } else {
      next(); // 继续导航到目标页面
    }
  }
})

export default router