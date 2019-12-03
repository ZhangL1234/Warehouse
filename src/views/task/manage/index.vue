<template>
  <div class="app-container">
    <el-row>
      <el-col :span="10" class="app-panel">
        <h1 class="title">任务管理</h1>
        <task-list :list="list" />
      </el-col>
      <el-col :span="13" class="app-panel" style="margin-left: 15px;">
        <h1 class="title">添加任务</h1>
        <add-task />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import taskList from "./list";
import addTask from "../add";

export default {
  name: "task-manage",
  components: {
    taskList,
    addTask
  },
  data() {
    return {
      list: [
        // {
        //   id: res.id,
        //   title:res.title,
        //   desc: res.content,
        //   project: {
        //     id: res.project.id,
        //     name: res.proect.name
        //   },
        //   date: res.deadline,
        // }
      ]
    };
  },

  mounted() {
    this.getTaskList();
  },
  methods: {
    getTaskList() {
      this.$axios({
        url: "projectTasks/list",
        method: "POST",
        data: {}
      }).then(res => {
        let {
          data: { list :{content}}
        } = res;
        // console.log(list)
        content = content.slice(0,3);
        this.list = content.map(item => {
          return {
            id: item.id,
            title: item.title,
            content: item.content,
            project: {
              id: item.project && item.project.id,
              name: item.project && item.project.name
            },
            createDate: item.createDate
          };
        });
        console.log(this.list);
        // list.map((item)=>{
        //   this.list.push({
        //       'id': item.id,
        //       'title': item.title,
        //       'content': item.content,
        //       'project': {
        //       	'id': item.project.id,
        //       	'name': item.project.name,
        //       },
        //       'date': item.deadline
        //   })
        // })
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
