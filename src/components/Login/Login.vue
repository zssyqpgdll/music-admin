<template>
  <div class="login-wrapper">

    <div class="login-box">
      <!-- 头像 -->
      <div class="login-avatar">
        <img src="@/assets/head/music.png" alt />
      </div>

      <!-- 登录表单 -->
      <el-form class="login-form" ref="loginFormRef" :model="studentLoginForm" :rules="studentLoginFormRules">
        <h1 align="center">后台登录</h1>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="studentLoginForm.username" placeholder="请输入账号" prefix-icon="iconfont iconicon"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="studentLoginForm.password" placeholder="请输入密码" @keyup.enter.native="login" prefix-icon="iconfont iconmima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="button">
          <el-button type="primary" @click="login">登录</el-button>
          <!-- 后台管理系统不能注册账号 -->
          <!-- <el-button type="info" @click="registerNo" style="display: none;">注册账号</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  //这个在这里没用到
  import {login} from "@/api/user";
  import {setToken} from "@/utils/auth";

  export default {
  name: "Login",

  data() {
    return {
      // 登录表单的对象
      studentLoginForm: {
        //初始值
        username: '',
        password: ''
      },

      //登陆需要的规则
      studentLoginFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      },
    }
  },

  methods: {
    //用不到了，后台管理系统不能注册
    // registerNo() {
    //   // 跳转到注册页面
    //   window.location.href="http://localhost:8081/#/student/register"
    // },

    login() {
      // 表单预验证
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return;//不符合规则不通过
        //成功之后调用登陆方法并保存用户信息
        //调取store里的user.js的login方法，把用户信息存到store中
        this.$store.dispatch('user/login', this.studentLoginForm)
        .then(()=>{
          //登陆成功跳转url，失败无动作
          this.$router.push({ path: this.redirect || '/' }).catch((error)=>{})
        })
        .catch((error)=>{}
        )
      })
    }
  }
};
</script>

<style lang="less" scoped>

  .login-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }

  // .login-type {
  //   display: flex;
  //   justify-content: left;
  // }

  .button {
    display: flex;
    margin-top: 15px;
    margin-right: 30px;
    justify-content: center;
  }

  .login-wrapper {
    background: #b1ceec;
    height: 100%;
  }

  .login-avatar {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .title {
    color: #fff;
  }

  .login-box {
    width: 550px;
    height: 320px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

</style>
