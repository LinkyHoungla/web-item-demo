import service from '@/util/request'

// todo: api 整合为全局变量

// 管理员登录
export function login(data) {
  return service({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 管理员登出
export function logout() {
  return service({
    url: '/admin/logout',
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
    url: '/admin/page',
    method: 'get',
    params: pageParam
  })
}

// 修改管理员信息
export function updateAdmin(data) {
  return service({
    url: '/admin',
    method: 'put',
    data
  })
}

// 增添管理员
export function addAdmin(data) {
  return service({
    url: '/admin',
    method: 'post',
    data
  })
}

// 删除管理员
export function deleteAdmin(uid) {
  return service({
    url: '/admin/' + uid,
    method: 'delete'
  })
}