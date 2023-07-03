import service from '@/util/request'

// 管理员登录
export function login(data) {
  return service({
    url: '/login/admin',
    method: 'post',
    data
  })
}

// 管理员登出
export function logout() {
  return service({
    url: '/logout/admin',
    method: 'post'
  })
}

// 获取侧边栏菜单
export function getMenus() {
  return service({
    url: '/menu',
    method: 'get',
  })
}

// 获取当前登录管理员信息
export function getInfo() {
  return service({
    url: '/admin/info',
    method: 'get',
  })
}

// 获取所有管理员信息
export function getAdmins(pageParam) {
  return service({
    url: '/admins',
    method: 'get',
    params: pageParam
  })
}