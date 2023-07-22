<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="localVisible"
    :width="width"
    @close="handleClose"
  >
    <el-form :model="formData" ref="formRef">
      <el-form-item
        v-for="field in fields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop"
      >
        <el-input v-model="formData[field.prop]" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      // 添加 .sync 修饰符，保持数据双向绑定
      sync: true,
    },
    dialogTitle: String,
    width: String,
    fields: Array,
    formRef: String,
    formData: Object,
  },
  watch: {
    // 监听父组件传递的 prop 变化，更新子组件中的局部属性
    visible(newVal) {
      this.localVisible = newVal;
    },
  },
  data() {
    return {
      // 显示
      localVisible: this.visible,
      // 表单数据对象，用于存储表单项的值
      form: this.formData,
    };
  },
  methods: {
    handleClose() {
      // 触发关闭对话框的事件
      this.$emit("update:visible", false);
    },
    handleCancel() {
      // 触发取消按钮点击事件
      // this.$emit("cancel");
      this.$emit("update:visible", false);
    },
    handleSubmit() {
      // 触发确定按钮点击事件
      this.$emit("submit", this.formData);
    },
  },
};
</script>
