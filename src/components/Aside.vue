<template>
  <!-- 侧边栏菜单 -->
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
      :default-active="$route.path"
    >
      <!-- 1级菜单 -->
      <el-submenu
        :index="item.id + ''"
        v-for="item in menusList"
        :key="item.id"
      >
        <!-- 1级菜单模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i :class="'iconfont ' + item.icon"></i>
          <!-- 文本 -->
          <span>{{ item.name }}</span>
        </template>

        <!-- 2级菜单 -->
        <el-menu-item
          :index="'/' + subItem.path"
          v-for="subItem in item.childMenus"
          :key="subItem.id"
        >
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>{{ subItem.name }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      // 左侧菜单数据
      menusList: [],
      // 侧边栏折叠状态
      isCollapse: false,
    };
  },
  computed: {
    user() {
      return this.getUser;
    },
  },
  created() {
    this.getMenuList();
  },
  methods: {
    // 获取所有菜单
    async getMenuList() {
      console.log(this.user);
      const { data: res } = await this.$http.get(
        "menus/" + this.$store.getters.username
      );
      if (res.status !== 200) return this.$message.error(res.message);
      this.menusList = res.data;
    },
    // 切换侧边栏菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>