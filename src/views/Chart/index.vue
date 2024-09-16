<template>
  <div class="dashboard-editor-container">
    <el-row style="background: #fff;padding: 24px 24px 0;margin-bottom: 32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col  :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div>会员情况</div>
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div>经费收支</div>
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
<!--          <pie-chart />-->
          <div>系统功能</div>
          <tagsCloud style="margin: 0px auto;" class="tags-cloud" :useArray="useArray" :boxWidth="300" :speed="2000" :randomColor="true"></tagsCloud>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LineChart from "./LineChart"
  import RaddarChart from "./RaddarChart"
  import PieChart from "./PieChart"
  import BarChart from "@/views/dashboard/admin/components/BarChart"
  import TagsCloud from '@/components/TagsCloud/tagsCloud'
  import {lineChart} from "@/api/chart";

  const lineChartData = {
    apps:{
      expectedData:[2,5,9,11,17,19,26],
      actualData:[1,3,6,8,14,17,22],
      xData:[1,2,3,4,5,6,7]
    }
  }

  export default {
    name: "index",
    components:{
      LineChart,
      TagsCloud,
      RaddarChart,BarChart,PieChart
    },
    data(){
      return{
        lineChartData: lineChartData.apps,
        useArray: [
          {
            "name":"工会管理",
            "url":"Enoch_Eastwood8658@twipet.com"
          },
          {
            "name":"工会活动",
            "url":"Doris_Wade7948@bulaffy.com"
          },
          {
            "name":"慰问疗养",
            "url":"Ilona_Vallory9282@corti.com"
          },
          {
            "name":"保险申请",
            "url":"Jenna_Kennedy5321@bretoux.com"
          },
          {
            "name":"会费缴纳",
            "url":"Anabelle_Addison3322@nickia.com"
          },
          {
            "name":"社团活动",
            "url":"Chelsea_Jones2342@bretoux.com"
          },
          {
            "name":"通知管理",
            "url":"Roger_Khan5716@naiker.biz"
          },
          {
            "name":"日志管理",
            "url":"Hayden_Ellery25@gembat.biz"
          },
          {
            "name":"会员管理",
            "url":"Josh_Cobb1642@yahoo.com"
          }
        ],
        height: 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        lineChart().then(res=>{
          lineChartData.apps.expectedData = res.data.outcome
          lineChartData.apps.actualData = res.data.income
          lineChartData.apps.xData = res.data.x

          console.log(res.data)
        })
      })
    },
    methods:{
      handleSetLineChartData(type){
        this.lineChartData = lineChartData[type]
      }
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
