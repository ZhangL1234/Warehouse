<template>
    <div id="frame">
        <div class="subcoat">
            <div class="project">编辑项目</div>
            <el-form :model="record">
                <el-form-item class="name" label="项目名称:" :label-width="formLabelWidth">
                    <el-input style="width:748px" v-model="record.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="groups" label="小组:" :label-width="formLabelWidth" size="medium">
                    <el-select style="width:748px" v-model="value5" multiple placeholder="请选择" @change="show_2()">
                        <el-option v-for="item in all_groups"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="members" label="成员:" :label-width="formLabelWidth">
                    <el-select style="width:748px" v-model="value7" multiple placeholder="请选择">
                        <el-option v-for="item in record.members" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="deadline" label="截止时间:" :label-width="formLabelWidth">
                    <el-date-picker v-model="record.deadline" type="date" placeholder="请输入日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="description" label="项目介绍:" :label-width="formLabelWidth">
                    <el-input style="width:748px" v-model="record.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="skip" :label-width="formLabelWidth">
                    <el-button class="return" @click="back">返回</el-button>
                    <el-button class="publish" type="primary" @click="confirm_1">确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default
        {
            name: "edit",
            data() {
                this.$axios.post("project/findProject", {id:this.$route.params.id}).then(back => {
                    let i, j;
                        this.record={ id: back.data.findProject.id, name: back.data.findProject.name, description: back.data.findProject.description, members: [], members_name: [], createDate: back.data.findProject.createDate, deadline: back.data.findProject.deadline, teams: [], progress: back.data.findProject.progress, status: back.data.findProject.status, size: back.data.findProject.size, endTask: back.data.findProject.endTask }
                    //for (i = 0; i < back.data.list.length; i++) {
                        //for (j = 0; back.data.list[i].teams,length; i++) {
                            //this.record[i].teams.push({ id: back.data.list[i].teams[j].id, name: back.data.list[i].teams[j].name })
                        //}
                    //}
                        for (i = 0; i < back.data.findProject.users.length; i++) {
                            this.record.members.push({ id: back.data.findProject.users[i].id, name: back.data.findProject.users[i].name })
                            if (i != back.data.findProject.users.length - 1) { this.record.members_name.push(back.data.findProject.users[i].name + ',') }
                            else { this.record.members_name.push(back.data.findProject.users[i].name) }
                        }
                    for (j = 0; j < this.record.members.length; j++){ this.value7.push(this.record.members[j].id) }
                }
                ); 
                this.$axios.post("team/list", {}).then(back => { console.log("返回值:", back) })
                this.$axios.post("team/list", {}).then(back => {
                    let m;
                    for (m = 0; m < back.data.list.length; m++) {
                        this.all_groups.push({ id: back.data.list[m].id, createDate: back.data.list[m].createDate, name: back.data.list[m].name })
                    }
                });        
                return {
                    record: {},
                    formLabelWidth: '120px',
                    all_groups: [],
                    sub_groups: [],
                    value5: [],
                    value6: [],
                    value7: [],
                    value8: [],
                }
            },
            methods: {
                back() {
                    this.$router.push('/project/list');
                    location.reload();
                },
                show_2() {
                    this.sub_groups = [];
                    this.value7 = [];
                    let i, j;
                    for (i = 0; i < this.value5.length; i++) {
                        this.$axios.post("teamGroup/teamMembers", { id: this.value5[i] }).then(back => {
                            for (j = 0; j < back.data.teamMembers.length; j++) { this.sub_groups.push({ id: back.data.teamMembers[j].user.id, name: back.data.teamMembers[j].user.name }) }
                        })
                    }
                    this.record.members = this.sub_groups;
                    console.log(this.record.members);
                },
                confirm_1() {
                    this.$message({
                        message: "恭喜您,修改成功!",
                        type: 'success'
                    })
let i;
                    for (i = 0; i < this.value7.length; i++)
                        this.value8.push({ id: this.value7[i] })
                    this.$axios.post("project/edit", {id: this.record.id, name: this.record.name, deadline: Date.parse(this.record.deadline), description: this.record.description, users: this.value8})
                    this.$router.push("/project/list");
                    location.reload();
                }
            }
        }
</script>
<style scoped>
    #frame {
        width: 1447px;
        height: 749px;
        left: 117px;
        top: 109px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 150%;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        margin: auto;
    }
    .subcoat{
        position:relative;
    }
    .project {
        width: 80px;
        height: 30px;
        left: 35px;
        top: 37px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
        position: absolute;
    }
    .name {
        height: 53px;
        left: 35px;
        top: 109px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }
    .groups {
        height: 53px;
        left: 35px;
        top: 185px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }
    .members {
        height: 30px;
        left: 35px;
        top: 261px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }
    .deadline {
        width: 100px;
        height: 30px;
        left: 35px;
        top: 337px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }
    .description {
        height: 30px;
        left: 35px;
        top: 413px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
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
    .return {
        width: 239px;
        height: 55px;
        left: 287px;
        top: 642px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(215, 215, 215, 1);
        border-radius: 6px;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
    }
    .publish {
        width: 248px;
        height: 55px;
        left: 573px;
        top: 642px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 92, 92, 1);
        border-radius: 6px;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
    }
</style>