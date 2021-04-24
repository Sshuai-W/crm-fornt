<template>
  <div id="admin-wrapper">

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
        <el-button type="primary" class="el-icon-plus" size="mini" @click="dialogFormVisible = true, resetFormData()">
          新建
        </el-button>
        <el-button type="danger" class="el-icon-delete" size="mini" :disabled="ids.length<=0"
                   @click="showDeleteMessage"> 删除
        </el-button>
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
        <el-table-column type="expand" label="详情">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="员工姓名:">
                <span>{{ props.row.adminName }}</span>
              </el-form-item>
              <el-form-item label="员工昵称:">
                <span>{{ props.row.nickName }}</span>
              </el-form-item>
              <el-form-item label="员工性别:">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
              <el-form-item label="员工手机:">
                <span>{{ props.row.adminPhone }}</span>
              </el-form-item>
              <el-form-item label="员工邮箱:">
                <span>{{ props.row.adminEmail }}</span>
              </el-form-item>
              <el-form-item label="员工地址:">
                <span>{{ props.row.adminAddress }}</span>
              </el-form-item>
              <el-form-item label="账号可用:">
                <el-switch
                    :disabled="true"
                    v-model="props.row.isEnable"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否超管:">
                <el-switch
                    :disabled="true"
                    v-model="props.row.isAdmin"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
              <el-form-item label="所在部门:">
                <span>{{ props.row.deptName }}</span>
              </el-form-item>
              <el-form-item label="员工头像:">
                <img :src="props.row.adminAvatar" alt="" height="35px">
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            prop="adminName"
            label="员工名称"
            align="center">
        </el-table-column>
        <el-table-column
            prop="nickName"
            label="员工昵称"
            align="center">
        </el-table-column>
        <el-table-column
            prop="deptName"
            label="所在部门"
            align="center">
        </el-table-column>
        <el-table-column
            prop="adminAvatar"
            label="员工头像"
            align="center">
          <template v-slot="obj">
            <img :src="obj.row.adminAvatar" alt="" height="35px">
          </template>
        </el-table-column>
        <el-table-column
            prop="isEnable"
            label="是否可用"
            align="center">
          <template v-slot="obj">
            <el-switch
                :disabled="true"
                v-model="obj.row.isEnable"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            align="center">
          <template v-slot="obj">
            <el-button size="mini" class="el-icon-edit" type="primary"
                       @click="dialogFormVisible = true,imageUrl=obj.row.brandLogo,setFormData(obj.row)"></el-button>
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

    <div class="formData-box">
      <el-dialog
          title="操作"
          :visible.sync="dialogFormVisible"
          width="33%">
        <el-form ref="form" label-width="80px" :model="formData" size="small">

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="员工姓名">
                <el-input v-model="formData.adminName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="员工昵称">
                <el-input v-model="formData.nickName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="员工手机">
                <el-input v-model="formData.adminPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="员工邮箱">
                <el-input v-model="formData.adminEmail" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">

            <el-col :span="12">
              <el-form-item label="员工性别">
                <el-radio-group v-model="formData.gender">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="账号可用:">
                <el-switch
                    v-model="formData.isEnable"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="员工部门">
                <treeselect
                    v-model="formData.deptId"
                    :load-options="loadOptions"
                    noChildrenText="无子"
                    :options="deptList"
                    :flat="true"
                    placeholder="选择父级分类"
                    style="height: 32px"
                    :normalizer="normalizer"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item label="选择省区">
              <el-select v-model="province" placeholder="请选择省份" style="width: 33%" @change="changeCityList">
                <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                </el-option>
              </el-select>
              <el-select v-model="city" placeholder="请选择城市" style="width: 33%; margin: 0 2px" @change="changeAreaList">
                <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                </el-option>
              </el-select>
              <el-select v-model="area" placeholder="请选择地区" style="width: 33%">
                <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="详细地址">
                <el-input v-model="address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="上传头像">
                <el-upload
                    class="upload-demo"
                    action="http://localhost:9999/common/upload"
                    :on-success="uploadSuccess"
                    list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

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
import admin from './index';

export default admin
</script>

<style src="../admin/index.scss" lang="scss" scoped>

</style>