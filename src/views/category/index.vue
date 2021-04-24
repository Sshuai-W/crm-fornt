<template>
<div id="brand-wrapper">

  <template>
    <el-tabs tab-position="left">
      <el-tab-pane :label="item.categoryName" v-for="(item,index) in tableData" :key="index">
        <div class="crud-box">
          <el-row>
            <el-button type="primary" class="el-icon-plus" size="mini" style="margin-right: 3px"> 新建</el-button>
            <el-popconfirm
                confirm-button-text='好的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="这是一段内容确定删除吗？"
                @confirm="deleteById"
            >
            <el-button slot="reference" type="danger" class="el-icon-delete" size="mini" @click="deleteCategory=item,deleteLevel=item.categoryLevel"> 删除</el-button>
            </el-popconfirm>
          </el-row>
        </div>
        <template>
          <div style="margin-top: 8px">
            <el-table
                :data="item.list"
                style="width: 100%"
                row-key="id"
                border
                :tree-props="{children: 'list'}">
              <el-table-column
                  prop="id"
                  label="ID">
              </el-table-column>
              <el-table-column
                  prop="categoryName"
                  label="分类名称">
              </el-table-column>
              <el-table-column
                  label="分类等级">
                <template v-slot="obj">
                <el-tag v-if="obj.row.categoryLevel==2" type="success">二级分类</el-tag>
                <el-tag v-if="obj.row.categoryLevel==3" type="warning">三级分类</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  label="操作"
                  align="center">
                <template v-slot="obj">
                  <el-button size="mini" class="el-icon-edit" type="primary" @click="formData=obj.row, dialogVisible = true"></el-button>
                  <el-popconfirm
                      confirm-button-text='好的'
                      cancel-button-text='不用了'
                      icon="el-icon-info"
                      icon-color="red"
                      title="这是一段内容确定删除吗？"
                      @confirm="deleteById"
                  >
                    <el-button slot="reference" size="mini" type="danger" class="el-icon-delete" @click="deleteCategory=obj.row, deleteLevel=obj.row.categoryLevel"
                               style="margin-left: 5px"></el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </template>

  <div class="form-box">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <el-form ref="form" label-width="80px" :model="formData">

        <el-form-item label="分类名称">
          <el-input v-model="formData.categoryName" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false" >确 定</el-button>
  </span>
    </el-dialog>
  </div>


</div>
</template>

<script>
import category from "./index";

export default category
</script>

<style scoped src="./index.scss" lang="scss">

</style>