<template>
  <div>
    <!-- 表格区域 -->
    <table-page
      addTitle="添加游戏"
      :tableFields="tableFields"
      :total="totalNum"
      :list="tableList"
      :update="formDialogVisible"
      @query="getGameList"
      @add="addGameDialog"
    >
      <template v-slot:operate="{ row }">
        <!-- 添加按钮 -->
        <el-button
          v-if="row.type === 'game'"
          icon="el-icon-edit"
          size="mini"
          @click="addTypeDialog(row.id)"
        />
        <!-- 修改按钮 -->
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="updateGameDialog(row)"
        />
        <!-- 删除按钮 -->
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="deleteGame(row.id)"
        />
      </template>
    </table-page>

    <!-- 弹窗区域 -->
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
import { getGameList, addGame, updateGame, deleteGame } from "@/api/game";

export default {
  name: "game",
  data() {
    return {
      // 表格
      tableList: [],
      totalNum: 0,
      tableFields: [
        { label: "ID", prop: "id" },
        { label: "PID", prop: "pid" },
        { label: "类别", prop: "type" },
        { label: "名称", prop: "name" },
        { label: "创建时间", prop: "createTime" },
        { label: "修改时间", prop: "updateTime" },
        { label: "操作", prop: "operate", type: "template" },
      ],

      // 表单窗口
      formDialogTitle: "",
      formDialogVisible: false,
      formFields: [],
      form: {},
      handleFormSubmit: function () {},
    };
  },
  methods: {
    // 弹窗
    // 添加 游戏
    addGameDialog() {
      this.formDialogVisible = true;
      this.formDialogTitle = "添加游戏";
      this.formFields = [{ label: "名称", prop: "name" }];
      this.form = {
        pid: -1,
        type: "game",
      };
      this.handleFormSubmit = this.addGame;
    },
    // 添加 类别
    addTypeDialog(id) {
      this.formDialogVisible = true;
      this.formDialogTitle = "添加类别";
      this.formFields = [
        {
          label: "类别",
          prop: "type",
          type: "el-select",
          options: [
            { value: "server", label: "区服" },
            { value: "mode", label: "模式" },
            { value: "rank", label: "段位" },
          ],
        },
        { label: "名称", prop: "name" },
      ];
      this.form = {
        pid: id,
      };
      this.handleFormSubmit = this.addGame;
    },
    // 添加 陪玩
    updateGameDialog(temp) {
      this.formDialogVisible = true;
      this.formDialogTitle = "修改类别";
      this.formFields = [{ label: "名称", prop: "name" }];
      this.form = temp;
      this.handleFormSubmit = this.updateGame;
    },

    // 请求
    // 获取 用户 列表
    getGameList(query) {
      getGameList(query)
        .then((response) => {
          const { data: res } = response.data;
          this.tableList = res.list;
          this.totalNum = res.total;
          this.$message.success("获取成功");
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 添加 用户
    addGame(form) {
      addGame(form)
        .then(() => {
          this.formDialogVisible = false;
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    // 修改 用户
    updateGame(form) {
      updateGame(form.id, form)
        .then(() => {
          this.formDialogVisible = false;
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    },
    // 删除 用户
    async deleteGame(id) {
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
      deleteGame(id)
        .then(() => {
          this.$message.success("删除成功");
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