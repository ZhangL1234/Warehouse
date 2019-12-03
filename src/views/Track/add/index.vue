<template>
  <div class="con_rig_bottom">
    <h2 class="con_main_tit">添加人员</h2>
    <br />
    <br />
    <br />
    <br />
    <br />
    <el-form v-model="track" ref="form">
      <div class="form">
        <div class="task_select_box">
          <p class="con_rig_bottom_tit">姓名：</p>
          <el-select
            v-model="track.id"
            placeholder="请选择成员"
            class="task_select"
            size="small"
            @change="getuserinfo()"
          >
            <el-option v-for="item in userlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <!-- <div class="task_select_box">
          <p class="con_rig_bottom_tit">用户名：</p>
          <el-input
            placeholder="请输入用户名"
            class="task_input"
            v-model="useraccount"
            size="small"
            :readonly="true"
          ></el-input>
        </div>-->
        <div class="task_select_box">
          <p class="con_rig_bottom_tit">手机号码：</p>
          <el-input placeholder="请输入手机号码" class="task_input" v-model="track.phone" size="small"></el-input>
          <p class="con_rig_bottom_tit">毕业时间：</p>
          <el-date-picker
            v-model="userdate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            :readonly="true"
            placeholder="选择毕业时间"
            style="margin-top: 10px;width: 30%;margin-left: 10px;"
            size="small"
          ></el-date-picker>
        </div>
        <div class="task_select_box">
          <p class="con_rig_bottom_tit">工作地点：</p>
          <el-input
            placeholder="请输入工作地点"
            class="task_input"
            v-model="track.workingPlace"
            size="small"
          ></el-input>
          <p class="con_rig_bottom_tit">职位：</p>
          <el-input placeholder="请输入职位名称" class="task_input" v-model="track.position" size="small"></el-input>
        </div>
        <div class="task_select_box">
          <p class="con_rig_bottom_tit">建议内容：</p>
          <el-input type="textarea" class="task_textarea" v-model="track.advice" size="small"></el-input>
        </div>
        <div class="task_select_box">
          <p class="con_rig_bottom_tit">工作内容：</p>
          <el-input type="textarea" class="task_textarea" v-model="track.jobContent" size="small"></el-input>
        </div>
        <div class="btnstyle">
          <el-button
            type="danger"
            class="button"
            style="background-color: #909399;border-color:#909399 "
            @click="back"
            size="small"
          >返回</el-button>

          <el-button type="danger" class="button" size="small" @click="add">确认添加</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "track-add",

  data() {
    return {
      track: {
        id: "", //人员id
        phone: "", //手机号码
        workingPlace: "", //工作地点
        position: "", //职位
        jobContent: "" ,//工作内容,
        advice:""
      },
      userlist: [], //人员列表
      useraccount: "", //选中人员用户名
      userdate: "" //选中人员毕业时间
    };
  },
  created() {
    this.getuserlist();
  },
  methods: {
    //返回
    back() {
      this.$router.back("sys/Track");
    },
    //请求人员列表
    getuserlist() {
      this.$axios({
        url: "user/getAllUserRole",
        method: "POST",
        data: {}
      })
        .then(res => {
          // console.log(res);
          this.userlist = res.data.getAllUserRole;
        })
        .catch(() => {});
    },
    //请求选中人员信息
    getuserinfo() {
      this.$axios({
        url: "user/userInfo",
        method: "POST",
        data: {
          id: this.track.id
        }
      })
        .then(res => {
          // console.log("信息", res);
          this.useraccount = res.data.user.account;
          this.userdate = res.data.user.createDate;
        })
        .catch(() => {});
    },
    //添加人员
    add() {
      // console.log(this.track.id);
      this.$axios({
        url: "tracking/add",
        method: "POST",
        data: {
          user: {
            id: this.track.id
          },
          phone: this.track.phone,
          workingPlace: this.track.workingPlace,
          position: this.track.position,
          jobContent: this.track.jobContent,
          advice:this.track.advice
        }
      })
        .then(() => {
          // console.log(res);
          this.$message.success("添加成功");
          setTimeout(() => {
            this.$router.push("/sys/Track");
          }, 1500);
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.con_main_tit {
  float: left;
  font-size: 20px;
  color: rgba(80, 80, 80, 1);
  font-weight: bold;
  margin-top: 30px;
  margin-left: 30px;
}

.con_rig_bottom {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 70%;
  background-color: white;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.con_rig_bottom_tit {
  width: 100px;
  color: rgba(80, 80, 80, 1);
  font-size: 15px;
  display: flex;
  margin-top: 20px;
  margin-left: 80px;
}

.con_rig_bottom_tit span {
  font-weight: bold;
  margin-left: 30px;
}

.task_input {
  margin-top: 10px;
  width: 30%;
  margin-left: 10px;
}
.task_textarea {
  margin-top: 10px;
  width: 60%;
  margin-left: 10px;
}

.task_select_box {
  display: flex;

  margin-top: 10px;
}

.task_select {
  margin-top: 10px;
  width: 30%;
  margin-left: 10px;
}

.button {
  width: 20%;
  height: 40px;
  margin: 40px 20px 40px 20px;
}

.group-image {
  width: 60%;
  height: 100px;
  margin-left: 25px;
}
</style>
