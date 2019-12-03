<template>
    <div class="dv1">
        <h2 class="bt">任务{{this.index+1}}</h2>
        <table style="width:620px; height: 450px; position: absolute; left: 43px; top:115px; font-size: 20px;"  cellspacing="0" cellpadding="0">
            <tr>
                <td style="width:120px;">任务名称</td>
                <td style="width: 150px;">{{this.task_list[0].title}}</td>
                <td>发布时间</td>
                <td>{{this.task_list[0].createdate}}</td>
            </tr>
            <tr>
                <td>项目名称</td>
                <td>{{this.task_list[0].project}}</td>
                <td>交付时间</td>
                <td>{{this.task_list[0].deadline}}</td>
            </tr>
            <tr>
                <td>小组名称</td>
                <td>{{this.task_list[0].team}}</td>
                <td>完成状态</td>
                <td>{{this.task_list[0].status}}</td>
            </tr>
            <tr>
                <td>任务介绍</td>
                <td colspan="3">
                    {{this.task_list[0].content}}
                </td>
            </tr>
            <tr>
                <td>伪代码</td>
                <td colspan="3">
                    <textarea style="height:168px; width:400px;">
                        public function index()
                        {
                            // 当前是否为关联查询
                            $this->relationSearch = true;
                        }
                    </textarea>
                </td>
            </tr>
        </table>
        <el-button class="btn1" style="width:239px; height: 55px;" type="info" @click="goBack()">返回</el-button>
        <el-button class="btn2" style="width:239px; height:55px;" type="danger" @click="begin">开始</el-button>
    </div>
</template>

<script>
    export default {
        name: "stu_txrw",
        data(){
            return {
                task_list:[],
                index:''
            }
        },
        methods:{
            goBack() {
                this.$router.go(-1);
            },
            begin() {
                if(this.task_list[0].status == '未开始'){
                    this.$axios.post("projectTasks/changeStatus",{id:this.task_list[0].task_id}).then(res =>{
                        console.log(res);
                        this.$router.push({path:"stu_rwlb"})
                    })
                }else{
                    this.$message.error("该任务不能开始")
                }

            },
            getData(){
                this.$axios.post("projectTasks/findAllByUserId",{user_id:sessionStorage.getItem("User")}).then(res =>{
                    console.log(res);
                    for(var i=0;i<res.data.findByUserId.content.length;i++){
                        if(i == this.index){
                            this.task_list.push({
                                label:"任务"+ (i+1) ,
                                task_id:res.data.findByUserId.content[i].id,
                                title:res.data.findByUserId.content[i].title,//任务名称
                                project:res.data.findByUserId.content[i].project.name,//项目名称
                                team:'11组',//小组名称res.data.findByUserId.content[i].team.name
                                createdate:res.data.findByUserId.content[i].createDate,//发布时间
                                deadline:res.data.findByUserId.content[i].deadline,//交付时间
                                status:res.data.findByUserId.content[i].status,//完成状态
                                score:res.data.findByUserId.content[i].score,//任务得分
                                content:res.data.findByUserId.content[i].content,//任务内容
                            })
                        }
                    }
                })
            }
        },
        mounted() {
            this.getData();
            if(this.$route.query.data == ''){
                this.index = 0;
            }else{
                this.index = this.$route.query.data;
            }

        }
    }
</script>

<style scoped>
    .dv1 {
        position: absolute;
        width: 1447px;
        height: 749px;
        left: 200px;
        top: 109px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 150%;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        text-align: center;
    }

    .bt {
        position: absolute;
        width: 52px;
        height: 30px;
        left: 43px;
        top: 37px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
    }

    .btn1 {
        position: absolute;
        width: 239px;
        height: 55px;
        left: 124px;
        top: 629px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(215, 215, 215, 1);
        border-radius: 6px;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
    }

    .btn2 {
        position: absolute;
        width: 239px;
        height: 55px;
        left: 413px;
        top: 629px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 92, 92, 1);
        border-radius: 6px;
        font-size: 20px;
        line-height: 150%;
        text-align: center;
    }
</style>