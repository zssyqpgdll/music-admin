<template>
  <el-row :gutter="40" class="panel-group">
    <!--第一个panel-->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <!-- 点击事件都取消，无用 -->
      <div class="card-panel" @click="handleSetLineChartData('apps')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- svg-icon 用户图标 -->
          <svg-icon icon-class="user" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户数</div>
          <!-- 数字从0开始增长，直到v1值 -->
          <count-to :start-val="0" :end-val="v1" :duration="3000" class="card-panel-num"/>人
        </div>
      </div>
    </el-col>

    <!--第二个panel-->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <!-- 点击事件都取消，无用 -->
      <div class="card-panel" @click="handleSetLineChartData('services')">
        <div class="card-panel-icon-wrapper icon-example">
          <!-- svg-icon 星星图标 -->
          <svg-icon icon-class="star" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">实名认证人数</div>
          <count-to :start-val="0" :end-val="v2" :duration="3000" class="card-panel-num"/>人
        </div>
      </div>
    </el-col>

    <!--第三个panel-->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <!-- 点击事件都取消，无用 -->
      <div class="card-panel" @click="handleSetLineChartData('services')">
        <div class="card-panel-icon-wrapper icon-list">
          <!-- svg-icon 音乐图标 -->
          <svg-icon icon-class="music" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">歌曲数</div>
          <count-to :start-val="0" :end-val="v3" :duration="3000" class="card-panel-num"/>首
        </div>
      </div>
    </el-col>

    <!--第四个panel-->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <!-- 点击事件都取消，无用 -->
      <div class="card-panel" @click="handleSetLineChartData('services')">
        <div class="card-panel-icon-wrapper icon-component">
         <!-- svg-icon 歌手图标 -->
          <svg-icon icon-class="singer" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">歌手数</div>
          <count-to :start-val="0" :end-val="v4" :duration="3000" class="card-panel-num"/>位
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'//数字滚动插件，将在指定的持续时间内计入目标数

  export default {
    name: "PanelGroup",

    components:{CountTo},
    
    //接收来自父组件的参数
    props: {
      v1: {
        type: Number,
        default: 13
      },

      v2: {
        type: Number,
        default: 60
      },

      v3: {
        type: Number,
        default: 120
      },

      v4: {
        type: Number,
        default: 34
      },
    },

    methods:{
      // handleSetLineChartData(type) {
      //   this.$emit('handleSetLineChartData', type)
      // }
    }
  }
</script>

<style lang="scss" scoped>
.panel-group{
  margin-top: 18px;

  .card-panel-col{
    margin-bottom: 32px;
  }

  .card-panel{
    height: 108px;
    cursosr: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);


  .card-panel-icon-wrapper{
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px
  }

  .card-panel-icon{
    float: left;
    font-size: 48px;
  }

  .card-panel-description{
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;

    .card-panel-text{
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 12px;
    }

    .card-panel-num{
      font-size: 20px;
    }
  }

  &:hover{
    .card-panel-icon-wrapper{color: #fff}

    .icon-people{background: #13ce66}

    .icon-example{background: #13b2ce}

    .icon-list{background: #1354ce}

    .icon-component{background: #6113ce}

  }
  .icon-people{color: #13ce66}

  .icon-example{color: #13b2ce}

    .icon-list{color: #1354ce}

    .icon-component{color: #6113ce}
  }
}


</style>
