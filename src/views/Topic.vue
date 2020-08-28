<template>
  <div>
    <Inquiry-bar :searchData="searchData" searchProp="alt" placeholderName="名称" @refresh="refreshList">
      <template v-slot:button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>
    </Inquiry-bar>

    <el-table
      :data= this.$store.state.common.topicList
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="rowClass">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="alt" label="名称" min-width="150"></el-table-column>
      <el-table-column prop="href" label="跳转链接" min-width="300"></el-table-column>
      <el-table-column prop="src" label="图片地址" min-width="300"></el-table-column>
      <el-table-column prop="src" label="图片预览" min-width="500">
        <template slot-scope="scope">
          <el-image
            style="width: 480px; height: 140px"
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

    <Dialog-edit 
      :dialogData="dialogData"
      @refresh="refreshList"
      @visible="handleVisible"
    >
    </Dialog-edit>
  </div>
</template>

<script>
  import InquiryBar from '../components/common/InquiryBar'
  import DialogEdit from '../components/common/DialogEdit'
  import { rowDelete } from '../utils/commen'
  export default {
    data() {
      return {
        searchData: {},
        currentPage: 1,
        currentSize: 10,
        dialogData: {
          title: '图片编辑',
          dialogFormVisible: false,
          propsData: [
            {
              label: '图片名称',
              name: 'alt',
              hasSlot: false
            },
            {
              label: '跳转链接',
              name: 'href',
              hasSlot: false
            },
            {
              label: '图片地址',
              name: 'src',
              hasSlot: false
            }
          ],
          editData: {
            _id: null,
            alt: null,
            href: null,
            src: null
          },
          rules: {
            alt: [
              { required: true, message: '请输入图片名称', trigger: 'blur' }
            ],
            href: [
              { required: true, message: '请输入跳转链接地址', trigger: 'blur' }
            ],
            src: [
              { required: true, message: '请输入图片地址', trigger: 'blur' }
            ]
          },
          ref: 'ruleForm',
          dispatchName: 'EditTopic'
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
        const dispatchName = 'DelTopic'
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
        return this.$store.dispatch('GetTopicList', {page: this.currentPage, size: this.currentSize, search: searchData})
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
.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
