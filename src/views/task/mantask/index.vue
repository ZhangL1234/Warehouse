<template>
  <div class="app-container app-panel">
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
        <!-- <el-button type="warning" size="small" @click="Situation">任务情况</el-button> -->
        <el-button type="danger" size="small" @click="handleAdd">添加任务</el-button>
      </div>
      <h1 class="title">任务列表</h1>
      <i-table
        :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :columns="columns"
        size="small"
      >
        <template v-slot:look="{scope}">
          <el-button type="text" size="small" @click="handleDetails(scope.row.id)">详情</el-button>
        </template>
        <template v-slot:action="{scope}">
          <div>
            <!-- <el-button type="text">
            <i class="el-icon-edit" @click="handleEdit(scope.row.id)"></i>
            </el-button>-->
            <el-button type="text">
              <i class="el-icon-delete" @click="handleDelete(scope.row.id)"></i>
            </el-button>
          </div>
        </template>
      </i-table>
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
    </div>
  </div>
</template>
<script>
import { columns } from "./data";
import ITable from "_c/ITable";
export default {
  name: "mantask",
  components: {
    ITable
  },
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      columns,
      list: [],
      keyword: "",
      user_id: ""
    };
  },
  // watch: {
  //   userId: {
  //     handler(newVal) {
  //       this.getTaskList(newVal, this.searchName);
  //     },
  //     immediate: true
  //   }
  // },
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
  created() {
    this.getTaskList();
    //  console.log("hdhdhd",this.$route.params.user_id)
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    getTaskList() {
      const id = this.$route.params.user_id;
      console.log("hdhdhd", this.$route.params.user_id);
      this.list = [];
      this.$axios({
        url: "/projectTasks/findAllByUserId",
        method: "POST",
        data: {
          user_id: id
        }
      }).then(res => {
        console.log(res);
        let {
          data: {
            findByUserId: { content }
          }
        } = res;

        content.map(item => {
          this.list.push({
            name: item.title,
            project: item.project.name,
            status: item.status,
            score: item.score,
            id: item.id
          });
        });
      });
    },
    handleAdd() {
      this.$router.push({
        name: "task-manage"
      });
    },
    Situation() {
      this.$router.push({
        name: "task-user"
      });
    },
    handleDetails(id) {
      this.$router.push({
        name: "task-detail",
        params: {
          id
        }
      });
    },
    handleDelete(id) {
      // console.log('删除:', id)
      this.$axios
        .post("projectTasks/delete", {
          id: id
        })
        .then(res => {
          this.id = res.id;
          this.getTaskList();
        });
    },
    handleEdit(id) {
      this.$router.push({
        name: "task-edit",
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
  margin: 50px 150px;
  .title {
    line-height: 25px;
    margin-bottom: 15px;
    // font-weight: normal;
    margin-top: 10px;
    font-size: 15px;
  }
  .filter-container {
    // margin-top: 30px;
    // text-align: center;
    margin-left: 30px;
    // font-weight: bold;
    .filter-item {
      margin-right: 25px;
    }
    .filter-input {
      width: 70%;
      /deep/input {
        border-radius: 35px;
      }
    }
  }
}
</style>