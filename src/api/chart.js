import request from '@/utils/request'
import {getToken} from "@/utils/auth";

const base = '/chart'

/* 地图 */
export function search(keyword){
  return request({
    url: base + '/map/search/' + keyword,
    method: 'get',
  })
}


export function refresh(){
  return request({
    url: base + '/map/refresh',
    method: 'post'
  })
}

export function geometryCouties(code) {
  return request({
    url: '/data/geometryCouties/' + code + '.json',
    method: 'get'
  })
}

export function geometryProvince(code) {
  return request({
    url: '/data/geometryProvince/' + code + '.json',
    method: 'get'
  })
}

/* panelGroup面板统计 */
export function panelGroup() {
  return request({
    url: base + '/panel',
    method: 'get'
  })
}

/* 关系图 */
export function relationGraph() {
  return request({
    url: base + '/graph/relation',
    method: 'get'
  })
}

/* 登录流量 */
export function loginChart() {
  return request({
    url: base + '/loginData',
    method: 'get'
  })
}

export function pieChart() {
  return request({
    url: base + '/userGroupData',
    method: 'get'
  })
}

export function raddarChart() {
  return request({
    url: base + '/raddarChart',
    method: 'get'
  })
}

export function lineChart() {
  return request({
    url: base + '/lineChart',
    method: 'get'
  })
}
