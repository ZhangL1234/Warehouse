<template>
  <div class="table-wrapper">
    <div class="filter-container">
      <table style="width:100%;line-height:30px">
        <thead>
          <tr>
            <th>总项目</th>
            <th>已完成</th>
            <th>未完成</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>10</th>
            <th>23</th>
            <th>32</th>
            <el-input
              class="filter-item filter-input"
              size="small"
              prefix-icon="el-icon-search"
              v-model="keyword"
              placeholder="搜索"
              type="text"
            ></el-input>
            <el-button
              type="danger"
              size="small"
              @click="add"
              style="margin-right:10px;background-color:#ff5c5c;border-color:#ff5c5c"
            >新建项目</el-button>
          </tr>
        </tbody>
      </table>
      <!-- <el-input
        class="filter-item filter-input"
        size="small"
        prefix-icon="el-icon-search"
        v-model="keyword"
        placeholder="搜索"
        @input="handleSearch"
        type="text"
      ></el-input>-->
      <!-- 新建小组 -->
      <!-- <el-button
        type="danger"
        size="small"
        @click="add"
        style="margin-right:10px;background-color:#ff5c5c;border-color:#ff5c5c"
      >新建项目</el-button>-->
    </div>
    <template>
      <el-table
        :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%;"
      >
        <el-table-column label="项目" prop="name"  align="center"></el-table-column>
        <el-table-column label="小组" prop="taskTitle" align="center"></el-table-column>
        <el-table-column label="开始时间" prop="createDate" align="center"></el-table-column>
        <el-table-column label="截止时间" prop="deadline" align="center"></el-table-column>
        <el-table-column label="项目进度" prop="progress" align="center"></el-table-column>
        <el-table-column label="项目状态" prop="status" align="center"></el-table-column>
        <el-table-column label="任务数量" prop="size" align="center"></el-table-column>
        <el-table-column label="超时提醒">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              size="mini"
              v-if="scope.row.endTask"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-warning-outline"
              circle
              size="mini"
              v-if="!scope.row.endTask"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">
              <i class="el-icon-edit" @click="edit(scope)"></i>
            </el-button>
            <el-button type="text">
              <i class="el-icon-delete" @click="handleDelete(item.user_id)"></i>
            </el-button>
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
        :total="list.length"
        align="center"
      ></el-pagination>
    </template>
  </div>
</template>
<script>
export default {
  name: "project-table",
  components: {
    // ITable
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
  mounted() {
    this.getTaskList();
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
    // 请求项目列表
    getTaskList() {
      setTimeout(() => {
        this.$axios({
          url: "project/list",
          method: "POST",
          data: {}
        })
          .then(res => {
            this.list = res.data.list;
            // console.log("成员----", this.list);
          })
          .catch(() => {});
      });
    },
    // 删除
    handleDelete(id) {
      this.$axios({
        url: "project/delete",
        method: "POST",
        data: {
          id: id
        }
      })
        .then(() => {
          // console.log(res);
          this.getTaskList();
        })
        .catch(() => {});
    },
    //跳转新建
    add() {
      this.$router.push({
        name: "project-add"
      });
    },
    //编辑
    edit(id) {
      this.$router.push({
        name: "project-edit",
        params: {
          id
        }
      });
    }
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
                //  .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.list;
    },
  }
};
</script>
<style lang="less" scoped>
.table-wrapper {
  margin: 0 15px;
  .title {
    line-height: 25px;
    margin-bottom: 15px;
    margin-top: 10px;
    font-size: 15px;
  }
  .filter-container {
    text-align: center;
    margin-bottom: 20px;
    .filter-item {
      margin-right: 25px;
    }
    .filter-input {
      width: 75%;
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