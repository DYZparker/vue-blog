<template>
  <div class="login">
    <el-form :model="formData" status-icon ref="ruleForm" label-width="50px" class="demo-ruleForm">
      <div class="login-title">博客后台管理系统</div>
      <el-form-item label="账号" prop="username">
        <el-input type="username" v-model="formData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="login-button">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      submitForm() {
        this.$store.dispatch('Login', this.formData).then(response => {
          if(response.code === 200) {
            return (() => {
              if(response.data.user.admin === 1) {
                this.$message({
                  message: response.data.message,
                  type: 'success'
                })
                this.$router.push('/home')
              }else {
                this.$message({
                  message: '你不是管理员账号',
                  type: 'warning'
                })
              }
            })()
          }
          this.$message({
            message: response.data.message,
            type: 'warning'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '网络错误'
          });          
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="scss">
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(http://122.51.57.99:7777/image/1.png);
  background-size: 100% 100%;
  .demo-ruleForm {
    width: 350px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    margin: 150px auto;
    padding: 40px;
    .login-title {
      margin-bottom: 20px;
      font-size: 25px;
      font-weight: bolder;
      text-align: center;
      color: rgb(68, 64, 64);
    }
    .login-button {
      margin-left: 50px;
    }
  }
}
</style>
