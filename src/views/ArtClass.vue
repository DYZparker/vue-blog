<template>
  <div>
    <Inquiry-bar :searchData="searchData" searchProp="title" placeholderName="标题" @refresh="refreshList"></Inquiry-bar>

    <div class="tag-group">
      <span class="tag-group__title">标签分类：</span>
      <el-tag
        class="tag-group-tag"
        v-for="item in this.$store.state.common.tagList"
        :key="item.title"
        :color="item.color"
        effect="dark"
        @click="onClickTag(item.title)">
        {{ item.title }}
      </el-tag>
    </div>

    <el-table
      :data= this.$store.state.article.articleList
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="rowClass">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="title" label="标题" min-width="300"></el-table-column>
      <el-table-column prop="tags" label="标签" min-width="200"></el-table-column>
      <el-table-column prop="img" label="封面图片" min-width="400"></el-table-column>
      <el-table-column prop="date" label="发布时间" min-width="200" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="currentSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total= this.$store.state.article.total
      class="pagination">
    </el-pagination>
  </div>
</template>

<script>
  import moment from 'moment'
  import InquiryBar from '../components/common/InquiryBar'
  export default {
    data() {
      return {
        searchData: {},
        currentPage: 1,
        currentSize: 10
      }
    },

    components: {InquiryBar},
    
    methods: {
      handleEdit(index, row) {
        this.$router.push('/article/edit/' + row._id)
      },

      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DelArticle', row._id).then(response => {
            const res = response.data
            if(res.code === 200) {
              return (() => {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                this.refreshList()
              })()
            }
            this.$message({
              message: res.message,
              type: 'warning'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },

      onClickTag(tag) {
        this.$store.dispatch('GetArticleList', {page: this.currentPage, size: this.currentSize, search: {tags: tag}})
      },

      refreshList(data) {
        const searchData = data || {}
        //过滤空的查询对象
        for(const key in searchData) {
          if (searchData[key] === '') {
            delete searchData[key]
          }
        }
        this.$store.dispatch('GetTagList')
        this.$store.dispatch('GetArticleList', {page: this.currentPage, size: this.currentSize, search: searchData})
      },

      refreshListtt(data) {
        console.log('收到了', data)
      },

      handleSizeChange(val) {
        this.currentSize = val
        this.refreshList()
      },

      handleCurrentChange(val) {
        this.currentPage = val
        this.refreshList()
      },

      dateFormat(row) {
        const date = moment(row.date).format('YYYY-MM-DD HH:mm:ss')
        return date
      },

      cellStyle() {
        return "text-align:center"
      },

      rowClass() {
        return "text-align:center"
      }
    },

    created() {
      this.refreshList()
    }
  }
</script>

<style lang="scss" scope>
.tag-group {
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .tag-group-tag {
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      box-shadow: 2px 2px 2px 0 rgba(247, 6, 6, 0.1);
      border: 1px solid red;
    }
  }
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
