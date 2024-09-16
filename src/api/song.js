import request from '@/utils/request'

const base = '/song'

//data是关键字
export function search(data){
  return request({
    url: base + '/search/',
    method: 'post',
    data
  })
}

//查询指定页面的歌曲数据
export function get(page){
  return request({
    url: base + '/records/' + page,
    method: 'get',
  })
}

//data时添加歌曲表单数据
export function add(data){
  return request({
    url: base + '/add',
    method: 'post',
    data
  })
}

//data是歌曲编辑表单数据
export function modify(data) {
  return request({
    url: base + '/modify',
    method: 'post',
    data
  })
}

//按照id而不是iid删除歌曲
export function del(id) {
  return request({
    url: base + '/delete/' + id,
    method: 'get',
  })
}

export function geturl(id) {
  return request({
    url: base + '/geturl/' + id,
    method: 'get',
  })
}
