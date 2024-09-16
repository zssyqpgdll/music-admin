import request from '@/utils/request'

const base = '/news'

export function search(keyword){
  return request({
    url: base + '/search/' + keyword,
    method: 'get',
  })
}

export function search2(data){
  return request({
    url: base + '/search2',
    method: 'post',
    data
  })
}

export function get(page){
  return request({
    url: base + '/news/' + page,
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

/* 修改信息，修改密码 */
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
