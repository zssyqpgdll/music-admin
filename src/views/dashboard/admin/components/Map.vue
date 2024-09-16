<template>
  <div id="">
    <div :class="className" :style="{height:height,width:width}"  ref="myEchart" @click.stop="clickOther()" @mousedown="mousedown" @mouseup="mouseup"></div>
  </div>
</template>

<script>
  import  * as echarts from "echarts"
  import resize from './mixins/resize'
  import {geometryCouties,geometryProvince} from '@/api/chart'
  import 'echarts/map/js/china.js';
  import {provinceNameArr, cityNameData, provinceNameChineseToEng, cityNameChineseToEng} from '@/lib/geoNameDictionary.js'; // 引入省市对应英文名字

  export default {
    mixins: [resize],
    name: 'Map',
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
      },
      title: {
        type: String,
        default: '中药产地分布图'
      },
      data:{
        type: Array,
        default: function() {
          return [
          {name: "长沙", value: 190},
          {name: '衢州', value: 177},
          {name: '廊坊', value: 193},
          {name: '菏泽', value: 194},
          {name: '合肥', value: 229},
          {name: '武汉', value: 273},
          {name: '大庆', value: 279}
        ]}
      }
    },
    watch:{
      data(val, oldVal){//普通的watch监听
        // console.log("watch")
        // console.log(val);
        if(val!=oldVal)
          this.chinaConfigure()
      },
    },
    data() {
      return {
        echart: null,

        // echart地图的配置项
        option: {},

        // 地图拖动起止位置（用于拖动不触发返回事件）
        mouse_position: {
          beginX: '',
          beginY: '',
          endX: '',
          endY: '',
        },

        // 地区类型：country, province, city
        placeType: 'country',
        // 当前省
        province: {
          name: '',
          code: '',
        },
        // 当前市
        city: {
          name: '',
          code: '',
        },
        geoCoordMap: {
          '海门':[121.15,31.89],
          '鄂尔多斯':[109.781327,39.608266],
          '招远':[120.38,37.35],
          '舟山':[122.207216,29.985295],
          '齐齐哈尔':[123.97,47.33],
          '盐城':[120.13,33.38],
          '赤峰':[118.87,42.28],
          '青岛':[120.33,36.07],
          '乳山':[121.52,36.89],
          '金昌':[102.188043,38.520089],
          '泉州':[118.58,24.93],
          '莱西':[120.53,36.86],
          '日照':[119.46,35.42],
          '胶南':[119.97,35.88],
          '南通':[121.05,32.08],
          '拉萨':[91.11,29.97],
          '云浮':[112.02,22.93],
          '梅州':[116.1,24.55],
          '文登':[122.05,37.2],
          '上海':[121.48,31.22],
          '攀枝花':[101.718637,26.582347],
          '威海':[122.1,37.5],
          '承德':[117.93,40.97],
          '厦门':[118.1,24.46],
          '汕尾':[115.375279,22.786211],
          '潮州':[116.63,23.68],
          '丹东':[124.37,40.13],
          '太仓':[121.1,31.45],
          '曲靖':[103.79,25.51],
          '烟台':[121.39,37.52],
          '福州':[119.3,26.08],
          '瓦房店':[121.979603,39.627114],
          '即墨':[120.45,36.38],
          '抚顺':[123.97,41.97],
          '玉溪':[102.52,24.35],
          '张家口':[114.87,40.82],
          '阳泉':[113.57,37.85],
          '莱州':[119.942327,37.177017],
          '湖州':[120.1,30.86],
          '汕头':[116.69,23.39],
          '昆山':[120.95,31.39],
          '宁波':[121.56,29.86],
          '湛江':[110.359377,21.270708],
          '揭阳':[116.35,23.55],
          '荣成':[122.41,37.16],
          '连云港':[119.16,34.59],
          '葫芦岛':[120.836932,40.711052],
          '常熟':[120.74,31.64],
          '东莞':[113.75,23.04],
          '河源':[114.68,23.73],
          '淮安':[119.15,33.5],
          '泰州':[119.9,32.49],
          '南宁':[108.33,22.84],
          '营口':[122.18,40.65],
          '惠州':[114.4,23.09],
          '江阴':[120.26,31.91],
          '蓬莱':[120.75,37.8],
          '韶关':[113.62,24.84],
          '嘉峪关':[98.289152,39.77313],
          '广州':[113.23,23.16],
          '延安':[109.47,36.6],
          '太原':[112.53,37.87],
          '清远':[113.01,23.7],
          '中山':[113.38,22.52],
          '昆明':[102.73,25.04],
          '寿光':[118.73,36.86],
          '盘锦':[122.070714,41.119997],
          '长治':[113.08,36.18],
          '深圳':[114.07,22.62],
          '珠海':[113.52,22.3],
          '宿迁':[118.3,33.96],
          '咸阳':[108.72,34.36],
          '铜川':[109.11,35.09],
          '平度':[119.97,36.77],
          '佛山':[113.11,23.05],
          '海口':[110.35,20.02],
          '江门':[113.06,22.61],
          '章丘':[117.53,36.72],
          '肇庆':[112.44,23.05],
          '大连':[121.62,38.92],
          '临汾':[111.5,36.08],
          '吴江':[120.63,31.16],
          '石嘴山':[106.39,39.04],
          '沈阳':[123.38,41.8],
          '苏州':[120.62,31.32],
          '茂名':[110.88,21.68],
          '嘉兴':[120.76,30.77],
          '长春':[125.35,43.88],
          '胶州':[120.03336,36.264622],
          '银川':[106.27,38.47],
          '张家港':[120.555821,31.875428],
          '三门峡':[111.19,34.76],
          '锦州':[121.15,41.13],
          '南昌':[115.89,28.68],
          '柳州':[109.4,24.33],
          '三亚':[109.511909,18.252847],
          '自贡':[104.778442,29.33903],
          '吉林':[126.57,43.87],
          '阳江':[111.95,21.85],
          '泸州':[105.39,28.91],
          '西宁':[101.74,36.56],
          '宜宾':[104.56,29.77],
          '呼和浩特':[111.65,40.82],
          '成都':[104.06,30.67],
          '大同':[113.3,40.12],
          '镇江':[119.44,32.2],
          '桂林':[110.28,25.29],
          '张家界':[110.479191,29.117096],
          '宜兴':[119.82,31.36],
          '北海':[109.12,21.49],
          '西安':[108.95,34.27],
          '金坛':[119.56,31.74],
          '东营':[118.49,37.46],
          '牡丹江':[129.58,44.6],
          '遵义':[106.9,27.7],
          '绍兴':[120.58,30.01],
          '扬州':[119.42,32.39],
          '常州':[119.95,31.79],
          '潍坊':[119.1,36.62],
          '重庆':[106.54,29.59],
          '台州':[121.420757,28.656386],
          '南京':[118.78,32.04],
          '滨州':[118.03,37.36],
          '贵阳':[106.71,26.57],
          '无锡':[120.29,31.59],
          '本溪':[123.73,41.3],
          '克拉玛依':[84.77,45.59],
          '渭南':[109.5,34.52],
          '马鞍山':[118.48,31.56],
          '宝鸡':[107.15,34.38],
          '焦作':[113.21,35.24],
          '句容':[119.16,31.95],
          '北京':[116.46,39.92],
          '徐州':[117.2,34.26],
          '衡水':[115.72,37.72],
          '包头':[110,40.58],
          '绵阳':[104.73,31.48],
          '乌鲁木齐':[87.68,43.77],
          '枣庄':[117.57,34.86],
          '杭州':[120.19,30.26],
          '淄博':[118.05,36.78],
          '鞍山':[122.85,41.12],
          '溧阳':[119.48,31.43],
          '库尔勒':[86.06,41.68],
          '安阳':[114.35,36.1],
          '开封':[114.35,34.79],
          '济南':[117,36.65],
          '德阳':[104.37,31.13],
          '温州':[120.65,28.01],
          '九江':[115.97,29.71],
          '邯郸':[114.47,36.6],
          '临安':[119.72,30.23],
          '兰州':[103.73,36.03],
          '沧州':[116.83,38.33],
          '临沂':[118.35,35.05],
          '南充':[106.110698,30.837793],
          '天津':[117.2,39.13],
          '富阳':[119.95,30.07],
          '泰安':[117.13,36.18],
          '诸暨':[120.23,29.71],
          '郑州':[113.65,34.76],
          '哈尔滨':[126.63,45.75],
          '聊城':[115.97,36.45],
          '芜湖':[118.38,31.33],
          '唐山':[118.02,39.63],
          '平顶山':[113.29,33.75],
          '邢台':[114.48,37.05],
          '德州':[116.29,37.45],
          '济宁':[116.59,35.38],
          '荆州':[112.239741,30.335165],
          '宜昌':[111.3,30.7],
          '义乌':[120.06,29.32],
          '丽水':[119.92,28.45],
          '洛阳':[112.44,34.7],
          '秦皇岛':[119.57,39.95],
          '株洲':[113.16,27.83],
          '石家庄':[114.48,38.03],
          '莱芜':[117.67,36.19],
          '常德':[111.69,29.05],
          '保定':[115.48,38.85],
          '湘潭':[112.91,27.87],
          '金华':[119.64,29.12],
          '岳阳':[113.09,29.37],
          '长沙':[113,28.21],
          '衢州':[118.88,28.97],
          '廊坊':[116.7,39.53],
          '菏泽':[115.480656,35.23375],
          '合肥':[117.27,31.86],
          '武汉':[114.31,30.52],
          '大庆':[125.03,46.58]
        },
      }
    },
    methods: {
      // 判断一个城市是否在这个省内
      cityIsInclude(provinceEngName, cityName, cityNameEng) {
        let cities = cityNameData[`cityName_${provinceEngName}`]
        for (let city in cities) {
          if ((!cityNameEng && city.indexOf(cityName) !== -1) || (cityNameEng && city.indexOf(cityName) !== -1 && cities[city] === cityNameEng)) {
            return true
          }
        }
        return false
      },

      // 将data在坐标点上展示，同时在省市情况下，过滤掉范围外的点
      convertData(data, provinceEngName, cityNameEng) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          if (provinceEngName) {
            let ret = this.cityIsInclude(provinceEngName, data[i].name, cityNameEng)
            if (ret) {
              var geoCoord = this.geoCoordMap[data[i].name]
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
                })
              }
            }
          } else {
            let geoCoord = this.geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
        }
        // console.log(res)
        return res;
      },

      // 设置地图的option配置项
      setMapOption(place = 'china', center = undefined) {
        this.option = {
          title: {
            text: this.title,
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          // backgroundColor: "rgb(42,49,90)",
          backgroundColor: "rgb(100,100,100)",
          tooltip : { // 鼠标移到图里面的浮动提示框
            trigger: 'item'
          },
          // 图例
          legend: {
            show: true,
            orient: 'vertical', // 排序方式
            y: 'bottom', // y轴位置
            x:'right', // x轴位置
            data:['中药药材', 'Top 5'], // 图例的数据数组，对应series中的name
            textStyle: { // 文字样式
              color: '#fff'
            },
            icon: 'rect',
            formatter: ``,
          },
          geo: {
            map: place,
            center: center,
            aspectScale: 0.75, // 地图长宽比
            scaleLimit: { // 放大缩小最大比例限制
              min: 0.8,
              max: 3,
            },
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: 'rgb(227,240,227)',
                borderColor: '#111'
              },
              emphasis: {
                show: true,
                areaColor: 'rgb(106,204,100)',
              }
            },
            // emphasis: {
            //   show: false,
            // },
          },
          series: [
            {
              name: '',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: this.convertData(this.data),
              encode: {
                value: 2
              },
              symbolSize: 8,
              label: {
                normal: {
                  position: 'right',
                  show: false
                },
                emphasis: {
                  formatter: '{b}',
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#00CF8B'
                }
              }
            },
            {
              name: this.title,
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: this.convertData(this.data.sort(function (a, b) {
                return b.value - a.value;
              }).slice(0, 5)),
              encode: {
                value: 2
              },
              symbolSize: 8,
              showEffectOn: 'render', // 何时显示特效
              effectType: 'ripple', // 特效类型，暂时只有涟漪类型
              rippleEffect: {
                period: 6,
                scale: 8,
                brushType: 'stroke'
              },
              hoverAnimation: true,
              // label: {
              //   normal: {
              //     formatter: '{b}',
              //     position: 'right',
              //     show: true
              //   }
              // },
              itemStyle: {
                normal: {
                  color: '#00CF8B',
                  // shadowBlur: 10,
                  // shadowColor: '#333'
                }
              },
              zlevel: 1
            }
          ]
        };
      },

      // 鼠标拖动事件（使拖动不触发返回事件）
      mousedown(e) {
        this.mouse_position.beginX = e.clientX;
        this.mouse_position.beginY = e.clientY;
      },
      mouseup(e) {
        this.mouse_position.endX = e.clientX;
        this.mouse_position.endY = e.clientY;
      },

      // 判断是否拖动，当前允许存在4px误差
      isdrag(x1,y1,x2,y2) {
        if(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)) <= 4) {
          return false;
        }
        return true;
      },

      // 点击其他区域，返回上一页
      clickOther() {
        // console.log(this.mouse_position);

        if (!this.isdrag(this.mouse_position.beginX, this.mouse_position.beginY, this.mouse_position.endX, this.mouse_position.endY)) {
          if (this.placeType == 'city' && this.province.name) {
            // 从市返回省
            this.placeType = 'province';
            this.city.code = '';
            this.city.name = '';
            this.setMapOption(this.province.name);
            this.option.series[0].data = this.convertData(this.data, provinceNameChineseToEng(this.province.name));
            this.option.series[1].data = this.convertData(this.data.sort(function (a, b) {
              return b.value - a.value;
            }).slice(0, 5), provinceNameChineseToEng(this.province.name));
            this.echart.setOption(this.option);
          } else if (this.placeType == 'province') {
            // 从省返回国家
            this.placeType = 'country';
            this.province.code = '';
            this.province.name = '';
            this.city.code = '';
            this.city.name = '';
            this.setMapOption();
            this.echart.setOption(this.option);
          }
        }
      },

      // 渲染echart地图
      chinaConfigure() {
        // console.log(this.userJson)
        // console.log(this.mapData)

        this.echart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
        window.onresize = this.echart.resize;
        // echart配置项
        this.setMapOption();
        this.echart.setOption(this.option);

        // 点击事件
        // 使用剪头函数，函数内部的this会指向调用函数时的this，而不是函数体内
        this.echart.on('click',  (params) => {
          event.stopPropagation(); // 阻止冒泡
          // console.log(params);

          if (params.componentType === 'series') {
            // 点击了单个停车场， 跳转停车场详情
            alert('跳转详情页');
            return;
          }

          // 对点击的省或者市做不同的处理
          let province = provinceNameArr.find(item => item.chineseName === params.name);
          // console.log(province, this.placeType);
          if (this.placeType === 'country' && province) {
            // 点击了省

            // if (province.code.length == '6') {
              // 如果是直辖市，香港澳门台湾，则直接当成省级，进入渲染市级
              // this.setCityMap(province.chineseName, province.code)
            // } else {
              this.setProvinceMap(province.chineseName, province.code);
            // }

          } else if (this.placeType === 'province'
            // Object.keys(obj) --> 能够遍历出该对象所有的key，输出所有key的一个集合; 同理Object.values(obj)输入对象的value集合
            && Object.keys(cityNameData[`cityName_${provinceNameChineseToEng(this.province.name)}`]).find(item => item === params.name)
          ) {
            // 点击了市，跳转到该市
            // console.log(this.province.name);
            // console.log(provinceNameChineseToEng(this.province.name));
            // console.log(`cityName_${provinceNameChineseToEng(this.province.name)}`);
            // console.log(Object.keys(cityNameData[`cityName_${provinceNameChineseToEng(this.province.name)}`]).find(item => item === params.name));
            let cityCode = cityNameData[`cityName_${provinceNameChineseToEng(this.province.name)}`][params.name];

            this.setCityMap(params.name, cityCode);

          } else if (this.placeType === 'city') {
            // 点击县，不做处理
          } else if (this.placeType === 'province' && !cityNameData[`cityName_${provinceNameChineseToEng(this.province.name)}`]) {
            // 点击直辖市、香港澳门台湾的内部，不做处理
          } else {
            alert('地图资源错误，请联系管理员!');
          }

        })
      },

      // 设置省份地图
      setProvinceMap(name, code) {
        geometryProvince(code).then(res => {
          this.placeType = 'province';
          this.province.name = name;
          this.province.code = code;
          // this.setMapOption(name, res.data.cp);
          console.log(res)
          console.log(this.data)
          this.setMapOption(name, res.cp);
          this.option.series[0].data = this.convertData(this.data, provinceNameChineseToEng(name));
          this.option.series[1].data = this.convertData(this.data.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 5), provinceNameChineseToEng(name));
          // echarts.registerMap(name, res.data);
          echarts.registerMap(name, res);
          this.echart.setOption(this.option);
        }).catch(err => {
          console.log(err)
          alert('地图资源错误，请联系管理员!');
        })
      },

      // 设置城市地图
      setCityMap(name, code) {
        geometryCouties(code).then(res => {
          this.placeType = 'city';
          this.city.name = name;
          this.city.code = code;
          // this.setMapOption(name, res.data.cp);
          this.setMapOption(name, res.cp);
          this.option.series[0].data = this.convertData(this.data, provinceNameChineseToEng(this.province.name), code);
          this.option.series[1].data = this.convertData(this.data.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 5), provinceNameChineseToEng(this.province.name), code);
          // echarts.registerMap(name, res.data);
          echarts.registerMap(name, res);
          this.echart.setOption(this.option);
        }).catch(err => {
          console.log(err)
          alert('地图资源错误，请联系管理员!');
        })
      },
    },

    mounted() {
      this.chinaConfigure();
    },
    created() {

    },
    beforeDestroy() {
      if (!this.echart) {
        return;
      }
      this.echart.dispose();
      this.echart = null;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
