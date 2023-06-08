<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 收索区域 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <!-- 搜索框 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getAdminList">
            <el-button slot="append" icon="el-icon-search" @click="getAdminList"/>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 列表区域 -->
      <el-table :data="adminList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="创建时间" prop="createAt"></el-table-column>
        <el-table-column label="上次登录时间" prop="createAt"></el-table-column>
        <el-table-column label="上次退出时间" prop="createAt"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"/>
            <el-button type="danger" icon="el-icon-delete" size="mini"/>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum" :page-sizes="[1,2,5,10]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'Users',
  data(){
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pageNum: 0,
        pageSize: 2,
      },
      totalNum: 0,
      adminList: [],
    }
  },
  created(){
    this.getAdminList()
  },
  methods:{
    async getAdminList() {
      const { data : res } = await this.$http.get(
        'admin/page',
        {params: this.queryInfo}
      )
      if(res.status !== 200) return this.$message.error('获取失败')
      this.adminList = res.data.array
      this.totalNum = res.data.totalNum
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize){
      this.queryInfo.pageSize = newSize 
      this.getAdminList()
    },
    // 监听 页码值 改变
    handleCurrentChange(newPage){
      this.queryInfo.pageNum = newPage 
      this.getAdminList()
    },
  }
}
</script>

<style lang="less" scoped>

</style>