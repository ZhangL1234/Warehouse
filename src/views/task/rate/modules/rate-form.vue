<template>
  <el-form :model="task" ref="form" class="rate-form" label-width="100px" label-position="left">
    <el-form-item label="任务完成度">
      <el-input v-model="task.progress" placeholder="填写任务完成度"></el-input>
    </el-form-item>
    <el-form-item label="任务评分">
      <el-input v-model="task.rate" placeholder="填写任务评分"></el-input>
    </el-form-item>
    <el-form-item label="评价">
      <el-input type="textarea" rows="6" resize="none" v-model="task.appraise" placeholder="评价"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="info" style="width: 48%" @click="back">返回</el-button>
      <el-button type="danger" style="width: 48%" @click="Addtaskrate">编辑完成</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "rate-form",
  data() {
    return {
      taskid: "",
      task: {
        progress: "",
        rate: "",
        appraise: ""
      }
    };
  },
  methods: {
    //填写任务评分
    Addtaskrate() {
      const id = this.$route.params.id;
      this.$axios({
        url: "/projectTasks/getScore",
        method: "POST",
        data: {
          id: id,
          progress: this.task.progress,
          score: this.task.rate,
          evaluation: this.task.appraise
        }
      }).then(res => {
        console.log("结果", res);
        setTimeout(() => {
          // this.$router.push("/sys/taskList");
        }, 1500);
        this.$router.push({
          name: "task-list"
        });
      });
    },
    //返回
    back() {
      this.$router.back("");
    }
  }
};
</script>