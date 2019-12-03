<template>
    <div class="con_wrap">
        <div class="con_left">
            <div class="con_let_top">
                <div class="con_let_main">
                    <div>
                        <h2 class="con_main_tit">，下午好</h2>
                        <h3 class="con_main_time">2019年10月14日</h3>
                    </div>
                    <div class="con_let_top_list">
                        <div>
                            <p>总人数</p>
                            <p>0</p>
                        </div>
                        <div>
                            <p>项目数量</p>
                            <p>0</p>
                        </div>
                        <div>
                            <p>项目完成度</p>
                            <p>0</p>
                        </div>
                        <div>
                            <p>总任务量</p>
                            <p>0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="con_let_bott">
                <h2 class="con_main_tit">项目统计</h2>
                <div class="con_let_bott_main">
                    <div class="con_let_bott_lef">
                        <div class="con_let_bott_nav">
                            <div @click="sta_nav_cli(index)" :class="{sta_nav_cor:sta_nav_cor == index}" v-for="(item,index) in statistics_nav">{{item}}</div>
                        </div>
                    </div>
                    <div class="con_let_bott_rig">
                       <div class="chart_box">
                           <img src="../../assets/chart.png" alt="">
                           <h3>项目完成度</h3>
                       </div>
                        <div class="con_let_bott_rig_lis" v-for="(item,index) in project_details" v-if="index == sta_nav_cor">
                            <div>
                                <h4>{{item.name}}</h4>
                                <h5>项目小组</h5>
                            </div>
                            <div>
                                <h4>{{item.progress}}</h4>
                                <h5>项目小组</h5>
                            </div>
                            <div>
                                <h4>{{item.num}}</h4>
                                <h5>任务数量</h5>
                            </div>
                            <div>
                                <h4>{{item.s_time}}</h4>
                                <h5>剩余工期</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="con_right">
            <div class="con_rig_top">
                <h2 class="con_main_tit">日志</h2>
                <div class="con_rig_top_list">
                    <div v-for="item in journal>
                        <p>{{item.tiem}}</p>
                        <div class="yuan"></div>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </div>
            <div class="con_rig_bottom">
                <h2 class="con_main_tit">任务管理</h2>
                <div>
                    <p class="con_rig_bottom_tit">我发起的任务<span>86</span></p>
                </div>
                <div>
                    <p class="con_rig_bottom_tit">新建任务</p>
                    <div class="form">
                        <el-input v-model="task_name" placeholder="请输入任务标题" class="task_input"></el-input>
                        <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入任务内容"
                                v-model="task_con"
                                class="task_input"
                        >
                        </el-input>
                        <div class="task_select_box">
                            <p>选择项目：</p>
                            <el-select v-model="task_name" placeholder="请选择" class="task_select">
                                <el-option
                                        v-for="item in task_list"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"

                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="task_select_box">
                            <p>完成时间：</p>
                            <el-date-picker
                                    v-model="task_time"
                                    type="datetimerange"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['12:00:00']"
                                    class="task_select"
                            >
                            </el-date-picker>
                        </div>
                        <div>
                            <el-button type="danger" class="button">发布</el-button>
                        </div>
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
            return{

                statistics_nav:['a项目','b项目','c项目','d项目','e项目','f项目','g项目','h项目'],
                project_details:[
                    {name:'a项目',progress:'100%',num:58,s_time:'92小时'},
                    {name:'b项目',progress:'30%',num:59,s_time:'82小时'},
                    {name:'c项目',progress:'40%',num:60,s_time:'72小时'},
                    {name:'d项目',progress:'70%',num:61,s_time:'62小时'},
                    {name:'e项目',progress:'80%',num:62,s_time:'52小时'},
                    {name:'f项目',progress:'20%',num:63,s_time:'42小时'},
                    {name:'g项目',progress:'90%',num:64,s_time:'32小时'},
                    {name:'h项目',progress:'60%',num:65,s_time:'82小时'}
                ],
                sta_nav_cor:0,
                journal:[
                    {tiem:'10月14日 09:12',content:'小王登录系统'},
                    {tiem:'10月14日 14:20',content:'小王开始做任务'},
                    {tiem:'10月14日 15:56',content:'创建项目'},
                    {tiem:'10月14日 16:30',content:'小王登录系统'}
                ],
                task_name:'',
                task_con:'',
                task_list:[
                    {value:'选项1',label:'a项目'},
                    {value:'选项2',label:'b项目'},
                    {value:'选项3',label:'c项目'},
                    {value:'选项4',label:'d项目'},
                ],
                task_time:'',
        
            }
        },
        methods:{
            sta_nav_cli:function (param) {
                console.log(param);
                this.sta_nav_cor = param
            }
        },
        mounted() {
            alert(111);
        }
    }
