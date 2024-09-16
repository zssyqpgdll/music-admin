<template>
  <!--主体部分，头部和侧边栏在其他地方-->
  <div class="dashboard-editor-container">
    <!--主体分两部分，上面部分展示用户数量、实名认证人数、歌曲数、歌手数-->
    <!--点击四个图标各显示不同的图-->
    <!--v1~v4四个参数传到../admin/components/PanelGroup.vue中去-->
    <panel-group :v1="users" :v2="logs" :v3="three" :v4="four"
                 @handleSetLineChartData="handleSetLineChartData" />

    <!--主体分两部分，下面部分展示最近几天的登陆流量-->
    <el-row style="background: #fff;padding: 24px 24px 0;margin-bottom: 32px;">
      <!--参数chart-data传到../admin/components/LineChart.vue中去-->
      <line-chart :chart-data="lineChartData"/>
    </el-row>

  </div>
</template>

<script>
  import PanelGroup from "../admin/components/PanelGroup"
  import LineChart from "../admin/components/LineChart"
  import {loginChart, panelGroup} from "@/api/chart";

  //折线图初始数据
  const lineChartData = {
    apps:{
      expectedData:[12,35,69,161,217,359,236],
      // actualData:[1,3,6,8,14,17,22],
      xData:['21-4-1', '21-4-30', '21-6-30', '21-8-31', '21-10-31', '21-11-17', 'today']
    }
  }

  export default {
    name: "index",

    components:{
      PanelGroup,
      LineChart
    },
    
    data(){
      return{
        lineChartData: lineChartData.apps,//折线图初始数据
        height: 0,
        users: 0,//PanelGroup 第一个，用户数初始为0
        logs: 0,//PanelGroup 第二个，实名认证人数初始为0
        three: 0,//PanelGroup 第三个，歌曲数为0
        four: 0//PanelGroup 第四个，歌手数为0
      }
    },

    mounted(){
      // panelGroup 面板统计功能
      panelGroup().then(res=>{
        this.users = res.data.users//用户数
        this.logs = res.data.logs//实名认证人数
        this.three = res.data.three//歌曲数
        this.four = res.data.four//歌手数
      }).catch(error=>{
        console.log(error)
      })

      // 登陆流量折线图
      loginChart().then(res=>{
        console.log('loginChartData',res);
        this.lineChartData = res.data
      }).catch(error=>{
        console.log(error)
      })
    },

    methods:{
      //用于改变点击统计面板之后显示不同的图
      // handleSetLineChartData(type){
      //   this.lineChartData = lineChartData[type]
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container{
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
      text-align: center;
    }
  }
</style>
