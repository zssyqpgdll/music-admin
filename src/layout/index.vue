<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!--侧边栏-->
    <sidebar class="sidebar-container" />
    <!--右侧-->
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <!--右侧头部-->
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>

      <!--右侧主体-->
      <app-main />
      <!-- 右侧的设置按钮 -->
<!--      <right-panel v-if="showSettings">-->
<!--        <settings />-->
<!--      </right-panel>-->
    </div>
  </div>
</template>

<script>
  //import RightPanel from '@/components/RightPanel'
  import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
  import { mapState } from 'vuex'

  export default {
    name: 'Layout',

    components: {
      AppMain,
      Navbar,
      //RightPanel,
      //Settings,
      Sidebar,
      TagsView
    },

    computed: {
      //对象展开符
      ...mapState({
        sidebar: state => state.app.sidebar,//src\store\modules\app.js
        device: state => state.app.device,//src\store\modules\app.js
        showSettings: state => state.settings.showSettings,//src\store\modules\settings.js
        needTagsView: state => state.settings.tagsView,//src\store\modules\settings.js
        fixedHeader: state => state.settings.fixedHeader//src\store\modules\settings.js
      }),

      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,//当侧边栏收起来的时候的class
          openSidebar: this.sidebar.opened,//当侧边栏打开的时候的class
          withoutAnimation: this.sidebar.withoutAnimation,//没有动画效果的class
          mobile: this.device === 'mobile'//当设备是手机时的class
        }
      }
    },

    methods: {
      handleClickOutside() {
        //到store/app执行closeSideBar，传参数过去，设withoutAnimation为false，即要有动画效果
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
