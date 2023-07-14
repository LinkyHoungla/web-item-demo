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