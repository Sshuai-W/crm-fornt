<template>
  <div id="dept-wrapper">

    <div id="search-form">
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-form-item label="搜索条件">
          <el-input placeholder="搜索条件" v-model="searchStr"></el-input>
        </el-form-item>

        <el-form-item label="时间区域">
          <el-date-picker
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="warning" @click="clearSearchParams">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="crud-box">
      <el-row>
        <el-button type="primary" class="el-icon-plus" size="mini"
                   @click="dialogFormVisible = true,resetFormData()"> 新建
        </el-button>
        <el-button type="danger" class="el-icon-delete" size="mini"> 删除</el-button>
      </el-row>
    </div>

    <div class="data-box">

      <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          border
          lazy
          :load="load"
          :key="tableKey"
          :tree-props="{hasChildren: 'hasChildren'}">
        <el-table-column
            type="selection"
            width="55"
            align="center">
        </el-table-column>
        <el-table-column
            prop="deptName"
            label="部门名称"
            align="center">
        </el-table-column>
        <el-table-column
            prop="deptSort"
            label="部门排序"
            align="center">
        </el-table-column>
        <el-table-column
            prop="deptDesc"
            label="部门描述"
            align="center">
        </el-table-column>
        <el-table-column
            label="操作"
            align="center">
          <template v-slot="obj">
            <el-button size="mini" class="el-icon-edit" type="primary"
                       @click="getFormData(obj.row),dialogFormVisible = true,imageUrl=obj.row.brandLogo"></el-button>
            <el-popconfirm
                confirm-button-text='好的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                @confirm="deleteById"
                title="这是一段内容确定删除吗？"
            >
              <el-button slot="reference" size="mini" type="danger" class="el-icon-delete" @click="id=obj.row.id"
                         style="margin-left: 5px"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <div class="page-box">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="searchParams.pageSize"
          :current-page="searchParams.currentPage"
          @current-change="currentPageChange">
      </el-pagination>

    </div>

    <div class="formData-box">
      <el-dialog
          title="操作"
          :visible.sync="dialogFormVisible"
          width="33%">
        <el-form ref="form" label-width="80px" :model="formData">

          <el-form-item label="部门名称">
            <el-input v-model="formData.deptName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门描述">
            <el-input v-model="formData.deptDesc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序等级">
            <el-input-number v-model="formData.deptSort" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>
          <template>
            <el-form-item label="顶级分类">
              <el-radio-group v-model="radio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <treeselect
                  v-model="formData.parentId"
                  v-if="radio==1"
                  :load-options="loadOptions"
                  noChildrenText="无子"
                  :options="tableData"
                  :flat="true"
                  placeholder="选择父级分类"
                  style="width: 200px; margin-left: 10px;margin-top: 2px"
                  :normalizer="normalizer"/>
            </el-form-item>
          </template>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false, addOrEdit()" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>


  </div>
</template>

<script>
import dept from './index'

export default dept
</script>

<style scoped>

</style>