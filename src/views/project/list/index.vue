<template>
  <div id="frame">
    <div class="subcoat">
      <div class="project">项目列表</div>
      <div class="crew"></div>
      <!--<el-card class="box-card" body-style="padding:0px;">
            <div slot="header" class="clearfix">
                            <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
                <div class="text item" style="display:inline;text-align:left">
                    总项目
                </div>
                <div class="text item" style="display:inline">
                    已完成
                </div>
                <div class="text item" style="display:inline">
                    未完成
                </div>
                <br />
                <div v-for="item in quantity" :key="item" class="text item" style="display:inline;">
                    {{item}}
                </div>
      </el-card>-->
      <el-table
        :data="quantity"
        class="quantity"
        style="width: 483px;"
        size="mini"
        @cell-click="finished"
      >
        <el-table-column prop="total" label="总项目" width="161" align="center"></el-table-column>
        <el-table-column prop="finish" label="已完成" width="161" align="center"></el-table-column>
        <el-table-column prop="unfinished" label="未完成" width="161" align="center"></el-table-column>
      </el-table>
      <el-form ref="form" :model="form">
        <el-input class="seek" v-model="input" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
      </el-form>
      <el-button class="create" type="danger" @click="create_1">新建项目</el-button>
      <div class="details">
        <el-table
          :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width:100%;height:70%;overflow:scroll;"
        >
          <el-table-column prop="id" label="项目序号"></el-table-column>
          <el-table-column prop="name" label="项目"></el-table-column>
          <el-table-column prop="createDate" label="开始时间"></el-table-column>
          <el-table-column prop="deadline" label="截止时间"></el-table-column>
          <el-table-column prop="progress" label="项目进度"></el-table-column>
          <el-table-column prop="status" label="项目状态"></el-table-column>
          <el-table-column prop="size" label="任务数量"></el-table-column>
          <el-table-column prop="endTask" label="超时提醒">
            <template slot-scope="scope">
              <el-button
                type="success"
                icon="el-icon-check"
                circle
                size="mini"
                v-if="scope.row.endTask"
              ></el-button>
              <el-button type="danger" icon="el-icon-warning-outline" circle size="mini" v-else></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i class="el-icon-edit" @click="edit_1(scope.row.id)" style="color:blue"></i>
              <i
                class="el-icon-delete"
                @click="delete_1(scope.row,scope.$index)"
                style="color:blue"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 7, 9]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
          align="center"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "list",
  data() {
    let identity = sessionStorage.getItem("UserId");
    console.log(identity);
    if (sessionStorage.getItem("UserCharacter") == "管理员") {
      this.$axios.post("project/list", {}).then(back => {
        console.log("返回值:", back);
      });
      this.$axios.post("project/list", {}).then(back => {
        let i, j;
        for (i = 0; i < back.data.list.length; i++) {
          this.tableData.push({
            id: back.data.list[i].id,
            name: back.data.list[i].name,
            description: back.data.list[i].description,
            members: [],
            members_name: [],
            createDate: back.data.list[i].createDate,
            deadline: back.data.list[i].deadline,
            teams: [],
            progress: back.data.list[i].progress,
            status: back.data.list[i].status,
            size: back.data.list[i].size,
            endTask: back.data.list[i].endTask
          });
        }
        for (i = 0; i < back.data.list.length; i++) {
          for (j = 0; j < back.data.list[i].users.length; j++) {
            this.tableData[i].members.push({
              id: back.data.list[i].users[j].id,
              name: back.data.list[i].users[j].name
            });
            if (j != back.data.list[i].users.length - 1) {
              this.tableData[i].members_name.push(
                back.data.list[i].users[j].name + ","
              );
            } else {
              this.tableData[i].members_name.push(
                back.data.list[i].users[j].name
              );
            }
          }
        }
      });
    } else if (sessionStorage.getItem("UserCharacter") == "项目经理") {
      this.$axios
        .post("project/findProjectsByUserId", { user_id: identity })
        .then(back => {
          console.log(back);
        });
      this.$axios
        .post("project/findProjectsByUserId", { user_id: identity })
        .then(back => {
          let i, j;
          for (i = 0; i < back.data.findProjectsByUserId.content.length; i++) {
            this.tableData.push({
              id: back.data.findProjectsByUserId.content[i].id,
              name: back.data.findProjectsByUserId.content[i].name,
              description:
                back.data.findProjectsByUserId.content[i].description,
              members: [],
              members_name: [],
              createDate: back.data.findProjectsByUserId.content[i].createDate,
              deadline: back.data.findProjectsByUserId.content[i].deadline,
              teams: [],
              progress: back.data.findProjectsByUserId.content[i].progress,
              status: back.data.findProjectsByUserId.content[i].status,
              size: back.data.findProjectsByUserId.content[i].size,
              endTask: back.data.findProjectsByUserId.content[i].endTask
            });
          }
          for (i = 0; i < back.data.findProjectsByUserId.content.length; i++) {
            for (
              j = 0;
              back.data.findProjectsByUserId.content[i].users != null &&
              j < back.data.findProjectsByUserId.content[i].users.length;
              j++
            ) {
              this.tableData[i].members.push({
                id: back.data.findProjectsByUserId.content[i].users[j].id,
                name: back.data.findProjectsByUserId.content[i].users[j].name
              });
              if (
                j !=
                back.data.findProjectsByUserId.content[i].users.length - 1
              ) {
                this.tableData[i].members_name.push(
                  back.data.findProjectsByUserId.content[i].users[j].name + ","
                );
              } else {
                this.tableData[i].members_name.push(
                  back.data.findProjectsByUserId.content[i].users[j].name
                );
              }
            }
          }
        });
    } else {
      alert("您没有权限!");
      this.$router.push("/sys_home");
    }
    this.$axios.post("team/list", {}).then(back => {
      console.log("返回值:", back);
    });
    this.$axios.post("team/list", {}).then(back => {
      let m;
      for (m = 0; m < back.data.list.length; m++) {
        this.all_groups.push({
          id: back.data.list[m].id,
          createDate: back.data.list[m].createDate,
          name: back.data.list[m].name
        });
      }
    });
    if (sessionStorage.getItem("UserCharacter") == "管理员") {
      this.$axios
        .post("/project/findAllProjectSize", { id: identity })
        .then(back => {
          this.quantity.push({
            total: back.data.projectSize.allSize,
            finish: back.data.projectSize.doneSize,
            unfinished: back.data.projectSize.undoneSize
          });
        });
    } else {
      this.$axios
        .post("/project/findProjectSizeByStatus", { id: identity })
        .then(back => {
          this.quantity.push({
            total: back.data.projectSize.allSize,
            finish: back.data.projectSize.doneSize,
            unfinished: back.data.projectSize.undoneSize
          });
        });
    }
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      tableData: [],
      form: {
        id: "",
        name: "",
        description: "",
        createDate: "",
        deadline: "",
        progress: "",
        status: "",
        size: "",
        endTask: "",
        delivery: false
      },
      all_groups: [],
      objUser: {},
      index: 0,
      formLabelWidth: "120px",
      value1: [],
      value2: [],
      value3: [],
      value4: [],
      value5: [],
      value6: [],
      value7: [],
      value8: [],
      sub_groups: [],
      quantity: [],
      input: ""
    };
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      // console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage); //点击第几页
    },
    edit_1(id) {
      this.$router.push("/project/edit/" + id);
    },
    create_1() {
      this.$router.push("/project/add");
    },
    show_1() {
      this.sub_groups = [];
      this.value3 = [];
      let i, j;
      for (i = 0; i < this.value1.length; i++) {
        this.$axios
          .post("teamGroup/teamMembers", { id: this.value1[i] })
          .then(back => {
            for (j = 0; j < back.data.teamMembers.length; j++) {
              this.sub_groups.push({
                id: back.data.teamMembers[j].user.id,
                name: back.data.teamMembers[j].user.name
              });
            }
          });
      }
    },
    show_2() {
      this.sub_groups = [];
      this.value7 = [];
      let i, j;
      for (i = 0; i < this.value5.length; i++) {
        this.$axios
          .post("teamGroup/teamMembers", { id: this.value5[i] })
          .then(back => {
            for (j = 0; j < back.data.teamMembers.length; j++) {
              this.sub_groups.push({
                id: back.data.teamMembers[j].user.id,
                name: back.data.teamMembers[j].user.name
              });
            }
          });
      }
      this.objUser.members = this.sub_groups;
      console.log(this.value7);
    },
    delete_1(user, index) {
      // 删除功能
      this.$message({
        showClose: true,
        message: "恭喜您,删除成功!",
        type: "success"
      });
      console.log(user.id);
      this.$axios.post("project/delete", {
        /*description: newObj.project,*/ id: this.tableData[index].id
      });
      location.reload();
    },
    finished() {
      this.$router.push("/project/finished");
      console.log("1");
    }
  },
  computed: {
    tables() {
      // 模糊搜索功能
      const keyword = this.input;
      if (keyword) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.tableData.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(keyword) > -1
            );
          });
        });
      }
      return this.tableData;
    }
  }
};
</script>

<style scoped>
#frame {
  width: 1447px;
  height: 749px;
  left: 117px;
  top: 109px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
  margin: auto;
}

.project {
  width: 80px;
  height: 30px;
  left: 35px;
  top: 37px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  position: absolute;
}
.details {
  width: 1222px;
  height: 587px;
  left: 109px;
  top: 255px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 15px;
  line-height: 160%;
  text-align: left;
  position: absolute;
}

.create {
  width: 109px;
  height: 37px;
  left: 1219px;
  top: 174px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 92, 92, 1);
  line-height: 150%;
  text-align: center;
  position: absolute;
}

.seek {
  width: 557px;
  height: 35px;
  left: 632px;
  top: 174px;
  text-indent: 10px;
  color: rgba(176, 176, 176, 1);
  border-radius: 18px;
  font-size: 12px;
  line-height: 150%;
  text-align: left;
  position: absolute;
}

.box-card {
  width: 482px;
  height: 35px;
  left: 103px;
  top: 174px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.17142857142857137);
  text-align: center;
  position: absolute;
}

.subcoat {
  position: relative;
}

.quantity {
  width: 282px;
  height: 72px;
  left: 103px;
  top: 140px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.17142857142857137);
  text-align: center;
  position: absolute;
}
</style>