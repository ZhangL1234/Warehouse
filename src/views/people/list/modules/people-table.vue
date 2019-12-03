<template>
  <div class="table-wrapper">
    <div class="filter-container">
      <el-input
        class="filter-item filter-input"
        size="small"
        prefix-icon="el-icon-search"
        v-model="keyword"
        placeholder="搜索"
        type="text"
      ></el-input>
      <!-- 小组详情 -->
      <el-button
        @click="detail"
        type="warning"
        size="small"
        style="margin-right:10px;background-color:#2a82e4;border-color:#2a82e4 "
      >小组详情</el-button>
      <el-button
        @click="result"
        type="danger"
        size="small"
        style="margin-right:10px;background-color:#00baad;border-color:#00baad"
      >评测管理</el-button>
      <!-- 编辑小组 -->
      <el-button
        @click="edit"
        type="danger"
        size="small"
        style="margin-right:10px;background-color:#f19651;border-color:#f19651"
      >编辑小组</el-button>
      <!-- 新建小组 -->
      <el-button
        @click="add"
        type="danger"
        size="small"
        style="margin-right:10px;background-color:#ff5c5c;border-color:#ff5c5c"
      >添加小组</el-button>
    </div>
    <h1 class="title">人员列表</h1>
    <template>
      <el-table
        :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%;"
      >
        <el-table-column label="姓名" prop="userName" align="center"></el-table-column>
        <el-table-column label="用户名" prop="userAccount" align="center"></el-table-column>
        <el-table-column label="手机号码" prop="userPhone" align="center"></el-table-column>
        <el-table-column label="学习进度" prop="taskProgress" align="center"></el-table-column>
        <el-table-column label="进行项目" prop="projectName" align="center"></el-table-column>
        <el-table-column label="进行任务" prop="taskTitle" align="center"></el-table-column>
        <el-table-column label="职位" prop="memberJob" align="center"></el-table-column>
        <el-table-column label="评测结果" prop="type" align="center"></el-table-column>
        <el-table-column label="评估结果" prop="result" align="center"></el-table-column>
        <el-table-column label="任务评价详情" align="center" >
          <template  slot-scope="scope">
            <el-button type="text" @click="personal(scope.row.user_id)">详情</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="回访记录" align="center">
          <template slot-scope="scope">
            <el-button @click="history(scope.row.user_id)" type="text">详情</el-button>
          </template>
        </el-table-column>-->
        <el-table-column label="超时提醒">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              size="mini"
              v-if="scope.row.deadline"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-warning-outline"
              circle
              size="mini"
              v-if="!scope.row.deadline"
            ></el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">
              <i class="el-icon-edit" @click="hrefbjxz(scope.row.id)"></i>
            </el-button>
            <el-button type="text">
              <i class="el-icon-delete" @click="handleDelete(scope.row.user_id)"></i>
            </el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 7, 9]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
        align="center"
      ></el-pagination>
    </template>
  </div>
</template>
<script>
export default {
  name: "people-table",
  components: {
    // ITable
  },
  props: {
    projectId: {
      // type: Number | String,
      required: true
    }
  },

  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      list: [],
      newlist: [],
      keyword: "",
      param: {},
      icontime: true,
      Assessment: "详情"
    };
  },
  watch: {
    projectId: {
      handler(newVal) {
        this.getTaskList(newVal, this.searchName);
      },
      immediate: true
    }
  },
  mounted() {
    // this.getTeamList();
  },
  computed: {
    tables() {
      // 模糊搜索功能
      const search = this.keyword;
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.list.filter(data => {
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
                // .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.list;
    }
  },
  methods: {
    //详情、编辑、添加、评测
    detail() {
      // console.log(projectId)
      this.$router.push({
        path: "/sys/peopleManage/index",
        query: {
          projectId: this.projectId
        }
      });
    },
    edit() {
      // console.log(this.editId)
      this.$router.push({
        path: "/sys/peopleEdit/index",
        query: {
          editId: this.projectId
        }
      });
    },
    add() {
      this.$router.push("/sys/peopleDetail");
    },
    personal(user_id) {
      console.log("kankank",user_id)
      this.$router.push({
        name: "mantask",
        path: "/sys/task/mantask/index",
        params:{
          user_id
        }
      });
    },
    result() {
      this.$router.push("/sys/results_manager");
    },
    //回访记录
    // history(id) {
    //   this.$router.push({
    //     name: "track-history",
    //     params: {
    //       id
    //     }
    //   })
    // },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      // console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage); //点击第几页
    },
    // // 姓名过滤
    // handleSearch(value) {
    //   var newlist = [];
    //   this.keyword = value;
    //   // console.log("关键字", this.keyword);
    //   this.list.forEach(item => {
    //     if (item.userName.indexOf(this.keyword) != -1) {
    //       newlist.push(item);
    //     }
    //   });
    //   // console.log("输出", newlist);
    //   return newlist;
    //   // debounce(this.getTaskList, 1000)();
    //   // debounce(this.getTeamList, 1000)();
    // },
    // 请求列表
    getTaskList() {
      // console.log("项目id：", this.projectId);
      setTimeout(() => {
        this.$axios({
          url: "teamGroup/teamManage",
          method: "POST",
          data: {
            id: this.projectId
          }
        })
          .then(res => {
            this.list = res.data.list.reverse();
            console.log("成员----", this.list);
          })
          .catch(() => {});
      }, 1000);
    }
    // // 删除
    // handleDelete(id) {
    //   // console.log(id);
    //   this.$axios({
    //     url: "teamGroup/deleteMember",
    //     method: "POST",
    //     data: {
    //       id: id
    //     }
    //   })
    //     .then(() => {
    //       // console.log(res);
    //     })
    //     .catch(() => {});
    // }
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
    text-align: center;
    .filter-item {
      margin-right: 25px;
    }
    .filter-input {
      width: 50%;
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