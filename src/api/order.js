import service from "@/util/request"

// 获取 陪玩 列表
export function getOrderList(params) {
  return service({
    url: '/order/list',
    method: 'get',
    params
  })
}

// 获取 陪玩 信息
export function getOrderInfo(id) {
  return service({
    url: '/order/' + id,
    method: 'get',
  })
}

// 添加 陪玩
export function addOrder(data) {
  return service({
    url: '/order',
    method: 'post',
    data
  })
}

// 修改 陪玩
export function updateOrder(id, data) {
  return service({
    url: '/order/' + id,
    method: 'put',
    data
  })
}

// 删除 陪玩
export function deleteOrder(id) {
  return service({
    url: '/order/' + id,
    method: 'delete',
  })
}