<template>
  <div id="brand-wrapper">
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
        <el-button type="primary" class="el-icon-plus" size="mini" @click="dialogFormVisible = true, formData={}, imageUrl=''"> 新建</el-button>
        <el-button type="danger" class="el-icon-delete" size="mini" :disabled="ids.length<=0" @click="showDeleteMessage"> 删除</el-button>
      </el-row>
    </div>

    <div class="data-box">

      <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55"
            align="center">
        </el-table-column>
        <el-table-column
            prop="brandName"
            label="品牌名称"
            align="center">
        </el-table-column>
        <el-table-column
            prop="brandDesc"
            label="品牌描述"
            align="center">
        </el-table-column>
        <el-table-column
            prop="brandLogin"
            label="品牌官网"
            align="center">
          <template v-slot="obj">
            <a :href="obj.row.brandSite">{{ obj.row.brandSite }}</a>
          </template>
        </el-table-column>
        <el-table-column
            prop="brandSit"
            label="品牌logo"
            align="center">
          <template v-slot="obj">
            <img :src="obj.row.brandLogo" alt="" height="35px">
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            align="center">
          <template v-slot="obj">
            <el-button size="mini" class="el-icon-edit" type="primary" @click="formData=obj.row,dialogFormVisible = true,imageUrl=obj.row.brandLogo"></el-button>
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

          <el-form-item label="品牌名称">
            <el-input v-model="formData.brandName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="品牌描述">
            <el-input v-model="formData.brandDesc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="品牌官网">
            <el-input v-model="formData.brandSite" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="品牌logo">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :http-request="getImageUrl">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

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
import brand from './index';

export default brand;
</script>

<style src="./index.scss" lang="scss">
</style>