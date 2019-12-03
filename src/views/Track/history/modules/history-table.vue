<template>
  <div class="table-wrapper">
    <div class="filter-container">
      <el-input
        class="filter-item filter-input"
        size="small"
        prefix-icon="el-icon-search"
        v-model="keyword"
        placeholder="搜索"
        @input="handleSearch"
        type="text"
      ></el-input>
      <!-- 新建小组 -->
      <el-button
        type="danger"
        size="small"
        @click="add"
        style="margin-left:10px;background-color:#ff5c5c;border-color:#ff5c5c"
      >添加人员</el-button>
    </div>
    <h1 class="title">人员列表</h1>
    <template>
      <table style="width: 100%" class="table1">
        <thead>
          <tr>
            <th>姓名</th>
            <th>用户名</th>
            <th>手机号码</th>
            <th>毕业时间</th>
            <th>工作地点</th>
            <th>最近回访时间</th>
            <th>职位</th>
            <th>回访记录</th>
            <th>建议</th>
            <th>工作内容介绍</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in handleSearch(keyword)" :key="item.id">
            <td>{{item.user.name}}</td>
            <td>{{item.user.account}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.user.createDate}}</td>
            <td>{{item.workingPlace}}</td>
            <td>{{item.createDate}}</td>
            <td>{{item.position}}</td>
            <td>{{Assessment}}</td>
            <td>{{item.advice}}</td>
            <td>{{item.jobContent}}</td>
            <td>
              <div>
                <el-button type="text">
                  <i class="el-icon-edit" @click="edit(item.id)"></i>
                </el-button>
                <el-button type="text">
                  <i class="el-icon-delete" @click="handleDelete(item.id)"></i>
                </el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
<script>
export default {
  name: "history-table",
  components: {
    // ITable
  },

  data() {
    return {
      list: [],
      newlist: [],
      keyword: "",
      param: {},
      icontime: true,
      Assessment: "详情"
    };
  },
  created() {
    this.getTaskList();
  },
  methods: {
    // 姓名过滤
    handleSearch(value) {
      var newlist = [];
      this.keyword = value;
      // console.log("关键字", this.keyword);
      this.list.forEach(item => {
        if (item.user.name.indexOf(this.keyword) != -1) {
          newlist.push(item);
        }
      });
      // console.log("输出", newlist);
      return newlist;
      // debounce(this.getTaskList, 1000)();
      // debounce(this.getTeamList, 1000)();
    },
    // 请求列表
    getTaskList() {
      const id = this.$route.params.id;
      setTimeout(() => {
        this.$axios({
          url: "tracking/list",
          method: "POST",
          data: {
            user:{
              id: id
            }
          }
        })
          .then(res => {
            this.list = res.data.list.content;
            //  console.log("成员----", this.list);
          })
          .catch(() => {});
      });
    },
    // 删除
    handleDelete(id) {
      // console.log(id)
      this.$axios({
        url: "tracking/delete",
        method: "POST",
        data: {
          id: id
        }
      })
        .then(() => {
          //  console.log(res);
          this.getTaskList();
        })
        .catch(() => {
          this.getTaskList();
        });
    },
    //新建
    add() {
      this.$router.push({
        name: "track-add"
      });
    },
    //编辑
    edit(id) {
      this.$router.push({
        name: "track-edit",
        params: {
          id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.table-wrapper {
  margin: 0 15px;
  .title {
    line-height: 25px;
    margin-bottom: 15px;
    font-weight: normal;
    margin-top: 10px;
    font-size: 15px;
  }
  .filter-container {
    padding-left: 5%;
    margin-left: 0%;
    .filter-item {
      margin-right: 25px;
    }
    .filter-input {
      width: 80%;
      /deep/input {
        border-radius: 35px;
      }
    }
  }
}
.table1 {
  text-align: center;
}
</style>