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
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getAdminList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getAdminList"
            />
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 列表区域 -->
      <el-table :data="adminList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="头像" width="80">
          <template slot-scope="scope">
            <el-avatar
              :src="
                scope.row.avatar != null
                  ? 'http://localhost:7777' + scope.row.avatar
                  : ''
              "
              :size="40"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="fullName"></el-table-column>
        <el-table-column label="角色" prop="role.roleName"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="创建时间" prop="createAt"></el-table-column>
        <el-table-column label="最近修改" prop="updateAt"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
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
              @click="removeAdmin(scope.row.adminId)"
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
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRel"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="adminName">
          <el-input v-model="addForm.adminName"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="fullName">
          <el-input v-model="addForm.fullName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="权限角色" prop="roleId">
          <!-- <el-input v-model="addForm.role"></el-input> -->
          <el-select v-model="addForm.roleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog=footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button @click="addAdmin">确定</el-button>
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
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="editFormRel"
        label-width="70px"
      >
        <el-form-item label="ID" prop="adminId">
          <el-input v-model="addForm.adminId" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="fullName">
          <el-input v-model="addForm.fullName"></el-input>
        </el-form-item>
        <el-form-item label="权限角色" prop="roleId">
          <!-- <el-input v-model="editForm.role"></el-input> -->
          <el-select v-model="addForm.roleId">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog=footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button @click="editAdmin">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAdmins, addAdmin, deleteAdmin, updateAdmin } from "@/api/admin";
import { getRoleList } from "@/api/role";
export default {
  name: "Users",
  data() {
    // 自定义 名称 校验规则
    var checkName = async (rule, value, cb) => {
      //   const { data: res } = await this.$http.get("admin/sameName", {
      //     params: { username: value },
      //   });
      //   if (
      //     res.status === 200 ||
      //     (res.status === 201 && value === this.originaName)
      //   )
      return cb();
      // return cb(new Error(res.message));
    };

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        pageNum: 0,
        pageSize: 5,
      },
      totalNum: 0,
      adminList: [],
      roleList: [],
      // 对话框显示
      addDialogVisible: false,
      editDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        adminName: "",
        password: "",
        roleId: null,
        fullName: "",
        avatar: null,
        status: 0,
      },
      // 修改前的命名
      originaName: "",
      // 修改用户的表单数据
      editForm: {},
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: checkName, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "用户名长度在6-15之间" },
        ],
      },
    };
  },
  created() {
    this.getAdminList();
  },
  methods: {
    // 得到 管理员 列表
    getAdminList() {
      getAdmins(this.queryInfo)
        .then((response) => {
          const { data: res } = response.data;
          this.adminList = res.list;
          this.totalNum = res.total;
        })
        .catch((error) => error);
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getAdminList();
    },
    // 监听 页码值 改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getAdminList();
    },
    // 监听 用户添加框 关闭事件
    addDialogClosed() {
      this.$refs.addFormRel.resetFields();
    },
    // 表单重置
    resetAdminForm(temp) {
      if (temp === null) {
        this.addForm = {
          adminName: "",
          password: "",
          roleId: null,
          fullName: "",
          avatar: null,
          status: 0,
        };
      } else {
        this.addForm = {
          adminId: temp.adminId,
          fullName: temp.fullName,
          roleId: temp.role.roleId,
          status: temp.status,
        };
      }
    },
    // 用户添加
    addAdmin() {
      addAdmin(this.addForm)
        .then(() => {
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
      this.addDialogVisible = false;
      this.getAdminList();
    },
    // 获取所有角色
    getRoles() {
      getRoleList()
        .then((response) => {
          this.roleList = response.data.data;
        })
        .catch();
    },
    // 展示 添加用户 对话框
    showAddDialog() {
      this.resetAdminForm(null);
      this.getRoles();
      this.addDialogVisible = true;
    },
    // 展示 编辑用户 对话框
    showEditDialog(temp) {
      this.resetAdminForm(temp);
      this.originaName = temp.username;
      this.getRoles();
      this.editDialogVisible = true;
    },
    // 监听 修改框 关闭时间
    editDialogClosed() {
      this.$refs.editFormRel.resetFields();
    },
    // 用户修改
    editAdmin() {
      this.$refs.editFormRel.validate((valid) => {
        if (!valid) return;
        updateAdmin(this.addForm)
          .then(() => {
            this.$message.success("修改成功");
          })
          .catch((error) => {
            this.$message.error("修改失败" + error);
          });

        this.editDialogVisible = false;
        this.getAdminList();
      });
    },
    // 根据 id 删除用户
    async removeAdmin(id) {
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
      deleteAdmin(id)
        .then(() => {
          this.$message.success("删除成功");
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("删除失败");
        });

      this.getAdminList();
    },
  },
};
</script>

<style lang="less" scoped>
</style>