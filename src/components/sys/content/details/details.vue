<template>
  <div id="details">
    <div class="frame">
      <div class="subcoat">
        <div class="skill">查看或修改详情</div>
        <el-form ref="form" label-width="80px">
          <el-form-item class="headline" label="技能标题:">
            <p>{{task.title}}</p>
          </el-form-item>
          <el-form-item class="content" label="技能内容:">
            <el-input
              type="textarea"
              :rows="5"
              style="width: 700px;"
              v-model="task.content"
            >{{this.task.content}}</el-input>
          </el-form-item>
          <el-form-item class="time" label="规定时间:">
            <el-input v-model="task.allowedTime" style="width:100px"></el-input>
          </el-form-item>
          <el-form-item class="video" label="视频链接:">
            <el-input v-model="task.videoAddress" style="width:700px"></el-input>
          </el-form-item>
          <el-form-item class="text" label="文本链接:">
            <el-input v-model="task.textAddress" style="width:700px"></el-input>
          </el-form-item>
          <el-form-item class="skip">
            <el-button @click="back">返回</el-button>
            <el-button @click="getdetailsByIdEdit">完成</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      task: {
        title: "",
        allowedTime: "",
        content: "",
        textAddress: "",
        videoAddress: ""
      }
    };
  },
  mounted() {
    this.getdetailsById();
  },
  methods: {
    getdetailsById() {
      const Id = this.$route.params.id;
      this.$axios({
        url: "treeDetails/list",
        method: "POST",
        data: {
          treeNode: {
            id: Id
          }
        }
      }).then(ref => {
        console.log("---", ref);
        let {
          data: {
            list: { content }
          }
        } = ref;
        // let arr=ref.data.list.content;
        // this.title = content.treeNode.title
        this.task = {
          title: content[0].treeNode.title,
          allowedTime: content[0].allowedTime,
          content: content[0].content,
          textAddress: content[0].textAddress,
          videoAddress: content[0].videoAddress
        };
      });
    },
    getdetailsByIdEdit() {
      const Id = this.$route.params.id;
      this.$axios({
        url: "treeDetails/edit",
        method: "POST",
        data: {
          treeNode: {
            id: Id
          },
          title: this.task.title,
          allowedTime: this.task.allowedTime,
          content: this.task.content,
          textAddress: this.task.textAddress,
          videoAddress: this.task.videoAddress
        }
      }).then(() => {
        this.$message({
          type: "success",
          message: "修改成功 "
        });
        history.go(-1);
      });
    },
    back() {
      history.go(-1);
    }
  }
};
</script>
<style scoped>
/* 	.contentCss{
		width: 700px;
		height: 250px;
	} */
.skill {
  height: 30px;
  left: 43px;
  top: 37px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
  position: absolute;
}

.headline {
  height: 30px;
  left: 43px;
  top: 120px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  position: absolute;
}

.content {
  height: 30px;
  left: 43px;
  top: 180px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  position: absolute;
}

.time {
  height: 30px;
  left: 43px;
  top: 330px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  position: absolute;
}

.video {
  height: 30px;
  left: 43px;
  top: 390px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  position: absolute;
}

.text {
  height: 30px;
  left: 43px;
  top: 450px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  position: absolute;
}

.frame {
  width: 1347px;
  height: 620px;
  left: 117px;
  top: 109px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
  margin: auto;
}
.subcoat {
  position: relative;
}

.skip {
  left: 35px;
  top: 510px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  position: absolute;
}
</style>