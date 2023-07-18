import service from '@/util/request'

// 获取侧边栏菜单
export function getMenus() {
  return service({
    url: '/menu',
    method: 'get',
  })
}

// 获取 路径 列表
export function getPageList() {
  return service({
    url: '/page/list',
    method: 'get',
  })
}