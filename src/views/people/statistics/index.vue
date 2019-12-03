
<template>
  <div class="Box">
    <!-- <div class="filter-container">
      <el-input
        class="filter-item filter-input"
        size="small"
        prefix-icon="el-icon-search"
        v-model="keyword"
        placeholder="搜索"
        type="text"
      ></el-input>
    </div>-->
    <h1 class="Title">未完成情况</h1>
    <template>
      <table style="width: 80%" class="table1">
        <thead>
          <tr>
            <th>小组</th>
            <th>项目</th>
            <th>未完成数量</th>
            <!-- <th>详情</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tables" :key="item.id">
            <td>{{item.team_name}}</td>
            <td>{{item.project_name}}</td>
            <td>{{item.undone}}</td>
            <!-- <td>
              <div>
                <el-button type="text">详情</el-button>
              </div>
            </td> -->
          </tr>
        </tbody>
      </table>
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
  mounted() {
    // this.getTeamList();
  },
  methods: {
    // 请求列表
    getTaskList() {
      console.log("项目id：", this.projectId);
      setTimeout(() => {
        this.$axios({
          url: "projectTasks/getUndone",
          method: "POST",
          data: {
            id: this.projectId
          }
        }).then(res => {
          this.list = res.data.statusList;
          // console.log("统计列表内容返回值----", this.list);
        });
      }, 1000);
    },
    // 删除
    handleDelete(id) {
      console.log("删除:", id);
      this.list.splice(id, 6);
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
.table1 {
  text-align: center;
  line-height: 180%;
}
</style>