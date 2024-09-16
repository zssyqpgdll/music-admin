<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <!-- 搜索框 -->
      <el-input style="width: 250px;" placeholder="搜索用户" v-model="keyword.keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>
      <!-- 添加用户按钮 -->
      <el-button type="primary" @click="addStudent()" class="addbtn">添加用户</el-button>
    </div>

    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <!-- 序号 -->
      <el-table-column label="序号" type="selection"></el-table-column>

      <el-table-column prop="uid" label="ID"></el-table-column>

      <el-table-column prop="name" label="用户名" fixed width="100"></el-table-column>

      <el-table-column prop="password" label="密码"></el-table-column>

      <el-table-column prop="gender" label="性别" :formatter="genderFilter"></el-table-column>

      <el-table-column prop="age" label="年龄" ></el-table-column>

      <el-table-column prop="area" label="所在地" ></el-table-column>

      <el-table-column prop="des" label="个人描述" ></el-table-column>

      <el-table-column prop="idno" label="身份证号" ></el-table-column>

      <el-table-column prop="phone" label="电话" ></el-table-column>

      <el-table-column prop="bal" label="钱包" ></el-table-column>

      <el-table-column prop="operation" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="editById(scope.$index, scope.row)"></el-button>
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
        <el-form-item label="uid" prop="uid">
          <el-input v-model="editFormData.uid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editFormData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editFormData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="editFormData.gender">
            <el-radio label="女">女</el-radio>
            <el-radio label="男">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editFormData.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地" prop="area">
          <el-input v-model="editFormData.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="个人描述" prop="des">
          <el-input v-model="editFormData.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idno">
          <el-input v-model="editFormData.idno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="editFormData.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="钱包" prop="bal">
          <el-input v-model="editFormData.bal" autocomplete="off"></el-input>
        </el-form-item>  
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加用户" :visible.sync="visibleAddForm">
      <el-form
              :model="addFormdata"
              label-position="left"
              label-width="80px"
              :rules="addFormRules"
      >

        <el-form-item label="用户名" prop="name">
          <el-input v-model="addFormdata.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addFormdata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="addFormdata.gender">
            <el-radio label="女">女</el-radio>
            <el-radio label="男">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addFormdata.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地" prop="area">
          <el-input v-model="addFormdata.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="个人描述" prop="des">
          <el-input v-model="addFormdata.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idno">
          <el-input v-model="addFormdata.idno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addFormdata.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="钱包" prop="bal">
          <el-input v-model="addFormdata.bal" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleAddForm = false">取 消</el-button>
        <el-button type="primary" @click="addCommit()">提 交</el-button>
      </div>
    </el-dialog>

<!--
    <el-dialog title="验证超级密码" :visible.sync="visiblePassForm">
      <el-form
              :model="passData"
              label-position="left"
              label-width="80px">
        <el-form-item label="超级密码" prop="spass">
          <el-input type="password" v-model="passData.spass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visiblePassForm = false">取 消</el-button>
        <el-button type="primary" @click="vertifypass()">提 交</el-button>
      </div>
    </el-dialog>
-->

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
import {add,del,getUsers,search2,modify} from "@/api/user";

