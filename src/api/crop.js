import request from '@/utils/request'

const base = '/crop'

export function search(data){
  return request({
    url: base + '/search/' ,
    method: 'post',
    data
  })
}

export function get(page){
  return request({
    url: base + '/records/' + page,
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
