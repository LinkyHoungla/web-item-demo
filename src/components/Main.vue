<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <!-- 左侧 -->
      <div>
        <img src="@/assets/niubi.jpg" alt="" />
        <span>后台管理系统</span>
        <span>{{ loginAdminVo }}</span>
      </div>

      <!-- 右侧 -->
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img
              :src="'http://localhost:7777' + loginAdminVo.avatar"
              class="user-avatar"
            />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/home">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <router-link to="/home">
              <el-dropdown-item>信息修改</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
import Aside from "@/components/Aside.vue";

export default {
  name: "mainApp",
  components: {
    Aside,
  },
  data() {
    return {
      loginAdminVo: {
        role: "",
        name: "",
        avatar: "",
      },
    };
  },
  created() {
    // this.getMenuList();
    this.getLoginAdminVo();
  },
  methods: {
    // 退出登录
    logout() {
      // window.sessionStorage.clear();
      this.$store
        .dispatch("admin/logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    // 获取当前登录者信息
    getLoginAdminVo() {
      this.$store
        .dispatch("admin/getAdminInfo")
        .then(() => {
          this.loginAdminVo.role = this.$store.getters.role;
          this.loginAdminVo.name = this.$store.getters.name;
          this.loginAdminVo.avatar = this.$store.getters.avatar;
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
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

  .right-menu {
    float: right;
    height: 100%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.el-main {
  background-color: #eaedf1;
}
</style>>