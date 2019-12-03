<template>
    <div id="frame">
        <div class="subcoat">
            <div class="project">项目详情</div>
            <el-form ref="form" :model="objUser" label-width="80px">
                <el-form-item class="name" label="项目名称:">
                    <span style="width:748px">{{objUser.name}}</span>
                </el-form-item>
                <el-form-item class="members" label="成员:">
                    <span style="width:748px">{{objUser.members_name}}</span>
                </el-form-item>
                <el-form-item class="deadline" label="截止时间:">
                    <span style="width:748px">{{objUser.deadline}}</span>
                </el-form-item>
                <el-form-item class="description" label="项目介绍:">
                    <span>{{objUser.description}}</span>
                </el-form-item>
                <el-form-item class="skip">
                    <el-button class="return" type="primary" @click="back">返回</el-button>
                    <el-button class="accomplish" @click="accomplish" v-if="exhibition">完成</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name:"detail",
        data: function () {
            //this.$axios.post("project/findProject", {}).then(back => { console.log("返回值:", back) });
            this.$axios.post("project/findProject", {id:this.$route.params.index}).then(back => {
                let i;
                /*for (i = 0; i < back.data.list.length; i++) {
                    this.tableData.push({ id: back.data.list[i].id, name: back.data.list[i].name, description: back.data.list[i].description, members: [], members_name: [], createDate: back.data.list[i].createDate, deadline: back.data.list[i].deadline, teams: [], progress: back.data.list[i].progress, status: back.data.list[i].status, size: back.data.list[i].size, endTask: back.data.list[i].endTask })
                }
                for (i = 0; i < back.data.list.length; i++) {
                    for (j = 0; back.data.list[i].teams,length; i++) {
                        this.tableData[i].teams.push({ id: back.data.list[i].teams[j].id, name: back.data.list[i].teams[j].name })
                    }
                }
                for (i = 0; i < back.data.list.length; i++) {
                    for (j = 0; j < back.data.list[i].users.length; j++) {
                        this.tableData[i].members.push({ id: back.data.list[i].users[j].id, name: back.data.list[i].users[j].name })
                        if (j != back.data.list[i].users.length - 1) { this.tableData[i].members_name.push(back.data.list[i].users[j].name + ',') }
                        else { this.tableData[i].members_name.push(back.data.list[i].users[j].name) }
                    }
                }*/
                this.objUser = {
                    id: back.data.findProject.id,
                    name: back.data.findProject.name,
                    description: back.data.findProject.description,
                    members: [],
                    members_name: [],
                    createDate: back.data.findProject.createDate,
                    deadline: back.data.findProject.deadline,
                    teams: [],
                    progress: back.data.findProject.progress,
                    status: back.data.findProject.status,
                    size: back.data.findProject.size,
                    endTask: back.data.findProject.endTask
                }
                if (this.objUser.status == '已完成') { this.exhibition = false }
                else { this.exhibition=true }
                for (i = 0; i < back.data.findProject.users.length; i++) {
                    this.objUser.members.push({ id: back.data.findProject.users[i].id, name: back.data.findProject.users[i].name })
                    if (i != back.data.findProject.users.length - 1) { this.objUser.members_name.push(back.data.findProject.users[i].name + ',') }
                    else { this.objUser.members_name.push(back.data.findProject.users[i].name) }
                }
            });
            this.$axios.post("team/list", {}).then(back => { console.log("返回值:", back) })
            this.$axios.post("team/list", {}).then(back => {
                let m;
                for (m = 0; m < back.data.list.length; m++) {
                    this.all_groups.push({ id: back.data.list[m].id, createDate: back.data.list[m].createDate, name: back.data.list[m].name })
                }
            })
            return {
                tableData: [],
                all_groups: [],
                quantity: [],
                objUser: {},
                value5: [],
                value6: [],
                value7: [],
                value8: [],
                formLabelWidth: '120px',
                exhibition:''
            }
        },
        methods: {
            show_2() {
                this.sub_groups = [];
                this.value7 = [];
                let i, j;
                for (i = 0; i < this.value5.length; i++) {
                    this.$axios.post("teamGroup/teamMembers", { id: this.value5[i] }).then(back => {
                        for (j = 0; j < back.data.teamMembers.length; j++) { this.sub_groups.push({ id: back.data.teamMembers[j].user.id, name: back.data.teamMembers[j].user.name }) }
                    })
                }
                this.objUser.members = this.sub_groups;
                console.log(this.value7);
            },
            back() {
                this.$router.push("/project/finished");
                location.reload();
            },
            accomplish() {
                this.$axios.post("/project/doneProject", { id: this.$route.params.index }).then(() => {
                });
                this.$message({
                    showClose: true,
                    message: '恭喜您,项目完成!3秒后自动刷新!',
                    type: 'success'
                });
                this.$router.push("/project/finished");         
                setTimeout(function () {//使用  setTimeout（）方法设定定时2000毫秒
                    window.location.reload();
                    //页面刷新
                },3000);
            }
        }
    }
</script>
<style scoped>
    .return {
        width: 207px;
        height: 55px;
        left: 213px;
        top: 584px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 92, 92, 1);
        border-radius: 6px;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
    }

    .accomplish {
        width: 175px;
        height: 55px;
        left: 496px;
        top: 584px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 92, 92, 1);
        border-radius: 6px;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
    }

    .skip {
        left: 35px;
        top: 489px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .name {
        height: 30px;
        left: 43px;
        top: 99px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .members {
        height: 30px;
        left: 43px;
        top: 175px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .deadline {
        height: 30px;
        left: 43px;
        top: 265px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .description {
        height: 30px;
        left: 43px;
        top: 348px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .project {
        height: 30px;
        left: 43px;
        top: 37px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
        position: absolute;
    }
</style>