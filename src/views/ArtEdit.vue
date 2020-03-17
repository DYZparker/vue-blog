<template>
  <el-form ref="form" :model="form">
  <el-form-item>
    <el-input v-model="form.title" placeholder="请输入标题"></el-input>
  </el-form-item>
  <el-form-item>
    <mavon-editor 
        v-model="form.content" 
        ref="md" 
        @change="change" 
        style="min-height: 400px"
    />
  </el-form-item>
  <el-form-item>
    <el-checkbox-group v-model="form.tags">
      <el-checkbox v-for="item in this.$store.state.common.tagList" :key="item.title" :label="item.title" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button>重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  components: {
      mavonEditor,
  },
  data() {
    return {
      form: {
        id: '',
        title: '',
        content: '',
        tags: []
      },
      html:'',    // 及时转的html
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render){
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    submit(){
      // console.log(this.form.content);
      // console.log(this.html);
      this.$store.dispatch('EditArticle', this.form).then(response => {
        const res = response
        console.log(res)
        if(res.code === 200) {
          return (() => {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          })()
        }
        this.$message({
          message: res.message,
          type: 'warning'
        })
      })
      this.$router.push('/article/class')
    },

    refreshList() {
      this.$store.dispatch('GetTagList')
      this.$store.dispatch('GetArticle', this.$route.params.id).then(response => {
        this.form.id = response._id,
        this.form.title = response.title,
        this.form.content = response.content,
        this.form.tags = response.tags
      })
    }
  },

  created() {
    this.refreshList()
  }
}
</script>

<style>
</style>
