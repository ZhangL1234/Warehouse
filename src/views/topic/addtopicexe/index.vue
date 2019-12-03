<template>
  <div class="Box">
    <div class="Title">添加题目</div>

    <!--            列表title-->
    <div>
      <el-form ref="form" :model="topic" label-width="80px" size="mini">
        <el-form-item label="题目">
          <el-input v-model="topic.title" style="width:250px"></el-input>
          <el-button @click="addop" size="small" style="margin-left:10px">点击按钮添加选项</el-button>
        </el-form-item>
        <div>
          <el-table :data="op" style="width:580px">
            <el-table-column label="选项" width="62px">
              <template slot-scope="scope">
                <el-input v-model="op[scope.$index].type" style="width:40px" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="内容" width="276px">
              <template slot-scope="scope">
                <el-input v-model="op[scope.$index].content" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="测试" width="150px">
              <template slot-scope="scope">
                <el-select v-model="op[scope.$index].value" clearable placeholder="请选择" size="mini">
                  <el-option
                    v-for="ceshi in options"
                    :key="ceshi.id"
                    :label="ceshi.type"
                    :value="ceshi.id"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button @click="deleteRow(scope.$index)" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
    <div class="ReturnButton">
      <el-button type="danger" size="small" @click="add" style="width:150px;margin-left:70px">完成</el-button>
    </div>
  </div>
</template>


<script>
export default {
  name: "addtopicexe",
  data() {
    return {
      topic: {
        //题库列表
        title: ""
      },
      op: [{ type: "", content: "", value: "" }],
      options: [
        {
          id:"",
          introduction:"",
          type:""
        }
      ]
    };
  },
  created() {
    this.getcharacter();
  },
  methods: {
    //添加
    add() {
      const id = this.$route.params.id;
      this.$axios({
        url: "question/add",
        method: "POST",
        data: {
          title: this.topic.title,
          library: {
            id: id
          },
          answers: this.op
        }
      })
        .then(() => {
          this.$router.back();
        })
        .catch(() => {});
    },
    //请求性格列表
    getcharacter() {
      this.$axios({
        url:"nature/list",
        method:"POST",
        data:{}
      }).then((res)=>{
        // console.log(res)
        this.options=res.data.list.content
        console.log(this.options)
      }).catch(()=>{});
    },
    addop() {
      this.op.push({});
    },
    deleteRow(index) {
      this.op.splice(index, 1);
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
  margin-left: 80px;
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
  text-align: left;
  float: left;
  /*border: 1px palevioletred solid;*/
  margin-top: 30px;
}
</style>