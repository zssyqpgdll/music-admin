import Vue from "vue";
import Router from "vue-router";


//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
Vue.use(Router)

/* Layout布局 */
import Layout from '@/layout'

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
//const Foo = { template: '<div>foo</div>' }
//const Bar = { template: '<div>bar</div>' }

/**
 * constantRoutes
 * a base page that does not have Permission requirements没有权限要求的基本页
 * all roles can be accessed所有角色路由都可以被访问
 *
 */
export const constantRoutes = [
  //重定向组件配置了动态路由
  {
    path: 'redirect',
    component: Layout,
    hidden: true,//隐藏
    children: [
      {
        //表示匹配零个或多个路由，比如路由为 /redirect 时，仍然能匹配到 Layout 组件
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // {
  //     path: '/login',
  //     component: ()=> import('@/views/login/index'),
  //     hidden: true
  // },

  //登陆路由
  {
    path: '/login',
    component: () => import('@/components/Login/Login'),
    hidden: true
  },

  //用不到
  // {
  //   path: '/create',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/create',
  //       component: () => import('@/views/Article/create'),
  //       name: 'CreateArticle',
  //       meta: { title: '创建文章', noCache: true, activeMenu: '/Article/list' },

  //     }
  //   ],
  //   hidden: true
  // },

  //用不到
  // {
  //   path: '/edit/:id(\\d+)',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/edit/:id(\\d+)',
  //       component: () => import('@/views/Article/edit'),
  //       name: 'EditArticle',
  //       meta: { title: '编辑文章', noCache: true, activeMenu: '/Article/list' },

  //     }
  //   ],
  //   hidden: true
  // },

  //用不到
  // {
  //   path: '/show/:id(\\d+)',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/show/:id(\\d+)',
  //       component: () => import('@/views/Article/show'),
  //       name: 'ShowArticle',
  //       meta: { title: '查看资讯', noCache: true, activeMenu: '/Article/list' },

  //     }
  //   ],
  //   hidden: true
  // },

  //用不到
  // {
  //   path: '/dash1',   //数据大屏带中国地图的
  //   component: () => import('@/views/Daping/Brand'),
  //   hidden: true
  // },

  //用不到
  // {
  //   path: '/dash2',   //数据大屏带中国地图的
  //   component: () => import('@/views/Daping/Home'),
  //   hidden: true
  // },

  //用不到
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // },
  
  //用不到
  // {
  //   path: '/404',
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // },

  //用不到
  // {
  //   path: '/401',
  //   component: () => import('@/views/error-page/401'),
  //   hidden: true
  // },

  //主页
  {
    path: '/',//根路由
    component: Layout,//组件
    redirect: '/dashboard',//重定向到主页
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        //传到layout中
        meta: {title: '主页', icon: 'dashboard', affix: true}
      }
    ]
  },


  // {
  //   path: '/profile',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/profile',
  //       component: () => import('@/components/test/UserProfile'),
  //       name: 'Profile',
  //       //传到layout中
  //       meta: {title: '个人信息', icon: 'user', affix: false}
  //     }
  //   ]
  // },

]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/users',
    component: Layout,
    // meta:{ roles: ['admin'] },
    children: [
      {
        path: '/users',
        component: () => import('@/views/User/UserList'),
        name: 'UserList',
        //传到layout中
        meta: {title: '用户管理', icon: 'peoples', affix: false}
      }
    ]
  },
  
  // {
  //   path: '/news',
  //   component: Layout,
  //   meta:{ roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/News/NewsList'),
  //       name: 'NewsList',
  //       //传到layout中
  //       meta: {title: '事务管理', icon: 'news', affix: false}
  //     }
  //   ]
  // } ,
  // {
  //   path: '/notices',
  //   component: Layout,
  //   meta:{ roles: ['admin'] },
  //   children: [
  //     {
  //       path: '/notices',
  //       component: () => import('@/views/Notice/NoticeList'),
  //       name: 'NoticeList',
  //       //传到layout中
  //       meta: {title: '通知管理', icon: 'notice', affix: false}
  //     }
  //   ]
  // },
  // {
  //   path: '/roles',
  //   component: Layout,
  //   meta:{ roles: ['admin'], title: '系统权限' },
  //   children: [
  //     {
  //       path: '/roles',
  //       component: () => import('@/views/Permission/Role'),
  //       name: 'roles',
  //       //传到layout中
  //       meta: {title: '系统权限', icon: 'role', affix: false }
  //     }
  //   ]
  // },
  // {
  //   path: '/upload',
  //   component: Layout,
  //   meta:{
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: '/upload',
  //       component: () => import('@/views/Upload/PicUpload'),
  //       name: 'upload',
  //       //传到layout中
  //       meta: {title: '上传图片', icon: 'upload', affix: false }
  //     }
  //   ]
  // },
  // {
  //   path: '/piclist',
  //   component: Layout,
  //   meta:{
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: '/piclist',
  //       component: () => import('@/views/Upload/PicList'),
  //       name: 'upload',
  //       //传到layout中
  //       meta: {title: '图库管理', icon: 'upload', affix: false }
  //     }
  //   ]
  // },

  //日志管理
  {
    path: '/logs',
    component: Layout,
    // meta:{roles: ['admin']},
    children: [
      {
        path: '/logs',
        component: () => import('@/views/Log/LogList'),
        name: 'logs',
        //传到layout中
        meta: {title: '日志管理', icon: 'logs', affix: false }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const createRouter = () => new Router({
  scrollBehavior: () => ({y: 0}),//异步滚动操作
  routes: constantRoutes
})

const router = createRouter()

// // 4. 创建和挂载根实例。
// // 记得要通过 router 配置参数注入路由，
// // 从而让整个应用都有路由功能
// const app = new Vue({
//     router
// }).$mount('#app')

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router;
