<template>
  <div class="con_wrap">
    <div class="con_left">
      <!-- 左上用户即统计 -->
      <div class="con_let_top">
        <div class="con_let_main">
          <div>
            <h2 class="con_main_tit">{{username}}，{{hoursTip}}</h2>
            <h3 class="con_main_time">{{nowtime}}</h3>
          </div>
          <div class="con_let_top_list">
            <div>
              <p>总人数</p>
              <p>{{homenum.总人数}}</p>
            </div>
            <div>
              <p>项目数量</p>
              <p>{{homenum.项目数量}}</p>
            </div>
            <div>
              <p>项目完成度</p>
              <p>{{homenum.项目完成度}}</p>
            </div>
            <div>
              <p>总任务量</p>
              <p>{{homenum.总任务量}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 左下项目统计 -->
      <div class="con_let_bott">
        <h2 class="con_main_tit">项目统计</h2>
        <div class="con_let_bott_main">
          <div class="con_let_bott_lef">
            <div class="con_let_bott_nav">
              <table>
                <thead></thead>
                <tbody>
                  <tr
                    v-for="(item,index) in projectlist"
                    :key="index"
                    @click="changSemester(index)"
                    :class="{red:i===index}"
                  >
                    <th>{{item.name}}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="con_let_bott_rig">
            <template v-for="(item,index) in projectlist">
              <div v-if="index == i" :key="index">
                <!-- 圆环饼图 -->
                <div class="chart_box">
                  <el-progress type="circle" :percentage="Number(item.progress)" :stroke-width="16"></el-progress>
                  <h3>项目完成度</h3>
                </div>
                <br />
                <div class="con_let_bott_rig_lis">
                  <div>
                    <h5>项目小组</h5>
                    <h4>{{item.name}}</h4>
                  </div>
                  <div>
                    <h5>项目进度</h5>
                    <h4>{{item.status}}</h4>
                  </div>
                  <div>
                    <h5>任务数量</h5>
                    <h4>{{item.projectSize}}</h4>
                  </div>
                  <div>
                    <h5>剩余工期</h5>
                    <h4>{{item.endDate}}</h4>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="con_right">
      <!-- 右上日志 -->
      <div class="con_rig_top">
        <h2 class="con_main_tit">日志</h2>
        <div class="con_rig_top_list">
          <div v-for="item in journal" :key="item.id">
            <p>{{item.tiem}}</p>
            <div class="yuan"></div>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
      <!-- 右下新建任务 -->
      <div class="con_rig_bottom">
        <h2 class="con_main_tit">任务管理</h2>
        <div>
          <p class="con_rig_bottom_tit">
            我发起的任务
            <span>{{mytasknum}}</span>
          </p>
        </div>
        <div>
          <p class="con_rig_bottom_tit">新建任务</p>
          <el-form
            ref="form"
            :model="addtaskform"
            label-width="80px"
            size="mini"
            style="margin-top:10px"
          >
            <el-form-item label="任务名称" prop="title">
              <el-input v-model="addtaskform.title"></el-input>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectid">
              <el-select
                v-model="addtaskform.projectid"
                placeholder="请选择项目"
                @change="getgroupuser()"
              >
                <el-option
                  v-for="project in projectlist"
                  :key="project.id"
                  :label="project.name"
                  :value="project.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="选择小组" prop="teamId">
              <el-select v-model="addtaskform.teamId" placeholder="请选择小组" @change="getgroupuser()">
                <el-option v-for="team in group" :key="team.id" :label="team.name" :value="team.id"></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item label="完成时间" prop="deadtime">
              <el-col>
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="addtaskform.deadtime"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="指派人" prop="userid">
              <el-select v-model="addtaskform.userid" placeholder="请选择">
                <el-option
                  v-for="item in groupuser"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务内容" prop="content">
              <el-input type="textarea" v-model="addtaskform.content"></el-input>
            </el-form-item>
            <el-form-item label="上传文件">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://upload-z2.qiniup.com"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-remove="beforeRemove"
                :before-upload="beforeUpload"
                multiple
                :data="tokens"
                :limit="9"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="mini">选取文件</el-button>
                <el-button
                  style="margin-left: 10px;"
                  size="mini"
                  @click="submitUpload"
                  icon="el-icon-upload2"
                >上传到服务器</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-form-item>
            <el-button type="danger" @click="Addtask" style="width:80%;margin-left:10%">确认发布</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as qiniu from "qiniu-js";
export default {
  name: "MainContent",
  data() {
    return {
      j: 0,
      nowtime: "", //当前时间
      hoursTip: "", //问候语
      username: "", //用户名
      mytasknum: "", //我发布的任务数量
      homenum: [], //项目数量
      projectlist: [], //项目列表
      complete: "", //项目完成度
      group: [], //小组
      groupuser: [], //小组成员
      tokens: {
        token: "",
        key: ""
      }, //上传密钥token
      fileurl: [], //文件链接
      fileurl1: "", //文件链接
      addtaskform: {
        //新建任务form表单
        projectid: "",
        title: "",
        deadtime: "",
        userid: "",
        content: ""
      },
      i: 0,
      journal: [
        { tiem: "10月14日 09:12", content: "小王登录系统" },
        { tiem: "10月14日 14:20", content: "小王开始做任务" },
        { tiem: "10月14日 15:56", content: "创建项目" },
        { tiem: "10月14日 16:30", content: "小王登录系统" }
      ],
      fileList: [],
      //验证规则
      rules: {
        projectid: [
          {
            required: true,
            message: "请选择项目",
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: "请输入任务名称"
          }
        ],
        teamId: [
          {
            required: true,
            message: "请选择小组",
            trigger: "change"
          }
        ],
        deadtime: [
          {
            required: true,
            message: "请选择时间"
          }
        ],
        userid: [
          {
            required: true,
            message: "请选择小组成员",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入内容"
          }
        ]
      }
    };
  },
  methods: {
    //上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview() {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file) {
      // console.log();
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //随机数
    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    //将随机数转化为可以用的字符串Key
    getkey() {
      return (
        this.S4() +
        this.S4() +
        "-" +
        this.S4() +
        "-" +
        this.S4() +
        "-" +
        this.S4() +
        "-" +
        this.S4() +
        this.S4() +
        this.S4()
      );
    },
    //上传之前用来获取新的Key
    beforeUpload() {
      this.tokens.key = this.getkey()
    },
    handleError(err, file) {
      this.$message.error(` ${file.name} 上传失败`);
    },
    handleSuccess(response) {
      // console.log(response.key);
      this.fileurl1 = response.key;
      this.fileurl[this.j] = "http://q0sl0prbf.bkt.clouddn.com/" + this.fileurl1;
      this.j++;
      // this.gettoken();
    },
    //单击改变字体颜色
    changSemester(index) {
      this.i = index;
    },
    // 获取当前时间并判断上午下午晚上
    getTime() {
      setInterval(() => {
        //new Date() new一个data对象，当前日期和时间
        //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        this.nowtime = new Date().toLocaleString();
      }, 1000);
      let self = this;

      let date = new Date();

      if (date.getHours() >= 0 && date.getHours() < 12) {
        self.hoursTip = "上午好";
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        self.hoursTip = "下午好";
      } else {
        self.hoursTip = "晚上好";
      }
    },
    //获取登录用户信息
    getusername() {
      let userid = sessionStorage.getItem("UserId");
      setTimeout(() => {
        this.$axios({
          url: "user/userInfo",
          method: "POST",
          data: {
            id: userid
          }
        })
          .then(res => {
            // console.log("用户信息--", res);
            this.username = res.data.user.name;
            this.mytasknum = res.data.tasksize;
          })
          .catch(() => {});
      });
    },
    // 获取首页左上角数量
    gethomenum() {
      setTimeout(() => {
        this.$axios({
          url: "/home/query",
          method: "POST",
          data: {}
        })
          .then(res => {
            console.log("项目数量--", res);
            this.homenum = res.data.获取数据成功;
          })
          .catch(() => {});
      });
    },
    // 获取项目列表
    getprojectlist() {
      if (sessionStorage.getItem("UserCharacter") == "管理员") {
        this.$axios({
          url: "/project/list",
          method: "POST",
          data: {}
        })
          .then(res => {
            //  console.log("项目列表--", res);
            this.projectlist = res.data.list;
          })
          .catch(() => {});
      } else {
        let userid = sessionStorage.getItem("UserId");
        setTimeout(() => {
          this.$axios({
            url: "project/findProjectsByUserId",
            method: "POST",
            data: {
              user_id: userid
            }
          })
            .then(res => {
              // console.log("项目列表--", res);
              this.projectlist = res.data.findProjectsByUserId.content;
            })
            .catch(() => {});
        });
      }
    },
    //获取选中项目组成员列表
    getgroupuser() {
      setTimeout(() => {
        this.$axios({
          url: "project/findUserByProjectId",
          method: "POST",
          data: {
            id: this.addtaskform.projectid
          }
        })
          .then(res => {
            // console.log(res)
            this.groupuser = res.data.findUserByProjectId;
            // console.log("小组成员列表--", this.groupuser);
          })
          .catch(() => {});
      });
    },
    //发布任务
    Addtask() {
      // console.log(this.fileurl); 
      this.$axios({
        url: "/projectTasks/add",
        method: "POST",
        data: {
          project: {
            id: this.addtaskform.projectid
          },
          title: this.addtaskform.title,
          content: this.addtaskform.content,
          user: {
            id: this.addtaskform.userid
          },
          deadline: this.addtaskform.deadtime,
          fileUrl: this.fileurl
        }
      })
        .then(() => {
          // console.log("结果", res);
          this.$message.success("添加成功");
          setTimeout(() => {
            this.$router.push("/sys/taskList");
          }, 1500);
        })
        .catch(() => {});
    },
    //获取token密钥
    gettoken() {
      this.$axios({
        url: "Upload/upToken",
        method: "POST",
        data: {}
      })
        .then(res => {
          // console.log("then", res);
          this.tokens = res.data.getToken;
          // console.log(this.token);
        })
        .catch(() => {});
    },
    gettasknum() {
      this.$axios.post("projectTasks/findSize");
    }
  },
  mounted() {
    this.getTime();
    this.getusername();
    this.gethomenum();
    this.getprojectlist();
    this.gettoken();
  }
};
</script>

<style scoped>
.con_wrap {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.con_left {
  width: 67%;
}
.con_wrap > div > div {
  width: 100%;
  padding: 31px;
  background: #fff;
  box-sizing: border-box;
}

.con_main_tit {
  font-size: 20px;
  color: rgba(80, 80, 80, 1);
  font-weight: bold;
}
.con_main_time {
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
}
.con_let_top_list {
  width: 90%;
  height: 35%;
  margin: 35px auto;
  display: flex;
  justify-content: space-between;
}
.con_let_top_list > div {
  width: 25%;
  text-align: center;
}
.con_let_top_list > div > p:nth-child(1) {
  font-size: 18px;
  color: rgba(80, 80, 80, 1);
}
.con_let_top_list > div > p:nth-child(2) {
  font-size: 42px;
  color: rgba(80, 80, 80, 1);
  display: block;
  margin-top: 10px;
}
.con_let_bott {
  margin-top: 25px;
  height: 65%;
}
.con_let_bott_lef {
  margin-top: 30px;
  width: 20%;
  height: 325px;
  /* 控制表格高度 */
  overflow-x: hidden;
  border-right: 1px solid rgba(153, 153, 153, 1);
}

.con_let_bott_main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.con_let_bott_nav {
  width: 100%;
}
.con_let_bott_nav > table {
  width: 100%;
  margin: 5px 0;
  font-size: 15px;
  /* 左下角列表字体 */
  line-height: 150%;
  color: rgba(153, 153, 153, 1);
  padding: 0 5px;
  box-sizing: border-box;
}
.con_let_bott_nav > div:nth-child(1) {
  margin: 0;
  margin-bottom: 20px;
}
.con_let_bott_nav > .sta_nav_cor {
  color: rgba(255, 92, 92, 1);
  border-left: 5px solid rgba(255, 92, 92, 1);
  padding: 0 35px;
}
.red {
  color: rgba(255, 92, 92, 1);
  border-left: 5px solid rgba(255, 92, 92, 1);
  padding: 0 35px;
}
.con_let_bott_rig {
  width: 80%;
}
.chart_box {
  margin: 0 auto;
  text-align: center;
}
.chart_box h3 {
  font-size: 19px;
  color: rgba(157, 157, 157, 1);
  font-weight: normal;
}
.con_let_bott_rig_lis > div {
  margin-left: 5%;
  width: 25%;
}
.con_let_bott_rig_lis h4 {
  font-size: 15px;
  /* 左下读取显示的主内容区字体 */
}
.con_let_bott_rig_lis h5 {
  margin-bottom: 15px;
  font-size: 15px;
  font-weight: normal;
  color: rgba(157, 157, 157, 1);
  /* 左下角主内容区字体 */
}
.con_let_bott_rig_lis {
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-top: 35px;
}
.con_right {
  width: 30%;
}
.con_rig_top_list {
  margin-top: 20px;
}
.con_rig_top_list > div {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.con_rig_top_list > div > p {
  font-size: 14px;
  color: rgba(157, 157, 157, 1);
  padding: 0 10px;
}
.con_rig_top_list > div > p:nth-child(1) {
  padding-left: 0;
}
.yuan {
  width: 5px;
  height: 5px;
  background: rgba(157, 157, 157, 1);
  border-radius: 50%;
}
.con_rig_bottom {
  margin-top: 25px;
}
.con_rig_bottom_tit {
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.con_rig_bottom_tit span {
  font-size: 33px;
  font-weight: bold;
  margin-left: 30px;
}
.form {
  width: 90%;
  margin: 0 auto;
}
.task_input {
  margin-top: 10px;
}
.task_select_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.task_select {
  width: 75%;
}
.button {
  width: 100%;
  height: 55px;
  margin-top: 70px;
}
.fHeader {
  background: lightblue;
  position: fixed;
  top: 0;
}
[v-cloak] {
  display: none;
}
</style>
