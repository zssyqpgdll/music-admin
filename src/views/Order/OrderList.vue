<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input placeholder="搜索" v-model="keyword.keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>

    </div>
    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
       <el-table-column prop="id" label="订单号"></el-table-column>
      <el-table-column prop="realname" label="用户"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="amount" label="金额"></el-table-column>
      <el-table-column prop="updateTime" label="订单时间" ></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>

      <el-table-column prop="status" label="支付状态" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==0" plain >待支付</el-tag>
          <el-tag v-else-if="scope.row.status==1" type="success" effect="dark">已支付</el-tag>
          <el-tag v-else-if="scope.row.status==2" type="warning" effect="dark">已取消</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
<!--          <el-button type="text" icon="el-icon-setting" size="mini" @click="resetById(scope.$index, scope.row)">重置密码</el-button>-->
          <el-button v-if="scope.row.status==0" type="success" icon="el-icon-check" circle @click="statusById(scope.$index, scope.row, 1)"></el-button>
          <el-button v-if="scope.row.status==0" type="danger" icon="el-icon-close" circle @click="statusById(scope.$index, scope.row, 2)"></el-button>
          <el-button icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

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
  import {add,del,modify,get,search} from "@/api/order";
  import {get as getG} from "@/api/group";

  export default {
  name: "UserList",
  data() {
    return {
      studentData: [],
      editFormData: [],
      addFormdata:{
        title: "",
        content: "",
        author: this.$store.state.user.username,
        authorName: this.$store.state.user.realname,
        type: "",
      },
      visibleAddForm: false,
      keyword: {
        group: '',
        keyword:''
      },
      page: 1,
      pageSize: 10,
      total: 0,
      value1: "", // 年级
      value2: "", // 班级
      type: [
        {
          value: "1",
          label: "疗养休养"
        },
        {
          value: "2",
          label: "工会活动"
        },
        {
          value: "3",
          label: "社团活动"
        },
        {
          value: "4",
          label: "慰问活动"
        }
      ],
      classNo: [
        {
          value: "",
          label: ""
        }
      ],
      visibleForm: false,
      editFormRules: {
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        telephone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮件", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
      groups:[],
    };
  },

  mounted() {
    this.allStudent();
    this.getGroup();
  },

  methods: {
    getGroup(){
      getG(1,20).then(res=>{
        this.groups = res.data.records
        // console.log(this.groups)
      })
    },
    groupNameFilter(row, column){
      let res = this.groups.filter((item, i) => {
        return item.id == row.groupId;
      })
      if(res.length>0)
        return res[0].remark
      else
        return '无工会'
    },
    genderFilter(row, column){
      if(row.gender==0)
        return '男'
      else
        return '女'
    },
    statusFilter(row, column){
      if(row.status==0)
        return '待支付'
      else if(row.status==1)
        return '已支付'
      else return '已取消'
    },
    statusFormatter(data){
      if(data.status == '0'){
        return '待审批'
      }
    },
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
    },
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID','部门' ,'会员','身份证号', '性别', '年龄', '类型','原因','金额']
        const filterVal = ['id','groupId', 'realname', 'idno', 'gender', 'age','type','reason','amount']
        const list = this.studentData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '保险清单',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'gender') {
          return this.jFormat1(v[j])
        }else if(j === 'groupId')
          return this.jFormat2(v[j])
        else if(j === 'type')
          return this.jFormat3(v[j])
        else {
          return v[j]
        }
      }))
    },
    jFormat1(data){
      if (data == '0') {
        return '男'
      }else{
        return '女'
      }
    },
    jFormat2(data){
      let res = this.groups.filter((item, i) => {
        return item.id == data;
      })
      if(res.length>0)
        return res[0].remark
      else
        return '无工会'
    },
    jFormat3(data){
      if (data == '0') {
        return '办理保险'
      }else{
        return '保险理赔'
      }
    },
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
