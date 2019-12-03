<template>
  <div class="task-list">
    <div class="task-item" v-for="task in list" :key="task.id">
      <h1 class="task-title">{{task.title}}</h1>
      <p class="task-desc">{{task.content | splitDesc}}</p>
      <!-- <p>{{task.content}}</p> -->
      <div class="task-action">
        <el-button type="text" size="mini">{{task.project.name}}</el-button>
        <p class="date">
          <span>{{task.createDate | formateDate('{m}-{d}')}}</span>
          <span>{{task.createDate | formateDate('{h}:{i}:{s}')}}</span>
          <span>星期{{task.createDate | formateDate('{a}')}}</span>
        </p>
      </div>
    </div>
    <p style="text-align: right;">
      <el-button type="text" size="mini" @click="handleMore">查看更多</el-button>
    </p>
  </div>
</template>
<script>
import { parseTime } from "@/utils";
export default {
  name: "list-task",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    formateDate(value, cFormat) {
      return parseTime(value, cFormat);
    },
    splitDesc(value) {
      console.log(value);
      return value
        ? value.length <= 55
          ? value
          : value.substring(0, 55) + "..."
        : "";
    }
  },
  methods: {
    handleMore() {
      this.$router.push("/sys/taskList");
    }
  }
};
</script>
<style lang="less" scoped>
.task-list {
  .task-item {
    padding: 9px 20px;
    box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
    color: #505050;
    margin-bottom: 15px;
    font-size: 13px;
    .task-title {
      line-height: 20px;
      font-weight: 600;
    }
    .task-desc {
      padding: 10px 0;
      line-height: 19px;
      text-indent: 2em;
    }
    .task-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .date {
        font-size: 12px;
        color: #a4a4a4;
      }
    }
  }
}
</style>