<template>
  <div>
    <!-- 表格区域 -->
    <table-page
      addTitle="添加类别"
      :tableFields="tableFields"
      :total="totalNum"
      :list="tableList"
      :update="formDialogVisible"
      @query="getServiceTypeList"
      @add="addServiceTypeDialog"
    >
      <template v-slot:operate="{ row }">
        <!-- 修改按钮 -->
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="updateServiceTypeDialog(row)"
        />
        <!-- 删除按钮 -->
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="deleteServiceType(row.id)"
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
  getServiceTypeList,
  addServiceType,
  updateServiceType,
  deleteServiceType,
} from "@/api/serviceType";

export default {
  name: "Service",
  data() {
    return {
      // 表格
      tableList: [],
      totalNum: 0,
      tableFields: [
        { label: "类别ID", prop: "id" },
        { label: "类别", prop: "type" },
        { label: "名称", prop: "name" },
        { label: "性别", prop: "gender" },
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
    addServiceTypeDialog() {
      this.formDialogVisible = true;
      this.formDialogTitle = "添加类别";
      this.formFields = [
        {
          label: "类别",
          prop: "type",
          type: "el-select",
          options: [
            { value: "voice", label: "音色" },
            { value: "nature", label: "性格" },
            { value: "service", label: "服务类型" },
          ],
        },
        {
          label: "性别",
          prop: "gender",
          type: "el-select",
          options: [
            { value: "male", label: "男" },
            { value: "female", label: "女" },
          ],
        },
        { label: "名称", prop: "name" },
      ];
      this.form = {};
      this.handleFormSubmit = this.addServiceType;
    },
    // 添加 陪玩
    updateServiceTypeDialog(temp) {
      this.formDialogVisible = true;
      this.formDialogTitle = "修改类别";
      this.formFields = [
        { label: "名称", prop: "name" },
        {
          label: "性别",
          prop: "gender",
          type: "el-select",
          options: [
            { value: "male", label: "男" },
            { value: "female", label: "女" },
          ],
        },
      ];
      this.form = temp;
      this.handleFormSubmit = this.updateServiceType;
    },

    // 请求
    // 获取 用户 列表
    getServiceTypeList(query) {
      getServiceTypeList(query)
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
    addServiceType(form) {
      addServiceType(form)
        .then(() => {
          this.formDialogVisible = false;
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    // 修改 用户
    updateServiceType(form) {
      updateServiceType(form.id, form)
        .then(() => {
          this.formDialogVisible = false;
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    },
    // 删除 用户
    async deleteServiceType(id) {
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
      deleteServiceType(id)
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