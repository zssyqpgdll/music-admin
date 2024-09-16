import request from '@/utils/request'
import {getToken} from "@/utils/auth";

const base = '/notice'

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
