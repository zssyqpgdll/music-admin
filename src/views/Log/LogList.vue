<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input placeholder="搜索日志" v-model="keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>
    </div>

    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
      <el-table-column prop="opt" label="操作"></el-table-column>
      <el-table-column prop="url" label="访问地址" ></el-table-column>
      <el-table-column prop="httpMethod" label="http请求方式" ></el-table-column>
      <el-table-column prop="ip" label="来源IP" ></el-table-column>
      <el-table-column prop="classMethod" label="方法" ></el-table-column>
      <el-table-column prop="args" label="参数" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" ></el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 上一页，当前页，下一页 -->
    <!--<div class="footer-button">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>-->
  </div>
</template>

<script>
import {add,del,modify,get,get2,search,search2} from "@/api/log";

export default {
  name: "UserList",

  data() {
    return {
      studentData: [],//日志数据
      // visibleAddForm: false,
      keyword: "",//搜索框关键字
      // page: 1,
      // pageSize: 10,
      // total: 0,
      //定义一个变量，判断是不是搜索页面，用于展示索页面的第二页
      // issearch: false,
      // visibleForm: false
    };
  },

  //加载所有日志数据
  mounted() {
    this.allStudent();
  },

  methods: {
    // statusFormatter(data){
    //   if(data.status == '0'){
    //     return '待审批'
    //   }
    // },
    // addStudent() {
    //   this.visibleAddForm = true;
    // },
    // addCommit() {
    //   console.log(this.addFormdata);
    //   add(this.addFormdata)
    //     .then(res => {
    //       if (res.code == 0) {
    //         this.visibleAddForm = false;
    //         this.$message({ message: "添加成功", type: "success" });
    //         this.allStudent()
    //       }
    //     })
    //     .catch(error => {
    //       this.$message.error("添加失败");
    //     });
    // },
    // 清空年级回到查询所有用户
    // gradeListener() {
    //   this.allStudent()
    //   this.value2 = ''
    // },

    // // 清空班级回到查询所有班级
    // classListener() {

    // },



    /***
     * 编辑提交
     */
    // commit() {
    //   this.modifyStudent(this.editFormData)
    // },

    //清除搜索框内容则恢复全部日志数据
    inputListener() {
      // this.issearch = false
      this.allStudent()
    },

    /**
     * 查询所有日志数据
     */
    allStudent() {
        console.log(this.page)
        get2().then(res => {
          let ret = res.data
          this.studentData = ret.records
          // this.total = ret.total
        })
        .catch(error => {
          this.$message.error("查询列表失败")
        });
    },

    /**
     * 关键字查询
     */
    searchStudent() {
      search(this.keyword)
        .then(res => {
          let ret = res.data
          this.studentData = ret.records
          this.total = ret.total
          this.issearch = true
          this.$message({ message: "查询成功", type: "success" })
        })
        .catch(error => {
          this.$message.error("查询失败")
        });
    },

    //通过日志id删除日志
    deleteById(index, row) {
      this.deleteRequestById(row.id)
    },
    deleteRequestById(id) {
      del(id).then(res => {
          this.$message({ message: "删除成功", type: "success" })
          this.allStudent()
        }).catch(error => {
          this.$message.error("删除失败")
        });
    },

    // /*审核状态*/
    // statusById(index, row, status) {
    //   this.statusRequestById(row.id, status)
    // },

    // statusRequestById(id, status) {
    //   modify({"id":id,"status": status}).then(res => {
    //     this.$message({ message: "处理成功", type: "success" })
    //     this.allStudent()
    //   }).catch(error => {
    //     this.$message.error("处理失败")
    //   });
    // },

    // handleSizeChange() {},

    // handleCurrentChange(v) {
    //   this.page = v
    //   //搜索页面的变化
    //   if (this.issearch){
    //     search2(this.keyword, this.page, 10)
    //       .then(res => {
    //         let ret = res.data
    //         this.studentData = ret.records
    //         this.issearch = true
    //         this.$message({ message: "查询成功", type: "success" })
    //       })
    //       .catch(error => {
    //         this.$message.error("查询失败")
    //     });
    //   }else{
    //     this.allStudent()
    //   }
    // }
  }
};
</script>

<style lang="less" scoped>
.el-input-group {
  width: 40%;
}
.header-menu {
  margin-bottom: 5px;
  padding: 5px;
  text-align: left;
  margin-bottom: 5px;
}

.footer-button {
  margin-top: 10px;
}

  .addbtn{
    margin-left: 5px;
  }
</style>
