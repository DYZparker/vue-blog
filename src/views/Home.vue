<template>
  <div class="home">
    <div class="blog-but"><el-button type="primary" @click="goto">前往博客首页</el-button></div>
    <div class="blog-content">
      <el-carousel class="blog-banner">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goto() {
      window.open("http://dengyunzhong.com/", "_blank")
    }
  }
}
</script>

<style lang="scss" scope>
.blog-but {
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.blog-content {
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .blog-banner {
    margin: 20px 0;
    border-radius: 3px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
