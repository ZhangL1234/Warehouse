<template>
  <div class="Box">
    <div class="Title">题库列表</div>

    <!--            列表title-->
    <div style="margin-left:10%">
      <el-table :data="tableData" style="width: 100%;" :show-header="false">
        <el-table-column prop="name" align="center" width="150"></el-table-column>
        <el-table-column prop="introduction" align="center" width="400"></el-table-column>
        <el-table-column prop="operation" align="center" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-edit"
              style="width: 30px;color:red"
              @click="Jump(scope.row.id,scope.row.name)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ReturnButton">
      <el-button size="small" @click="del" style="width:100px">删除题组</el-button>
      <el-button type="danger" size="small" @click="add" style="width:100px;margin-left:30px">添加题组</el-button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [], //题库列表
      formLabelWidth: "120px",
      userIndex: 0
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //请求列表
    getlist() {
      this.$axios({
        url: "library/list",
        method: "POST",
        data: {}
      })
        .then(res => {
          this.tableData = res.data.list.content;
          console.log("列表", this.tableData);
        })
        .catch(() => {});
    },
    //删除
    del() {
      this.$router.push("/sys/deltopic");
    },
    //新建
    add() {
      this.$router.push("/sys/addtopic");
    },
    //跳转题组列表
    Jump(id,name) {
      sessionStorage.setItem("topicname",name); //存入 参数： 1.调用的值 2.所要存入的数据
      // console.log(id,name)
      this.$router.push({
          name:"topicexe",
          params:{
              id
          }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.Box {
  width: 1040px;
  height: 700px;
  padding: 0 30px;
  margin: 0 auto;
  background-color: white;
}
.Title {
  width: 240px;
  height: 70px;
  line-height: 70px;
  font-weight: bold;
  /*border: 1px green solid;*/
  margin: 10px 0;
}
.ReturnButton {
  width: 900px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  float: left;
  /*border: 1px palevioletred solid;*/
  margin-top: 10px;
}
.ReButton {
  height: 45px;
  width: 100px;
}

.el-row {
  margin-bottom: 20px;
}
:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.RowTitle {
  height: 60px;
  background-color: #42b983;
  line-height: 60px;
}
.ReturnButton {
  width: 900px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  float: left;
  /*border: 1px palevioletred solid;*/
  margin-top: 30px;
}
</style>