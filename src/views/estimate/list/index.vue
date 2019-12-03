<template>
  <!-- <div></div> -->
  <div class="table-wrapper con_rig_bottom">
    <div class="filter-container">
      <br />
      <br />
      <h1>人员评估</h1>
      <el-input
        style="margin-top:50px;margin-left:10px"
        class="filter-item filter-input"
        size="small"
        prefix-icon="el-icon-search"
        v-model="keyword"
        placeholder="搜索"
        type="text"
      ></el-input>
      <el-button type="danger" style="width:150px" @click="add" size="small">人员评估</el-button>
    </div>
    <div class="filter-container" style="margin-top:50px">
      <el-table
        :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="评估时间" prop="date" width="180px"></el-table-column>
        <el-table-column label="任务完成度" prop="complete"></el-table-column>
        <el-table-column label="心理素质" prop="quality"></el-table-column>
        <el-table-column label="职业技能" prop="skill"></el-table-column>
        <el-table-column label="评价" prop="evaluation"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">
              <i class="el-icon-edit" @click="edit(scope.row.name)"></i>
            </el-button>
            <el-button type="text">
              <i class="el-icon-delete" @click="del(scope.row.name)"></i>
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
    </div>
    <div class="filter-container" style="margin-top:10px;text-align:center">
      <el-button type="info" style="width:30%;" @click="back">返回</el-button>
    </div>

    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
    <el-dialog title="人员评估更新" :visible.sync="dialogFormVisible">
      <el-form label-width="120px">
        <el-form-item label="当前成员">
          <el-input :disabled="true" v-model="updatename" placeholder="无"></el-input>
        </el-form-item>
        <el-form-item label="任务完成度">
          <el-input v-model="complete" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="心理素质">
          <el-input v-model="quality" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="职业技能">
          <el-input type="text" v-model="skill" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="评价">
          <el-input type="textarea" v-model="evaluation" placeholder="必填"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="danger" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "estiMateList",
  inject: ["reload"],

  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据

      updatename: "",
      skill: "",
      evaluation: "",
      complete: "",
      quality: "",
      updateId: "",
      upUserId: "",
      upList: {
        id: "",
        user: {
          id: "",
          name: ""
        },
        skill: "",
        evaluation: "",
        complete: "",
        quality: ""
      },
      activeTab: "",
      name: "",
      projects: [],
      list: [],
      keyword: "",
      dialogFormVisible: false
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

    back() {
      this.$router.go(-1);
    },
    updateSubmit() {
      this.dialogFormVisible = false;
      this.upList.id = this.updateId;
      this.list.map(item => {
        if (item.name == this.updatename) {
          this.upList.user.id = item.userId;
          // console.log(item.userId);
        }
      });
      this.upList.user.name = this.updatename;
      this.upList.skill = this.skill;
      this.upList.evaluation = this.evaluation;
      this.upList.complete = this.complete;
      this.upList.quality = this.quality;
      // this.upList.createDate=new Date()
      // console.log(new Date());

      // console.log(this.upList);

      this.$axios.post("/staffAssess/edit", this.upList).then(() => {
        this.reload();
      });
    },
    edit(name) {
      this.dialogFormVisible = true;
      this.list.map(res => {
        if (name == res.name) {
          this.updateId = res.id;
          this.updatename = res.name;
          this.userId = res.userId;
          this.skill = res.skill;
          this.evaluation = res.evaluation;
          this.complete = res.complete;
          this.quality = res.quality;
        }
      });
    },
    del(name) {
      // console.log(name)
      var delId = "";
      this.list.map(res => {
        if (name == res.name) {
          delId = res.id;
        }
      });
      this.$axios
        .post("staffAssess/delete", { id: delId })
        .then(() => {
          // console.log('deleted！')
          this.reload();
        })
        .catch(() => {});
    },
    //跳转新建
    add() {
      this.$router.push({
        name: "estimateadd"
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
    }
  },
  created() {
    this.$axios.post("staffAssess/list", {}).then(res => {
      // console.log(res.data.list)
      res.data.list.content.map(item => {
        this.list.push({
          id: item.id,
          userId: item.user.id,
          name: item.user.name,
          date: item.createDate,
          complete: item.complete,
          skill: item.skill,
          quality: item.quality,
          evaluation: item.evaluation
        });
      });
      this.list.reverse();
      // console.log(this.list);
    });
  }
};
</script>
<style lang="less" scoped>
.tabs {
  margin-top: 15px;
}
.con_rig_bottom {
  // margin-left: 200px;
  margin-top: 50px;
  // margin-left: auto;
  // margin-bottom:100px;
  // text-align: center;
  width: 80%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
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
.table1 {
  text-align: center;
}
</style>