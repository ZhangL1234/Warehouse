<template>
    <div >
        <div class="BoxLeft">
            历史测评记录
        </div>
        <div class="BoxRight">
            <el-row :gutter="24" >
                <el-col :span="6"><div class="grid-content bg-purple" v-for="item in list" :key="item" style="margin-top: 20px">{{item}}</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple" v-for="s in list1" :key="s" style="margin-top: 20px;">{{s}}</div></el-col>
            </el-row>

            <el-button type="danger" @click="start">开始答题</el-button>
        </div>

    </div>

</template>

<script>
    export default {
        data(){
            return{
                list: ['评测结果: ENTP型','评测结果: ENTP型','评测结果: ENTP型','评测结果: ENTP型'],
                list1:['评估时间: 2019-06-25','评估时间: 2019-06-25','评估时间: 2019-06-25','评估时间: 2019-06-25']
            }
        },
        methods:{
            start(){
                 this.$router.replace('/main_content/evaluate')
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