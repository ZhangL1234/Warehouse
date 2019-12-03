<template>
  <div class="app-container app-panel">
    <h1 class="title">任务内容</h1>
    <task-info :data="task" />
    <span>
      <el-button type="info" style="margin-left:4%" @click="back">返回</el-button>
      <el-button
        v-if="this.task['status']=='已完成'"
        @click="over(task['id'])"
        type="danger"
        style="margin-left:1%"
      >任务评分</el-button>
      <el-button v-else @click="over(task['id'])" type="danger" style="margin-left:1%" disabled>任务评分</el-button>
      <!-- :disabled="data['status']=='已完成'" -->
    </span>
  </div>
</template>
<script>
import taskInfo from "../task-info";
export default {
  name: "task-detail",

  components: {
    taskInfo
  },
  data() {
    return {
      task: {}
    };
  },
  methods: {
    getTask() {
      // console.log(this.$route.params.id)
      // setTimeout(() => {
      // this.task = {
      //   id: 1,
      //   name: '修改标题，修复bug',
      //   projectName: '项目一',
      //   userGroup: 'a组',
      //   publishDate: '2019-5-5',
      //   doneDate: '2019-6-8',
      //   status: 1,
      //   content: '55'
      // }
      const id = this.$route.params.id;
      this.$axios({
        url: "/projectTasks/findList",
        method: "POST",
        data: {
          id
        }
      }).then(res => {
        let {
          data: { list: list }
        } = res;
        console.log(list);

        this.task = {
          id: list.id,
          name: list.title,
          projectName: list.project.name,
          userGroup: list.user.name,
          publishDate: list.createDate,
          doneDate: list.deadline,
          status: list.status,
          content: list.content,
          fileUrl: list.fileUrl
          // score:list.socre,
        };
        console.log("status", this.task.status);
        console.log("task", this.task);
      });
    },
    over(id) {
      this.$router.push({
        name: "task-rate",
        params: {
          id
        }
      });
    },
    //返回
    back() {
      this.$router.back("sys/taskList");
    }
  },
  mounted() {
    this.getTask();
  }
};
</script>
