import request from '@/utils/request'

const base = '/article'

export function fetchList(query) {
  return request({
    url: base + '/list',
    method: 'get',
    params: query
  })
}

export function add(data) {
  return request({
    url: base + '/add',
    method: 'post',
    data
  })
}

export function fetchArticle(id) {
  return request({
    url: base + '/fetchOne',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
