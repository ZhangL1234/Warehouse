<template>
<div class="main">
    <div class="top">
        <div class="top_left">
            <div>
                <h2 class="top_left_title">{{this.name}} {{this.hello}}!</h2>
                <h3 class="top_left_time">{{new Date().getFullYear()+'年'+(new Date().getMonth()+1)+'月'+new Date().getDate()+'日'}}</h3>
            </div>
            <div class="top_left_list">
                <div>
                    <p>项目完成度</p>
                    <p>{{this.ProjectComplections}}</p>
                </div>
                <div>
                    <p>项目数量</p>
                    <p>{{this.ProjectSize}}</p>
                </div>
                <div>
                    <p>任务完成度</p>
                    <p>{{this.TaskComplection}}</p>
                </div>
                <div>
                    <p>总任务量</p>
                    <p>{{this.TaskSize}}</p>
                </div>
            </div>
        </div>
        <div class="top_right">
            <div class="con_rig_top">
                <h2 class="top_left_title">日志</h2>
                <div class="con_rig_top_list">
                    <div v-for="item in journal">
                        <p>{{item.time}}</p>
                        <div class="yuan"></div>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom">
        <div class="bottom_left">
            <div>
                <h2 class="top_left_title">最新任务</h2>
            </div>
            <div class="bottom_left_main" v-for="list in task_list">
                <p>{{list.label}}</p>
<!--                <div class="yuan"></div>-->
                <div class="bottom_left_main_value">{{list.value}}</div>
            </div>
        </div>
        <div class="bottom_right">
            <div class="bottom_left">
                <div>
                    <h2 class="top_left_title">学习进度</h2>
                </div>
                <div class="bottom_right_main">
                  <table class="bottom_right_main_tab" v-for="list in student_list">
                      <tr>
                          <td>{{list.label}}</td>
                          <td><div class="bottom_div">{{list.value}}</div></td>
                      </tr>

                  </table>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
    export default {
        name: "MainContent",
        data() {
            this.$axios.post("tree/userTrees",{id:sessionStorage.getItem("User")}).then(res =>{
                //console.log(res)
                this.student_list.push({label:"技能标题",value:res.data.trees[0].tree.title})
                this.student_list.push({label:"技能内容",value:res.data.trees[0].tree.content})
                this.student_list.push({label:"规定时间",value:res.data.trees[0].tree.allowedTime})
                this.student_list.push({label:"视频链接",value:res.data.trees[0].tree.videoAddress})

            })
             this.$axios.post("home/findProjectAndTask",{id:sessionStorage.getItem("User")}).then(back=>{//项目数量
                 //console.log(back)
                    this.ProjectComplections = back.data.findProjectAndTask.ProjectComplections +"%";
                    this.TaskSize = back.data.findProjectAndTask.TaskSize;
                    this.TaskComplection = back.data.findProjectAndTask.TaskComplection +"%";
                    this.ProjectSize = back.data.findProjectAndTask.ProjectSize;
             });
            this.$axios.post("projectTasks/findAllByUserId",{user_id:sessionStorage.getItem('User')}).then(back=>{
                this.name = back.data.findByUserId.content["0"].user.name;
                this.task_list[0].value = back.data.findByUserId.content["0"].title;
                this.task_list[1].value = back.data.findByUserId.content["0"].project.name;
                this.task_list[2].value = back.data.findByUserId.content["0"].team.name;
                this.task_list[3].value = back.data.findByUserId.content["0"].content;

            });
            //this.$axios.post("SystemJournal/getWeek",{}).then(back=>{console.log(back)});
            //this.$axios.post("projectTasks/findAllByUserId",{user_id:sessionStorage.getItem('User')}).then(back=>{console.log(back)});
            //this.$axios.post("home/query",{}).then(back =>{console.log(back)})
            this.$axios.post("SystemJournal/getWeek",{}).then(back =>{
                for(var i=0;i<back.data.getWeek.length;i++){
                    this.message = sessionStorage.getItem('name') + '登录了系统';
                    this.journal.push({time:back.data.getWeek[i][2],content:this.message})
                }
            });
            return{
                message:'',
                TaskComplection:'',//任务完成度
                ProjectSize:'',//项目数量
                ProjectComplections:'',//项目完成度
                TaskSize:'',//总任务量
                //teamMembers:'',
                name:'',//当前登录用户姓名
                hello:'',//欢迎信息
                sta_nav_cor:0,
                journal:[],
                task_name:'',
                task_con:'',
                task_list:[
                    {label:'任务名称',value:''},
                    {label:'项目名称',value:''},
                    {label:'小组名称',value:''},
                    {label:'任务内容',value:''},
                ],
                student_list:[],

            }
        },
        methods:{
            sta_nav_cli:function (param) {
                console.log(param);
                this.sta_nav_cor = param
            },
            dateFormat(date){
                return date.getFullYear();
            }
        },
        mounted() {

            if(new Date().getHours() >=8 && new Date().getHours() <11){
                this.hello = "上午好";
            }else if(new Date().getHours() >=11 && new Date().getHours() <13){
                this.hello = "中午好";
            }else if(new Date().getHours() >=13 && new Date().getHours()<18){
                this.hello = "下午好"
            }else if(new Date().getHours() >=18 && new Date().getHours() <=24){
                this.hello = "晚上好";
            }else if(new Date().getHours() >24 && new Date().getHours() <8){
                this.hello = "晚上好";
            }
        }
    }
