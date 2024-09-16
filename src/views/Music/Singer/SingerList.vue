<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input placeholder="搜索" v-model="keyword.keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>
      <el-button type="primary" @click="addStudent()" class="addbtn">添加</el-button>
    </div>

    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
      <el-table-column prop="suid" label="歌手ID"></el-table-column>
      <el-table-column prop="sname" label="歌手名"></el-table-column>
      <el-table-column prop="surl" label="歌手地址"></el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right">
        <template slot-scope="scope">
          <!--
          <el-button v-if="scope.row.status==0" type="success" icon="el-icon-check" circle
                     @click="statusById(scope.$index, scope.row, 1)"></el-button>
          <el-button v-if="scope.row.status==0" type="danger" icon="el-icon-close" circle
                     @click="statusById(scope.$index, scope.row, 2)"></el-button>
          -->
          <el-button icon="el-icon-edit" type="primary" circle @click="editById(scope.$index, scope.row)"></el-button>
          <el-button icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑歌手表单 -->
    <el-dialog title="编辑" :visible.sync="visibleForm">
      <el-form
          :model="editFormData"
          label-position="left"
          label-width="80px"
          :rules="editFormRules"
      >
        <el-form-item label="ID">
          <el-input v-model="editFormData.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="歌手ID" prop="suid">
          <el-input v-model="editFormData.suid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手名" prop="sname">
          <el-input v-model="editFormData.sname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手URL" prop="surl">
          <el-input v-model="editFormData.surl" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 添加歌手表单 -->
    <el-dialog title="添加" :visible.sync="visibleAddForm">
      <el-form
          :model="addFormdata"
          label-position="left"
          label-width="80px"
          :rules="editFormRules"
      >
        <el-form-item label="歌手ID" prop="suid">
          <el-input v-model="addFormdata.suid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手名" prop="sname">
          <el-input v-model="addFormdata.sname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手URL" prop="surl">
          <el-input v-model="addFormdata.surl" autocomplete="off"></el-input>
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
import {add, del, modify, get, search} from "@/api/singer";

export default {
  name: "UserList",

  data() {
    return {
      studentData: [],//初始数据
      editFormData: [],//编辑表单初始数据
      //添加歌手表单初始数据
      addFormdata: {
        title: "",
        content: "",
        author: this.$store.state.user.username,
        authorName: this.$store.state.user.realname,
        type: "",
      },
      //搜索框关键字
      keyword: {
        group: '',
        keyword: ''
      },
      //初始页面
      page: 1,
      pageSize: 10,
      total: 0,
      visibleForm: false,
      visibleAddForm: false,
      groups: [],
    };
  },

  //加载歌手数据
  mounted() {
    this.allStudent();
  },

  methods: {
    // genderFilter(row, column) {
    //   if (row.gender == 0)
    //     return '男'
    //   else
    //     return '女'
    // },
    // typeFilter(row, column) {
    //   if (row.type == 0)
    //     return '办理保险'
    //   else
    //     return '保险理赔'
    // },
    // statusFormatter(data) {
    //   if (data.status == '0') {
    //     return '待审批'
    //   }
    // },
    
    //点击添加按钮打开添加歌手表单
    addStudent() {
      this.visibleAddForm = true;
    },

    //添加歌手
    addCommit() {
      console.log(this.addFormdata);
      add(this.addFormdata)
        .then(res => {
          //添加成功，code为0
          if (res.code == 0) {
            this.visibleAddForm = false;
            this.$message({message: "添加成功", type: "success"});
            this.allStudent()//返回首页
          }
        })
        .catch(error => {
          this.$message.error("添加失败");
        });
    },
    // // 清空年级回到查询所有用户
    // gradeListener() {
    //   this.allStudent()
    //   this.value2 = ''
    // },

    // // 清空班级回到查询所有班级
    // classListener() {

    // },

    /***
     * 编辑表单提交
     */
    commit() {
      this.modifyStudent(this.editFormData)
    },

    //清除搜索框内容后显示首页歌手数据
    inputListener() {
      this.allStudent()
    },

    /**
     * 查询当前页面歌手数据
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
            this.$message({message: "查询成功", type: "success"})
          })
          .catch(error => {
            this.$message.error("查询失败")
          });
    },

    // resetById(index, row) {
    //   this.resetPassword(row.id);
    // },

    // resetPassword(id) {
    //   modify({"id": id, "password": "123456"})
    //       .then(res => {
    //         this.$message({message: "重置密码成功", type: "success"});
    //       })
    //       .catch(error => {
    //         this.$message.error("重置密码失败");
    //       });
    // },

    //通过id而不是suid删除歌手数据
    deleteById(index, row) {
      this.deleteRequestById(row.id)
    },

    deleteRequestById(id) {
      del(id).then(res => {
        this.$message({message: "删除成功", type: "success"})
        this.allStudent()
      }).catch(error => {
        this.$message.error("删除失败")
      });
    },

    /*审核状态*/
    // statusById(index, row, status) {
    //   this.statusRequestById(row.id, status)
    // },

    // statusRequestById(id, status) {
    //   modify({"id": id, "status": status}).then(res => {
    //     this.$message({message: "处理成功", type: "success"})
    //     this.allStudent()
    //   }).catch(error => {
    //     this.$message.error("处理失败")
    //   });
    // },

    /**
     * 编辑歌手
     */
    editById(index, row) {
      let modifyId = row.id
      this.editFormData = row//给编辑歌手表单数据赋值
      this.visibleForm = true
    },

    /**
     * 更新用户
     */
    modifyStudent(modifyData) {
      modify(modifyData)
          .then(res => {
            this.$message({message: "更新成功", type: "success"})
            this.allStudent()//更新成功后返回歌手首页
            this.visibleForm = false
          })
          .catch(error => {
            this.$message.error("更新失败")
          });
    },

    handleSizeChange() {
    },

    handleCurrentChange(v) {
      this.page = v
      this.allStudent()
    },

    // handleDownload() {
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['ID', '部门', '会员', '身份证号', '性别', '年龄', '类型', '原因', '金额']
    //     const filterVal = ['id', 'groupId', 'realname', 'idno', 'gender', 'age', 'type', 'reason', 'amount']
    //     const list = this.studentData
    //     const data = this.formatJson(filterVal, list)
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: '保险清单',
    //       autoWidth: true,
    //       bookType: 'xlsx'
    //     })
    //   })
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => {
    //     if (j === 'gender') {
    //       return this.jFormat1(v[j])
    //     } else if (j === 'groupId')
    //       return this.jFormat2(v[j])
    //     else if (j === 'type')
    //       return this.jFormat3(v[j])
    //     else {
    //       return v[j]
    //     }
    //   }))
    // },
    // jFormat1(data) {
    //   if (data == '0') {
    //     return '男'
    //   } else {
    //     return '女'
    //   }
    // },
    // jFormat2(data) {
    //   let res = this.groups.filter((item, i) => {
    //     return item.id == data;
    //   })
    //   if (res.length > 0)
    //     return res[0].remark
    //   else
    //     return '无工会'
    // },
    // jFormat3(data) {
    //   if (data == '0') {
    //     return '办理保险'
    //   } else {
    //     return '保险理赔'
    //   }
    // },
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

.addbtn {
  margin-left: 5px;
}
</style>
