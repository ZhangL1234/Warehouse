<template>
  <div class="Box">
    <div class="Title">编辑题目</div>

    <!--            列表title-->
    <div>
      <el-form ref="form" :model="submitData" label-width="80px" size="mini">
        <el-form-item label="题目">
          <el-input v-model="submitData.title" style="width:350px"></el-input>
          <el-button @click="addop" size="small" style="margin-left:10px">点击按钮添加选项</el-button>
        </el-form-item>
        <div>
          <el-table :data="submitData.answers" style="width:580px">
            <el-table-column label="选项" width="62px">
              <template slot-scope="scope">
                <el-input
                  v-model="submitData.answers[scope.$index].type"
                  style="width:40px"
                  size="mini"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="内容" width="276px">
              <template slot-scope="scope">
                <el-input v-model="submitData.answers[scope.$index].content" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="测试" width="150px">
              <template slot-scope="scope">
                <el-select
                  v-model="submitData.answers[scope.$index].value"
                  clearable
                  placeholder="请选择"
                  size="mini"
                >
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
      <el-button type="danger" size="small" @click="edit" style="width:150px">完成</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "editsingle",
  inject: ["reload"],

  data() {
    return {
      input: "",
      submitData: {
        id: "",
        title: "",
        library: {
          id: "",
          name: ""
        },
        answers: [
          {
            id: "",
            type: "",
            content: "",
            value: ""
          }
        ]
      },
      options: [
        {
          id: "",
          introduction: "",
          type: ""
        }
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //请求列表
    getlist() {
      const id = this.$route.params.id;
      this.$axios({
        url: "question/list",
        method: "POST",
        data: {
          keywords: id
        }
      })
        .then(res => {
          this.submitData = res.data.list[0];
          // console.log(this.submitData);
        })
        .catch(() => {});
    },
    //请求性格列表
    getcharacter() {
      this.$axios({
        url: "nature/list",
        method: "POST",
        data: {}
      })
        .then(res => {
          // console.log(res)
          this.options = res.data.list.content;
          // console.log(this.options);
        })
        .catch(() => {});
    },
    //修改
    edit() {
      //题目id
      // const id = this.$route.params.id;
      // this.submitData.id = this.tableData[0].id;
      // this.submitData.title = this.tableData[0].title;
      // this.submitData.library.id = this.tableData[0].library.id;
      // this.submitData.library.name = this.tableData[0].library.name;
      // this.submitData.answers = this.tableData[0].answers.map(item => {
      //   return { id: item.id, type: item.type, content: item.content };
      // });
      this.$axios
        .post("/question/edit", this.submitData)
        .then(() => {
          this.$message.success("修改成功");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addop() {
      this.submitData.answers.push({});
    },
    deleteRow(index) {
      this.submitData.answers.splice(index, 1);
    }
  },
  created() {
    this.getlist();
    this.getcharacter();
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