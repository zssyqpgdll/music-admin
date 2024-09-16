import request from '@/utils/request'
import {getToken} from "@/utils/auth";

//登陆，data是用户名和密码的字典
export function login(data) {
  return request({
    // url: '/admin/login',
    url: '/user/login',
    method: 'post',
    data
  })
}

/* 根据token获取信息 */
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    headers:{'token': token},
    // params: { token }
  })
}

export function search(keyword){
  return request({
    url: '/user/search/' + keyword,
    method: 'get',
  })
}

//data是关键字
export function search2(data){
  return request({
    url: '/user/search2',
    method: 'post',
    data
  })
}

export function getUsers(page){
  return request({
    url: '/user/users/' + page,
    method: 'get',
  })
}

//添加用户，data是用户表单
export function add(data){
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

//data是id，不是用户id
export function del(data){
  return request({
    url: '/user/del',
    method: 'post',
    headers:{'token': getToken()},
    data
  })
}

/* 修改信息，修改密码，data是编辑用户表单数据 */
export function modify(data) {
  console.log(data)
  return request({
    url: '/user/modify',
    method: 'post',
    headers:{'token': getToken()},
    data
  })
}

// export function logout(data) {
//   return request({
//     url: '/admin/logout',
//     method: 'post',
//     data: {"token":data}
//   })
// }

//获取管理员信息
// export function adminInfo(realname){
//   return request({
//     url: '/user/admin',
//     method: 'post',
//     realname
//   })
// }