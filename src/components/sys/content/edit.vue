<template>
  <div>
    <el-row type="flex" justify="space-around">
      <el-col :span="9">
        <div class="grid-content">
          <p class="p-box">编辑技能树-列表</p>
          <div class="text-box">
            <el-input v-model="title"></el-input>
          </div>
          <div class="sec-box">
            <div>
              <tree-menu
                v-for="tree in data1"
                :isEdit="false"
                :nodes="tree.children"
                :label2="tree.title"
                :depth="0"
                :treeId="id"
                :id="tree.id"
                class="root-tree"
                @add-item="addNode"
                @del-item="delNode"
                :key="tree.id"
              ></tree-menu>
              <!-- 遍历根节点 -->
            </div>
          </div>
          <div class="btn-box">
            <el-button type="text" size="small" v-on:click="addFstNode()">添加章节</el-button>
          </div>
          <div class="btn-box">
            <el-button style="width: 40%;" @click="handleMore()">返回</el-button>
            <el-button style="width: 40%;" type="danger" @click="titleEdit()">编辑完成</el-button>
          </div>
        </div>
      </el-col>

      <el-col :span="14">
        <div class="grid-content1">
          <span class="zt1">技能树-脑图</span>
          <span class="zt2">{{title}}</span>
          <div>
            <!-- <editimage></editimage> -->
            <div id="myeCharts"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TreeMenu from "./TreeMenu2.vue";
// import editimage from '@/components/sys/content/image'
export default {
  name: "edit",
  data() {
    return {
      input: "",
      title: "",
      data1: [],
      data2: {
        name: "",
        // id:"",
        children: []
      }
    };
  },
  mounted() {
    this.getTreelist();
  },
  methods: {
    EcharTest: function() {
      // console.log(this.data2)
      var myChart = this.$echarts.init(document.getElementById("myeCharts"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: [
          {
            type: "tree",
            data: [this.data2],
            // top: '1%',
            // left: '7%',
            // bottom: '1%',
            // right: '20%',
            // symbolSize: 7,
            label: {
              normal: {
                position: "left",
                verticalAlign: "middle",
                align: "right",
                fontSize: 9
              }
            },

            leaves: {
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            }
          }
        ]
      });
    },

    GetTreelist() {
      const Id = this.$route.params.id;
      this.$axios({
        url: "treeNode/list",
        method: "POST",
        data: {
          id: Id
        }
      }).then(ref => {
        var arr = ref.data.children;
        this.data2.name = arr[0].tree.title;
        this.data2.children = this.recursion(arr);
        this.EcharTest();
      });
    },
    recursion(arr) {
      let res = [];
      function handler(ary) {
        return ary.map(item => {
          return {
            id: item.id,
            name: item.title,
            children: item.children.length ? handler(item.children) : []
          };
        });
      }
      res = handler(arr);
      return res;
    },

    getTreelist() {
      const Id = this.$route.params.id;
      this.$axios({
        url: "treeNode/list",
        method: "POST",
        data: {
          id: Id
        }
      }).then(ref => {
        let arr = ref.data.children;
        //为数据库赋值
        this.data1 = arr;
        // 赋值标题
        this.title = arr[0].tree.title;
        this.id = arr[0].tree.id;
        this.GetTreelist();
      });
    },
    titleEdit() {
      const Id = this.$route.params.id;
      this.$axios({
        url: "tree/edit",
        method: "POST",
        data: {
          title: this.title,
          id: Id
        }
      }).then(() => {
        this.$router.push({
          name: "show",
          params: {
            id: Id
          }
        });
      });
    },
    addNode(id) {
      const Id = this.$route.params.id;
      this.$prompt("请输入技能树节点名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(title => {
          this.$axios({
            url: "treeNode/add",
            method: "POST",
            data: {
              title: title.value,
              parentId: id,
              tree: {
                id: Id
              }
            }
          }).then(() => {
            this.$message({
              type: "success",
              message: "新建成功 "
            });
            //再次遍历树
            this.getTreelist();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消新建"
          });
        });
    },
    delNode(id) {
      this.$axios({
        url: "treeNode/delete",
        method: "POST",
        data: {
          id: id
        }
      }).then(() => {
        //再次遍历树
        this.getTreelist();
      });
    },
    addFstNode() {
      const Id = this.$route.params.id;
      this.$prompt("请输入技能树节点名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(title => {
          this.$axios({
            url: "treeNode/add",
            method: "POST",
            data: {
              title: title.value,
              parentId: 0,
              tree: {
                id: Id
              }
            }
          }).then(() => {
            this.$message({
              type: "success",
              message: "新建成功 "
            });
            //再次遍历树
            this.getTreelist();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消新建"
          });
        });
    },
    handleMore() {
      const Id = this.$route.params.id;
      this.$router.push({
        name: "show",
        params: {
          id: Id
        }
      });
    }
  },
  components: {
    // "editimage": editimage,
    "tree-menu": TreeMenu
  }
};
</script>

<style scoped>
/* .edit{
        margin: 0 auto;
        width: 1452px;
        height: 749px;
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        line-height: 150%;
        text-align: center;
    }  */

/* #myeCharts {
        width: 100%;
        height: 630px;
    } */
#myeCharts {
  width: 800px;
  height: 600px;
}
.grid-content {
  border-radius: 1px;
  min-height: 630px;
  box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
  background: #ffffff;
}

.grid-content1 {
  border-radius: 1px;
  min-height: 630px;
  box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
  background-color: rgba(251, 251, 251, 1);
}

.zt1 {
  float: left;
  margin: 10px;
}

.zt2 {
  float: left;
  margin: 10px;
  color: #00aeff;
}

.p-box {
  float: left;
  margin: 41px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
  /* margin: 37px 0px 19px 43px; */
}

.sec-box {
  float: left;
  margin: 15px 0px 15px 41px;
  width: 80%;
  height: 70%;
  max-height: 250px;
  /* 内容超出自动添加滚动条 */
  overflow: auto;
}

.text-box {
  float: left;
  width: 80%;
  height: 30px;
  margin: 0px 55px 15px 41px;
  color: rgba(193, 193, 193, 1);
  border-radius: 6px;
  font-size: 18px;
  line-height: 150%;
}

.btn-box {
  float: left;
  width: 100%;
  margin: 10px 0px 15px 41px;
}

.root-tree {
  border: none;
  font-size: 20px;
  /* 实现红色的竖线居于原点之下 */
}
</style>
