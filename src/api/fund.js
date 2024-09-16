import request from '@/utils/request'
import {getToken} from "@/utils/auth";

const base = '/fund'

export function search(data){
  return request({
    url: base + '/search',
    method: 'post',
    data
  })
}

export function get(page, limit){
  return request({
    url: base + base + 's/' + page,
    method: 'get',
    params:{'limit': limit}
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
