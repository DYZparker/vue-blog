<template>
  <el-form ref="searchData" :inline="true" :model="searchData" class="demo-form-inline">
    <el-form-item :prop="searchProp">
      <el-input v-model="searchData[searchProp]" :placeholder="placeholderName"></el-input>
    </el-form-item>
    <slot name="input"></slot>
    <el-form-item>
      <el-button type="primary" @click="onSearch">查询</el-button>
      <slot name="button"></slot>
      <el-button @click="onReset()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props:['searchData', 'searchProp', 'placeholderName'],
  
  methods: {
    onSearch() {
      // 检查查询条件是否都为空
      const search = JSON.parse(JSON.stringify(this.searchData))
      const blank = Object.values(search).some( item => item.toString().trim().length !== 0 ? true : false)
      if(!blank) {
        return this.$message({
            message: '请填写查询条件',
            type: 'warning'
        }); 
      }
      this.$emit("refresh")
    },

    onReset() {
      // 重置 = 先清空查询条件，再查询列表
      this.$refs['searchData'].resetFields() //element-ui的reset会把值改为undefind
      for(const key in this.searchData) {
        this.searchData[key] = ''
      }
      this.$emit("refresh", this.searchData)
    },
  }
}
</script>

<style scoped lang="scss">
.demo-form-inline {
  padding: 20px 20px 0 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
