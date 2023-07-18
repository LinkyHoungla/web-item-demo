<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色列表 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="openAddDialog(null)"
            >添加角色</el-button
          >
        </el-col>
      </el-row>

      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand" />
        <el-table-column type="index" />
        <el-table-column label="角色代码" prop="roleCode" />
        <el-table-column label="角色名称" prop="roleName" />
        <el-table-column label="角色描述" prop="roleDesc" />
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="openEditDialog(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteRole(scope.row.roleId)"
              >删除</el-button
            >
            <el-button size="mini" type="warning" icon="el-icon-setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 权限角色 添加 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form
        :model="role"
        :rules="addFormRules"
        ref="addFormRel"
        label-width="70px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色代码" prop="roleCode">
          <el-input v-model="role.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="role.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog=footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button @click="addRole">确定</el-button>
      </span>
    </el-dialog>

    <!-- 权限角色 修改 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form
        :model="role"
        :rules="addFormRules"
        ref="editFormRel"
        label-width="70px"
      >
        <el-form-item label="ID" prop="roleId">
          <el-input v-model="role.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色代码" prop="roleCode">
          <el-input v-model="role.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="role.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog=footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button @click="editRole">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, updateRole, deleteRole, addRole } from "@/api/role";

export default {
  name: "roles",
  data() {
    // 自定义 名称 校验规则
    var checkCode = (rule, value, cb) => {
      const regExp = /^[A-Za-z0-9]+$/; // 匹配全英文和数字
      if (value && !regExp.test(value)) {
        cb(new Error("请输入全英文和数字"));
      } else {
        cb();
      }
    };

    return {
      rolesList: [],
      role: {},
      // 添加 窗口
      addDialogVisible: false,
      // 修改 窗口
      editDialogVisible: false,
      // 添加表单的验证规则对象
      addFormRules: {
        roleName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 20, message: "用户名长度在1-20之间" },
        ],
        roleCode: [
          { required: true, message: "请输入代码", trigger: "blur" },
          { min: 1, max: 10, message: "用户名长度在1-10之间" },
          { validator: checkCode, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 获取 权限角色 列表
    getRolesList() {
      getRoleList()
        .then((response) => {
          this.rolesList = response.data.data;
        })
        .catch(() => {
          this.$message.error("获取列表失败");
        });
    },
    // 编辑 权限角色 信息
    editRole() {
      this.$refs.editFormRel.validate(async (valid) => {
        if (!valid) return;
        updateRole(this.role)
          .then(() => {
            this.$message.success("修改成功");
          })
          .catch(() => {
            this.$message.error("修改失败");
          });

        this.editDialogVisible = false;
        this.getRolesList();
      });
    },
    // 删除 当前角色 信息
    async deleteRole(id) {
      // 确认返回 confirm，取消返回 cancel
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
      deleteRole(id)
        .then(() => {
          this.$message.success("删除成功");
          this.getRolesList();
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
    // 添加 当前角色 信息
    addRole() {
      addRole(this.role)
        .then(() => {
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });

      this.addDialogVisible = false;
      this.getRolesList();
    },
    // 窗口 操作 关闭
    addDialogClosed() {
      this.$refs.addFormRel.resetFields();
    },
    // 窗口 操作 关闭
    editDialogClosed() {
      this.$refs.editFormRel.resetFields();
    },
    // 编辑 窗口 打开
    openEditDialog(temp) {
      this.resetForm(temp);
      this.editDialogVisible = true;
    },
    // 添加 窗口 打开
    openAddDialog(temp) {
      this.resetForm(temp);
      this.addDialogVisible = true;
    },
    // 表单 重置
    resetForm(temp) {
      if (temp !== null) {
        this.role = temp;
      } else {
        this.role = {
          roleId: null,
          roleCode: "",
          roleName: "",
          roleDesc: "",
        };
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>