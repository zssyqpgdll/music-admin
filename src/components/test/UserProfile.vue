<template>
  <div class="hello">
    <el-form :model="user2"  label-position="left" label-width="80px">
      <el-form-item label="ID">
        <el-input v-model="user2.id" autocomplete="off" placeholder="输入ID" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="user2.realname" autocomplete="off" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="user2.gender">
          <el-radio label="女">女</el-radio>
          <el-radio label="男">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="user2.age" autocomplete="off" placeholder="输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user2.password" autocomplete="off" placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item label="个人描述">
        <el-input v-model="user2.des" autocomplete="off" placeholder="个人描述"></el-input>
      </el-form-item>
      <!--
      <el-form-item label="头像">
        <el-upload v-if="!user2.avatar"
                   class="avatar-uploader"
                   action="api/file/uploadFile"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div v-else>
          <img :src="user2.avatar" class="avatar">
          <el-upload
                  class="avatar-uploader"
                  action="api/file/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      -->
      <el-form-item>
        <el-button type="primary" @click="submit()">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
// import { adminInfo } from "@/api/user";

export default {
  name: 'HelloWorld',

  props: {
    msg: String
  },
  
  data(){
    return {
      // user: this.$store.state.user,
      user2: {'id':this.$store.state.user.id,
        'realname':this.$store.state.user.realname,
        'password':this.$store.state.user.password,
        'email':this.$store.state.user.email,
        'avatar':this.$store.state.user.avatar },
    }
  },

  mounted() {
    //加载时获取管理员信息
    // this.getadminInfo();
  },

  methods:{
    // getadminInfo(){
    //   console.log(this.user2.realname)
    //   adminInfo(this.user2.realname)
    //     .then(res => {
    //         // console.log(res.data.data)
    //     })
    //     .catch(error => {
    //       // this.$message.error("获取管理员信息失败");
    //     });
    // },

    submit(){
      this.$store.dispatch('user/modify', this.user2)
        .then(()=>{
          this.$message({message: "修改信息成功", type: "success"})
        })
        .catch(()=>{})
    },

    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    //   //console.log('res',res)
    //   this.user2.avatar = res.fileDownloadUri
    // },

    // beforeAvatarUpload(file) {
    //   const isIMG = /.(jpg|jpeg|png|JPG|PNG)$/.test(file.name);
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isIMG) {
    //     this.$message.error('上传头像图片只能是图片格式!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //   }
    //   return isIMG && isLt2M;
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    width: 500px;
    border: 1px solid #eee;
    /*left: 50%;*/
    padding: 32px;
    background-color: rgba(66, 185, 120, 0.44);
    position: relative;
    /*margin-top: 250px;*/
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
