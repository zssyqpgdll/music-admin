import request from '@/utils/request'

const base = '/banner'

export function update(data){
  return request({
    url: base + '/update',
    method: 'post',
    data
  })
}

export function get(data){
  return request({
    url: base + '/banners/1' ,
    method: 'get'
  })
}
