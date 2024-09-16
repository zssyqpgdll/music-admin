<template>
  <div class="wrapper">
    <el-card class="box-card" v-for="(item,index) in fileList">
      <div slot="header" class="clearfix">
        <span>图片</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleRemove(item, index)">删除</el-button>
      </div>
      <div class="text item">
<!--        <span>{{item.contSign}}</span>-->
        <el-image style="width: 150px; height: 150px" :src="item.url"></el-image>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {get,deleteSimilar} from "@/api/baidu";

  export default {
    name: "index",
    data() {
      return {
        fileList: [],
      };
    },
    methods: {
      async getPicList(){
        await get(1).then(res=>{
          this.fileList = res.data.records
          console.log(this.fileList );
        })
      },
      handleRemove(item, index){
        console.log(item);
        deleteSimilar(item.name).then(res=>{
          this.fileList.splice(index, 1);
          this.$message.success("删除成功")
        })
      }
    },
    created(){
      this.getPicList()
    }
  }
</script>

<style scoped>
.wrapper{
  margin: 20px 1px 1px 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap
}

.box-card {
  width: 200px;
  margin: 20px 1px 1px 20px;
  /*display: flex;*/
  /*flex: 1;*/
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
