<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input placeholder="搜索药方" v-model="keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>
      <!--      <el-select v-model="value1" placeholder="年级" @change="queryClass" @clear="gradeListener" clearable>-->
      <!--        <el-option v-for="item in grade" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
      <!--      </el-select>-->
      <!--      <el-select v-model="value2" placeholder="班级" @change="queryStudentByClass" @clear="classListener" clearable>-->
      <!--        <el-option-->
      <!--          v-for="item in classNo"-->
      <!--          :key="item.value"-->
      <!--          :label="item.label"-->
      <!--          :value="item.value"-->
      <!--        ></el-option>-->
      <!--      </el-select>-->
      <el-button type="primary" @click="addStudent()" class="addbtn">添加</el-button>
    </div>
    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
      <!--       <el-table-column prop="id" label="ID"></el-table-column>-->
      <!--      <el-table-column prop="studentNo" label="学号" fixed width="100"></el-table-column>-->
      <!--      <el-table-column prop="title" label="标题"></el-table-column>-->
<!--      <el-table-column prop="code" label="代码" ></el-table-column>-->
      <el-table-column prop="name" label="药材名" ></el-table-column>
<!--      <el-table-column prop="origin" label="来源" ></el-table-column>-->
      <el-table-column prop="benefit" label="功效" ></el-table-column>
      <el-table-column prop="major" label="主治" ></el-table-column>
      <el-table-column prop="place" label="产地" ></el-table-column>
      <!--      <el-table-column prop="createTime" label="提交时间" ></el-table-column>-->
      <!--      <el-table-column prop="updateTime" label="处理时间" ></el-table-column>-->
      <!--      <el-table-column prop="star" label="收藏数" ></el-table-column>-->
      <!--      <el-table-column prop="grade" label="年级" fixed width="100"></el-table-column>-->
      <!--      <el-table-column prop="classNo" label="班级" fixed width="100"></el-table-column>-->
      <!--      <el-table-column prop="author" label="作者" ></el-table-column>-->
      <!--      <el-table-column prop="type" label="类型" >-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag v-if="scope.row.type==1" plain >中医常识</el-tag>-->
      <!--          <el-tag v-else-if="scope.row.type==2" plain>中药常识</el-tag>-->
      <!--          <el-tag v-else-if="scope.row.type==3" plain>中药方剂</el-tag>-->
      <!--          <el-tag v-else-if="scope.row.type==4" plain>中药文化</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column prop="status" label="处理状态" >-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag v-if="scope.row.status==0" plain >待处理</el-tag>-->
      <!--          <el-tag v-else-if="scope.row.status==1" type="success" effect="dark">已处理</el-tag>-->
      <!--          <el-tag v-else-if="scope.row.status==2" type="warning" effect="dark">忽略</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column prop="operation" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editById(scope.$index, scope.row)"></el-button>
          <!--          <el-button type="success" icon="el-icon-check" circle @click="statusById(scope.$index, scope.row, 1)"></el-button>-->
          <!--          <el-button type="warning" icon="el-icon-close" circle @click="statusById(scope.$index, scope.row, 2)"></el-button>-->
          <el-button icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出表单编辑用户 -->
    <el-dialog title="编辑药材" :visible.sync="visibleForm">
      <el-form
              :model="editFormData"
              label-position="left"
              label-width="80px"
      >
        <el-form-item label="药材名" prop="name">
          <el-input v-model="editFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="产量" prop="amount">
          <el-input v-model="editFormData.amount"></el-input>
        </el-form-item>
        <el-form-item label="功效" prop="benefit">
          <el-input v-model="editFormData.benefit"></el-input>
        </el-form-item>
        <el-form-item label="主治" prop="major">
          <el-input v-model="editFormData.major"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="category">
                <el-select v-model="editFormData.category" placeholder="类别"  clearable>
                  <el-option
                    v-for="item in categories"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
        </el-form-item>
        <el-form-item label="产地" prop="place">
          <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加产地 </el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">提 交</el-button>
      </div>
    </el-dialog>


    <el-dialog title="添加药材" :visible.sync="visibleAddForm">
      <el-form
              :model="addFormdata"
              label-position="left"
              label-width="80px"
              :rules="editFormRules"
      >
        <el-form-item label="药材名" prop="name">
          <el-input v-model="addFormdata.name"></el-input>
        </el-form-item>
        <el-form-item label="产量" prop="amount">
          <el-input type="number" v-model="addFormdata.amount"></el-input>
        </el-form-item>
        <el-form-item label="功效" prop="benefit">
          <el-input v-model="addFormdata.benefit"></el-input>
        </el-form-item>
        <el-form-item label="主治" prop="major">
          <el-input v-model="addFormdata.major"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-select v-model="addFormdata.category" placeholder="类别"  clearable>
            <el-option
                    v-for="item in categories"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产地" prop="place">
          <!--          <el-input type="textarea" v-model="addFormdata.remark"></el-input>-->
          <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加产地 </el-button>
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
  import {add,del,modify,get,search} from "@/api/medicine";

  export default {
    name: "UserList",
    data() {
      return {
        dynamicTags:[],
        inputVisible: false,
        inputValue: '',
        studentData: [],
        editFormData: [],
        addFormdata:{
          name: "",
          major: "",
          benefit: "",
          amount: 0,
          place: "",
          remark: "",
          category: 0
        },
        visibleAddForm: false,
        keyword: "",
        page: 1,
        pageSize: 10,
        total: 0,
        type: [
          {
            value: "1",
            label: "中医常识"
          },
          {
            value: "2",
            label: "中药常识"
          },
          {
            value: "3",
            label: "中药方剂"
          },
          {
            value: "4",
            label: "中药文化"
          }
        ],
        categories: [
          {
            value: 0,
            label: "解表药"
          },
          {
            value: 1,
            label: "祛风湿药"
          },
          {
            value: 2,
            label: "祛湿药"
          },
          {
            value: 3,
            label: "清热药"
          },
          {
            value: 4,
            label: "消导药"
          },
          {
            value: 5,
            label: "催吐药"
          },
          {
            value: 6,
            label: "泻下药"
          },
          {
            value: 7,
            label: "祛痰止咳平喘药"
          }
        ],
        visibleForm: false,
        editFormRules: {
          // username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
          // realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          // telephone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
          // email: [{ required: true, message: "请输入邮件", trigger: "blur" }],
          // address: [{ required: true, message: "请输入地址", trigger: "blur" }],
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
        this.addFormdata.place = this.dynamicTags.join(',') /*把标签数据给表单*/
        console.log(this.addFormdata);
        console.log(this.dynamicTags.join(','));
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

      editById(index, row) {
        let modifyId = row.id
        this.editFormData = row
        if(row.place.trim()!='')
          this.dynamicTags = row.place.split(',')
        this.visibleForm = true
      },

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
        this.editFormData.place = this.dynamicTags.join(',')
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

      handleSizeChange() {},

      handleCurrentChange(v) {
        this.page = v
        this.allStudent()
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
    margin-left: 25px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
