import request from '@/utils/request'

const base = '/comment'

export function search(data){
  return request({
    url: base + '/search/' ,
    method: 'post',
    data
  })
}

export function list(username){
  return request({
    url: base + '/fontsearch/' + username,
    method: 'get',
  })
}


export function get(page, limit){
  return request({
    url: base +   '/records/' + page,
    method: 'get',
    params:{'limit': limit}
  })
}

export function remove(id){
  return request({
    url: base + '/delete/' + id,
    method: 'get',
  })
}

export function add(data){
  return request({
    url: base + '/add' ,
    method: 'post',
    data
  })
}
