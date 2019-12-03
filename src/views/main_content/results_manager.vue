<template>
  <div id="ResultsManagement">
    <div class="Title">{{Title}}</div>

    <div class="Search">
      <div class="SearchBox">
        <el-form ref="form" label-width="80px">
          <el-input
            v-model="input"
            placeholder="搜索"
            prefix-icon="el-icon-search"
            class="SearchBox-input"
          ></el-input>
        </el-form>
      </div>

      <div class="ManagementButton">
        <el-button type="danger" @click="Management" size="small">评测题目管理</el-button>
      </div>
    </div>

    <div class="Content">
      <el-table :data="tables" style="width: 100%;">
        <el-table-column prop="user.name" align="center" label="姓名" width="180"></el-table-column>
        <el-table-column prop="createDate" align="center" label="日期" width="180"></el-table-column>
        <el-table-column prop="nature.type" align="center" label="评测结果"></el-table-column>
        <el-table-column prop="recordSize" align="center" label="评测次数" width="180"></el-table-column>
        <!-- <el-table-column prop="caozuo" align="center" label="操作" width="180">
          <template> -->
            <!-- slot-scope="scope" -->
            <!-- <i class="el-icon-edit"></i>
            <i class="el-icon-delete-solid" style="margin-left:10px"></i> -->
            <!-- <i class="el-icon-edit" @click="editButton(scope.row,scope.$index)"></i>
            <i class="el-icon-delete" @click="deleteButton(scope.$index)"></i>-->
          <!-- </template>
        </el-table-column> -->
      </el-table>

    </div>

    <div class="ReturnButton">
      <el-button type="info" size="small" @click="back" style="width:100px">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Title: "评测结果",
      input: "",
      tableData: [], //评测结果列表
      index: 0,
      edit: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    Management() {
      // 评测结果管理按钮
      this.$router.push("/sys/topiclist");
    },
    //返回
    back() {
      this.$router.back();
    },
    //请求列表
    getlist() {
      this.$axios({
        url: "record/list",
        method: "POST",
        data: {}
      })
        .then(res => {
          this.tableData = res.data.list;
          console.log("列表", res);
        })
        .catch(() => {});
    }
  },
  created() {
    this.getlist();
  },
  computed: {
    tables() {
      // 模糊搜索功能
      const search = this.input;
      if (search) {
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
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.tableData;
    }
  }
};
</script>

<style lang="less">
#ResultsManagement {
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
  margin: 10px 0;
}
.Search {
  width: 1000px;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
.SearchBox {
  width: 700px;
  float: left;
}
.SearchBox-input {
  width: 700px;
  /deep/input {
    border-radius: 35px;
  }
}
.Content {
  width: 900px;
}
.ManagementButton {
  float: left;
  padding-left: 30px;
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
</style>