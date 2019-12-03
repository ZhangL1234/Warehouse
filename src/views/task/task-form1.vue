<!-- placeholder 在表单中显示值，如何将其替换-->
<template>
  <el-form
    ref="form"
    :model="task"
    :rules="rules"
    class="task-form"
    label-width="100px"
    label-position="left"
  >
    <el-form-item label="项目名称" prop="projectId">
      <el-select
        v-model="task.projectId"
        placeholder="请选择项目名称"
        class="full-width"
        @change="handleChange"
      >
        <el-option
          v-for="project in projectList"
          :key="project.id"
          :value="project.id"
          :label="project.name"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="任务名称" prop="name">
      <el-input v-model="task.name" placeholder="请输入任务名称"></el-input>
    </el-form-item>
    <el-row class="clearfix">
      <el-col :span="12">
        <el-form-item label="完成时间" prop="doneTime">
          <el-date-picker
            v-model="task.doneTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 85%"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="指派人" prop="userId">
          <el-select v-model="task.userId" placeholder="请选择指派人">
            <el-option v-for="user in userList" :key="user.id" :label="user.name" :value="user.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="任务内容" prop="content">
      <el-input type="textarea" rows="6" resize="none" v-model="task.content" placeholder="内容"></el-input>
    </el-form-item>
    <!-- <el-form-item label="上传文件">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://upload-z2.qiniup.com"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-remove="beforeRemove"
        multiple
        :data="token"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="mini" icon="el-icon-upload2" slot="trigger">点击上传</el-button>
      </el-upload>
    </el-form-item> -->
    <el-form-item>
      <el-button type="info" style="width: 48%" @click="back">返回</el-button>
      <el-button type="danger" style="width: 48%" @click="handleSubmit">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "task-form1",
  props: {
    isAdd: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      projectList: [],
      userGroupList: [],
      userList: [],
      // token: {}, //上传密钥token
      // fileurl: "", //文件链接
      // fileList: [],
      task: {
        projectId: "",
        name: "",

        doneTime: "",
        userId: "",
        content: ""
      },
      rules: {
        projectId: [
          {
            required: true,
            message: "请选择项目",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请填写任务名称"
          }
        ],

        doneTime: [
          {
            required: true,
            message: "请选择完成时间"
          }
        ],
        userId: [
          {
            required: true,
            message: "请填写指派人"
          }
        ],
        content: [
          {
            required: true,
            message: "请填写任务内容"
          }
        ]
      }
    };
  },
  methods: {
    back() {
      this.$router.back("sys/taskList");
    },
    getUserList() {
      this.$axios({
        url: "/project/findUserByProjectId",
        method: "POST",
        data: {
          id: this.task.projectId
        }
      })
        .then(result => {
          let {
            data: { findUserByProjectId }
          } = result;

          this.userList = findUserByProjectId.map(item => {
            return {
              id: item.id,
              name: item.name
            };
          });
          console.log(this.userList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProjectList() {
      let userid = localStorage.getItem("UserId");
      this.$axios({
        url: "project/findProjectsByUserId",
        method: "POST",
        data: {
          user_id: userid
        }
      })
        .then(result => {
          let {
            data: {
              findProjectsByUserId: { content }
            }
          } = result;
          this.projectList = content;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getTask() {
      const id = this.$route.params.id;
      this.$axios({
        url: "/projectTasks/findList",
        method: "POST",
        data: {
          id
        }
      }).then(res => {
        // console.log(res)
        let {
          data: { list: data }
        } = res;
        console.log(data);
        this.task = this.initTask(data);
        this.getUserList();
      });
    },
    initTask(data) {
      return {
        id: data.id,
        projectId: data.project && data.project.id,
        name: data.title,
        groupId: data.team && data.team.id,
        doneTime: data.deadline,
        userId: data.user && data.user.name,
        content: data.content,
        // fileUrl: data.fileurl
      };
    },
    handleChange() {
      this.task.userId = "";
      this.getUserList();
    },
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.$message.error("请填写相关项目");
          return;
        }
        this.$axios({
          url: "projectTasks/edit",
          method: "POST",
          data: {
            id: this.task.id,
            project: {
              id: this.task.projectId
            },
            title: this.task.name,
            content: this.task.content,
            user: {
              id: this.task.userId
            },
            deadline: this.task.doneTime,
           
          }
        })
          .then(() => {
            // console.log(result)
            this.$message.success("修改成功");
            setTimeout(() => {
              this.$router.push("/sys/taskList");
            }, 1500);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    //获取token密钥
    // gettoken() {
    //   this.$axios({
    //     url: "Upload/upToken",
    //     method: "POST",
    //     data: {}
    //   })
    //     .then(res => {
    //       console.log("then", res);
    //       this.token = res.data.getToken;
    //       console.log(this.token);
    //     })
    //     .catch(() => {});
    // }
  },
  mounted() {
    this.getProjectList();
    // this.getUserGroups();
    if (!this.isAdd) {
      this.getTask();
    }
    // this.gettoken();
  }
};
</script>
<style lang="less" scoped>
</style>
