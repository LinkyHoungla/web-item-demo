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
      <el-table
        :data="roleList"
        border
        stripe
        :row-key="(row) => row.roleId"
        :expand-row-keys="expandRowKeys"
        @expand-change="handleExpandChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 展开行的内容 -->
            <el-row
              v-for="item in roleRightList"
              :key="item.pageId"
              :class="['vcenter']"
            >
              <!-- 一级权限 -->
              <el-col :span="5"
                ><el-tag
                  closable
                  @close="deleteRightById(scope.row.roleId, item.pageId)"
                  >{{ item.name }}</el-tag
                >
                <i class="el-icon-caret-right"
              /></el-col>
              <!-- 二级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="item2 in item.children"
                  :key="item2.pageId"
                  :class="['vcenter']"
                >
                  <el-col :span="6"
                    ><el-tag
                      type="success"
                      closable
                      @close="deleteRightById(scope.row.roleId, item2.pageId)"
                      >{{ item2.name }}</el-tag
                    >
                    <i class="el-icon-caret-right"
                  /></el-col>
                  <!-- 三级级权限 -->
                  <el-col :span="18"
                    ><el-tag
                      closable
                      @close="deleteRightById(scope.row.roleId, item3.pageId)"
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.pageId"
                      >{{ item3.name }}</el-tag
                    ></el-col
                  >
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
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
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="openSetRightsDialog(scope.row)"
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
        :model="roleForm"
        :rules="addFormRules"
        ref="addFormRel"
        label-width="70px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色代码" prop="roleCode">
          <el-input v-model="roleForm.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="roleForm.roleDesc"></el-input>
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
        :model="roleForm"
        :rules="addFormRules"
        ref="editFormRel"
        label-width="70px"
      >
        <el-form-item label="ID" prop="roleId">
          <el-input v-model="roleForm.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色代码" prop="roleCode">
          <el-input v-model="roleForm.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="roleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog=footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button @click="editRole">确定</el-button>
      </span>
    </el-dialog>

    <!-- 权限 设置 -->
    <el-dialog
      title="权限设置"
      :visible.sync="setDialogVisible"
      width="50%"
      @close="setDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-tree
        :data="rightsTree"
        :props="treeProps"
        show-checkbox
        ref="treeRef"
        :render-after-expand="false"
        node-key="pageId"
        default-expand-all
        :default-checked-keys="defaultKeys"
      ></el-tree>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog=footer">
        <el-button @click="setDialogVisible = false">取消</el-button>
        <el-button @click="setRights">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, updateRole, deleteRole, addRole } from "@/api/role";

import {
  getRightsList,
  getPageTree,
  deleteRight,
  getRightsId,
  addRights,
} from "@/api/right";

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
      // 展开行
      expandRowKeys: [],
      // 已有权限列表
      defaultKeys: [],
      // 权限角色列表
      roleList: [],
      // 当前选择角色id
      selectedRole: null,
      // 角色提交表单
      roleForm: {},
      // 权限角色权限列表
      roleRightList: [],
      // 权限树
      rightsTree: [],
      // 添加 窗口
      addDialogVisible: false,
      // 修改 窗口
      editDialogVisible: false,
      // 设置 窗口
      setDialogVisible: false,
      // 树形 控件
      treeProps: {
        label: "name",
        children: "children",
      },
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
          this.roleList = response.data.data;
        })
        .catch(() => {
          this.$message.error("获取列表失败");
        });
    },
    // 获取 角色 权限列表
    getRightsList(id) {
      getRightsList(id)
        .then((response) => {
          this.roleRightList = response.data.data;
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 获取 权限 树
    getPageTree() {
      getPageTree()
        .then((response) => {
          this.rightsTree = response.data.data;
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 行展开事件
    handleExpandChange(row) {
      if (row && this.expandRowKeys.indexOf(row.roleId)) {
        this.expandRowKeys = [row.roleId];
        this.getRightsList(row.roleId);
      } else {
        this.expandRowKeys = [];
        this.roleRightList = [];
      }
    },
    // 编辑 权限角色 信息
    editRole() {
      this.$refs.editFormRel.validate(async (valid) => {
        if (!valid) return;
        updateRole(this.roleForm)
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
    // 获取 已有权限
    getRightsId(id) {
      getRightsId(id)
        .then((response) => {
          this.defaultKeys = response.data.data;
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 添加 当前角色 信息
    addRole() {
      addRole(this.roleForm)
        .then(() => {
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });

      this.addDialogVisible = false;
      this.getRolesList();
    },
    // 添加 权限
    setRights() {
      const rights = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      addRights(this.selectedRole, rights)
        .then(() => {
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
      this.getRolesList(this.selectedRole);
      this.setDialogVisible = false;
    },
    // 删除 权限
    async deleteRightById(roleId, pageId) {
      const result = await this.$confirm(
        "此操作将永久删除该权限，是否继续",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (result !== "confirm") return this.$message.info("已取消删除");
      deleteRight(roleId, pageId)
        .then(() => {
          this.$message.success("删除成功");
          this.getRightsList(roleId);
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
    // 窗口 添加 关闭
    addDialogClosed() {
      this.$refs.addFormRel.resetFields();
    },
    // 窗口 操作 关闭
    editDialogClosed() {
      this.$refs.editFormRel.resetFields();
    },
    // 窗口 设置 关闭
    setDialogClosed() {},
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
    // 设置 窗口 打开
    openSetRightsDialog(temp) {
      this.selectedRole = temp.roleId;
      this.getPageTree();
      this.getRightsId(temp.roleId);
      this.setDialogVisible = true;
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
.el-row {
  border-bottom: 1px solid #eee;

  .el-tag {
    margin: 7px;
  }
}
</style>