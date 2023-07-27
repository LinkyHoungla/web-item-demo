import service from "@/util/request"

// 获取 服务 列表
export function getServiceTypeList(params) {
  return service({
    url: '/service/list',
    method: 'get',
    params
  })
}

// 添加 服务
export function addServiceType(data) {
  return service({
    url: '/service',
    method: 'post',
    data
  })
}

// 修改 服务
export function updateServiceType(id, data) {
  return service({
    url: '/service/' + id,
    method: 'put',
    data
  })
}

// 删除 服务
export function deleteServiceType(id) {
  return service({
    url: '/service/' + id,
    method: 'delete',
  })
}