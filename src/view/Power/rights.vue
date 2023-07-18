<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡牌视图 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="路径" prop="path" />
        <el-table-column label="等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === 1">一级</el-tag>
            <el-tag v-else-if="scope.row.level === 2" type="warning"
              >二级</el-tag
            >
            <el-tag v-else type="success">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getPageList } from "@/api/right";
export default {
  name: "rights",
  data() {
    return {
      // 所有的权限列表
      rightsList: [],
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    // 获取 页面 列表
    getRightsList() {
      getPageList()
        .then((response) => {
          this.rightsList = response.data.data;
          this.$message.success("获取成功");
        })
        .catch(() => {
          this.$message.error("获取列表失败");
        });
    },
  },
};
</script>