import { asyncRoutes, constantRoutes } from '@/router'
import {getMenus} from "@/api/menu";
import Layout from '@/layout'


/**
 * Use meta.role to determine if the current user has Permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => {
      route.meta.roles.includes(role)})
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    //将静态的路由连接上根据权限获得路由
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 原版的 generateRoutes
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  // 根据roles 到后台去获取路由
  generateRoutes2({ commit }, roles) {
    return new Promise(resolve => {
      getMenus(roles).then(res=>{
        let accessedRoutes = []
        generaMenu(accessedRoutes, res.data)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(err=>{
        console.log(err)
      })

      //没用了，根据后台数据来分权限了
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
    })
  }
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    // alert(JSON.stringify(item))
    const menu = {
      path:  item.path,
      component: item.pid == -1 ? Layout : () => import(`@/views/${item.component}`),
      //component: item.pid === '-1' ? Layout :  (resolve) => require([item.component], resolve),
      // hidden: true,
      children: null,
      name: item.pid == -1? null: item.name,
      meta: item.pid == -1 ? {icon:item.meta.icon, title: item.meta.title}  //hidden 在后端控制
        : { title: item.meta.title, icon:item.meta.icon, affix:item.meta.affix, hidden:item.meta.hidden }
    }
    if (item.children) {
      if(menu.children == null){
        menu.children = []
      }
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
  console.log('routes', routes)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