export default {
  name: "UserList",

  data() {
    return {
      studentData: [],//初始数据为空
      dataAll:[],//没用
      //验证超级密码
      passData:{
        spass:''//超级密码初始为空
      },
      //编辑用户表单数据初始为空
      editFormData: [],
      //添加用户表单
      addFormdata:{
        uid: "",
        name: "",
        password: "",
        gender: "",
        age: "",
        area: "",
        des:"",
        idno: "",
        phone: "",
        bal: "",
        roles:"normal"//正常用户
      },
      //验证超级密码表单不显示
      // visiblePassForm: false,
      //添加用户表单不显示
      visibleAddForm: false,
      //搜索框关键字
      keyword: {
        type: '',
        keyword: '',
      },
      //初始页
      page: 1,
      //每页大小
      pageSize: 10,
      //初始总页数
      total: 0,
      groups:[],//无用
      //编辑用户表单不显示
      visibleForm: false,
      //编辑用户的验证规则
      editFormRules: {
        uid: [{ required: true, message: "请输入用户id", trigger: "blur" },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }],
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
      },
      //添加用户需要的规则
      addFormRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      },
    };
  },

  mounted() {
    this.allStudent();
  },

  methods: {
    //如果数据库存的就是男女，就可以不用这一步了
    // genderFilter(row, column){
    //   if(row.gender==0)
    //     return '男'
    //   else
    //     return '女'
    // },

    //点击添加用户按钮，把添加用户表单显示出来
    addStudent() {
      this.visibleAddForm = true;
    },

    //添加用户
    addCommit() {
      // console.log(this.addFormdata);
      add(this.addFormdata)
        .then(res => {
          //0成功
          if (res.code == 0) {
            this.visibleAddForm = false;
            this.$message({ message: "添加用户成功", type: "success" });
          }
        })
        .catch(error => {
          this.$message.error("添加用户失败");
        });
    },

    /***
     * 编辑提交
     */
    commit() {
      // if(this.editFormData.roles == 'admin'){
      //   //验证超级密码
      //   this.visibleForm = false
      //   this.visiblePassForm = true
      //   return ;
      // }
      this.modifyStudent(this.editFormData)
    },

    // vertifypass(){
    //   this.visiblePassForm = false
    //   if(this.passData.spass == this.$store.state.user.superpassword){
    //     this.modifyStudent(this.editFormData)
    //   }else{
    //     this.$message.error('超级密码错误！')
    //     this.allStudent()
    //   }
    // },

    //点击搜索框中的叉叉
    inputListener() {
      this.allStudent()
    },

    /**
     * 查询所有用户
     */
    allStudent() {
        getUsers(this.page).then(res => {
          let ret = res.data
          this.studentData = ret.records
          this.total = ret.total
          console.log(this.studentData)
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

    // resetById(index, row) {
    //   this.resetPassword(row.id);
    // },

    // resetPassword(id){
    //   modify({"id":id,"password":"123456"})
    //     .then(res => {
    //       this.$message({ message: "重置密码成功", type: "success" });
    //     })
    //     .catch(error => {
    //       this.$message.error("重置密码失败");
    //     });
    // },

    /**
     * 根据id删除用户
     */
    deleteById(index, row) {
      this.deleteStudentById(row.id)
    },

    deleteStudentById(id) {
      del({"id":id})
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
     * 参数是表单数据
     */
    modifyStudent(modifyData) {
      modify(modifyData)
        .then(res => {
          this.$message({ message: "更新成功", type: "success" })
          this.allStudent()//回到第一页
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

    // handleDownload() {
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['ID','用户名','姓名','部门' ,'身份证号', '性别', '年龄', '电话','权限']
    //     const filterVal = ['id','username','realname', 'groupId', 'idno', 'gender', 'age','telephone','roles']
    //     const list = this.studentData
    //     const data = this.formatJson(filterVal, list)
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: '用户名单',
    //       autoWidth: true,
    //       bookType: 'xlsx'
    //     })
    //   })
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => {
    //     if (j === 'gender') {
    //       return this.jFormat1(v[j])
    //     }else if(j === 'groupId')
    //       return this.jFormat2(v[j])
    //     else {
    //       return v[j]
    //     }
    //   }))
    // },
    // jFormat1(data){
    //   if (data == '0') {
    //     return '男'
    //   }else{
    //     return '女'
    //   }
    // },
    // jFormat2(data){
    //   let res = this.groups.filter((item, i) => {
    //     return item.id == data;
    //   })
    //   if(res.length>0)
    //     return res[0].remark
    //   else
    //     return '无工会'
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

  .addbtn{
    margin-left: 5px;
  }
</style>
