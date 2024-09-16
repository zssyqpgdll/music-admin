import request from '@/utils/request'

export function  getDashData(){
  return request({
    url: '/data',
    method: 'post'
  });
}

export function  getGraphData(){
  return request({
    url: '/data/relation.json',
    method: 'get'
  });
}

export function getTianqi(){
  return request({
    url: 'https://www.tianqiapi.com/api/',
    method: 'get',
    params: {
      appid: '26148275',
      appsecret: '2id6H48Y',
      version: 'v6'
    }
  });
}
