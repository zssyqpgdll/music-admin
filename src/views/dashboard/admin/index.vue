<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background: #fff;padding: 24px 24px 0;margin-bottom: 32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col  :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div>数据访问</div>
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div>数据质量</div>
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
<!--          <pie-chart />-->
          <div>数据资产云</div>
          <tagsCloud style="margin: 0px auto;" class="tags-cloud" :useArray="useArray" :boxWidth="300" :speed="2000" :randomColor="true"></tagsCloud>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">

      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">

      </el-col>

    </el-row>
  </div>
</template>

<script>
  import PanelGroup from "./components/PanelGroup"
  import LineChart from "./components/LineChart"
  import RaddarChart from "./components/RaddarChart"
  import PieChart from "./components/PieChart"
  import BarChart from "./components/BarChart"
  import TagsCloud from '@/components/TagsCloud/tagsCloud'
  import TransactionTable from './components/TransactionTable'

  const lineChartData = {
    apps:{
      expectedData:[2,5,9,11,17,19,26],
      actualData:[1,3,6,8,14,17,22]
    },
    services:{
      actualData:[4,568,704,768,928,996,1010]
    }
  }

  export default {
    name: "index",
    components:{
      PanelGroup,
      LineChart,
      TagsCloud,
      RaddarChart,BarChart,PieChart,TransactionTable
    },
    data(){
      return{
        lineChartData: lineChartData.apps,
        useArray: [
          {
            "name":"学工",
            "url":"Enoch_Eastwood8658@twipet.com"
          },
          {
            "name":"一卡通",
            "url":"Doris_Wade7948@bulaffy.com"
          },
          {
            "name":"宿舍",
            "url":"Ilona_Vallory9282@corti.com"
          },
          {
            "name":"辅导猫",
            "url":"Jenna_Kennedy5321@bretoux.com"
          },
          {
            "name":"微信通",
            "url":"Anabelle_Addison3322@nickia.com"
          },
          {
            "name":"人事",
            "url":"Chelsea_Jones2342@bretoux.com"
          },
          {
            "name":"教务",
            "url":"Roger_Khan5716@naiker.biz"
          },
          {
            "name":"房产",
            "url":"Hayden_Ellery25@gembat.biz"
          },
          {
            "name":"科研",
            "url":"Josh_Cobb1642@yahoo.com"
          },
          {
            "name":"资产",
            "url":"Helen_Edmonds7735@nickia.com"
          },
          {
            "name":"体育锻炼",
            "url":"Chelsea_Owen9510@iatim.tech"
          },
          {
            "name":"校地合作",
            "url":"Henry_Isaac3381@elnee.tech"
          },
          {
            "name":"产教平台",
            "url":"Carl_Archer9164@acrit.org"
          },
          {
            "name":"毕业设计",
            "url":"Hank_Overson9487@atink.com"
          },
          {
            "name":"顶岗实习",
            "url":"Kieth_Chappell2652@eirey.tech"
          },
          {
            "name":"实践教学",
            "url":"Julian_Woodley9025@elnee.tech"
          },
          {
            "name":"学生社团",
            "url":"Lexi_Plant6418@hourpy.biz"
          },
          {
            "name":"智慧安防",
            "url":"Denis_Dillon5646@ovock.tech"
          },
          {
            "name":"智慧购电",
            "url":"Henry_Shaw199@cispeto.com"
          },
          {
            "name":"GIS地理信息",
            "url":"Maxwell_Vinton7120@qater.org"
          },
          {
            "name":"新闻",
            "url":"Marina_Gordon9750@elnee.tech"
          },
          {
            "name":"图书馆",
            "url":"Nicholas_Shields5568@mafthy.com"
          },
          {
            "name":"速通门",
            "url":"Benjamin_Jones2756@brety.org"
          },
          {
            "name":"高校状态库",
            "url":"Bob_Brett4807@sveldo.biz"
          },
          {
            "name":"站群",
            "url":"Kirsten_Booth9232@nimogy.biz"
          },
          {
            "name":"口袋校园",
            "url":"Rick_Evans5938@grannar.com"
          },
          {
            "name":"人脸数据",
            "url":"Sebastian_Woodley7482@gompie.com"
          },
          {
            "name":"OA",
            "url":"Oliver_Weasley4931@typill.biz"
          },
          {
            "name":"超星学习通",
            "url":"Nicole_Ellison9614@supunk.biz"
          }
        ],
        height: 0
      }
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