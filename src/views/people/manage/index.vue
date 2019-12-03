<template>
  <div class="con_rig_bottom">
    <h2 class="con_main_tit">小组信息</h2>
    <br />
    <br />
    <br />
    <br />
    <br />

    <div class="form">
      <div class="task_select_box">
        <p class="con_rig_bottom_tit">小组名称：</p>
        <el-input style="width:50%" v-model="teamname" :disabled="true" placeholder="无"></el-input>
       </div>
      <!--<div class="task_select_box">
        <p class="con_rig_bottom_tit">所属项目：</p>
        <el-input style="width:50%" :disabled="true" v-model="projectname" placeholder="无"></el-input>
      </div> -->
      <!-- <div class="task_select_box">
                <p  class="con_rig_bottom_tit">项目小组：</p>
                <p class="task_select"  >
                    某某某
                </p>
      </div>-->
      <div class="task_select_box">
        <p class="con_rig_bottom_tit">小组组长：</p>
        <el-input style="width:50%;" :disabled="true" v-model="leadername" placeholder="无"></el-input>
      </div>
      <div class="task_select_box">
        <p class="con_rig_bottom_tit">小组成员:</p>
        <div style="float:left;" v-for="item in member" :key="item.id" placeholder="无">
          <img
            src="../../imgs/2.png"
            style="width:60px; height:60px;float:left;margin:5px;border-radius:100%;overflow:hidden;"
            alt
          />
          <p>{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bjxz",

  data() {
    return {
      teamname: "",
      projectname: "",
      leadername: "",
      member: [],
      sta_nav_cor: 0,

    };
  },

  methods: {
    sta_nav_cli: function(param) {
      console.log(param);
      this.sta_nav_cor = param;
    },
    getInfo() {
      // let that = this;
      this.$axios
        .post("team/teamInfo", {
          id: this.projectId
        })
        .then(res => {
          // console.log(res.data)
          // console.log(res.data.team.name)
          this.teamname = res.data.team.name;
          console.log(res.data.members);
          res.data.members.map(i => {
            if (i.jobs == "组长") {
              this.leadername = i.user.name;
            } else {
              this.member.push(i.user.name);
            }

            // console.log(this.member)
          });
        })
        .catch(() => {});
      console.log(this.member);
    }
  },
  created() {
    this.projectId = this.$route.query.projectId;
    // console.log(this.projectId)
    this.getInfo();
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
  height: 450px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.con_rig_bottom_tit {
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  display: flex;
  margin-top: 20px;
  margin-left: 80px;
}
.con_rig_bottom_tit span {
  font-size: 33px;
  font-weight: bold;
  margin-left: 30px;
}

.task_input {
  margin-top: 25px;

  margin-left: 10px;
  text-align: left;
}
.task_select_box {
  display: flex;

  margin-top: 10px;
}
.task_select {
  margin-top: 25px;

  margin-left: 10px;
  text-align: left;
}

.group-image {
  width: 60%;
  height: 100px;
  margin-left: 25px;
  margin-top: 20px;
}
</style>
