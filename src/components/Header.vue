<template>
  <div class="header">
    <span>云中博客后台管理系统</span>
    <el-button
      class="log-button"
      size="mini"
      type="danger"
      @click="handlelogin">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    handlelogin() {
      this.$store.commit('REMOVE_USER')
      this.$router.push('/login')
      this.$message({
        message: '你已退出登录',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  span {
    color: #fff;
    font-size: 30px;
    margin-left: 230px;
  }
  .log-button {
    font-size: 15px;
    margin: 5px 100px;
  }
}
</style>
