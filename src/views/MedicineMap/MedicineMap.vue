<template>
  <div>
    <div class="header-menu">
      <el-button type="success" @click.native="refresh()" icon="el-icon-refresh" >更新</el-button>

      <el-input placeholder="搜索药材产地" v-model="keyword" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchPlace">搜索</el-button>
      </el-input>
      <!--      <el-select v-model="value1" placeholder="年级" @change="queryClass" @clear="gradeListener" clearable>-->
      <!--        <el-option v-for="item in grade" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
      <!--      </el-select>-->
      <!--      <el-select v-model="value2" placeholder="班级" @change="queryStudentByClass" @clear="classListener" clearable>-->
      <!--        <el-option-->
      <!--          v-for="item in classNo"-->
      <!--          :key="item.value"-->
      <!--          :label="item.label"-->
      <!--          :value="item.value"-->
      <!--        ></el-option>-->
      <!--      </el-select>-->
    </div>
    <div>
      <Map ref="map" :title="keyword+'产地'" :data="mapData"></Map>
    </div>
  </div>

</template>

<script>
  import Map from "@/views/dashboard/admin/components/Map";
  import {search,refresh} from "@/api/chart";

  export default {
    name: "MedicineMap",
    components:{
      Map
    },
    data(){
      return{
        title: "",
        keyword: "",
        mapData:[]
      }
    },
    methods:{
      // sleep(d){
      //   for(var t = Date.now();Date.now() - t <= d;);
      // },
      searchPlace(){
        if(this.keyword.length == 0){
          this.$message.error("请输入药材名");
          return false
        }
        search(this.keyword).then(res => {
          this.mapData = res.data
          // console.log("mapData:")
          // console.log(this.mapData)
          this.$message({ message: "搜索成功", type: "success" })
          // this.sleep(2000)
          // this.$refs.map.chinaConfigure()
        }).
        catch(error => {
          this.$message.error("搜索失败")
        })
      },

      refresh(){
        refresh().then(res => {
          this.$message({ message: "更新地图产地数据成功", type: "success" });}).
        catch(error => {this.$message.error("更新地图产地数据失败");})
      }
    }
  }
</script>

<style scoped>
  .el-input-group {
    width: 20%;
    margin-left: 30px;
  }

  .header-menu {
    margin-bottom: 5px;
    padding: 5px;
    text-align: left;
    margin-bottom: 5px;
  }
</style>