</script>

<style scoped>
    body{
        margin:0;
        padding:0;
        top:0;
    }
    .main{
        margin:0 auto;
        width: 1452px;
        height:882px;
        margin-top:30px;

    }
    .top{
        width:100%;
        height:273px;
    }
    .bottom{
        width:100%;
        height:584px;
        margin-top:25px;
    }
    .top_left{
        width:949px;
        height:100%;
        margin-right:25px;
        float:left;
        background-color:#ffffff;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
    }
    .top_right{
        width:477px;
        height:100%;
        float:right;
        background-color:#ffffff;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
    }
    .bottom_left{
        width:701px;
        height:100%;
        float:left;
        background-color:#ffffff;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
    }
    .bottom_right{
        width:710px;
        height:100%;
        float:right;
        background-color:#ffffff;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
    }
    .top_left>div{
        margin-left: 37px;
        margin-top: 31px;
    }
    .top_left_list{
        width: 90%;
        margin: 35px auto;
        display: flex;
        justify-content: space-between;
    }
    .top_left_list>div{
        width: 25%;
        text-align: center;
    }
    .top_left_list>div>p:nth-child(1){
        font-size: 18px;
        color: rgba(80, 80, 80, 1);
    }
    .top_left_list>div>p:nth-child(2){
        font-size: 42px;
        color: rgba(80, 80, 80, 1);
        display: block;
        margin-top: 10px;
    }
    .top_left_title{
        font-size: 20px;
        color: rgba(80, 80, 80, 1);
        font-weight: bold;
    }
    .top_left_time{
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
        font-weight: normal;
        margin-top: 10px;
    }
    .con_rig_top_list{
        margin-top: 40px;

    }
    .con_rig_top_list>div{
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
    .con_rig_top_list>div>p{
        font-size: 14px;
        color: rgba(80, 80, 80, 1);
        padding: 0 10px;
    }
    .con_rig_top_list>div>p:nth-child(1){
        padding-left: 0;
    }
    .yuan{
        width: 5px;
        height: 5px;
        background: rgba(157, 157, 157, 1);
        border-radius: 50%;
    }
    .con_rig_top{
        margin-top: 24px;
        margin-left: 22px;
    }
    .bottom_left>div{
        margin-left: 37px;
        margin-top:24px;
    }
    .bottom_left_main{
        margin-top:44px;
    }
    .bottom_left_main>p:nth-child(1){
        font-size: 20px;
        color: rgba(80, 80, 80, 1);
        float: left;
        margin-right: 30px;
        margin-top:48px;

    }
    .bottom_left_main_value{
        width:468px;
        float:right;
        font-size: 20px;
        color: rgba(80, 80, 80, 1);
        margin-top:48px;
        margin-right:49px;
    }
    .bottom_right_main_tab{
        margin-top: 48px;
        font-size: 20px;
        color:rgba(80, 80, 80, 1);
    }
    .bottom_div{
        margin-left:45px;
        width:499px;
    }

</style>
