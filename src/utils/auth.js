import Cookies from 'js-cookie'//操作cookie的插件

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

//cookie存放用户token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
