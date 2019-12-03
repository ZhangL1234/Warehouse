<template>
    <div style="width: 1300px;">
        <div id="ReviewResultsLeft">
            <div class="Title">{{title}}</div>
            <div class="Results">{{results}}</div>
        </div>
        <div id="ReviewResultsRight1">
            <div class="TypeTitle">{{typeTitle}}</div>
            <div class="TypeResults">
                <ul>
                    <li v-for="item in TypeResults">
                        {{item}}
                    </li>
                </ul>
            </div>
            <div class="CompleteButton">
                <el-button type="danger" class="CompleteBtn" @click="jumpRecord">完成</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Results",
        data() {
            return {
                title: '职业测评',
                results:'评测结果',
                typeTitle: 'ENTP型',
                TypeResults: [/*
                    '1.反应快、聪明、长于多样事务。',
                    '2.具激励伙伴、敏捷及直言讳专长。',
                    '3.会为了有趣对问题的两面加予争辩。',
                    '4.对解决新及挑战性的问题富有策略，但会轻忽或厌烦经常的任务与细节。',
                    '5.兴趣多元，易倾向于转移至新生的兴趣。',
                    '6.对所想要的会有技巧地找出逻辑的理由。',
                    '7.长于看清础他人，有智能去解决新或有挑战的问题 '*/
                ],
            }
        },
        methods:{
            jumpRecord(){
                this.$router.push('/stu/eval_record')
            },
            getResultData:function(){
                this.$axios.post("record/latestRecord",{id:23}).then(res =>{//sessionStorage.getItem("User")
                    //console.log(res)
                    if((typeof res.data.record.nature) !="undefined"){
                       this.typeTitle = res.data.record.nature.type;
                       this.TypeResults.push(res.data.record.nature.introduction)
                    }else {
                        this.$message.error("暂无数据");
                    }


                })
            }
        },
        mounted() {
            this.getResultData();
        }
    }
</script>

<style scoped>


    #ReviewResultsLeft {
        width: 300px;
        height:160px;
        margin-left: 110px;
        /*padding: 0 30px;*/
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0 0 10px 0 rgba(177, 177, 177, 0.5);
        float: left;
        margin-top: 20px;
    }

    #ReviewResultsLeft .Title {
        width: 240px;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        margin-left: 26px;
    }

    #ReviewResultsLeft .Results {
        width: 300px;
        height: 60px;
        line-height:60px;
        /*padding: 0 30px;*/
        text-align: center;
    }
    #ReviewResultsRight1 {
        width: 700px;
        height: 500px;

        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0 0 10px 0 rgba(177, 177, 177, 0.5);
        float: right;
        padding-left: 50px;
        margin-top: 20px;
        margin-right: 100px;
    }

    .TypeTitle {
        width: 570px;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        margin-top: 30px;
    }

    .TypeResults {
        width: 570px;
        height: 210px;
        margin-top: 20px;
    }

    .TypeResults li {
        height: 30px;
        line-height: 30px;
        list-style: none;
    }

     .CompleteButton {
        margin-top: 60px;
        height: 100px;
    }
</style>
<style>
    .CompleteBtn{
        width: 190px;
        height: 45px;
    }
</style>