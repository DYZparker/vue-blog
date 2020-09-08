<template>
  <el-form ref="form" :model="form">
    <el-form-item>
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.img" placeholder="请输入封面图片地址"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入文章概述"
        v-model="form.summary">
      </el-input>
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
  data() {
    return {
      form: {
        id: '',
        title: '',
        img: '',
        summary: '',
        content: '',
        tags: []
      },
      html:'',    // 及时转的html
    }
  },
  
  components: { mavonEditor },

  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render){
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    submit(){
      this.$store.dispatch('EditArticle', this.form).then(response => {
        const res = response
        if(res.code === 200) {
          return (() => {
            this.$message({
              message: res.message,
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
      const id = this.$route.params.id
      this.$store.dispatch('GetTagList')
      if(id) {
        this.$store.dispatch('GetArticle', this.$route.params.id).then(response => {
          const res = response.data.article
          this.form.id = res._id,
          this.form.title = res.title,
          this.form.img = res.img,
          this.form.summary = res.summary,
          this.form.content = res.content,
          this.form.tags = res.tags
        })
      }
    }
  },

  created() {
    this.refreshList()
  }
}
</script>

<style>
</style>
