import service from "@/util/request"

// 获取角色列表
export function getRoleList() {
  return service({
    url: '/role/list',
    method: 'get',
  })
}

// 获取角色姓名
export function getRoleName(roleId) {
  return service({
    url: '/role/name',
    method: 'get',
    params: { roleId }
  })
}

// 添加角色
export function addRole(data) {
  return service({
    url: '/role',
    method: 'post',
    data
  })
}

// 修改角色
export function updateRole(data) {
  return service({
    url: '/role',
    method: 'put',
    data
  })
}

// 删除角色
export function deleteRole(roleId) {
  return service({
    url: '/role/' + roleId,
    method: 'delete',
  })
}