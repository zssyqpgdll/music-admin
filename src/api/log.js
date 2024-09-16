import request from '@/utils/request'
import {getToken} from "@/utils/auth";

const base = '/log'

export function search(keyword){
  return request({
    url: base + '/search/' + keyword,
    method: 'get',
  })
}

export function search2(keyword, page, pagesize){
  return request({
    url: base + '/search/' + keyword,
    method: 'get',
  })
}

//按页面获取日志数据
export function get(page){
  return request({
    url: base + '/logs/' + page,
    method: 'get',
  })
}

export function get2(){
  return request({
    url: base + '/logs',
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
