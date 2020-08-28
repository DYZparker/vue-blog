<template>
  <div>
    <Inquiry-bar :searchData="searchData" searchProp="username" placeholderName="账号" @refresh="refreshList">
      <template v-slot:input>
        <el-form-item prop="admin">
          <el-select v-model="searchData.admin" placeholder="权限">
            <el-option v-for="option in searchOpts" 
            :key="option.type"
            :label="option.name"
            :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template v-slot:button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>
    </Inquiry-bar>

    <el-table
      :data= this.$store.state.user.userList
      height="500"
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="rowClass">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="username" label="账号" min-width="150"></el-table-column>
      <el-table-column prop="password" label="密码" min-width="150"></el-table-column>
      <el-table-column prop="admin" label="权限" min-width="150" :formatter="adminFormat"></el-table-column>
      <el-table-column prop="date" label="注册时间" min-width="200" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      :total= this.$store.state.user.total
      class="pagination">
    </el-pagination>

    <Dialog-edit 
      :dialogData="dialogData"
      @refresh="refreshList"
      @visible="handleVisible"
    >
      <template v-slot:default="slotProps">
        <el-select v-model="slotProps.editData.admin" placeholder="权限" style="width: 110px">
          <el-option v-for="option in editOpts" 
          :key="option.type"
          :label="option.name"
          :value="option.type"
          ></el-option>
        </el-select>
      </template>
    </Dialog-edit>
  </div>
</template>

<script>
  import moment from 'moment'
  import InquiryBar from '../components/common/InquiryBar'
  import DialogEdit from '../components/common/DialogEdit'
  import { rowDelete } from '../utils/commen'
  const searchOpts = [
    {type: 0, name: '普通用户'},
    {type: 1, name: '管理员'}
  ]
  const editOpts = [
    {type: 0, name: '普通用户'},
    {type: 1, name: '管理员'}
  ]
  export default {
    data() {
      return {
        searchOpts,
        editOpts,
        searchData: {},
        totalList: null,
        currentPage: 1,
        currentSize: 10,
        tableData: this.$store.state.user.userList,
        dialogData: {
          title: '用户信息编辑',
          dialogFormVisible: false,
          propsData: [
            {
              label: '账号',
              name: 'username',
              hasSlot: false
            },
            {
              label: '密码',
              name: 'password',
              hasSlot: false
            },
            {
              label: '权限',
              name: 'admin',
              hasSlot: true
            }
          ],
          editData: {
            _id: null,
            username: null,
            password: null,
            admin: null
          },
          rules: {
            username: [
              { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            admin: [
              { required: true, message: '请选择权限', trigger: 'change' }
            ]
          },
          ref: 'ruleForm',
          dispatchName: 'EditUser'
        }
      }
    },

    components: { InquiryBar, DialogEdit },
    
    methods: {
      handleVisible(toggle) {
        this.dialogData.dialogFormVisible = toggle
      },
    
      handleAdd() {
        this.dialogData.dialogFormVisible = true
        this.$nextTick(() => {
          this.dialogData.editData = {}
        })
      },

      handleEdit(index, row) {
        this.dialogData.dialogFormVisible = true
        this.$nextTick(() => {
          this.dialogData.editData = JSON.parse(JSON.stringify(row))
        })
      },

      handleDelete(index, row) {
        const that = this
        const dispatchName = 'DelUser'
        const payload = row._id
        rowDelete(dispatchName, payload, that)
      },

      refreshList(data) {
        const searchData =  data || {}
        //过滤空的查询对象
        for(const key in searchData) {
          if (searchData[key] === '') {
            delete searchData[key]
          }
        }
        return this.$store.dispatch('GetUserList', {page: this.currentPage, size: this.currentSize, search: searchData})
      },

      handleSizeChange(val) {
        this.currentSize = val
        this.refreshList()
      },

      handleCurrentChange(val) {
        this.currentPage = val
        this.refreshList()
      },

      adminFormat(row) {
        const Admin = (row.admin === 1) ? '管理员' : '普通用户'
        return Admin
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
.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
