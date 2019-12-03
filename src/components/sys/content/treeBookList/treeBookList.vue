<template>
  <div>
    <div class="box_2186118">
      <el-button v-on:click="getTreeBookAdd()">添加</el-button>
    </div>
    <div class="box_treelist">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="技能书标题" width="180"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-on:click="getTree(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" v-on:click="getTreeBookEdit(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" v-on:click="getTreeBookDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        // name:'',
        // address:''
      ]
    };
  },
  methods: {
    getTreeBookList() {
      this.$axios({
        url: "tree/list",
        method: "POST",
        data: {}
      }).then(res => {
        let {
          data: {
            list: { content }
          }
        } = res;

        this.tableData = content.map(item => {
          return {
            name: item.title,
            createDate: item.createDate,
            id: item.id
          };
        });
        //赋值也能遍历列表
        // this.tableData.push({
        // 	'name': item.title,
        // 	// 'address':item.id,
        // 	'createDate': item.createDate
        // })
      });
    },
    getTreeBookAdd() {
      this.$prompt("请输入技能树名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(title => {
          this.$axios({
            url: "tree/add",
            method: "POST",
            data: {
              title: title.value
            }
          }).then(() => {
            this.getTreeBookList();
          });

          this.$message({
            type: "success",
            message: "新建成功 "
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消新建"
          });
        });
    },
    getTreeBookDelete(id) {
      this.$axios
        .post("tree/delete", {
          id: id
        })
        .then(res => {
          this.id = res.id;
          this.getTreeBookList();
        });
    },
    getTreeBookEdit(id) {
      this.$router.push({
        name: "edit",
        params: {
          id
        }
      });
    },
    getTree(id) {
      this.$router.push({
        name: "show",
        params: {
          id
        }
      });
    }
  },
  mounted() {
    this.getTreeBookList();
  }
};
</script>

<style>
.box_2186118 {
  float: right;
  margin: 41px;
}

.box_treelist {
  margin-left: 41px;
  /* margin-bottom:100px; */
}
</style>
