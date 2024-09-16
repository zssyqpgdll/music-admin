<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input placeholder="搜索工会" v-model="keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>
      <el-button type="primary" @click="addStudent()" class="addbtn">添加</el-button>
    </div>
    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
      <el-table-column prop="remark" label="工会介绍" ></el-table-column>
      <el-table-column prop="amount" label="账面金额" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" ></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" ></el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" width="180">
      <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="editById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出表单编辑用户 -->
    <el-dialog title="编辑工会" :visible.sync="visibleForm">
      <el-form
        :model="editFormData"
        label-position="left"
        label-width="80px"
        :rules="editFormRules"
      >
        <el-form-item label="ID">
          <el-input v-model="editFormData.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="remark">
          <el-input v-model="editFormData.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="amount">
          <el-input v-model="editFormData.amount" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加工会" :visible.sync="visibleAddForm">
      <el-form
              :model="addFormdata"
              label-position="left"
              label-width="80px"
              :rules="editFormRules"
      >
        <el-form-item label="名称" prop="remark">
          <el-input v-model="addFormdata.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="amount">
          <el-input v-model="addFormdata.amount" autocomplete="off"></el-input>
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
  import {add,get,search,modify} from "@/api/group";

  export default {
  name: "GroupList",
  data() {
    return {
      studentData: [],
      passData:{
        spass:''
      },
      editFormData: [],
      addFormdata:{
        userId: "",
        username: "",
        realname: "",
        idno: "",
        description: "",
        telephone: "",
        email:"",
        address: "",
        age: "",
        roles:"normal"
      },
      visiblePassForm: false,
      visibleAddForm: false,
      keyword: "",
      page: 1,
      pageSize: 10,
      total: 0,
      visibleForm: false,
      editFormRules: {
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        telephone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮件", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      }
    };
  },

  mounted() {
    this.allStudent();
  },

  methods: {
    addStudent() {
      this.visibleAddForm = true;
    },
    addCommit() {
      console.log(this.addFormdata);
      add(this.addFormdata)
        .then(res => {
          if (res.code == 0) {
            this.visibleAddForm = false;
            this.$message({ message: "添加成功", type: "success" });
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

    // 查询班级信息
    // queryClass() {
    //   this.$axios
    //     .get("http://localhost:8080/class-grade/" + this.value1)
    //     .then(res => {
    //       let ret = res.data.data
    //       this.classNo.splice(0, this.classNo.length)
    //       this.value2 = ""
    //       ret.map(v => {
    //         this.classNo.push({
    //           value: v.classNo,
    //           label: v.className
    //         });
    //       });
    //     })
    //     .catch(error => {
    //
    //     });
    // },

    // 根据班级查询用户信息
    // queryStudentByClass() {
    //   this.$axios
    //     .get(
    //       "http://localhost:8080/student-class/" + this.page + "/" + this.value2
    //     )
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.code == 0) {
    //         let ret = res.data.data
    //         this.studentData = ret.records
    //         this.total = ret.total
    //       }
    //     })
    //     .catch(error => {
    //
    //     });
    // },

    /***
     * 编辑提交
     */
    commit() {
      if(this.editFormData.roles == 'admin'){
        //验证超级密码
        this.visibleForm = false
        this.visiblePassForm = true
        return ;
      }
      this.modifyStudent(this.editFormData)
    },

    vertifypass(){
      this.visiblePassForm = false
      if(this.passData.spass == this.$store.state.user.superpassword){
        this.modifyStudent(this.editFormData)
      }else{
        this.$message.error('超级密码错误！')
        this.allStudent()
      }
    },

    inputListener() {
      this.allStudent()
    },

    /**
     * 查询所有用户
     */
    allStudent() {
        console.log(this.page)
        get(this.page).then(res => {
          let ret = res.data
          this.studentData = ret.records
          this.total = ret.total
          // this.$message({message:'查询成功', type: 'success'})
        })
        .catch(error => {
          this.$message.error("查询用户列表失败")
        });
    },

    /**
     * 关键字查询用户
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

    resetById(index, row) {
      this.resetPassword(row.id);
    },

    resetPassword(id){
      modify({"id":id,"password":"123456"})
        .then(res => {
          this.$message({ message: "重置密码成功", type: "success" });
        })
        .catch(error => {
          this.$message.error("重置密码失败");
        });
    },

    /**
     * 根据id删除用户
     */
    deleteById(index, row) {
      this.deleteStudentById(row.id)
    },

    deleteStudentById(id) {
      modify({"id":id, "deleted":1})
        .then(res => {
          this.$message({ message: "删除成功", type: "success" })
          this.allStudent()
        })
        .catch(error => {
          this.$message.error("删除失败")
        });
    },

    /**
     * 编辑用户
     */
    editById(index, row) {
      let modifyId = row.id
      this.editFormData = row
      this.visibleForm = true
    },

    /**
     * 更新用户
     */
    modifyStudent(modifyData) {
      modify(modifyData)
        .then(res => {
          this.$message({ message: "更新成功", type: "success" })
          this.allStudent()
          this.visibleForm = false
        })
        .catch(error => {
          this.$message.error("更新失败")
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