</script>

<style scoped>
    .con_wrap{
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    .con_left{
        width: 67%;
    }
    .con_wrap>div>div{
        width: 100%;
        padding: 31px;
        background: #fff;
        box-sizing: border-box;
    }

    .con_main_tit{
        font-size: 20px;
        color: rgba(80, 80, 80, 1);
        font-weight: bold;
    }
    .con_main_time{
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
        font-weight: normal;
        margin-top: 10px;
    }
    .con_let_top_list{
        width: 90%;
        margin: 35px auto;
        display: flex;
        justify-content: space-between;
    }
    .con_let_top_list>div{
        width: 25%;
        text-align: center;
    }
    .con_let_top_list>div>p:nth-child(1){
        font-size: 18px;
        color: rgba(80, 80, 80, 1);
    }
    .con_let_top_list>div>p:nth-child(2){
        font-size: 42px;
        color: rgba(80, 80, 80, 1);
        display: block;
        margin-top: 10px;
    }
    .con_let_bott{
        margin-top: 25px;
    }
    .con_let_bott_lef{
        margin-top: 30px;
        width: 20%;
        border-right: 1px solid rgba(153, 153, 153, 1);
    }

    .con_let_bott_main{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .con_let_bott_nav{
        width: 100%;
    }
    .con_let_bott_nav>div{
        width: 100%;
        margin: 20px 0;
        font-size: 20px;
        color: rgba(153, 153, 153, 1);
        padding: 0 40px;
        box-sizing: border-box;
    }
    .con_let_bott_nav>div:nth-child(1){
        margin: 0;
        margin-bottom: 20px;
    }
    .con_let_bott_nav>.sta_nav_cor{
        color: rgba(255, 92, 92, 1);
        border-left: 5px solid rgba(255, 92, 92, 1);
        padding: 0 35px;
    }
    .con_let_bott_rig{
        width: 80%;
    }
    .chart_box{
        margin: 0 auto;
        text-align: center;
    }
    .chart_box h3{
        font-size: 19px;
        color: rgba(157, 157, 157, 1);
        font-weight: normal;
    }
    .con_let_bott_rig_lis>div{
        width: 25%;
    }
    .con_let_bott_rig_lis h4{
        font-size: 25px;
    }
    .con_let_bott_rig_lis h5{
        font-size: 19px;
        font-weight: normal;
        color: rgba(157, 157, 157, 1);
    }
    .con_let_bott_rig_lis{
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin-top: 35px;
    }
    .con_right{
        width: 30%;
    }
    .con_rig_top_list{
        margin-top: 20px;
    }
    .con_rig_top_list>div{
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
    .con_rig_top_list>div>p{
        font-size: 14px;
        color: rgba(157, 157, 157, 1);
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
    .con_rig_bottom{
        margin-top: 25px;
    }
    .con_rig_bottom_tit{
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
    .con_rig_bottom_tit span{
        font-size: 33px;
        font-weight: bold;
        margin-left: 30px;
    }
    .form{
        width: 90%;
        margin: 0 auto;
    }
    .task_input{
        margin-top: 10px;
    }
    .task_select_box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }
    .task_select{
        width: 75%;
    }
    .button{
        width: 100%;
        height: 55px;
        margin-top: 70px;
    }
</style>
