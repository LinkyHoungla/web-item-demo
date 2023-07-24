import service from "@/util/request"

// 获取 陪玩 列表
export function getCompanionList(params) {
  return service({
    url: '/companion/list',
    method: 'get',
    params
  })
}

// 获取 陪玩 信息
export function getCompanionInfo(id) {
  return service({
    url: '/companion/' + id,
    method: 'get',
  })
}

// 添加 陪玩
export function addCompanion(data) {
  return service({
    url: '/companion',
    method: 'post',
    data
  })
}

// 修改 陪玩
export function updateCompanion(id, data) {
  return service({
    url: '/companion/' + id,
    method: 'put',
    data
  })
}

// 删除 陪玩
export function deleteCompanion(id) {
  return service({
    url: '/companion/' + id,
    method: 'delete',
  })
}