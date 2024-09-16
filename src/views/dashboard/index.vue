<template>
  <!--主体部分，头部和侧边栏在其他地方-->
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import adminDashboard from './admin'//不需要了，只要一个用户主页
import userDashboard from './user'
import request_dc from '@/utils/request_dc'//不需要用

  export default {
    name: "Dashboard",

    //两个组件，代表针对不同身份的主页
    components: {adminDashboard, userDashboard},

    data(){
      return{
        //初始默认是管理员主页
        currentRole: 'adminDashboard'
      }
    },

    //监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理
    //watch主要用于监控vue实例的变化，它监控的变量当然必须在data里面声明才可以，它可以监控一个变量，也可以是一个对象
    //computed多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化
    computed:{
      ...mapGetters(['roles'])//监控store/modules/user.js中的rules数组变量的变化
    },

    created() {
      //当打开后台管理系统进入主页时，打开的主页是用户主页，没有管理员主页了
      this.currentRole = 'userDashboard'
      // if(!this.roles.includes('admin')){
      //   this.currentRole = 'userDashboard'
      // }
    },
    mounted(){
      // request_dc({
      //   url: '/sql/s3fdc5bcb1c85868fbfd5ec882dc73407/getCjlw',
      //   method: 'post'
      // }).then(res=>{
      //   // console.log(res)
      // }).catch(error => {
      //   // console.log(error)
      // })
    }
  }
</script>

<style scoped>

</style>
