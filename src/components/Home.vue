<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="@/assets/niubi.jpg" alt="">
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <Aside></Aside>
      <!-- 内容 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/Aside.vue'

export default {
  name:'home',
  components: {
    Aside
  },
  methods:{
    // 退出登录
    logout(){
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }
  .el-header{
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;

    > div {
      display: flex;
      align-items: center;

      > img {
        widows: 50px;
        height: 50px;
      }
      
      > span {
        margin-left: 15px;
      }
    }
  }

  .el-main {
    background-color: #eaedf1;
  }
</style>>