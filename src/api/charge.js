import request from '@/utils/request'
import {getToken} from "@/utils/auth";

const base = '/order'

export function search(data, limit, type){
  return request({
    url: base + '/search',
    method: 'post',
    data,
    params:{'limit': limit,'type': type}
  })
}

export function get(page, limit, type){
  return request({
    url: base + base + 's/' + page,
    method: 'get',
    params:{'limit': limit,'type': type}
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
