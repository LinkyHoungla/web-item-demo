import service from '@/util/request'

// 获取侧边栏菜单
export function getMenus() {
  return service({
    url: '/menu',
    method: 'get',
  })
}

// 获取 路径 列表
export function getPageList(pageParam) {
  return service({
    url: '/page/list',
    method: 'get',
    params: pageParam
  })
}

// 获取 路径 树
export function getPageTree() {
  return service({
    url: '/page/tree',
    method: 'get',
  })
}

// 获取 用户权限 列表
export function getRightsList(id) {
  return service({
    url: '/rights/' + id,
    method: 'get',
  })
}

// 获取 权限
export function getRightsId(id) {
  return service({
    url: '/rights/list/' + id,
    method: 'get',
  })
}

// 添加权限
export function addRight(data) {
  return service({
    url: '/page',
    method: 'post',
    data
  })
}

// 删除页面
export function deletePage(id) {
  return service({
    url: '/page/' + id,
    method: 'delete',
  })
}

// 删除权限
export function deleteRight(roleId, pageId) {
  return service({
    url: '/right/roleId/' + roleId + '/pageId/' + pageId,
    method: 'delete',
  })
}

// 设置权限
export function addRights(roleId, data) {
  return service({
    url: '/rights/' + roleId,
    method: 'post',
    data
  })
}

// 修改页面
export function updatePage(data) {
  return service({
    url: '/page/' + data.pageId,
    method: 'put',
    data
  })
}