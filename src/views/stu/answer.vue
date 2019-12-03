<template>
    <div class="Answer">
        <div class="Answer_Left">
            <div class="Answer_Title">{{title}}</div>

        </div>
        <div class="Answer_Right">
            <div class="Answer_Content">{{title1}}</div>
            <div class="Answer_Content1">{{content1}}</div>
            <div class="Answer_Content2">{{content2}} </div>
            <div class="Answer_Button">
                <el-button type="danger" @click="start">开始答题</el-button>
                <el-button type="info" plain @click="record">历史评测记录</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                list: [1,2,3,5,6,8,6,5,9,5,3,6,8],
                input: '',
                title:'职业评测',
                title1:'MBTI职业性格测试',
                content1:'我性格内向/外向，适合什么工作？”“哪些职业正好匹配我的性格？”“以我的个性从事什么行业好？”“我性格中的优势和劣势是什么？”',
                content2:'MBTI可以有效地评估我们的性格类型；引导我们建立自信，信任并理解他人；进而在职业定位和发展、团队建设、领导力人格基础发展、人际工作关系、员工素质、组织内部沟通以及跨文化企业管理等领域为我们提供前所未有的帮助。'

            }
        },
        methods:{
            start(){
                this.$router.replace('/stu/evaluate')
            },
            record(){
                this.$router.replace('/stu/eval_record')
            }
        }

    }

</script>


<style>
    .Answer{
        /*background-color: #42b983;*/
        width: 1300px;
        height: 600px;
    }
    .Answer_Left{
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
        margin-left:110px;
    }
    .Answer_Right{
        width: 700px;
        height: 600px;

        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        float: right;
        margin-top: 20px;
        margin-right: 150px;

    }
    .Answer_Title{
        font-family: "Microsoft YaHei";
        margin-top: 70px;
        margin-left: 120px;
    }
    .Answer_Content{
        font-family: "Microsoft YaHei";
        font-size: 25px;
        text-align: center;
        font-weight: bold;
        margin-top: 60px;
    }
    .Answer_Content1{
        margin-top: 70px;
        width: 550px;
        margin-left: auto;
        margin-right: auto;
    }
    .Answer_Content2{
        font-family: "Microsoft YaHei";
        width: 550px;
        margin:55px auto ;

    }
    .Answer_Button{
        font-family: "Microsoft YaHei";
        margin-left: 250px;
        margin-top: 120px;
    }
    #Button{
        margin-right: 60px;
    }



</style>