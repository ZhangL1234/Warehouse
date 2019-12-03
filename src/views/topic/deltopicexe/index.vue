<template>
  <div class="Box">
    <div class="Title_left">{{topicname}}</div>
    <div class="Subject">
      <div
        v-for="item in tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :key="item.id"
      >
        <p style="margin-top:20px">{{item.title}}</p>
        <div style="margin-bottom:25px">
          <i
            class="el-icon-delete-solid"
            style="float: right; margin-top: -10px;margin-right: 20px;font-size: 20px;color: red"
            @click="del(item.id)"
          ></i>
        </div>
        <div class="answerdiv" v-for="(i,index) in item.answers" :key="index">
          <p>{{i.type}}.{{i.content}}</p>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3,]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        align="center"
        style="margin-top:20px"
      ></el-pagination>
    </div>
    <div class="ReturnButton1">
      <el-button type="danger" size="small" style="width:100px" @click="back">完成</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "deltopicexe",
  data() {
    return {
      input: "",
      topicname: "",
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 3 //    每页的数据
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
    //返回
    back() {
      this.$router.back();
    },
    //请求列表
    getlist() {
      const id = this.$route.params.id;
      this.topicname = sessionStorage.getItem("topicname");
      this.$axios({
        url: "question/list",
        method: "POST",
        data: {
          Liarary: {
            id: id
          }
        }
      })
        .then(res => {
          this.tableData = res.data.list;
          // console.log("列表", this.tableData);
        })
        .catch(() => {});
    },
    //删除
    del(id) {
      this.$axios({
        url: "question/delete",
        method: "POST",
        data: {
          id: id
        }
      })
        .then(() => {
          this.getlist();
        })
        .catch(() => {});
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style scoped>
.answerdiv {
  border: 1px solid #dbdbdb;
  margin-bottom: 5px;
  text-align: center;
  line-height: 30px;
}
.Box {
  width: 1040px;
  height: 600px;
  left: 117px;
  top: 80px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
  margin-left: 100px;
  margin-top: 10px;
  padding: 30px;
}
.ReturnButton1 {
  line-height: 50px;
  text-align: center;
  margin-top: 15%;
}
.Title_left {
  width: 80px;
  height: 30px;
  left: 160px;
  top: 146px;
  color: rgba(80, 80, 80, 1);
  font-size: 15px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.Subject {
  width: 700px;
  margin: 0 auto;
  margin-top: 30px;
  margin-left: 150px;
  float: left;
}
.Option {
  margin-top: 20px;
}
</style>