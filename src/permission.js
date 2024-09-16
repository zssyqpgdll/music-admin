import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from "@/utils/get-page-title"; // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/auth-redirect']

//为啥这里要加async ??
router.beforeEach(async(to, from, next) =>{
    NProgress.start()
    document.title = getPageTitle(to.meta.title)
    const hasToken = getToken()
    if(hasToken){
        console.log('hasToken =>' + to.path)
        // if is logged in, redirect to the home page
        if(to.path === '/login'){
            next({path:'/'})
            NProgress.done()
        }else{
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if(hasRoles){
                console.log('hasRoles =>')
                next()
            }else{
               try{
                 console.log("has no Roles,get roles begin => ")
                 //获取用户角色
                 let {roles} = await store.dispatch('user/getInfo')
                 roles = 'sadmin'
                 console.log('roles', roles)
                 //基于角色生成可以访问的路由map
                 console.log('GenerateRoutes => ')
                 const accessRoutes = await store.dispatch('permission/generateRoutes2', roles)
                 //动态加入路由
                 router.addRoutes(accessRoutes)
                 //...是所谓hack method ，确保addRoutes的操作已经完成
                 //replace操作使得导航不会带有历史记录
                 next({...to, replace: true})
               }catch(error){
                await store.dispatch('user/resetToken')
                 Message.error(error|| 'Has Error')
                 next(`/login?redirect=${to.path}`)
                 NProgress.done()
               }
            }
        }
    }else{
        /* has no token */
        if(whiteList.indexOf(to.path) !== -1){
            // in the free login whitelist, go directly
            next()
        }else{
            // redirect to login page
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(()=>{
    NProgress.done()
})
