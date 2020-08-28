<template>
  <div>
    <Inquiry-bar :searchData="searchData" searchProp="title" placeholderName="标签" @refresh="refreshList">
      <template v-slot:button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>
    </Inquiry-bar>

    <el-table
      :data= this.$store.state.common.tagList
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="rowClass">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="title" label="标签" min-width="150"></el-table-column>
      <el-table-column prop="color" label="颜色" min-width="150">
        <template slot-scope="scope">
          <el-tag :color= scope.row.color effect="dark">
            {{ scope.row.color }}
          </el-tag>
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
      <template v-slot:default="slotProps">
        <el-color-picker v-model="slotProps.editData.color"></el-color-picker>
      </template>
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
          title: '标签编辑',
          dialogFormVisible: false,
          propsData: [
            {
              label: '标签名称',
              name: 'title',
              hasSlot: false
            },
            {
              label: '颜色选择',
              name: 'color',
              hasSlot: true
            }
          ],
          editData: {
            _id: null,
            title: null,
            color: null
          },
          rules: {
            title: [
              { required: true, message: '请输入标签名称', trigger: 'blur' }
            ]
          },
          ref: 'ruleForm',
          dispatchName: 'EditTag'
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
        const dispatchName = 'DelTag'
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
        return this.$store.dispatch('GetTagList', {page: this.currentPage, size: this.currentSize, search: searchData})
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
