<template>
  <div class="con_rig_bottom">
    <h2 class="con_main_tit">编辑小组</h2>
    <br />
    <br />
    <br />
    <br />
    <br />

    <div class="form">
      <div class="task_select_box">
        <p class="con_rig_bottom_tit">小组名称：</p>
        <el-input class="task_input" v-model="teamname"></el-input>
      </div>
      <!-- <div class="task_select_box">
                <p class="con_rig_bottom_tit">选择项目：</p>
                <el-select v-model="projectname" class="task_select">
                    <el-option
                            v-for="item in task_list"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
      </div>-->
      <div class="task_select_box">
        <p class="con_rig_bottom_tit">选择组长：</p>
        <el-select v-model="leadername" placeholder="请选择" class="task_select">
          <el-option v-for="item in sumList" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </div>
      <div class="task_select_box">
        <p class="con_rig_bottom_tit">小组成员:</p>
        <div class="group-image">
          <el-dialog
            title="请选择小组成员"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
          >
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedMembers" @change="handleCheckedMembersChange">
              <!-- 要添加的成员 -->
              <el-checkbox
                v-for="member in members"
                :key="member.value"
                :label="member.label"
                :value="member.value"
              >{{member.label}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="danger" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <div @click="dialogVisible = true">
            <img
              src="../../imgs/plusSign.svg"
              style=" width:60px; height:60px;float:left;margin:5px;border-radius:100%;overflow:hidden;"
            />
          </div>
          <div style="float:left;" v-for="(item,index) in sumList" :key="item.id">
            <div style="float:left;">
              <img
                src="../../imgs/2.png"
                style="width:60px; height:60px;float:left;margin:5px;border-radius:100%;overflow:hidden;"
                alt
              />
              <p>{{item.name}}</p>
            </div>
            <div style="float:left;">
              <img
                @click="del(item.id,index)"
                src="../../imgs/dele.png"
                style="width:20px; height:20px;float:left;margin:5px;border-radius:100%;overflow:hidden;"
                alt
              />
            </div>
          </div>
        </div>
      </div>
      <div class="btnstyle">
        <el-button
          @click="back"
          type="danger"
          class="button"
          style="background-color: #909399;border-color:#909399 "
        >返回</el-button>
        <el-button type="danger" class="button" @click="submit">确认修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// const memberOptions = [];
export default {
  name: "bjxz",
  data() {
    return {
      teamname: "",
      projectname: "",
      member: [],
      checkedMembers: [],
      members: [],
      dialogVisible: false,
      newList: [],
      mixMember: [],
      sumbitData: {
        team: {
          id: "",
          name: ""
        },
        users: []
      },
      leadername: "",
      input: "",
      sta_nav_cor: 0,
      task_name: "",
      task_con: "",
      task_list: [],
      task_time: "",
      group_name: "",
      group_con: "",
      group_list: [],
      group_time: "",

      fits: ["fill", "contain", "cover", "none", "scale-down"]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    del(id, index) {
      console.log(id);
      // console.log(index)
      this.$confirm("是否将其移出小组?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (index < this.member.length) {
            this.member.map((res, index) => {
              if (res.id == id) {
                this.member.splice(index, 1);
                this.members.push({ value: res.id, label: res.name });
              }
            });
            // console.log('tag', '')
            // this.$axios.post("teamGroup/deleteMember",{id:id}).then(item=>{})
          } else {
            this.newList.map((item, index) => {
              if (item.id == id) {
                this.newList.splice(index, 1);
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    submit() {
      // this.member.map(res=>{
      //     this.sumbitData.users.push({
      //     user:{
      // 	id:res.value,
      // 	name:res.label
      //     },
      //     })
      // })
      // console.log(this.sumbitData)
      this.sumbitData.team.id = this.editId;
      this.sumbitData.team.name = this.teamname;
      // this.sumList=[]
      this.sumList.map(item => {
        if (this.leadername == item.name) {
          this.sumbitData.users.push({
            user: {
              id: item.id,
              name: item.name
            },
            userType: "组长"
          });
        } else {
          this.sumbitData.users.push({
            user: {
              id: item.id,
              name: item.name
            },
            userType: "组员"
          });
        }
      });
      this.$axios
        .post("/team/update", this.sumbitData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      // console.log(this.sumbitData)
      this.$alert("小组修改成功！", {
        confirmButtonText: "确定"
      });
    },

    sta_nav_cli: function(param) {
      console.log(param);
      this.sta_nav_cor = param;
    },
    getInfo() {
      //  console.log(this.members)
      this.$axios
        .post("team/teamInfo", {
          id: this.editId
        })
        .then(res => {
          // console.log(res.data.members)
          this.teamname = res.data.team.name;
          res.data.members.map(i => {
            //this.member就是根据id显示的成员
            if (i.jobs == "组长") {
              this.leadername = i.user.name;
            }
            this.member.push({ id: i.user.id, name: i.user.name });
          });
        })
        .catch(() => {});
    },
    handleCheckedMembersChange(value) {
      // console.log(value)
      var aaa = value;
      // console.log(aaa)
      var newlist1 = [];
      aaa.map(item => {
        this.members.map(i => {
          if (item == i.label) {
            newlist1.push({
              id: i.value,
              name: i.label
            });
          }
        });
      });
      //this.newList就是要选完checkbox显示出的成员
      this.newList = newlist1;
      // console.log(this.newList)
      // console.log(this.sumList)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  },
  computed: {
    sumList() {
      return [...this.member, ...this.newList];
    }
  },
  created() {
    this.editId = this.$route.query.editId;
    // console.log(this.editId)
    this.getInfo();
    this.$axios.post("user/joinTeam", {}).then(res => {
      // console.log(res.data.list)
      this.members=res.data.list.map(item => {
     
      return { value: item.id, label: item.name }      
      });
    });
    // console.log(memberOptions)
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
  margin-top: 10px;
  width: 45%;
  margin-left: 10px;
}
.task_select_box {
  display: flex;

  margin-top: 10px;
}
.task_select_box img {
  vertical-align: middle;
}
.task_select {
  margin-top: 10px;
  width: 45%;
  margin-left: 10px;
}
.button {
  width: 20%;
  height: 40px;
  margin: 40px 20px 40px 20px;
}
.btnstyle{
  margin-top: 50px;
}
.group-image {
  width: 60%;
  height: 100px;
  margin-left: 25px;
}
</style>





