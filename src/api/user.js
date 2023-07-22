import service from "@/util/request"

// 获取角色列表
export function getUserList(params) {
  return service({
    url: '/user/list',
    method: 'get',
    params
  })
}

// 添加角色
export function addUser(data) {
  return service({
    url: '/user',
    method: 'post',
    data
  })
}

// 修改角色
export function updateUserPhone(uid, phone) {
  return service({
    url: '/user/' + uid,
    method: 'put',
    headers: { 'Content-Type': 'text/plain' }, // 设置请求头为纯文本类型
    data: phone
  })
}

// 删除角色
export function deleteUser(uid) {
  return service({
    url: '/user/' + uid,
    method: 'delete',
  })
}

// 获取 角色 个人信息
export function getUserInfo(uid) {
  return service({
    url: '/user/info/' + uid,
    method: 'get',
  })
}

// 修改 角色 个人信息
export function updateUserInfo(uid, data) {
  return service({
    url: '/user/info/' + uid,
    method: 'put',
    data
  })
}

// 角色 登录
export function userLogin(data) {
  return service({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取 角色 登录信息
export function getUserLogin(uid) {
  return service({
    url: '/user/log/' + uid,
    method: 'get',
  })
}

// 修改 角色 登录信息
export function updateUserLogin(uid, data) {
  return service({
    url: '/user/log/' + uid,
    method: 'put',
    data
  })
}