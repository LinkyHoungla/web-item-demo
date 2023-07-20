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
      <!-- 收索区域 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <!-- 搜索框 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getRightsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getRightsList"
            />
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog(null)"
            >添加权限</el-button
          >
        </el-col>
      </el-row>

      <!-- 权限列表 -->
      <tree-table
        :data="rightsList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        border
      >
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.level === 1" size="mini">一级</el-tag>
          <el-tag v-if="scope.row.level === 2" type="warning" size="mini"
            >二级</el-tag
          >
          <el-tag v-if="scope.row.level === 3" type="success" size="mini"
            >三级</el-tag
          >
        </template>
        <!-- 排序 -->
        <template slot="operate" slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog(scope.row)"
            >修改</el-button
          >
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deletRight(scope.row.pageId)"
            >删除</el-button
          >
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
    </el-card>

    <!-- 添加 对话框 -->
    <el-dialog
      title="添加页面"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form :model="rightForm" ref="addFormRel" label-width="70px">
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="rightForm.name" />
        </el-form-item>
        <el-form-item label="页面路径" prop="path">
          <el-input v-model="rightForm.path" />
        </el-form-item>
        <el-form-item label="父级页面">
          <el-cascader
            expand-trigger="hover"
            :options="rightsTree"
            :props="cascaderProps"
            v-model="selectedKeys"
            clearable
            change-on-select
            @change="parentIdChange"
          />
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog=footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button @click="addRight">确定</el-button>
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
      <el-form :model="rightForm" ref="editFormRel" label-width="70px">
        <el-form-item label="ID" prop="pageId">
          <el-input v-model="rightForm.pageId" disabled></el-input>
        </el-form-item>
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="rightForm.name"></el-input>
        </el-form-item>
        <el-form-item label="页面路径" prop="path">
          <el-input v-model="rightForm.path"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog=footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button @click="editRight">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPageList,
  addRight,
  deletePage,
  updatePage,
  getPageTree,
} from "@/api/right";
export default {
  name: "rights",
  data() {
    return {
      // 获取权限列表的参数对象
      queryInfo: {
        query: "",
        pageNum: 0,
        pageSize: 5,
      },
      totalNum: 0,

      // 对话框显示
      addDialogVisible: false,
      editDialogVisible: false,

      // 表格列
      columns: [
        {
          label: "页面名称",
          prop: "name",
        },
        {
          label: "页面路径",
          prop: "path",
        },
        {
          label: "页面等级",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "operate",
        },
      ],
      // 级联选择设置
      cascaderProps: {
        value: "pageId",
        label: "name",
        children: "children",
      },
      // 所有的权限树
      rightsTree: [],
      // 所有的权限列表
      rightsList: [],
      // 选择项
      selectedKeys: [],
      // 权限 表单
      rightForm: {
        parentId: null,
        name: "",
        path: "",
        level: null,
      },
      // 当前 id
      selectPage: null,
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    // 页面
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getRightsList();
    },
    // 监听 页码值 改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getRightsList();
    },

    // 对话框
    // 展示 添加 对话框
    showAddDialog(temp) {
      if (temp === null)
        this.rightForm = {
          name: "",
          path: "",
          parentId: -1,
          level: 1,
        };
      else
        this.rightForm = {
          name: "",
          path: "",
          parentId: temp.pageId,
          level: temp.level + 1,
        };
      this.getPageTree(2);
      this.addDialogVisible = true;
    },
    // 展示 编辑 对话框
    showEditDialog(temp) {
      this.rightForm = temp;
      this.editDialogVisible = true;
    },
    // 监听 修改框 关闭
    editDialogClosed() {
      this.$refs.editFormRel.resetFields();
    },
    // 监听 添加框 关闭
    addDialogClosed() {
      this.selectedKeys = [];
      this.$refs.addFormRel.resetFields();
    },
    // 监听 级联选择器
    parentIdChange() {
      this.rightForm.level = this.selectedKeys.length + 1;
      if (this.rightForm.level > 1)
        this.rightForm.parentId = this.selectedKeys[this.rightForm.level - 2];
    },

    // 网络请求
    // 获取 权限 树
    getPageTree(level) {
      getPageTree(level)
        .then((response) => {
          this.rightsTree = response.data.data;
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 获取 页面 列表
    getRightsList() {
      getPageList(this.queryInfo)
        .then((response) => {
          const { data: res } = response.data;
          this.rightsList = res.list;
          this.totalNum = res.total;
          this.$message.success("获取成功");
        })
        .catch(() => {
          this.$message.error("获取列表失败");
        });
    },
    // 添加 权限
    addRight() {
      addRight(this.rightForm)
        .then(() => {
          this.$message.success("添加成功");
          this.getRightsList();
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
      this.addDialogVisible = false;
    },
    // 修改权限
    editRight() {
      updatePage(this.rightForm)
        .then(() => {
          this.$message.success("修改成功");
          this.getRightsList();
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
      this.editDialogVisible = false;
    },
    // 删除权限
    async deletRight(id) {
      // 确认返回 confirm，取消返回 cancel
      const result = await this.$confirm(
        "此操作将永久删除该页面，是否继续",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (result !== "confirm") return this.$message.info("已取消删除");
      deletePage(id)
        .then(() => {
          this.$message.success("删除成功");
          this.getRightsList();
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
  },
};
</script>