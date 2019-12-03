<template>
  <div class="app-container">
    <el-row>
      <el-col :span="10" class="app-panel">
        <h1 class="title">任务内容</h1>
        <task-info :data="task" />
      </el-col>
      <el-col :span="13" class="app-panel" style="margin-left: 15px;">
        <h1 class="title">填写评分</h1>
        <rate-form @submit-rate="handleSubmit" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import taskInfo from "../task-info";
import rateForm from "./modules/rate-form";
export default {
  name: "task-rate",
  components: {
    taskInfo,
    rateForm
  },
  data() {
    return {
      task: null
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
          fileUrl:list.fileUrl
        };
        console.log("task", this.task);
      });
    },
    handleSubmit(rate) {
      console.log(this.task.id, rate);
    }
  },
  mounted() {
    this.getTask();
  }
};
</script>