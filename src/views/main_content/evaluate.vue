<template>
  <div class="Evaluate">
    <div class="Evaluate_Left">
      <div class="Evaluate_Title">{{title}}</div>
      <div class="Evaluate_Content">{{content}}</div>
    </div>

    <div class="Evaluate_Right">
      <template v-for="(item,index) in this.QB">
        <div :key="index" v-if="item.id==num">
          <div class="Evaluate_Content1">{{item.id}}.{{item.title}}</div>
          <div v-for="(con,val) in item.content" :key="val">
            <div class="Evaluate_Content2">
              <p
                class="Evaluate_Content3"
                :class="[con.checked?ca:cb]"
                @click="onChooseClick(index,val)"
              >{{con.xx}} {{con.option}}</p>
            </div>
          </div>
        </div>
      </template>
      <div class="Evaluate_Content4">
        <el-button type="danger" @click="prevQuestion" :class="[prevIsPlay?cassA:cassB]">上一题</el-button>
      </div>
      <div class="Evaluate_Content5">
        <el-button type="danger" @click="nextQuestion" :class="[nextIsPlay?cassA:cassB]">下一题</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ca: "choose",
      cb: "nochoose", //两个单选
      list: [1, 2, 3, 5, 6, 8, 6, 5, 9, 5, 3, 6, 8],
      input: "",
      title: "职业评测",
      content: "哪一个答案最能贴切的描绘你一般的感受或行为？",
      content1: "1.当你要外出一整天，你会",
      QB: [
        {
          id: 1,
          title: "认识你的人倾向形容你为",
          content: [
            {
              xx: "A",
              option: "热情和敏感",
              checked: false
            },
            {
              xx: "B",
              option: "逻辑和明确",
              checked: false
            }
          ]
        },
        {
          id: 2,
          title: "下列哪一件事听起来比较吸引你",
          content: [
            {
              xx: "A",
              option: "吃饭",
              checked: false
            },
            {
              xx: "B",
              option: "学习",
              checked: false
            }
          ]
        },
        {
          id: 3,
          title: "你倾向通过以下哪种方式收集信息",
          content: [
            {
              xx: "A",
              option: "网路",
              checked: false
            },
            {
              xx: "B",
              option: "交谈",
              checked: false
            }
          ]
        },
        {
          id: 4,
          title: "你乐于拥有广泛的人际圈",
          content: [
            {
              xx: "A",
              option: "是的",
              checked: false
            },
            {
              xx: "B",
              option: "如果可以的话，我愿意一个人呆着",
              checked: false
            }
          ]
        },

        {
          id: 5,
          title: "你看肥皂剧的时候会很投入",
          content: [
            {
              xx: "A",
              option: "是的",
              checked: false
            },
            {
              xx: "B",
              option: "不会",
              checked: false
            }
          ]
        }
      ],
      num: 1,
      nextIsPlay: true, //下一题
      prevIsPlay: false, //上一题
      cassA: "Play",
      cassB: "NoPlay" // 这三个控制下一题的显示与隐藏
    };
  },
  methods: {
    nextQuestion() {
      this.num += 1;
      if (this.num > 1) {
        this.prevIsPlay = true;
      }

      if (this.num == 5) {
        this.nextIsPlay = false;
        this.subIsPlay = true;
      }
    },
    onChooseClick(index, val) {
      // console.log(this.QB[index].content[val].checked)
      var a = this.QB[index].content[val].checked;
      var b = val;
      if (b == 0) {
        if (a == false) {
          this.QB[index].content[val].checked = true;
          this.QB[index].content[val + 1].checked = false;
        } else {
          // this.QB[index].content[val].checked=false;
          // this.QB[index].content[val+1].checked=true;
        }
      } else {
        if (a == false) {
          this.QB[index].content[val].checked = true;
          this.QB[index].content[val - 1].checked = false;
        } else {
          // this.QB[index].content[val].checked=false;
          // this.QB[index].content[val-1].checked=true;
        }
      }

      // this.dataa.push({
      // 	index,
      // 	val,
      // 	a
      // });
      // console.log(this.dataa);
    },

    //上一题
    prevQuestion() {
      this.num -= 1;
      if (this.num == 1) {
        this.prevIsPlay = false;
      }
      if (this.num < 5) {
        this.nextIsPlay = true;
        this.subIsPlay = false;
      }
    }
  }
};
</script>


<style>
.Evaluate {
  /*background-color: #42b983;*/
  width: 1300px;
  height: 600px;
}
.Evaluate_Content {
  margin: 30px;
  font-weight: bold;
}

.Evaluate_Left {
  width: 300px;
  height: 160px;
  left: 117px;
  top: 109px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);

  float: left;
  margin-top: 20px;
  margin-left: 110px;
}

.Evaluate_Right {
  width: 700px;
  height: 400px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
  float: right;
  margin-top: 20px;
  margin-right: 130px;
  padding-left: 20px;
}
.Evaluate_Title {
  font-family: "Microsoft YaHei";
  margin: 20px;
}
.Evaluate_Content1 {
  font-family: "Microsoft YaHei";
  margin-left: 20px;
  margin-top: 70px;
}
.Evaluate_Content2 {
  font-family: "Microsoft YaHei";
  margin-top: 40px;
  width: 500px;
  margin-left: 20px;
  height: 20px;
}
.choose {
  background-color: #f5f5f5;
}

.nochoose {
  background-color: #ffffff;
}
.Evaluate_Content3 {
  font-family: "Microsoft YaHei";
  font-size: 12px;
  margin-top: 40px;
  width: 500px;
  height: 40px;
  border: 1px solid #f5f5f5;
  line-height: 40px;
  padding-left: 20px;
}
.Evaluate_Content4 {
  font-family: "Microsoft YaHei";
  font-size: 12px;
  margin-top: 80px;
  margin-left: 10px;
  width: 50px;
  height: 200px;
  float: left;
}
.Evaluate_Content5 {
  font-family: "Microsoft YaHei";
  font-size: 12px;
  margin-top: 80px;
  margin-left: 150px;
  width: 50px;
  height: 200px;
  float: left;
}

.Play {
  display: block;
}

.NoPlay {
  display: none;
}
</style>