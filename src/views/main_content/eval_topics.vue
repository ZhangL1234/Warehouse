<template>
  <div class="Box">
    <p class="Title">{{title}}</p>

    <el-row :gutter="24" class="List">
      <el-col :span="4">
        <div class="grid-content bg-purple" v-for="item in list" :key="item.id">{{item}}</div>
      </el-col>
      <el-col :span="20" v-for="s in QB" :key="s.id">
        <!--                右边的文本框-->
        <div class="grid-content bg-purple-light" v-if="s.id==num">
          <el-input v-model="s.id"></el-input>
          <el-input v-model="s.name"></el-input>
          <el-input v-model="s.title"></el-input>
          <el-input v-model="s.optionA"></el-input>
          <el-input v-model="s.optionB"></el-input>
          <div></div>
        </div>
      </el-col>
    </el-row>
    <el-button type="danger" @click="Last" style="width: 100px">上一题</el-button>
    <el-button type="danger" @click="Next" v-text="next" style="width: 100px"></el-button>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.query.id);
  },

  name: "eval-topics",
  data() {
    return {
      next: "下一题",
      num: 1,
      title: "编辑题目",
      list: ["题目序号", "题组名称", "题目", "A选项", "B选项"], //左边的标题
      ca: "choose",
      cb: "nochoose", //两个单选
      input: "",
      content: "哪一个答案最能贴切的描绘你一般的感受或行为？",
      content1: "1.当你要外出一整天，你会",
      QB: [
        {
          id: 1,
          name: "爵士",
          title: "物流",
          optionA: "dsfdsaff",
          optionB: "sdfsdf"
        },
        {
          id: 2,
          name: "爵士2",
          title: "物流2",
          optionA: "dsfdsaff2",
          optionB: "sdfsdf2"
        },
        {
          id: 3,
          name: "爵士3",
          title: "物流3",
          optionA: "dsfdsaff3",
          optionB: "sdfsdf3"
        },
        {
          id: 4,
          name: "爵士4",
          title: "物流4",
          optionA: "dsfdsaff4",
          optionB: "sdfsdf4"
        }
      ]
    };
  },
  methods: {
    //下一题
    Next() {
      if (this.num < 4) {
        this.num++;
        if (this.num == 4) {
          this.next = "完成";
        }
      } else this.Next = this.$router.replace("/main_content/Topic_manage");
    },
    //上一题
    Last() {
      if (this.num <= 4 && this.num > 1) {
        this.num--;
      }
    }
  }
};
</script>

<style scoped>
.Box {
  width: 1040px;
  height: 600px;
  left: 117px;
  top: 109px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
  margin: 0 auto;
  margin-top: 10px;
  padding: 30px;
}
.Title {
  width: 80px;
  height: 30px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
  /*background-color: #42b983;*/
}
.List {
  /*background-color:#FFFFFF;*/
  line-height: 60px;
  margin-top: 60px;
  font-size: 16px;
  font-family: Microsoft YaHei;
}
.Last {
  width: 248px;
  height: 55px;
  left: 161px;
  top: 578px;
  color: red;
  background-color: #ffffff;
  border-radius: 6px;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  margin-top: 120px;
}
.Next {
  width: 248px;
  height: 55px;
  left: 161px;
  top: 578px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 92, 92, 1);
  border-radius: 6px;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  margin-top: 120px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background-color: white;
}
.bg-purple-light {
  background-color: white;
}
</style>