<template>
  <div class="wrap-layout">
    <Header class="header" />
    <Navbar class="navbar" />
    <Main class="main" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'
import Main from '@/components/Main.vue'

export default {
  name: 'home',
  components: {
    Header,
    Navbar,
    Main
  }
}
</script>

<style scoped lang="scss">
  .header {
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2d3a4b
  }
  .navbar {
    position: absolute;
    width: 230px;
    top: 49px;
    left: 0px;
    bottom: 0px;
    overflow-y: auto;
    background-color: #545c64;
  }
  .main {
    position: absolute;
    top: 49px;
    left: 230px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
  }
</style>
