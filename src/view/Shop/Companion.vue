<template>
  <div>
    <table-page addTitle="添加陪玩" :tableFields="tableFields"></table-page>
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
      tableFields: [
        { label: "陪玩ID", prop: "cid" },
        { label: "店铺ID", prop: "sid" },
        { label: "用户ID", prop: "uid" },
        { label: "签名", prop: "signature" },
        { label: "状态", prop: "status" },
        { label: "创建时间", prop: "createTime" },
        { label: "修改时间", prop: "updateTime" },
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
    // 请求
    // 获取 用户 列表
    getCompanionList() {
      getCompanionList(this.queryInfo)
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
          this.getStoreList();
          this.formDialogVisible = false;
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    // 修改 用户
    updateCompanion(form) {
      updateCompanion(this.updateId, form)
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