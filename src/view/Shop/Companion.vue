<template>
  <div>
    <!-- 表格区域 -->
    <table-page
      addTitle="添加陪玩"
      :tableFields="tableFields"
      :total="totalNum"
      :list="tableList"
      :update="formDialogVisible"
      @query="getCompanionList"
      @add="addCompanionDialog"
    >
      <template v-slot:operate="{ row }">
        <!-- 修改按钮 -->
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="updateCompanionDialog(row)"
        />
        <!-- 删除按钮 -->
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="deleteCompanion(row.cid)"
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
import {
  getCompanionInfo,
  getCompanionList,
  addCompanion,
  updateCompanion,
  deleteCompanion,
} from "@/api/companion";

export default {
  name: "Companion",
  data() {
    return {
      // 表格
      tableList: [],
      totalNum: 0,
      tableFields: [
        { label: "陪玩ID", prop: "cid" },
        { label: "店铺ID", prop: "sid" },
        { label: "用户ID", prop: "uid" },
        { label: "签名", prop: "signature" },
        { label: "状态", prop: "status" },
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
    // 添加 陪玩
    addCompanionDialog() {
      this.formDialogVisible = true;
      this.formDialogTitle = "添加店铺";
      this.formFields = [
        { label: "用户ID", prop: "uid" },
        { label: "店铺ID", prop: "sid" },
        { label: "个性签名", prop: "signature" },
      ];
      this.form = {};
      this.handleFormSubmit = this.addCompanion;
    },
    // 添加 陪玩
    updateCompanionDialog(temp) {
      console.log(temp);
      this.formDialogVisible = true;
      this.formDialogTitle = "修改陪玩";
      this.formFields = [{ label: "个性签名", prop: "signature" }];
      this.form = temp;
      this.handleFormSubmit = this.updateCompanion;
    },

    // 请求
    // 获取 用户 列表
    getCompanionList(query) {
      getCompanionList(query)
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
    // 获取 用户 个人信息
    getCompanionInfo(id) {
      getCompanionInfo(id)
        .then((response) => {
          this.storeInfo = response.data.data;
          this.$message.success("获取成功");
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 添加 用户
    addCompanion(form) {
      addCompanion(form)
        .then(() => {
          this.formDialogVisible = false;
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    // 修改 用户
    updateCompanion(form) {
      updateCompanion(form.cid, form)
        .then(() => {
          this.formDialogVisible = false;
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    },
    // 删除 用户
    async deleteCompanion(id) {
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
      deleteCompanion(id)
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