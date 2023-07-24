import service from "@/util/request"

// 获取 店铺 列表
export function getStoreList(params) {
  return service({
    url: '/store/list',
    method: 'get',
    params
  })
}

// 获取 店铺 信息
export function getStoreInfo(id) {
  return service({
    url: '/store/' + id,
    method: 'get',
  })
}

// 添加 店铺
export function addStore(data) {
  return service({
    url: '/store',
    method: 'post',
    data
  })
}

// 修改 店铺
export function updateStore(id, data) {
  return service({
    url: '/store/' + id,
    method: 'put',
    data
  })
}

// 删除 店铺
export function deleteStore(id) {
  return service({
    url: '/store/' + id,
    method: 'delete',
  })
}