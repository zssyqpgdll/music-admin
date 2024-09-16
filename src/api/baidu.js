import request from '@/utils/request'

const base = '/baidu'

export function deleteSimilar(fileName){
  return request({
    url: base + '/deleteSimilarFile',
    params: {'fileName':fileName},
    method: 'get'
  })
}

export function get(page){
  return request({
    url: base + '/pics/' + page,
    method: 'get',
  })
}
