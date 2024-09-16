<template>
  <div class="timeline-board">
    <div class="container-fluid">
      <div class="row example-split">
        <div class="col-md-12 example-title">
          <h2>数据中心大事记</h2>
        </div>
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
          <ul
            class="timeline timeline-split"
            v-for="monthData in allDatas"
            :key="monthData.id"
          >
            <li class="timeline-item period">
              <div class="timeline-info"></div>
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h2 class="timeline-title">
                  {{ monthData.year }} <!-- {{ monthData.month }} -->
                </h2>
              </div>
            </li>
            <li
              class="timeline-item"
              v-for="dayData in monthData.monthDatas"
              :key="dayData.day"
            >
              <div class="timeline-info">
                <span>{{ monthData.year }} {{ monthData.month }} <!--{{ dayData.day }} -->
                  </span>
              </div>
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3 class="timeline-title">{{ dayData.title }}</h3>
                <p>
                  {{ dayData.content }}
                </p>
                <ul class="image-wall">
                  <li
                    v-for="imgUrl in dayData.images"
                    :key="imgUrl"
                    @click="clickToWatch(imgUrl)"
                  >
                    <img :src="imgUrl" />
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineBoard',
  props: {
    msg: String,
    allDatas:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      imgUrl: '',
      time: '123123',
    }
  },
  methods: {
    clickToWatch(imgUrl) {
      console.log('go')
      this.$modal.show('hello-image', { imgUrl: imgUrl })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$primary-color: #ff6b6b;
$primary-color-hover: scale-color($primary-color, $lightness: 32%);

body {
  color: rgb(214, 244, 245);
  background: #fff;
  font-family: 'Effra', Helvetica, sans-serif;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #3d4351;
  margin-top: 0;
}
a {
  color: $primary-color;
  &:hover {
    color: $primary-color-hover;
    text-decoration: none;
  }
}
.example-header {
  background: #3d4351;
  color: #fff;
  font-weight: 300;
  padding: 3em 1em;
  text-align: center;
  h1 {
    color: #fff;
    font-weight: 300;
    margin-bottom: 20px;
  }
  p {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 700;
  }
}
.container-fluid {
  .row {
    padding: 0 4em 4em 4em;
    background: #f1f4f5;
  }
}

.example-title {
  text-align: center;
  margin-bottom: 60px;
  padding: 2em 0 1em 0;
  border-bottom: 1px solid #e4eaec;
  p {
    margin: 0 auto;
    font-size: 16px;
    max-width: 400px;
  }
}

/*-- GENERAL STYLES
    ------------------------------*/
.timeline {
  line-height: 1.4em;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: inherit;
  }
}

/*----- TIMELINE ITEM -----*/

.timeline-item {
  padding-left: 40px;
  position: relative;
  &:last-child {
    padding-bottom: 0;
  }
}

/*----- TIMELINE INFO -----*/

.timeline-info {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  margin: 0 0 0.5em 0;
  text-transform: uppercase;
  white-space: nowrap;
}
/*----- TIMELINE MARKER -----*/

.period {
  padding: 0;
  .timeline-info {
    display: none;
  }
  .timeline-marker {
    &:before {
      background: transparent;
      content: '';
      width: 15px;
      height: auto;
      border: none;
      border-radius: 0;
      top: 0;
      left: 3px;
      bottom: 30px;
      position: absolute;
      border-top: 3px solid #ccd5db;
      border-bottom: 3px solid #ccd5db;
    }
    &:after {
      content: '';
      height: 32px;
      top: auto;
    }
  }
  .timeline-content {
    padding: 40px 0 70px;
  }
}

.timeline-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 15px;
  &:before {
    background: $primary-color;
    border: 3px solid transparent;
    border-radius: 100%;
    content: '';
    display: block;
    height: 15px;
    position: absolute;
    top: 4px;
    left: 0;
    width: 15px;
    transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
  }
  &:after {
    content: '';
    width: 3px;
    background: #ccd5db;
    display: block;
    position: absolute;
    top: 30px;
    bottom: 0;
    left: 9px;
  }
  .timeline-item:last-child &:after {
    content: none;
  }
}
.timeline-item:not(.period):hover .timeline-marker:before {
  background: transparent;
  border: 3px solid $primary-color;
}

/*----- TIMELINE CONTENT -----*/

.timeline-content {
  padding-bottom: 40px;
  p:last-child {
    margin-bottom: 0;
  }
}

/*----------------------------------------------
        MOD: TIMELINE SPLIT
    ----------------------------------------------*/

.timeline-split {
  @media (min-width: 768px) {
    .timeline {
      display: table;
    }
    .timeline-item {
      display: table-row;
      padding: 0;
    }
    .timeline-info,
    .timeline-marker,
    .timeline-content,
    .period .timeline-info {
      display: table-cell;
      vertical-align: top;
    }
    .timeline-marker {
      position: relative;
    }
    .timeline-content {
      padding-left: 30px;
    }
    .timeline-info {
      padding-right: 30px;
    }
    .period .timeline-title {
      position: relative;
      left: -50%;        //这个值不改变会偏移太多
      //position: relative;
      //left: -50%;
    }
  }
}

/*----------------------------------------------
        图片墙
    ----------------------------------------------*/
.image-wall li {
  list-style: none;
  float: left;
  width: 24%; /*4列图片排列*/
  height: 200px; /*当图片尺寸不一的时候，设置一个高度*/
  overflow: hidden; /*超出隐藏*/
  cursor: pointer;
}

.image-wall li img {
  position: relative;
  width: 100%;
  top: 50%; /*li高度的一半*/
  transform: translateY(-50%); /*再向上移动自身的50%*/
}

.image-wall li:hover {
  width: 25%;
  height: 220px;
  box-shadow: darkgrey 10px 10px 30px 5px;
}
</style>
