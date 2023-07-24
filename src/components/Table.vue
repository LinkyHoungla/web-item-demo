<template>
  <el-card class="box-card">
    <!-- 收索区域 -->
    <el-row :gutter="20">
      <el-col :span="10">
        <!-- 搜索框 -->
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          clearable
          @clear="handleQuery"
        >
          <el-button slot="append" icon="el-icon-search" @click="handleQuery" />
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="handleAdd">{{ addTitle }}</el-button>
      </el-col>
    </el-row>

    <!-- 列表区域 -->
    <el-table :data="tableList" :row-key="(row) => row.storeId">
      <el-table-column type="index" />
      <el-table-column
        v-for="field in tableFields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop"
      >
        <!-- 判断是否使用具名插槽 -->
        <template v-if="field.type === 'template'">
          <slot :name="field.prop" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    addTitle: String,
    tableFields: Array,
  },
  data() {
    return {
      // 搜索框 参数
      queryInfo: {
        query: "",
        pageNum: 0,
        pageSize: 5,
      },
      totalNum: 0,

      // 表格 列表
      tableList: [],
    };
  },
  created() {
    this.handleQuery();
  },
  methods: {
    handleQuery() {
      this.$emit("query", this.queryInfo);
    },
    handleAdd() {
      this.$emit("add");
    },
  },
};
</script>

<style>
</style>