<template>
  <div class="app-container app-panel">
    <h1 class="title">任务列表</h1>
    <el-row class="box_0">
      <el-col :span="8">
        <table class="box_fst">
          <tr>
            <td>总任务</td>
            <td>已完成</td>
            <td>进行中</td>
          </tr>
          <tr>
            <td>{{number}}</td>
            <td>{{ongoing}}</td>
            <td>{{complete}}</td>
          </tr>
        </table>
      </el-col>

      <el-col :span="12" class="findClass">
        <el-input
          class="sek"
          size="small"
          prefix-icon="el-icon-search"
          v-model="keyword"
          placeholder="搜索"
          type="text"
        ></el-input>
      </el-col>
      <el-col class="btnClass" :span="4">
        <el-button class="fl1" type="warning" size="small" @click="Situation">任务情况</el-button>
        <el-button class="fl2" type="danger" size="small" @click="handleAdd">添加任务</el-button>
      </el-col>
    </el-row>
    <el-tabs tab-position="left" class="tabs" v-model="activeTab" @tab-click="findSizeByProjectId">
      <!-- （${project.taskCount}） -->
      <el-tab-pane
        :label="`${project.name}`"
        :lazy="true"
        v-for="project in projects"
        :key="project.id"
        :projectId="project.id"
      >
        <task-table :projectId="project.id" :oldkeyword="keyword"></task-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import taskTable from "./modules/task-table";
export default {
  name: "task-list",
  components: {
    taskTable
  },
  data() {
    return {
      activeTab: "",
      name: "",
      projects: [],
      keyword: "",
      number: "",
      ongoing: "",
      complete: "",
      projectId: "",
      activeTabId: ""
    };
  },
  computed: {},
  methods: {
    // getprojectTasksfindSize(){
    //   this.axios({
    //     url:"projectTasks/findSize",
    //     methods:"POST",
    //     data:{
    //       project_id:this.projectId,
    //       username:this.keyword
    //     }
    //   }).then(()=>{
    //     this.getprojectTasksfindSize
    //   })
    // }
    getProjects() {
      if (sessionStorage.getItem("UserCharacter") == "管理员") {
        this.$axios({
          url: "/project/list",
          method: "POST",
          data: {}
        })
          .then(res => {
            //  console.log("项目列表--", res);
            this.projects = res.data.list;
            this.activeTabId = res.data.list[0].id;
            this.findSizeByProjectId();
          })
          .catch(() => {});
      } else {
        let userid = localStorage.getItem("UserId");
        this.$axios({
          url: "project/findProjectsByUserId",
          method: "POST",
          data: {
            user_id: userid
          }
        }).then(res => {
          this.projects = res.data.findProjectsByUserId.content;
          console.log(res.data.findProjectsByUserId.content);
          this.activeTabId = res.data.findProjectsByUserId.content[0].id;
          console.log(this.activeTabId);
          this.findSizeByProjectId();
        });
      }
    },
    Situation() {
      this.$router.push({
        name: "task-user"
      });
    },
    handleAdd() {
      this.$router.push({
        name: "task-manage"
      });
    },
    findSizeByProjectId(tab) {
      tab && tab.$attrs.projectId && (this.activeTabId = tab.$attrs.projectId);
      this.$axios({
        url: "projectTasks/findSize",
        method: "POST",
        data: {
          project_id: this.activeTabId
        }
      }).then(ref => {
        let arr = ref.data.list;
        console.log(arr);
        this.complete = arr.complete;
        this.ongoing = arr.ongoing;
        this.number = arr.number;
      });
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
.box_fst {
  // align: center;
  margin-right: 15px;
  width: 380px;
  height: 72px;

  // left: 180px;
  // top: 217px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.17142857142857137);
  text-align: center;
}
.box_0 {
  width: 100%;
}

.sek {
  // margin-top: 3px;
  // width: 100%;
  // height: 35px;
  text-indent: 10px;
  color: #b0b0b0;
  // border-radius: 18px;
  font-size: 12px;
  line-height: 150%;
  text-align: left;
}
.btnClass {
  margin-top: 37px;
  float: right;
  // margin-left: 2px;
  // width: 100%;
}
.findClass {
  margin-top: 37px;
}
.fl1 {
  margin-left: 20px;
  float: right;
}
.fl2 {
  margin-left: 10px;
  float: right;
}
</style>