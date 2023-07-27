<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
      <el-breadcrumb-item>店铺列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 收索区域 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <!-- 搜索框 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getStoreList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getStoreList"
            />
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addStoreDialog">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 列表区域 -->
      <el-table :data="storeList" :row-key="(row) => row.storeId">
        <el-table-column type="index" />
        <el-table-column label="店铺ID" prop="storeId" />
        <el-table-column label="店铺图标" prop="storeAvatar" />
        <el-table-column label="店铺名称" prop="storeName" />
        <el-table-column label="店铺描述" prop="storeDesc" />
        <el-table-column label="所有人ID" prop="ownerId" />
        <el-table-column label="联系人" prop="contactName" />
        <el-table-column label="手机号码" prop="contactPhone" />
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="最近修改" prop="updateTime" />
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="updateStoreDialog(scope.row)"
            />
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteStore(scope.row.storeId)"
            />
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
    </el-card>

    <!-- 表单窗口 -->
    <form-dialog
      :visible.sync="formDialogVisible"
      :dialogTitle="formDialogTitle"
      :fields="formFields"
      :formData="form"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script>
import {
  getStoreInfo,
  getStoreList,
  addStore,
  updateStore,
  deleteStore,
} from "@/api/store";

export default {
  name: "Store",
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        pageNum: 0,
        pageSize: 5,
      },
      totalNum: 0,

      // 用户数据
      // 用户 列表
      storeList: [],
      // 用户 个人信息
      storeInfo: {},

      // 表单数据
      updateId: null,
      basciForm: {},

      // 表单窗口
      formDialogTitle: "",
      formDialogVisible: false,
      formFields: [],
      form: {},
      handleFormSubmit: function () {},
    };
  },
  created() {
    this.getStoreList();
  },
  methods: {
    // 监听
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },

    // 窗口
    // 添加 店铺
    addStoreDialog() {
      this.formDialogVisible = true;
      this.formDialogTitle = "添加店铺";
      this.formFields = [
        { label: "店铺名称", prop: "storeName" },
        { label: "店铺图标", prop: "storeAvatar" },
        { label: "店铺描述", prop: "storeDesc" },
        { label: "所有人ID", prop: "ownerId" },
        { label: "联系人", prop: "contactName" },
        { label: "手机号码", prop: "contactPhone" },
      ];
      this.form = {};
      this.handleFormSubmit = this.addStore;
    },

    // 修改 店铺
    updateStoreDialog(temp) {
      this.updateId = temp.storeId;
      this.formDialogVisible = true;
      this.formDialogTitle = "修改店铺";
      this.formFields = [
        { label: "店铺名称", prop: "storeName" },
        { label: "店铺图标", prop: "storeAvatar" },
        { label: "店铺描述", prop: "storeDesc" },
      ];
      this.form = temp;
      this.handleFormSubmit = this.updateStore;
    },

    // 请求
    // 获取 用户 列表
    getStoreList() {
      getStoreList(this.queryInfo)
        .then((response) => {
          const { data: res } = response.data;
          this.storeList = res.list;
          this.totalNum = res.total;
          this.$message.success("获取成功");
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 获取 用户 个人信息
    getStoreInfo(id) {
      getStoreInfo(id)
        .then((response) => {
          this.storeInfo = response.data.data;
          this.$message.success("获取成功");
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 添加 用户
    addStore(form) {
      addStore(form)
        .then(() => {
          this.getStoreList();
          this.formDialogVisible = false;
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    // 修改 用户
    updateStore(form) {
      updateStore(this.updateId, form)
        .then(() => {
          this.getStoreList();
          this.formDialogVisible = false;
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    },
    // 删除 用户
    async deleteStore(id) {
      const result = await this.$confirm(
        "此操作将永久删除该用户，是否继续",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (result !== "confirm") return this.$message.info("已取消删除");
      deleteStore(id)
        .then(() => {
          this.$message.success("删除成功");
          this.getStoreList();
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
  },
};
</script>

<style>
</style>