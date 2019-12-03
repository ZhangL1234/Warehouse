<template>
  <div class="Box">
    <div class="Title">编辑题目</div>

    <!--            列表title-->
    <div v-for="(tp,index) in topicexe" :key="tp.id">
      <el-form ref="form" label-width="80px" v-if="(index+1)==num">
        <el-form-item label="题目序号">
          <el-input v-model="tp.tpid" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="题组名称">
          <el-select style="width:250px" v-model="tp.tpsname"></el-select>
        </el-form-item>
        <el-form-item label="题目">
          <el-input v-model="tp.tp" type="textarea" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="A选项">
          <el-input v-model="tp.opA" type="textarea" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="B选项">
          <el-input v-model="tp.opB" type="textarea" style="width:250px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="ReturnButton">
      <el-button type="danger" size="small" style="width:150px" @click="Last" plain>上一题</el-button>
      <el-button
        type="danger"
        size="small"
        style="width:150px;margin-left:30px"
        @click="Next"
        v-text="next"
      ></el-button>
    </div>
  </div>
</template>


<script>
export default {
  name: "edittopicexe",
  data() {
    return {
      topic: {
        //题库列表
        name: "",
        introduction: ""
      },
      formLabelWidth: "120px",
      userIndex: 0,
      num: 1,
      next: "下一题",
      //题目
      topicexe: [
        {
          tpid: "1",
          tpsname: "测试1",
          tp: "测试1",
          opA: "测试1",
          opB: "测试1"
        },
        {
          tpid: "2",
          tpsname: "测试2",
          tp: "测试2",
          opA: "测试2",
          opB: "测试2"
        },
        {
          tpid: "3",
          tpsname: "测试3",
          tp: "测试3",
          opA: "测试3",
          opB: "测试3"
        },
        {
          tpid: "4",
          tpsname: "测试4",
          tp: "测试4",
          opA: "测试4",
          opB: "测试4"
        }
      ],
    };
  },
  created() {},
  methods: {
    //添加
    add() {
      this.$axios({
        url: "library/add",
        method: "POST",
        data: {
          name: this.topic.name,
          introduction: this.topic.introduction
        }
      })
        .then(() => {
          this.$router.push("topiclist");
        })
        .catch(() => {});
    },
    //下一题
    Next() {
      if (this.num < 4) {
        this.num++;
        if (this.num == 4) {
          this.next = "完成";
        }
      } else this.Next = this.$router.replace("topiclist");
    },
    //上一题
    Last() {
      if (this.num <= 4 && this.num > 1) {
        this.num--;
        if (this.num != 4) {
          this.next = "下一题";
        }
      }
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
  margin-left: 30px;
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