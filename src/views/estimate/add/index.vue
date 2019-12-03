
<template>
  <div style="width:100%;margin-top:1%">
    <div>
      <div class="con_rig_bottom" style="float:left;width:30%;margin-left:10%">
        <p class="title" style="margin-bottom:15%;">人员评估</p>
        <div style="margin-left:5%">
          <div style="float:left;margin-left:5%;text-align:center">
            <p style="font-size:40px;margin-bottom:20px">{{noAssessment}}</p>
            <p>待评估</p>
          </div>
          <div style="float:left;margin-left:20%;text-align:center">
            <p style="font-size:40px;margin-bottom:20px">{{hasAssessed}}</p>
            <p>已评估</p>
          </div>
          <div style="margin-left:60%;text-align:center">
            <p style="font-size:40px;margin-bottom:20px">{{number}}</p>
            <p>总人数</p>
          </div>
        </div>
        <div style="margin-top:50px;">
          <h1 class="title" style="margin-bottom:3%">最近评估</h1>
          <div
            style="float:left;text-align:center;margin-left:5%;margin-bottom:3%"
            v-for="item in displayed"
            :key="item.id"
          >
            <img
              src="../../imgs/2.png"
              style="width:60px; height:60px;float:left;margin:5px;border-radius:100%;overflow:hidden;"
              alt
            />
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="con_rig_bottom" style="float:left;width:50%;margin-left:2%">
      <h1 class="title" style="margin-bottom:5%">添加评估</h1>
      <el-form label-width="80px">
        <el-form-item label="选择成员">
          <el-select placeholder="必选" style="width:85%" v-model="name">
            <el-option
              v-for="item in list"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务完成度">
          <el-input style="width:85%" v-model="complete" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="心理素质">
          <el-input style="width:85%" v-model="quality" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="职业技能">
          <el-input style="width:85%" type="text" v-model="skill" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="评价">
          <el-input type="textarea" style="width:85%" v-model="evaluation" placeholder="必填"></el-input>
        </el-form-item>
        <div style="margin-left:17%;margin-bottom:1%">
          <el-button style="width:40%" type="info" @click="back">返回</el-button>
          <el-button style="width:40%;margin-left:30px" type="danger" @click="submit">编辑完成</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "estimateadd",
  props: {
    isAdd: {
      type: Boolean,
      default: true
    }
  },
  inject: ["reload"],
  data() {
    return {
      displayed: [],
      hasAssessed: "",
      noAssessment: "",
      number: "",
      name: "",
      skill: "",
      evaluation: "",
      complete: "",
      quality: "",
      list: [],
      submitData: {
        user: {
          id: "",
          name: ""
        },
        complete: "",
        quality: "",
        skill: "",
        evaluation: ""
      }
    };
  },
  methods: {
    //返回
    back() {
      this.$router.back();
    },
    submit() {
      // console.log(this.list)
      this.list.map(i => {
        if (i.value == this.name) {
          this.submitData.user.id = i.value;
          this.submitData.user.name = i.label;
        }
      });
      this.submitData.complete = this.complete;
      this.submitData.quality = this.quality;
      this.submitData.skill = this.skill;
      this.submitData.evaluation = this.evaluation;
      // console.log(this.submitData)
      // console.log(this.name)
      this.$axios.post("/staffAssess/add", this.submitData).then(() => {
        // console.log( 'succeed')
        this.reload();
      });
    }
  },
  created() {
    this.$axios.post("staffAssess/findAllUser", {}).then(res => {
      // console.log(res.data.list)
      res.data.list.map(item => {
        this.list.push({ value: item.id, label: item.name });
      });
    });
    // console.log(this.list)
    this.$axios.post("staffAssess/statistical", {}).then(res => {
      // console.log(res)
      // console.log(res.data.list.HasAssessed)
      this.hasAssessed = res.data.list.HasAssessed;
      this.noAssessment = res.data.list.NoAssessment;
      this.number = res.data.list.number;
    });

    this.$axios.post("staffAssess/list", {}).then(res => {
      // console.log(res.data.list.content)
      res.data.list.content.map(item => {
        this.displayed.push({
          name: item.user.name
        });
      });
      this.displayed.reverse();
      console.log(this.displayed.length);
      if (this.displayed.length > 10) {
        this.displayed.splice(10, this.displayed.length - 10);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.el-form-item__label {
  width: 100px !important;
}
.title {
  font-weight: bold;
  margin-left: 5%;
  margin-top: 30px;
}
.demo {
  color: red;
}
.con_main_tit {
  float: left;
  font-size: 20px;
  color: rgba(80, 80, 80, 1);
  font-weight: bold;
  margin-top: 30px;
  margin-left: 30px;
}

.con_rig_bottom {
  // margin-top: 50px;
  // margin-left: 40%;
  // margin-right: auto;
  // text-align: center;
  // width: 50%;
  height: 600px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.con_rig_bottom_tit {
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  display: flex;
  margin-top: 20px;
  margin-left: 80px;
}

.con_rig_bottom_tit span {
  font-size: 33px;
  font-weight: bold;
  margin-left: 30px;
}

.task_input {
  margin-top: 10px;
  width: 45%;
  margin-left: 10px;
}

.task_select_box {
  display: flex;

  margin-top: 10px;
}

.task_select {
  margin-top: 10px;
  width: 45%;
  margin-left: 10px;
}

.button {
  width: 20%;
  height: 40px;
  margin: 40px 20px 40px 20px;
}

.group-image {
  width: 60%;
  height: 100px;
  margin-left: 25px;
}
</style>
