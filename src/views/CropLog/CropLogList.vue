<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input placeholder="搜索" v-model="keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>
      <el-button type="primary" @click="addStudent()" class="addbtn">添加</el-button>

    </div>
    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
      <el-table-column prop="opt" label="农作物"></el-table-column>
      <el-table-column prop="val" label="生长量" ></el-table-column>
      <el-table-column prop="createTime" label="时间" ></el-table-column>
    </el-table>

    <el-dialog title="添加" :visible.sync="visibleAddForm">
      <el-form
          :model="addFormData"
          label-position="left"
          label-width="80px"
      >
        <el-form-item label="农作物" prop="opt">
          <el-input v-model="addFormData.opt" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生长量" prop="val">
          <el-input v-model="addFormData.val" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleAddForm = false">取 消</el-button>
        <el-button type="primary" @click="addCommit()">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 上一页，当前页，下一页 -->
    <div class="footer-button">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import {add,del,modify,get,search} from "@/api/croplog";

  export default {
  name: "UserList",
  data() {
    return {
      addFormData: {},
      studentData: [],
      visibleAddForm: false,
      keyword: "",
      page: 1,
      pageSize: 10,
      total: 0,
      visibleForm: false
    };
  },

  mounted() {
    this.allStudent();
  },

  methods: {
    statusFormatter(data){
      if(data.status == '0'){
        return '待审批'
      }
    },
    addStudent() {
      this.visibleAddForm = true;
    },
    addCommit() {
      add(this.addFormData)
        .then(res => {
          if (res.code == 0) {
            this.visibleAddForm = false;
            this.$message({ message: "添加成功", type: "success" });
            this.allStudent()
          }
        })
        .catch(error => {
          this.$message.error("添加失败");
        });
    },
    // 清空年级回到查询所有用户
    gradeListener() {
      this.allStudent()
      this.value2 = ''
    },

    // 清空班级回到查询所有班级
    classListener() {

    },



    /***
     * 编辑提交
     */
    commit() {
      this.modifyStudent(this.editFormData)
    },

    inputListener() {
      this.allStudent()
    },

    /**
     * 查询所有
     */
    allStudent() {
        console.log(this.page)
        get(this.page).then(res => {
          let ret = res.data
          this.studentData = ret.records
          this.total = ret.total
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
          this.$message({ message: "查询成功", type: "success" })
        })
        .catch(error => {
          this.$message.error("查询失败")
        });
    },

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

    /*审核状态*/
    statusById(index, row, status) {
      this.statusRequestById(row.id, status)
    },

    statusRequestById(id, status) {
      modify({"id":id,"status": status}).then(res => {
        this.$message({ message: "处理成功", type: "success" })
        this.allStudent()
      }).catch(error => {
        this.$message.error("处理失败")
      });
    },

    handleSizeChange() {},

    handleCurrentChange(v) {
      this.page = v
      this.allStudent()
    }
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
