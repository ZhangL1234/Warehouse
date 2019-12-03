<template>
    <div class="Evaluate">
        <div class="Evaluate_Left">
            <div class="Evaluate_Title">{{title}}</div>
            <div class="Evaluate_Content">{{content}}</div>
        </div>

        <div class="Evaluate_Right">

            <div v-for="(item,index) in this.QB" :key="index" v-if="item.id==num">
                <div class="Evaluate_Content1">{{item.id}}.{{item.title}}</div>
                <div v-for="(con,val) in item.content">
                    <div class="Evaluate_Content2">
                        <p class="Evaluate_Content3" :class="[con.checked?ca:cb]" @click="onChooseClick(index,val)">{{con.xx}} {{con.option}}</p>
                    </div>
                </div>
                <div class="Evaluate_Content4">
                    <el-button type="danger"  @click="prevQuestion" :class="[prevIsPlay?cassA:cassB]">上一题</el-button></div>
                <div class="Evaluate_Content5">   <el-button type="danger" @click="nextQuestion" :class="[nextIsPlay?cassA:cassB]">下一题</el-button>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{

                ca: "choose",
                cb: "nochoose", //两个单选
                list: [1,2,3,5,6,8,6,5,9,5,3,6,8],
                input: '',
                title:'职业评测',
                content:'哪一个答案最能贴切的描绘你一般的感受或行为？',
                content1:'1.当你要外出一整天，你会',
                QB:[],
                content_QB:[],
                num:1,
                nextIsPlay: true, //下一题
                prevIsPlay: false, //上一题
                cassA: 'Play',
                cassB: 'NoPlay',// 这三个控制下一题的显示与隐藏
            }
        },
        methods:{
            getQuestList(){
                this.$axios.post("question/list",{id:22}).then(res =>{
                    //console.log(res)
                    for(var i=0;i<res.data.list.length;i++){
                        this.QB.push({
                            id:this.QB.length +1,
                            title:res.data.list[i].title,
                            content:[]
                        })
                        for(var j=0;j<res.data.list[i].answers.length;j++){
                            this.QB[this.QB.length-1].content.push({
                                xx:res.data.list[i].answers[j].type,
                                option:res.data.list[i].answers[j].content,
                                checked:''
                            })
                        }

                    }


                })
            },
            nextQuestion() {
                this.num += 1;
                if (this.num > 1) {
                    this.prevIsPlay = true
                }

                if (this.num == this.QB.length) {
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
                if (this.num < this.QB.length) {
                    this.nextIsPlay = true;
                    this.subIsPlay = false;
                }
            }
        },
        mounted() {
            this.getQuestList();
        }
    }

</script>


<style>
    .Evaluate{
        /*background-color: #42b983;*/
        width: 1300px;
        height: 800px;
    }
    .Evaluate_Content{
        margin: 30px;
        font-weight: bold;
    }

    .Evaluate_Left{
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

    .Evaluate_Right{
        width: 700px;
        height: 500px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 150%;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        float: right;
        margin-top:20px;
        margin-right: 130px;
        padding-left: 20px;
    }
    .Evaluate_Title{
        font-family: "Microsoft YaHei";
        margin: 20px;
    }
    .Evaluate_Content1{
        font-family: "Microsoft YaHei";
        margin-left: 20px;
        margin-top: 70px;
    }
    .Evaluate_Content2{
        font-family: "Microsoft YaHei";
        margin-top: 40px;
        width: 500px;
        margin-left: 20px;
        height: 20px;



    }
    .choose {
       background-color: #F5F5F5;
    }

    .nochoose {
        background-color: #FFFFFF;
    }
    .Evaluate_Content3{
        font-family: "Microsoft YaHei";
        font-size: 12px;
        margin-top: 40px;
        width: 500px;
        height: 40px;
        border:1px solid #F5F5F5 ;
        line-height: 40px;
        padding-left: 20px;
    }
    .Evaluate_Content4{
        font-family: "Microsoft YaHei";
        font-size: 12px;
        margin-top: 80px;
        margin-left: 10px;
        width: 50px;
        height: 200px;
        float: left;


    }
    .Evaluate_Content5{
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
        disPlay: none;
    }



</style>