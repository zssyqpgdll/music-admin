import request from '@/utils/request'

const base = '/route'

export function getMenus(roleName){
  return request({
    url: base + '/getRoutes/' + roleName,
    method: 'get',
  })
}

export function getAllMenus(){
  return request({
    url: base + '/getRoutes',
    method: 'get',
  })
}

export function get(page){
  return request({
    url: base + '/notices/' + page,
    method: 'get',
  })
}

export function add(data){
  return request({
    url: base + '/add',
    method: 'post',
    data
  })
}

export function modify(data) {
  return request({
    url: base + '/modify',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: base + '/delete/' + id,
    method: 'get',
  })
}
