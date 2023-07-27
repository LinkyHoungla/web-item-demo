<template>
  <div>
    <!-- 表格区域 -->
    <table-page
      addTitle="添加订单"
      :tableFields="tableFields"
      :total="totalNum"
      :list="tableList"
      :update="formDialogVisible"
      @query="getOrderList"
      @add="addOrderDialog"
    >
      <template v-slot:operate="{ row }">
        <!-- 修改按钮 -->
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="updateOrderDialog(row)"
        />
        <!-- 删除按钮 -->
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="deleteOrder(row.cid)"
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
  getOrderInfo,
  getOrderList,
  addOrder,
  updateOrder,
  deleteOrder,
} from "@/api/order";

export default {
  name: "Order",
  data() {
    return {
      // 表格
      tableList: [],
      totalNum: 0,
      tableFields: [
        { label: "订单ID", prop: "oid" },
        { label: "店铺ID", prop: "sid" },
        { label: "用户ID", prop: "uid" },
        { label: "总金额", prop: "totalPrice" },
        { label: "开始时间", prop: "startTime" },
        { label: "服务时长", prop: "serveDuration" },
        { label: "结束时间", prop: "endTime" },
        { label: "状态", prop: "status" },
        { label: "创建时间", prop: "createTime" },
        { label: "更新时间", prop: "updateTime" },
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
    addOrderDialog() {
      this.formDialogVisible = true;
      this.formDialogTitle = "添加订单";
      this.formFields = [
        { label: "用户ID", prop: "uid" },
        { label: "店铺ID", prop: "sid" },
      ];
      this.form = {};
      this.handleFormSubmit = this.addOrder;
    },
    // 添加 陪玩
    updateOrderDialog(temp) {
      this.formDialogVisible = true;
      this.formDialogTitle = "修改订单";
      this.formFields = [
        { label: "开始时间", prop: "startTime" },
        { label: "结束时间", prop: "endTime" },
      ];
      this.form = temp;
      this.handleFormSubmit = this.updateOrder;
    },

    // 请求
    // 获取 用户 列表
    getOrderList(query) {
      getOrderList(query)
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
    getOrderInfo(id) {
      getOrderInfo(id)
        .then((response) => {
          this.storeInfo = response.data.data;
          this.$message.success("获取成功");
        })
        .catch(() => {
          this.$message.error("获取失败");
        });
    },
    // 添加 用户
    addOrder(form) {
      addOrder(form)
        .then(() => {
          this.formDialogVisible = false;
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    // 修改 用户
    updateOrder(form) {
      updateOrder(form.oid, form)
        .then(() => {
          this.formDialogVisible = false;
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    },
    // 删除 用户
    async deleteOrder(id) {
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
      deleteOrder(id)
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