<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
<!--      <el-select v-model="keyword.group" placeholder="" >-->
<!--        <el-option v-for="item in groups"-->
<!--                   :key="item.id" :label="item.remark" :value="item.id">-->
<!--        </el-option>-->
<!--      </el-select>-->
      <el-input placeholder="搜索内容" v-model="keyword.keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>

<!--      <el-button style="margin-left:20px;" type="success" plain icon="el-icon-document" @click="handleDownload">-->
<!--        导出Excel-->
<!--      </el-button>-->
<!--      <el-button type="primary" @click="addStudent()" class="addbtn">添加</el-button>-->
    </div>
    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
      <el-table-column prop="title" label="评论标题"></el-table-column>
      <el-table-column prop="content" label="评论内容" ></el-table-column>
      <el-table-column prop="author" label="作者" ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" ></el-table-column>
<!--      <el-table-column prop="updateTime" label="更新时间" ></el-table-column>-->
      <el-table-column prop="operation" label="操作" fixed="right" width="180">
      <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
<!--          <el-button type="primary" icon="el-icon-edit" circle @click="editById(scope.$index, scope.row)"></el-button>-->
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
  import {add,get,search,modify,remove} from "@/api/comment";
  import {get as getG} from "@/api/group";

  export default {
  name: "FundList",
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
      festivals:['劳动节','五四青年节','端午节','重阳节','中秋节','国庆节','春节'],
      groups: [],
      visiblePassForm: false,
      visibleAddForm: false,
      keyword: {
        group: '',
        keyword:''
      },
      groupQuery: 0,
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
    // this.getGroup();
  },

  methods: {
    // getGroup(){
    //   getG(1,20).then(res=>{
    //     this.groups = res.data.records
    //     // console.log(this.groups)
    //   })
    // },
    // groupName(row, column){
    //   let res = this.groups.filter((item, i) => {
    //          return item.id == row.groupId;
    //      })
    //   console.log('res', res)
    //   if(res.length>0)
    //     return res[0].remark
    //   else
    //     return '无工会'
    // },
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

    inputListener() {
      this.allStudent()
    },

    /**
     * 查询所有用户
     */
    allStudent() {
        get(this.page).then(res => {
          console.log(res)
          let ret = res.data
          this.studentData = ret.records
          this.total = ret.total
          // this.$message({message:'查询成功', type: 'success'})
        })
        .catch(error => {
          this.$message.error("查询数据失败")
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
      remove(id)
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
    },
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID','工会' ,'费用', '金额', '会员','时间']
        const filterVal = ['id','groupId', 'reason', 'amount', 'realname','createTime']
        const list = this.studentData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '租赁人员会费缴纳清单',
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
