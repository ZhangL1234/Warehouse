<template>
  <div class="app-container app-panel">
    <h1 class="title">小组列表</h1>
    <!-- <div class="filter-container">
      <el-input class="filter-item filter-input" size="small" prefix-icon="el-icon-search" v-model="name" placeholder="搜索" ></el-input>
      <el-button type="primary" size="small">添加任务</el-button>
    </div>-->
    <el-tabs tab-position="left" class="tabs" v-model="activeTab">
      <el-tab-pane
        :label="`${project.name}（${project.totalMember}）`"
        :lazy="true"
        v-for="project in projects"
        :key="project.id"
      >
        <task-table :project-id="project.id"></task-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import taskTable from "./modules/people-table";
export default {
  name: "people-list",
  components: {
    taskTable
  },
  data() {
    return {
      activeTab: "",
      projects: [
        {
          name: "",
          taskCount: "",
          id: ""
        }
      ]
    };
  },
  methods: {
    // //单击改变字体颜色
    // changSemester(index) {
    //   this.i = index;
    // },
    getProjects() {
      setTimeout(() => {
        this.$axios({
          url: "team/list",
          method: "POST",
          data: {}
        }).then(res => {
          // console.log("返回值--",res)
          this.projects = res.data.list
        });
      }, 1000);
    }
  },
  mounted() {
    this.getProjects();
  }
};
</script>
<style lang="less" scoped>
.tabs {
  margin-top: 15px;
  height: 500px;
  /* 控制表格高度 */
  overflow-x: hidden;
  /deep/.el-tabs__content {
    height: 500px;
    overflow: visible;
    overflow-x: auto;
  }
}
// .red {
//   color: rgba(255, 92, 92, 1);
//   border-left: 5px solid rgba(255, 92, 92, 1);
//   padding: 0 35px;
// }
</style>