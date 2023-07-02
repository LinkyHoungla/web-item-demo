import service from '@/util/request'

export function login(data) {
  return service({
    url: '/login/admin',
    method: 'post',
    data
  })
}