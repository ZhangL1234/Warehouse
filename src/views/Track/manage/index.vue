<template>
  <div class="app-container app-panel">
    <h1 class="title">追踪管理</h1>
    <!-- <div class="filter-container">
      <el-input class="filter-item filter-input" size="small" prefix-icon="el-icon-search" v-model="name" placeholder="搜索" ></el-input>
      <el-button type="primary" size="small">添加任务</el-button>
    </div>-->
    <!-- <el-tabs tab-position="left" class="tabs" v-model="activeTab"> -->
      <task-table></task-table>
    <!-- </el-tabs> -->
  </div>
</template>
<script>
import taskTable from "./modules/track-table";
export default {
  name: "track-manage",
  components: {
    taskTable
  },
  data() {
    return {
      activeTab: ""
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.tabs {
  margin-top: 15px;
  height: 500px;
  /* 控制表格高度 */
  overflow: visible;
  overflow-x: auto;
}
</style>