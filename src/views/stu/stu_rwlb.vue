<template>
  <div>
    <div class="dv1">
      <h2 class="bt1">任务列表</h2>
      <br />
      <br />
      <br />
      <br />
      <div>
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;"></el-radio-group>
        <el-tabs
          :tab-position="tabPosition"
          @tab-click="handleClick"
          style="height: 450px; margin-left: 70px;"
        >
          <el-tab-pane class="wz" v-for="list in task_list" :key="list.id" v-bind:label="list.label">
            <div style="background-color: pink;">
              <table
                width="1200"
                cellpadding="0"
                cellspacing="0"
                style="float: right; text-align: left;"
              >
                <tr>
                  <td width="150">任务名称</td>
                  <td>{{list.title}}</td>
                </tr>
                <tr>
                  <td width="150">项目名称</td>
                  <td>{{list.project}}</td>
                </tr>
                <tr>
                  <td width="150">小组名称</td>
                  <td>{{list.team}}</td>
                </tr>
                <tr>
                  <td width="150">发布时间</td>
                  <td>{{list.createdate}}</td>
                </tr>
                <tr>
                  <td width="150">交付时间</td>
                  <td>{{list.deadline}}</td>
                </tr>
                <tr>
                  <td width="150">完成状态</td>
                  <td>{{list.status}}</td>
                </tr>
                <tr>
                  <td width="150">任务得分</td>
                  <td>{{list.score}}</td>
                </tr>
                <tr>
                  <td width="150">任务内容</td>
                  <td>{{list.content}}</td>
                </tr>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-button type="danger" style="width:248px; height: 55px;" @click="txrw()">填写任务</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button
        type="primary"
        style="width:248px; height: 55px; background-color: rgba(0, 186, 173, 1);"
        @click="finish"
      >完成按钮</el-button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      tabPosition: "left",
      task_list: [],
      msg: "dasdsa",
      select: ""
    };
  },
  methods: {
    txrw() {
      this.$router.push({ path: "stu_txrw", query: { data: this.select } });
    },
    handleClick: function(tab, event) {
      this.select = parseInt(event.target.getAttribute("id").substr(4, 1));
    },
    finish() {
      if (this.select == "") {
        this.select = 0;
      }
      if (this.task_list[this.select].status == "进行中") {
        if (this.task_list[this.select].submitNumber <= 3) {
          this.$axios
            .post("projectTasks/changeStatus", {
              id: this.task_list[this.select].task_id
            })
            .then(() => {
              this.reload();
            });
        } else {
          this.$message.error("该任务提交次数已达上限");
        }
      } else {
        this.$message.error("该任务不能提交");
      }
    },
    selectIndex(seledctPanel) {
      this.select = seledctPanel;
    },
    getData() {
      this.$axios
        .post("projectTasks/findAllByUserId", {
          user_id: sessionStorage.getItem("User")
        })
        .then(res => {
          console.log(res);
          //alert(res.data.findByUserId.content[0].id);
          for (var i = 0; i < res.data.findByUserId.content.length; i++) {
            this.task_list.push({
              label: "任务（" + (i + 1) + "）",
              index: i,
              task_id: res.data.findByUserId.content[i].id,
              title: res.data.findByUserId.content[i].title, //任务名称
              project: res.data.findByUserId.content[i].project.name, //项目名称
              team: "11组", //小组名称
              createdate: res.data.findByUserId.content[i].createDate, //发布时间
              deadline: res.data.findByUserId.content[i].deadline, //交付时间
              status: res.data.findByUserId.content[i].status, //完成状态
              score: res.data.findByUserId.content[i].score, //任务得分
              content: res.data.findByUserId.content[i].content, //任务内容
              submitNumber: res.data.findByUserId.content[i].submitNumber
            });
          }
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
.dv1 {
  position: absolute;
  width: 1447px;
  height: 749px;
  left: 117px;
  top: 109px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
  text-align: center;
}

.bt1 {
  position: absolute;
  width: 80px;
  height: 30px;
  left: 35px;
  top: 37px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}

.dh {
  position: absolute;
  width: 92px;
  height: 30px;
  left: 79px;
  top: 107px;
  color: rgba(255, 92, 92, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
}

.wz {
  font-size: 20px;
  margin-left: -800px;
}

td {
  height: 45px;
}
</style>