<template>
  <div class="app-container">
<!--    <el-button type="primary" @click="handleAddRole">New Role</el-button>-->

    <el-table :data="banners" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="轮播图名" width="250">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="内容" width="380">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="图片" width="380">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.img"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" disabled size="small" @click="">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑轮播图" :visible.sync="visibleForm">
      <el-form
          :model="editFormData"
          label-position="left"
          label-width="80px"
      >
        <el-form-item label="ID">
          <el-input v-model="editFormData.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="editFormData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="editFormData.content" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="轮播图" prop="img">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">提 交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {get, update} from "@/api/banner";

export default {
  data() {
    return {
      banners: [],
      visibleForm: false,
      editFormData:{}
    }
  },
  computed: {

  },
  created() {
    this.getBanners()
  },
  methods: {


    async getBanners() {
      const res = await get()
      this.banners = res.data.records
      // console.log(this.banners)
    },

    handleEdit(scope) {
      this.editFormData = scope.row
      this.visibleForm = true
    },
    commit(){
      update(this.editFormData).then(res => {
        if (res.code == 0) {
          this.visibleForm = false;
          this.$message({ message: res.message, type: "success" });
        }
      })
          .catch(error => {
            this.$message.error(res.message);
          });
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //console.log('res',res)
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
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}

.avatar {
  width: 360px;
  height: 210px;
  display: block;
}
</style>
