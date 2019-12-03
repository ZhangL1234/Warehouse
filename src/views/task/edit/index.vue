<template>
  <div class="app-container app-panel">
    <h1 class="title">编辑任务</h1>
    <el-row>
      <el-col :span="12">
        <task-form :is-add="false" @on-edit-success="handleSuccess"></task-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import taskForm from "../task-form1";
export default {
  name: "task-edit",
  components: {
    taskForm
  },
  data() {
    return {
      id: this.$route.params.id
    };
  },
  methods: {
    handleSuccess() {}
  }
};
</script>