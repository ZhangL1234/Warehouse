<template>
    <div >
        <div class="BoxLeft">
            历史测评记录
        </div>
        <div class="BoxRight">
            <el-row :gutter="24" v-for="item in list">
                <el-col :span="8"><div class="grid-content bg-purple" style="margin-top: 20px">{{item.ans_title}} {{item.ans}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple" style="margin-top: 20px;">{{item.time_title}} {{item.time}}</div></el-col>
            </el-row>

            <el-button type="danger" @click="start">开始答题</el-button>
        </div>

    </div>

</template>

<script>
    export default {
        data(){
            this.$axios.post("record/records",{id:sessionStorage.getItem("User")}).then(res =>{
                //console.log(res)
                if(res.data.records.length >0){
                    for(var i=0;i<res.data.records.length;i++){
                        this.list.push({ans_title:"评估结果：",time_title:"评估时间：",ans:res.data.records[i].nature.type,time:res.data.records[i].createDate});
                    }
                }else {
                    this.$message.error("暂无数据");
                }


            })
            return{
                list: [],
            }
        },
        methods:{
            start(){
                 this.$router.replace('/stu/evaluate')
            }
        }
    }
</script>

<style scoped>
    .BoxLeft{
        width: 300px;
        height: 160px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        text-align: center;
        float: left;
        margin-top: 20px;
        margin-left:110px;
        line-height: 160px;

    }
    .BoxRight{
        width: 700px;
        height: 500px;

        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);

        float: left;
        margin-top: 20px;
        margin-left: 40px;
        padding: 30px;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;

    }
</style>