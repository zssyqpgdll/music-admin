<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import  * as echarts from "echarts"
import resize from './mixins/resize'
import {getDashData, getGraphData} from "@/api/dash";
import {relationGraph} from "@/api/chart";

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '650px'
    }
  },
  data() {
    return {
      chart: null,
      graph: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      relationGraph().then(res=>{
        console.log(res.data)
        this.graph = res.data
        this.initChart()
      }).catch(error=>{
        console.log(error)
      })
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      // this.chart = echarts.init(this.$el, 'macarons')
      this.chart = echarts.init(this.$el,'dark')

      let graph = this.graph;
      // console.log(graph)
      this.chart.setOption(
         {
          title: {
            text: 'IP资产关系图谱',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {},
          darkMode: true,
          legend: [{
            // selectedMode: 'single',
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }],
          animationDuration: 3000,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              name: '中药材关系图谱',
              type: 'graph',
              layout: 'none',
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              label: {
                position: 'right',
                formatter: '{b}'
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              },
              emphasis: {
                focus: 'adjacency',
                lineStyle: {
                  width: 10
                }
              }
            }
          ]
        }
      )
    }
  }
}
</script>
