<template>
  <div>
    <el-form ref="searchData" :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item prop="alt">
        <el-input v-model="searchData.alt" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="onReset()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data= this.$store.state.common.topicList
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="rowClass">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="alt" label="名称" width="150"></el-table-column>
      <el-table-column prop="src" label="地址" width="300"></el-table-column>
      <el-table-column prop="src" label="预览" width="500">
        <template slot-scope="scope">
          <el-image
            style="width: 480px; height: 140px"
            :src= scope.row.src
            :fit= scope.row.alt>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
      :total= this.$store.state.common.total
      class="pagination">
    </el-pagination>

    <el-dialog title="图片编辑" :visible.sync="dialogFormVisible" width="400px" center>
      <el-form :model="editData" :rules="rules" ref="ruleForm" label-width="80px" size="mini">
        <el-form-item label="id" prop="_id" v-show="false">
          <el-input v-model="editData._id"></el-input>
        </el-form-item>
        <el-form-item label="图片名称" prop="alt">
          <el-input v-model="editData.alt"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="src">
          <el-input v-model="editData.src"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchData: {
          alt: ''
        },
        currentPage: 1,
        currentSize: 10,
        dialogFormVisible: false,
        editData: {
          _id: null,
          alt: null,
          src: null
        },
        rules: {
          alt: [
            { required: true, message: '请输入图片名称', trigger: 'blur' }
          ],
          src: [
            { required: true, message: '请输入图片地址', trigger: 'blur' }
          ]
        }
      }
    },
    
    methods: {
      handleAdd() {
        this.dialogFormVisible = true
        // Object.values(this.editData).forEach( item => item = '')
        this.$nextTick(() => {
          this.$refs['ruleForm'].resetFields()
        })
      },

      //将增加数据和修改数据合并到一个API，后端判断有_id就是更新，没有就添加
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            return this.$store.dispatch('EditTopic', this.editData).then(response => {
              const res = response.data
              //清空本次查询传入的_id
              this.editData._id = null
              if(res.code === 200){
                return (() => {
                  this.$message({
                    message: res.data.message,
                    type: 'success'
                  })
                  this.refreshList()
                  this.dialogFormVisible = false
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
      },

      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.editData = JSON.parse(JSON.stringify(row))
        })
      },

      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('DelTopic', row._id).then(response => {
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
          });          
        });

      },

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
        this.refreshList()
      },

      onReset() {
        // 重置 = 先清空查询条件，再查询列表
        this.$refs['searchData'].resetFields() //element-ui的reset会把值改为undefind
        for(const key in this.searchData) {
          this.searchData[key] = ''
        }
        this.refreshList()
      },

      refreshList() {
        const searchData = this.searchData
        //过滤空的查询对象
        for(const key in searchData) {
          if (searchData[key] === '') {
            delete searchData[key]
          }
        }
        return this.$store.dispatch('GetTopicList', {page: this.currentPage, size: this.currentSize, search: this.searchData})
      },

      handleSizeChange(val) {
        this.currentSize = val
        this.refreshList()
      },

      handleCurrentChange(val) {
        this.currentPage = val
        this.refreshList()
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
.demo-form-inline {
  padding: 20px 20px 0 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
