import request from '@/utils/request'

const base = '/singer'

//data是搜索的关键字
export function search(data){
  return request({
    url: base + '/search/',
    method: 'post',
    data
  })
}

//查询指定页面的歌手数据
export function get(page){
  return request({
    url: base + '/records/' + page,
    method: 'get',
  })
}

//data是添加歌手表单数据
export function add(data){
  return request({
    url: base + '/add',
    method: 'post',
    data
  })
}

//data是编辑歌手表单数据
export function modify(data) {
  return request({
    url: base + '/modify',
    method: 'post',
    data
  })
}

//通过id而不是suid删除歌手数据
export function del(id) {
  return request({
    url: base + '/delete/' + id,
    method: 'get',
  })
}
