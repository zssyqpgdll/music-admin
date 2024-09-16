import request from '@/utils/request'

const base = '/column'

export function update(data){
  return request({
    url: base + '/update',
    method: 'post',
    data
  })
}

export function get(data){
  return request({
    url: base + '/records/1' ,
    method: 'get'
  })
}
