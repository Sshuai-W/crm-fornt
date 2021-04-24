<template>
  <div class="main-wrapper">

    <el-container>
      <el-aside width="200px">
        <!--    logo部分     -->
        <div class="aside-logo-wrapper">
          <img src="../../assets/cat.jpg" alt="" width="35px">
          <span>后台管理系统</span>
        </div>

        <!--   菜单     -->
        <el-scrollbar>
          <el-menu default-active="1" router>
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/brand">品牌管理</el-menu-item>
                <el-menu-item index="/category">分类管理</el-menu-item>
                <el-menu-item index="2-2">商品管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>员工</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin">员工管理</el-menu-item>
                <el-menu-item index="/dept">部门管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/role">角色管理</el-menu-item>
                <el-menu-item index="/menu">权限管理</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>日志</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">登录日志</el-menu-item>
                  <el-menu-item index="5-2">操作日志</el-menu-item>
                </el-menu-item-group>

              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>


      <el-container>
        <el-header>Header</el-header>

        <el-main>
          <div class="main-box">
            <router-view/>
          </div>
        </el-main>
      </el-container>

    </el-container>
  </div>

</template>

<script>
export default {
  name: "index",
  methods: {

  }
}
</script>

<style scoped lang="scss">

.main-wrapper {
  width: 100%;
  height: 100%;
}

.el-header{
  background-color: bisque;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: aliceblue;
  color: #333;

  .aside-logo-wrapper {
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: antiquewhite;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 7px;
    }
    span{
      font-weight: 700;
      color: cornflowerblue;
      font-family: cursive;
    }
  }
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 5px 0 0 5px;
  height: 100%;
  width: 100%;
  .main-box{
    background-color: azure;
    height: 100%;
    padding: 15px 0 0 15px;
    box-sizing: border-box;
  }
}

.el-container {
  margin-bottom: 40px;
  width: 100%;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-scrollbar{
    height: calc(100% - 60px);
}

</style>