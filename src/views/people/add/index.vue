<template>
  <div class="con_rig_bottom">
    <h2 class="con_main_tit">新建小组</h2>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="form">
      <div class="task_select_box">
        <p class="con_rig_bottom_tit">小组名称：</p>
        <el-input placeholder="请输入小组名称" class="task_input" v-model="teamName" ></el-input>
      </div>
      <div class="task_select_box">
        <p class="con_rig_bottom_tit">请选择组员:</p>
        <div class="group-image">
          <!-- //checkbox -->
          <el-dialog
            title="请选择小组成员"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
          >
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedMembers" @change="handleCheckedMembersChange">
              <el-checkbox
                v-for="member in groupMembers"
                :key="member.value"
                :label="member.label"
                :value="member.value"
              >{{member.label}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
              <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
              <el-button type="primary" @click="makePlus">确 定</el-button>
            </span>
          </el-dialog>
          <!-- <div @click="dialogVisible=true"> -->
          <div @click="dialogVisible=true" >
            <img
              src="../../../assets/imgs/plusSign.svg"
              style="width:60px; height:60px;float:left;margin:5px;border-radius:100%;overflow:hidden;"
            />
          </div>
          <div @click="dialogVisible=true">
            <img  
              src="../../../assets/imgs/minusSign.svg"
              style="width:60px; height:60px;float:left;margin:5px;border-radius:100%;overflow:hidden;"
              :style="{display:controlMinus}"
            />
          </div>
          <div
            style="float:left;"
            v-for="item in newList"
            :key="item.id"
          >
            <img
              src="../../../assets/imgs/member.png"
              style="width:60px; height:60px;float:left;margin:5px;border-radius:100%;overflow:hidden;"
              alt
            />
            
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="task_select_box">
				<p class="con_rig_bottom_tit">选择组长：</p>
				<el-select v-model="leaderid" placeholder="请选择" class="task_select">
					<el-option v-for="item in newList" :key="item.value" :label="item.name" :value="item.id">
					</el-option>					
				</el-select>
      </div>
      <div class="btnstyle">
        <el-button
          type="primary"
          class="button"
          style="background-color: #909399;border-color:#909399 "
          @click="back"
        >返回</el-button>
        <el-button type="danger" class="button" @click="submit">确认发布</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "bjxz",
  inject: ["reload"],
  data() {
    return {
      controlMinus:'none',
      leaderid:'',
      isLeader: null,
      newList: [],
      //checkbox
      // checkAll: false,
      checkedMembers: [""],
      members: [],
      groupMembers:[],
      // isIndeterminate: true,
      addMembers: [],
      sumbitData: {
        team: {
          name: ""
        },
        users: []
      },
      dialogVisible: false,
      teamName: "",
      sta_nav_cor: 0,
      task_name: "",
      task_con: "",
      task_list: [],
      task_time: "",
      group_name: "",
      group_con: "",
      group_list: []
    };
  },
  methods: {


    ref() {
      this.$router.push("/sys/peopleList");
    },
    plusClick(){
      this.dialogVisible=true
      
    },
    makePlus(){
      this.dialogVisible=false
      
      this.controlMinus='inline'
    },
  
    submit() {
      this.sumbitData.team.name=this.teamName
      this.newList.map(res=>{
        // console.log(res);
        if(this.leaderid==res.id){
          this.sumbitData.users.push({
          user:{
            id:res.id,
            name:res.name
          },
          userType:'组长'
         })
        }
        else{
          this.sumbitData.users.push({
          user:{
            id:res.id,
            name:res.name
          },
          userType:'组员'
         })
        }      
      })
      console.log(this.sumbitData);
      

      this.$axios
      .post("/team/add", this.sumbitData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      this.$confirm('点击“确定”返回小组列表，点击“添加”继续添加', '小组添加成功！', {
          confirmButtonText: '确定',
          cancelButtonText: '添加',
          type: 'warning'
        }).then(() => {
          this.ref()
        }).catch(() => {   
          this.reload()              
        });     
    },
    //checkbox
    handleCheckedMembersChange(value) {
      // console.log(value)
      var aaa = value.slice(1);
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
      this.newList = newlist1;
      // console.log(this.newList);
      
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    back(){
      this.$router.back()
    }
  },
  created() {
    this.$axios.post("user/joinTeam", {}).then(res => {
      this.members = res.data.list.map(item => {
        return { value: item.id, label: item.name }
      });
    this.groupMembers=this.members
    // console.log(this.groupMembers);

    })
    
  }
};
</script>

<style scoped>
.demo {
  color: red;
}
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
/* .allimage img{
  width:60px; 
  height:60px;
  margin:5px;
  float: left;
  border-radius:100%;
  overflow:hidden;
} */
</style>
