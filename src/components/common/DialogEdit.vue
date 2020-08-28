<template>
  <el-dialog 
    :title="dialogData.title" 
    :visible.sync="dialogData.dialogFormVisible" 
    width="400px" 
    center
  >
    <el-form 
      :model="dialogData.editData" 
      :rules="dialogData.rules" 
      :ref="dialogData.ref" 
      label-width="80px" 
      size="mini"
    >
      <el-form-item 
        v-for="item in dialogData.propsData" 
        :key="item.name" 
        :label="item.label" 
        :prop="item.name"
      >
        <div v-if="item.hasSlot">
          <slot :editData="dialogData.editData"></slot>
        </div>
        <div v-else>
          <el-input v-model="dialogData.editData[item.name]"></el-input>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="submitForm(dialogData.ref)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props:['dialogData'],

  methods: {
    handleCancel () {
      this.$emit("visible", false)
    },
    
    //将增加数据和修改数据合并到一个API，后端判断有_id就是更新，没有就添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return this.$store.dispatch(this.dialogData.dispatchName, this.dialogData.editData).then(response => {
            const res = response.data
            //清空本次查询传入的_id
            this.dialogData.editData._id = null
            if(res.code === 200){
              return (() => {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                this.$emit("refresh")
                this.$emit("visible", false)
              })()
            }
            this.$message({
              message: '编辑失败',
              type: 'warning'
            })
          }).catch(error => {
            console.log(error)
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
