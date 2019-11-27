<template>
  <el-menu
    router
    default-active="/home"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">后台首页</span>
    </el-menu-item>
    <el-submenu index="/manage">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>前台管理</span>
      </template>
        <el-menu-item index="2-1">轮播图</el-menu-item>
        <el-menu-item index="2-2">文章分类</el-menu-item>
        <el-menu-item index="2-3">标签分类</el-menu-item>
    </el-submenu>
    <el-menu-item index="/article">
      <i class="el-icon-s-management"></i>
      <span slot="title">文章管理</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-s-custom"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped lang="scss">
</style>
