<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-select v-model="keyword.type" placeholder="类型" >
        <el-option
                v-for="item in type" :key="item.value" :label="item.label"
                :value="item.value"
        ></el-option>
      </el-select>

      <el-input placeholder="搜索新闻" v-model="keyword.keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>
      <el-button type="primary" @click="addStudent()" class="addbtn">添加通知</el-button>
    </div>
    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
<!--       <el-table-column prop="id" label="ID"></el-table-column>-->
<!--      <el-table-column prop="studentNo" label="学号" fixed width="100"></el-table-column>-->
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容" ></el-table-column>
      <el-table-column prop="thumb" label="点赞数" ></el-table-column>
      <el-table-column prop="star" label="收藏数" ></el-table-column>
<!--      <el-table-column prop="grade" label="年级" fixed width="100"></el-table-column>-->
<!--      <el-table-column prop="classNo" label="班级" fixed width="100"></el-table-column>-->
      <el-table-column prop="author" label="作者" ></el-table-column>
      <el-table-column prop="type" label="类型" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type==1" plain >通知公告</el-tag>
          <el-tag v-else-if="scope.row.type==2" plain>系统升级</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审批状态" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==0" plain >待审批</el-tag>
          <el-tag v-else-if="scope.row.status==1" type="success" effect="dark">通过</el-tag>
          <el-tag v-else-if="scope.row.status==2" type="danger" effect="dark">拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
<!--          <el-button type="text" icon="el-icon-setting" size="mini" @click="resetById(scope.$index, scope.row)">重置密码</el-button>-->
          <el-button type="success" icon="el-icon-check" circle @click="statusById(scope.$index, scope.row, 1)"></el-button>
          <el-button type="danger" icon="el-icon-close" circle @click="statusById(scope.$index, scope.row, 2)"></el-button>
          <el-button icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出表单编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="visibleForm">
      <el-form
        :model="editFormData"
        label-position="left"
        label-width="80px"
        :rules="editFormRules"
      >
        <el-form-item label="ID">
          <el-input v-model="editFormData.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editFormData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="editFormData.realname" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="年级" prop="grade">-->
<!--          <el-input v-model="editFormData.grade" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="班级" prop="classNo">-->
<!--          <el-input v-model="editFormData.classNo" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="手机" prop="telephone">
          <el-input v-model="editFormData.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="editFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editFormData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editFormData.age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">提 交</el-button>
      </div>
    </el-dialog>


    <el-dialog title="添加通知" :visible.sync="visibleAddForm">
      <el-form
              :model="addFormdata"
              label-position="left"
              label-width="80px"
              :rules="editFormRules"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="addFormdata.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="addFormdata.content"></el-input>
        </el-form-item>
        <el-form-item label="" prop="author" v-show="false">
          <el-input v-model="addFormdata.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author" v-show="true">
          <el-input v-model="addFormdata.authorName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="addFormdata.type" placeholder="" >
                    <el-option v-for="item in type"
                      :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
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
  import {add,del,modify,get,search2} from "@/api/notice";

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
        type: '',
        keyword: '',
      },
      page: 1,
      pageSize: 10,
      total: 0,
      type: [
        {
          value: "1",
          label: "通知公告"
        },
        {
          value: "2",
          label: "系统升级"
        }
      ],
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
      search2(this.keyword)
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
