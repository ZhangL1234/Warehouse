<template>
  <div class="Box">
    <div class="Title">添加题组</div>

    <!--            列表title-->
    <div>
      <el-form ref="form" :model="topic" label-width="80px">
        <el-form-item label="题组序号">
          <el-input v-model="topic.name" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="题组名">
          <el-input v-model="topic.introduction" type="textarea" style="width:250px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="ReturnButton">
      <el-button type="danger" size="small" @click="add" style="width:150px;margin-left:30px">完成</el-button>
    </div>
  </div>
</template>


<script>
export default {
  name: "addtopic",
  data() {
    return {
      topic: {//题库列表
        name:"",
        introduction:""
      }, 
      formLabelWidth: "120px",
      userIndex: 0
    };
  },
  created() {
  },
  methods: {
    //添加
    add() {
      this.$axios({
        url:"library/add",
        method:"POST",
        data:{
          name:this.topic.name,
          introduction:this.topic.introduction
        }
      }).then(()=>{
        this.$router.push("topiclist")
      }).catch(()=>{

      })
    },
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