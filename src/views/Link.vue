<template>
  <div>
    <div style="margin-bottom: 20px;" class="add-tab-button">
      <el-button type="primary" @click="addTab()" >新增类别</el-button>
    </div>

    <el-dialog title="新增类别" :visible.sync="dialogFormTabVisible" width="400px" center>
      <el-form :model="editDataTab" :rules="rulesTab" ref="ruleFormTab" label-width="80px" size="mini">
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="editDataTab.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormTabVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormTab(editDataTab.name)">确 定</el-button>
      </div>
    </el-dialog>

    <el-tabs v-model="editableTabsValue" type="border-card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.name"
        :name="item.name"
      >
        <div>
          <el-table
            :data= item.content
            border
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="rowClass">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="title" label="网站名称" min-width="150"></el-table-column>
            <el-table-column prop="href" label="网站地址" min-width="150"></el-table-column>
            <el-table-column prop="src" label="icon地址" min-width="150"></el-table-column>
            <el-table-column prop="src" label="icon预览" min-width="150">
              <template slot-scope="scope">
                <el-image
                  style="width: 50px; height: 50px"
                  :src= scope.row.src
                  :fit= scope.row.alt>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-bottom: 20px;" class="add-address-button">
            <el-button type="primary" @click="addAddress(editableTabsValue)">新增网站</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="网站编辑" :visible.sync="dialogFormAddressVisible" width="400px" center>
      <el-form :model="editDataAddress" :rules="rulesAddress" ref="ruleFormAddress" label-width="80px" size="mini">
        <el-form-item label="id" prop="id" v-show="false">
          <el-input v-model="editDataAddress.id"></el-input>
        </el-form-item>
        <el-form-item label="网站名称" prop="title">
          <el-input v-model="editDataAddress.title"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" prop="href">
          <el-input v-model="editDataAddress.href"></el-input>
        </el-form-item>
        <el-form-item label="icon地址" prop="src">
          <el-input v-model="editDataAddress.src"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddressVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormAddress('ruleFormAddress')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import InquiryBar from '../components/common/InquiryBar'
  export default {
    data() {
      return {
        dialogFormTabVisible: false,
        dialogFormAddressVisible: false,
        editableTabsValue: '',
        editDataTab: {
          name: null,
          key: null
        },
        rulesTab: {
          name: [
            { required: true, message: '请输入类别名称', trigger: 'blur' }
          ]
        },
        editDataAddress: {
          id: null,
          title: null,
          src: null,
          href: null
        },
        rulesAddress: {
          title: [
            { required: true, message: '请输入网站名称', trigger: 'blur' }
          ],
          src: [
            { required: true, message: '请输入icon地址', trigger: 'blur' }
          ],
          href: [
            { required: true, message: '请输入网站地址', trigger: 'blur' }
          ],
        }
      }
    },

    components: { InquiryBar },

    methods: {
      addTab() {
        this.dialogFormTabVisible = true
        this.$nextTick(() => {
          this.$refs['ruleFormTab'].resetFields()
        })
      },

      submitFormTab(formName) {
        this.editableTabs.push({
          name: formName,
          content: []
        });
        this.editableTabsValue = formName
        this.dialogFormTabVisible = false
      },

      addAddress(targetName) {
        this.dialogFormAddressVisible = true
        this.$nextTick(() => {
          this.$refs['ruleFormAddress'].resetFields()
        })
      },

      submitFormAddress(formName) {
        this.$refs[formName].validate((valid) => {
          //深拷贝提交的数据，再把临时容器清空
          const address = JSON.parse(JSON.stringify(this.editDataAddress))
          for(let attr in this.editDataAddress) {
            this.editDataAddress[attr] = null
          }
          //找到当前标签页对象
          let tab = this.editableTabs.find(item => item.name === this.editableTabsValue)
          //判断是新增网站还是编辑已有网站
          if(tab.content.some(item => item.id === address.id)) {
            const index = tab.content.findIndex( item => item.id === address.id)
            tab.content.splice(index, 1, address)
          }else {
            address.id = Math.random()
            tab.content.push(address)
          }
          if (valid) {
            return this.$store.dispatch('EditLink', tab).then(response => {
              const res = response.data
              if(res.code === 200){
                return (() => {
                  this.$message({
                    message: res.data.message,
                    type: 'success'
                  })
                  this.refreshList()
                  this.dialogFormAddressVisible = false
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

      removeTab(targetName) {
        this.$confirm('此操作将永久删除此类别和其下的所有网站, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //找到当前标签页对象
          //这里用targetName而不用this.editableTabsValue是因为在页面上当前标签页打开的情况下可以去点击移除未打开的标签页
          let tab = this.editableTabs.find(item => item.name === targetName)
          this.$store.dispatch('DelLink', tab._id).then(response => {
            const res = response.data
            if(res.code === 200) {
              return (() => {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                //删除后默认当前打开标签页为第一个
                this.editableTabsValue = this.$store.state.common.linkList[0].name
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

      handleEdit(index, row) {
        this.dialogFormAddressVisible = true
        this.$nextTick(() => {
          this.editDataAddress = JSON.parse(JSON.stringify(row))
        })
      },

      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该网站, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //先去掉tab项中content数组中的网站项，再调用dispatch('EditLink', tab)
          const address = JSON.parse(JSON.stringify(row))
          //找到当前标签页对象
          let tab = this.editableTabs.find(item => item.name === this.editableTabsValue)
          const indexAddress = tab.content.findIndex( item => item.title === address.title)
          tab.content.splice(indexAddress, 1)
          this.$store.dispatch('EditLink', tab).then(response => {
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

      refreshList() {
        this.$store.dispatch('GetLinkList')
      },

      cellStyle() {
        return "text-align:center"
      },

      rowClass() {
        return "text-align:center"
      }
    },

    computed : {
      editableTabs: function () {
        const list = this.$store.state.common.linkList
        return JSON.parse(JSON.stringify(list))
      }
    },

    created() {
      this.$store.dispatch('GetLinkList').then(response => {
          const res = response.data
          if(res.code === 200) {
            this.editableTabsValue = res.data.linkList[0].name
          }
        })
    }
  }
</script>

<style lang="scss" scope>
.add-tab-button {
  padding: 20px 20px 0 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  button{
    margin-bottom: 20px;
  }
}
.add-address-button {
  margin-top: 20px;
  text-align: center;
}
</style>
