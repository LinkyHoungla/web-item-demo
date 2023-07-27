import game from "@/util/request"

// 获取 服务 列表
export function getGameList(params) {
  return game({
    url: '/game/list',
    method: 'get',
    params
  })
}

// 添加 服务
export function addGame(data) {
  return game({
    url: '/game',
    method: 'post',
    data
  })
}

// 修改 服务
export function updateGame(id, data) {
  return game({
    url: '/game/' + id,
    method: 'put',
    data
  })
}

// 删除 服务
export function deleteGame(id) {
  return game({
    url: '/game/' + id,
    method: 'delete',
  })
}