import Vue from 'vue'
//模态弹出窗口，基于Vue实现的Modal窗口，单独组件，方便使用，还很美观
import VModal from "vue-js-modal"
//js-cookie插件是一个JS操作cookie的插件，轻量级
//平时使用 cookie 进行缓存时，主要以  储存、获取、删除 三种方式，js-cookie也是如此，避免了像原生操作 cookie 的繁琐
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'
//引入element-ui组件
import Element from 'element-ui'
import './styles/element-variables.scss'
//引入echarts，用于绘图
import echarts from "echarts";

import '@/styles/index.scss'  //全局 css

import App from './App.vue'
import store from './store'
import router from './router'

import './icons'//icon

import './permission'//Permission
//error-log

//注册echarts
Vue.prototype.$echarts = echarts

//注册Element
//初始化设置全局大小，设置默认和刷新浏览器设置为你指定的大小
Vue.use(Element,{
  size: Cookies.get('size') || 'medium'
})

//注册模态弹出窗口
Vue.use(VModal)

//阻止启动生产消息
//开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h=>h(App)
})
