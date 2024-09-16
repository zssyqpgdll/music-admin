<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input placeholder="搜索" v-model="keyword.keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>

<!--      <el-button style="margin-left:20px;" type="success" plain icon="el-icon-document" @click="handleDownload">-->
<!--        导出Excel-->
<!--      </el-button>-->

      <el-button type="primary" @click="addStudent()" class="addbtn">添加</el-button>
    </div>
    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
<!--  <el-table-column prop="id" label="ID"></el-table-column>-->
<!--  <el-table-column prop="studentNo" label="学号" fixed width="100"></el-table-column>-->
      <el-table-column prop="name" label="企业名" ></el-table-column>
      <el-table-column prop="owner" label="法定代表人" ></el-table-column>
      <el-table-column prop="code" label="社会统一信用代码"></el-table-column>
<!--      <el-table-column prop="type" label="类型" ></el-table-column>-->
      <el-table-column prop="address" label="地址" ></el-table-column>
      <el-table-column prop="openAmount" label="开办金额（万）" ></el-table-column>
      <el-table-column prop="service" label="业务范围与宗旨" :show-overflow-tooltip="true"></el-table-column>
      <!--<el-table-column prop="grade" label="年级" fixed width="100"></el-table-column>-->
<!--      <el-table-column prop="classNo" label="班级" fixed width="100"></el-table-column>-->
<!--      <el-table-column prop="pic1" label="身份证正面" >-->
<!--        <template   slot-scope="scope">-->
<!--          <a :href="scope.row.pic1" target="_blank"> <img :src="scope.row.pic1"  min-width="70" height="70" /> </a>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="pic2" label="身份证反面" >-->
<!--        <template   slot-scope="scope">-->
<!--          <a :href="scope.row.pic2" target="_blank"> <img :src="scope.row.pic2"  min-width="70" height="70" /> </a>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="pic3" label="材料" >-->
<!--        <template   slot-scope="scope">-->
<!--          <a :href="scope.row.pic3" target="_blank"> <img :src="scope.row.pic3"  min-width="70" height="70" /> </a>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="status" label="审批状态" >-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag v-if="scope.row.status==0" plain >待审批</el-tag>-->
<!--          <el-tag v-else-if="scope.row.status==1" type="success" effect="dark">通过</el-tag>-->
<!--          <el-tag v-else-if="scope.row.status==2" type="danger" effect="dark">拒绝</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="operation" label="操作" fixed="right" >
        <template slot-scope="scope">
<!--          <el-button type="text" icon="el-icon-setting" size="mini" @click="resetById(scope.$index, scope.row)">重置密码</el-button>-->
          <el-button v-if="scope.row.status==0" type="success" icon="el-icon-check" circle @click="statusById(scope.$index, scope.row, 1)"></el-button>
          <el-button v-if="scope.row.status==0" type="danger" icon="el-icon-close" circle @click="statusById(scope.$index, scope.row, 2)"></el-button>
          <el-button icon="el-icon-edit" type="primary" circle @click="editById(scope.$index, scope.row)"></el-button>
          <el-button icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

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
        <el-form-item label="企业名" prop="name">
          <el-input v-model="editFormData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人" prop="owner">
          <el-input v-model="editFormData.owner" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码" prop="code">
          <el-input v-model="editFormData.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开办资金（万）" prop="openAmount">
          <el-input v-model="editFormData.openAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务范围与宗旨" prop="service">
          <el-input type="textarea" v-model="editFormData.service"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editFormData.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">提 交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="visibleAddForm">
      <el-form
          :model="addFormdata"
          label-position="left"
          label-width="80px"
          :rules="editFormRules"
      >
        <el-form-item label="企业名" prop="name">
          <el-input v-model="addFormdata.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人" prop="owner">
          <el-input v-model="addFormdata.owner" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码" prop="code">
          <el-input  v-model="addFormdata.code"></el-input>
        </el-form-item>
        <el-form-item label="开办资金（万）" prop="openAmount" v-show="true">
          <el-input v-model="addFormdata.openAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务范围与宗旨" prop="service">
          <el-input type="textarea" v-model="addFormdata.service"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address" v-show="true">
          <el-input v-model="addFormdata.address" autocomplete="off" ></el-input>
        </el-form-item>
<!--        <el-form-item label="类型" prop="type">-->
<!--          <el-select v-model="addFormdata.type" placeholder="" >-->
<!--            <el-option v-for="item in type"-->
<!--                       :key="item.value" :label="item.label" :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
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
  import {add,del,modify,get,search} from "@/api/enterprise";
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
      keyword: {
        group: '',
        keyword:''
      },
      page: 1,
      pageSize: 10,
      total: 0,
      visibleForm: false,
      visibleAddForm: false,
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
    typeFilter(row, column){
      if(row.type==0)
        return '办理保险'
      else
        return '保险理赔'
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
