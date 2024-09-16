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
      <el-table-column prop="name" label="品名" ></el-table-column>
      <el-table-column prop="type" label="类型" ></el-table-column>
      <el-table-column prop="birth" label="产地"></el-table-column>
      <el-table-column prop="period" label="周期(天)"></el-table-column>
      <el-table-column prop="bonus" label="利润(元)"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.img"/>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" >
        <template slot-scope="scope">
          <!--          <el-button type="text" icon="el-icon-setting" size="mini" @click="resetById(scope.$index, scope.row)">重置密码</el-button>-->
<!--          <el-button v-if="scope.row.status==0" type="success" icon="el-icon-check" circle @click="statusById(scope.$index, scope.row, 1)"></el-button>-->
<!--          <el-button v-if="scope.row.status==0" type="danger" icon="el-icon-close" circle @click="statusById(scope.$index, scope.row, 2)"></el-button>-->
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
      >
        <el-form-item label="ID">
          <el-input v-model="editFormData.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="品名" prop="name">
          <el-input v-model="editFormData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="editFormData.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地" prop="birth">
          <el-input v-model="editFormData.birth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="周期(天)" prop="period">
          <el-input v-model="editFormData.period" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="利润(元)" prop="bonus">
          <el-input v-model="editFormData.bonus" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload v-if="!editFormData.img"
                     class="avatar-uploader"
                     action="api/file/uploadFile"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="editFormData.img" :src="editFormData.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div v-else>
            <img :src="editFormData.img" class="avatar">
            <el-upload
                class="avatar-uploader"
                action="api/file/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus avatar-uploader-icon">修改</i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="企业" prop="eid">
          <el-select v-model="editFormData.eid" placeholder="" >
            <el-option v-for="item in enterprises"
                       :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">提 交</el-button>
      </div>
    </el-dialog>


    <el-dialog title="添加" :visible.sync="visibleAddForm">
      <el-form
          :model="addFormData"
          label-position="left"
          label-width="80px"
      >
        <el-form-item label="品名" prop="name">
          <el-input v-model="addFormData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="addFormData.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地" prop="birth">
          <el-input  v-model="addFormData.birth"></el-input>
        </el-form-item>
        <el-form-item label="周期(天)" prop="period" v-show="true">
          <el-input v-model="addFormData.period" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="利润(元)" prop="bonus">
          <el-input  v-model="addFormData.bonus"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img" >
          <el-upload v-if="!addFormData.img"
                     class="avatar-uploader"
                     action="api/file/uploadFile"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="addFormData.img" :src="addFormData.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div v-else>
            <img :src="addFormData.img" class="avatar">
            <el-upload
                class="avatar-uploader"
                action="api/file/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus avatar-uploader-icon">修改</i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="企业" prop="eid">
          <el-select v-model="addFormData.eid" placeholder="" >
            <el-option v-for="item in enterprises"
                       :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
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
import {add,del,modify,get,search} from "@/api/crop";
import {get as getG} from "@/api/group";
import {get as getE} from "@/api/enterprise";


export default {
  name: "UserList",
  data() {
    return {
      studentData: [],
      editFormData: {},
      addFormData: {img:''},
      keyword: {
        group: '',
        keyword:''
      },
      page: 1,
      pageSize: 10,
      total: 0,
      visibleForm: false,
      visibleAddForm: false,
      enterprises:[],
    };
  },

  mounted() {
    this.allStudent();
    this.getEnerprise();
  },

  methods: {
    getEnerprise(){
      getE(1,20).then(res=>{
        this.enterprises = res.data.records
        // console.log(this.enterprises)
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addFormData.img = res.fileDownloadUri
      this.editFormData.img = res.fileDownloadUri
    },
    beforeAvatarUpload(file) {
      const isIMG = /.(jpg|jpeg|png|JPG|PNG)$/.test(file.name);
      const limitSize  = 20;   // 20MB
      const isLt2M = file.size / 1024 / 1024 < limitSize;

      if (!isIMG) {
        this.$message.error('上传头像图片只能是图片格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 ' +limitSize+ 'MB!');
      }
      return isIMG && isLt2M;
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

.avatar {
  width: 120px;
  height: 120px;
}
</style>
