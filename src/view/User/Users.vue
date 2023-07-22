<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
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
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            />
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 列表区域 -->
      <el-table
        :data="userList"
        :row-key="(row) => row.uid"
        :expand-row-keys="expandRowKeys"
        @expand-change="handleExpandChange"
      >
        <el-table-column type="expand">
          <template>
            <!-- 展开行的内容 -->
            <el-table :data="userInfo">
              <el-table-column label="昵称" prop="nickname" />
              <el-table-column label="头像" prop="avatar" />
              <el-table-column label="性别" prop="gender" />
              <el-table-column label="年龄" prop="age" />
              <el-table-column label="生日" prop="birthday"></el-table-column>
              <el-table-column label="地址" prop="location" />
              <el-table-column label="最近修改" prop="updateTime" />
              <el-table-column label="操作" width="160px">
                <template slot-scope="scope">
                  <!-- 修改按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="updateUserInfoDialog(scope.row.uid)"
                  />
                </template>
              </el-table-column>
            </el-table>
            <!-- 展开行的内容 -->
            <el-table :data="userLogin">
              <el-table-column label="账号名" prop="username" />
              <el-table-column label="密码" prop="password" />
              <el-table-column label="IP" prop="ip" />
              <el-table-column label="最近登录" prop="loginTime" />
              <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                  <!-- 登录测试 按钮 -->
                  <el-button
                    icon="el-icon-setting"
                    size="mini"
                    @click="userlogin(scope.row)"
                    >登录测试</el-button
                  >
                  <!-- 修改按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="updateUserLoginDialog(scope.row.uid)"
                    >修改信息</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="UID" prop="uid" />
        <el-table-column label="微信ID" prop="wxid" />
        <el-table-column label="钱包ID" prop="walletId" />
        <el-table-column label="手机" prop="phone" />
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="最近修改" prop="updateTime" />
        <el-table-column label="操作" width="160px">
          <template>
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            />
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.uid)"
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

    <!-- 用户添加对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form :model="basciForm" ref="addFormRel" label-width="70px">
        <el-form-item label="手机" prop="phone">
          <el-input v-model="basciForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wxid">
          <el-input v-model="basciForm.wxid"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog=footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button @click="addUser">确定</el-button>
      </span>
    </el-dialog>

    <!-- 用户修改对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form :model="editForm" ref="editFormRel" label-width="70px">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="editForm.phone" />
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog=footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button @click="updateUserPhone">确定</el-button>
      </span>
    </el-dialog>

    <!-- 表单框 -->
    <form-dialog
      :visible.sync="formDialogVisible"
      :dialogTitle="formDialogTitle"
      width="50%"
      :fields="formFields"
      :formData="form"
      formRef="editFormRef"
      @submit="updateUserInfo"
    />
  </div>
</template>

<script>
import {
  updateUserPhone,
  getUserList,
  addUser,
  deleteUser,
  getUserInfo,
  updateUserInfo,
  updateUserLogin,
  getUserLogin,
  userLogin,
} from "@/api/user";

export default {
  name: "Users",
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        pageNum: 0,
        pageSize: 5,
      },
      totalNum: 0,

      // 展开行
      expandRowKeys: [],

      // 用户数据
      // 用户 列表
      userList: [],
      // 用户 个人信息
      userInfo: [],
      userLogin: [],

      // 表单数据
      updateId: null,
      editForm: { phone: "" },
      basciForm: {
        phone: "",
        wxid: "",
      },

      // 表单窗口
      formDialogTitle: "",
      formDialogVisible: false,
      formFields: [],
      form: {},

      // 窗口属性
      addDialogVisible: false,
      editDialogVisible: false,
    };
  },
  created() {
    this.getUserList();
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
    // 监听 展开行
    handleExpandChange(row) {
      if (row && this.expandRowKeys.indexOf(row.uid)) {
        this.expandRowKeys = [row.uid];
        this.getUserInfo(row.uid);
        this.getUserLogin(row.uid);
      } else {
        this.expandRowKeys = [];
        this.userInfo = [];
        this.userLogin = [];
      }
    },

    // 窗口
    // 用户个人信息窗口
    updateUserInfoDialog(uid) {
      this.updateId = uid;
      this.formDialogVisible = true;
      this.formDialogTitle = "修改个人信息";
      this.formFields = [
        { label: "昵称", prop: "nickname" },
        { label: "头像", prop: "avatar" },
        { label: "性别", prop: "gender" },
        { label: "年龄", prop: "age" },
        { label: "生日", prop: "birthday" },
        { label: "所在地", prop: "location" },
      ];
      this.form = this.userInfo[0];
    },
    // 用户登录信息窗口
    updateUserLoginDialog(uid) {
      this.updateId = uid;
      this.formDialogVisible = true;
      this.formDialogTitle = "修改登录信息";
      this.formFields = [
        { label: "用户名", prop: "username" },
        { label: "密码", prop: "password" },
      ];
      this.form = this.userLogin[0];
    },
    // TODO 打开 添加窗口
    showAddDialog() {
      this.addDialogVisible = true;
    },
    // TODO 打开 修改窗口
    showEditDialog(temp) {
      this.updateId = temp.uid;
      this.editDialogVisible = true;
    },
    // 关闭 添加窗口
    addDialogClosed() {
      this.getUserList();
    },
    // 关闭 修改窗口
    editDialogClosed() {
      this.getUserList();
    },

    // 请求
    // 获取 用户 列表
    getUserList() {
      getUserList(this.queryInfo)
        .then((response) => {
          const { data: res } = response.data;
          this.userList = res.list;
          this.totalNum = res.total;
          this.$message.success("获取成功");
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 获取 用户 个人信息
    getUserInfo(uid) {
      getUserInfo(uid)
        .then((response) => {
          this.userInfo = [response.data.data];
          this.$message.success("获取成功");
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 获取 用户 登录信息
    getUserLogin(uid) {
      getUserLogin(uid)
        .then((response) => {
          this.userLogin = [response.data.data];
          this.$message.success("获取成功");
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 用户 登录
    userlogin(temp) {
      userLogin(temp)
        .then((response) => {
          console.log(response.data.data);
          this.$message.success("登录成功");
        })
        .catch(() => {
          this.$message.error("登录失败");
        });
    },
    // 添加 用户
    addUser() {
      addUser(this.basciForm)
        .then(() => {
          this.$message.success("添加成功");
          this.addDialogVisible = false;
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    // 修改 用户 手机号
    updateUserPhone() {
      updateUserPhone(this.updateId, this.editForm.phone)
        .then(() => {
          this.$message.success("修改成功");
          this.editDialogVisible = false;
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    },
    // 更新 用户 个人信息
    updateUserInfo(form) {
      updateUserInfo(this.updateId, form)
        .then(() => {
          this.formDialogVisible = false;
          this.getUserInfo(this.updateId);
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    },
    // 更新 用户 登录信息
    updateUserLogin(form) {
      updateUserLogin(this.updateId, form)
        .then(() => {
          this.formDialogVisible = false;
          this.getUserLogin(this.updateId);
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    },
    // 删除 用户
    async deleteUser(id) {
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
      deleteUser(id)
        .then(() => {
          this.$message.success("删除成功");
          this.getUserList();
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