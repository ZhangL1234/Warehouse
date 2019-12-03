<template>
    <div id="frame">
        <div class="subcoat">
            <el-form>
                <div class="project">项目完成</div>
                <el-input class="seek" v-model="input" placeholder="搜索" prefix-icon="el-icon-search" style="width:748px"></el-input>
            </el-form>
            <el-tabs class="details" tab-position="left">
                <el-tab-pane label="已完成">
                    <el-table :data="tables_finished" style="width:100%;height:442px;overflow:scroll;">
                        <el-table-column prop="id" label="项目序号">
                        </el-table-column>
                        <el-table-column prop="name" label="项目">
                        </el-table-column>
                        <el-table-column prop="createDate" label="开始时间">
                        </el-table-column>
                        <el-table-column prop="deadline" label="截止时间">
                        </el-table-column>
                        <el-table-column prop="progress" label="项目进度">
                        </el-table-column>
                        <el-table-column prop="status" label="项目状态">
                        </el-table-column>
                        <el-table-column prop="size" label="任务数量">
                        </el-table-column>
                        <el-table-column prop="endTask" label="超时提醒">
                            <template slot-scope="scope">
                                <el-button type="success" icon="el-icon-check" circle size="mini" v-if="scope.row.endTask"></el-button>
                                <el-button type="danger"
                                           icon="el-icon-warning-outline"
                                           circle
                                           size="mini"
                                           v-else></el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目详情">
                            <template slot-scope="scope">
                                <span class="el-icon-edit" @click="edit_1(scope.row.id)" style="color:blue">详情</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <span class="el-icon-delete" @click="delete_1(scope.row,scope.$index)" style="color:blue">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="进行中">
                    <el-table :data="tables_underway" style="width:100%;height:442px;overflow:scroll;">
                        <el-table-column prop="id" label="项目序号">
                        </el-table-column>
                        <el-table-column prop="name" label="项目">
                        </el-table-column>
                        <el-table-column prop="createDate" label="开始时间">
                        </el-table-column>
                        <el-table-column prop="deadline" label="截止时间">
                        </el-table-column>
                        <el-table-column prop="progress" label="项目进度">
                        </el-table-column>
                        <el-table-column prop="status" label="项目状态">
                        </el-table-column>
                        <el-table-column prop="size" label="任务数量">
                        </el-table-column>
                        <el-table-column prop="endTask" label="超时提醒">
                            <template slot-scope="scope">
                                <el-button type="success" icon="el-icon-check" circle size="mini" v-if="scope.row.endTask"></el-button>
                                <el-button type="danger"
                                           icon="el-icon-warning-outline"
                                           circle
                                           size="mini"
                                           v-else></el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目详情">
                            <template slot-scope="scope">
                                <span class="el-icon-edit" @click="edit_1(scope.row.id)" style="color:blue">详情</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <span class="el-icon-delete" @click="delete_1(scope.row,scope.$index)" style="color:blue">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<style>
    .project {
        height: 30px;
        left: 61px;
        top: 35px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
        position: absolute;
    }

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

    .subcoat {
        position: relative;
    }

    .details {
        width: 1222px;
        height: 587px;
        left: 45px;
        top: 116px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 15px;
        line-height: 160%;
        text-align: left;
        font-weight: bold;
        position: absolute;
    }

    .seek {
        width: 557px;
        height: 35px;
        left: 210px;
        top: 57px;
        text-indent: 10px;
        color: rgba(176, 176, 176, 1);
        border-radius: 18px;
        font-size: 12px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }
</style>
<script>
    export default {
        name:"finished",
        data() {
            if (sessionStorage.getItem("UserCharacter") == '管理员') {
                this.$axios.post("project/list", {}).then(back => { console.log("返回值:", back) });
                this.$axios.post("project/list", {}).then(back => {
                    let i, j, m,n;
                    m = 0; n = 0;
                    for (i = 0; i < back.data.list.length; i++) {
                        if (back.data.list[i].status == '已完成') {
                            this.tableData_finished.push({ id: back.data.list[i].id, name: back.data.list[i].name, description: back.data.list[i].description, members: [], members_name: [], createDate: back.data.list[i].createDate, deadline: back.data.list[i].deadline, teams: [], progress: back.data.list[i].progress, status: back.data.list[i].status, size: back.data.list[i].size, endTask: back.data.list[i].endTask });
                            for (j = 0; j < back.data.list[i].users.length; j++) {
                                this.tableData_finished[m].members.push({ id: back.data.list[i].users[j].id, name: back.data.list[i].users[j].name });
                                if (j != back.data.list[i].users.length - 1) { this.tableData_finished[m].members_name.push(back.data.list[i].users[j].name + ',') }
                                else { this.tableData_finished[m].members_name.push(back.data.list[i].users[j].name) }
                            }m++;
                        }
                    }
                    for (i = 0; i < back.data.list.length; i++) {
                        if (back.data.list[i].status == '进行中') {
                            this.tableData_underway.push({ id: back.data.list[i].id, name: back.data.list[i].name, description: back.data.list[i].description, members: [], members_name: [], createDate: back.data.list[i].createDate, deadline: back.data.list[i].deadline, teams: [], progress: back.data.list[i].progress, status: back.data.list[i].status, size: back.data.list[i].size, endTask: back.data.list[i].endTask });
                            for (j = 0; j < back.data.list[i].users.length; j++) {
                                this.tableData_underway[n].members.push({ id: back.data.list[i].users[j].id, name: back.data.list[i].users[j].name });
                                if (j != back.data.list[i].users.length - 1) { this.tableData_underway[n].members_name.push(back.data.list[i].users[j].name + ',') }
                                else { this.tableData_underway[n].members_name.push(back.data.list[i].users[j].name) }
                            } n++;
                        }
                    }
                    //for (i = 0; i < back.data.list.length; i++) {
                    //for (j = 0; back.data.list[i].teams,length; i++) {
                    //this.tableData_finished[i].teams.push({ id: back.data.list[i].teams[j].id, name: back.data.list[i].teams[j].name })
                    //}
                    // }
                });
            }
            else {
                this.$axios.post("project/findProjectsByUserId", { user_id: sessionStorage.getItem("UserId") }).then(back => { console.log("返回值:", back) });
                this.$axios.post("project/findProjectsByUserId", { user_id: sessionStorage.getItem("UserId") }).then(back => {
                    let i, j, m, n;
                    m = 0, n = 0;
                    for (i = 0; i < back.data.findProjectsByUserId.content.length; i++) {
                        if (back.data.findProjectsByUserId.content[i].status == '已完成') {
                            this.tableData_finished.push({ id: back.data.findProjectsByUserId.content[i].id, name: back.data.findProjectsByUserId.content[i].name, description: back.data.findProjectsByUserId.content[i].description, members: [], members_name: [], createDate: back.data.findProjectsByUserId.content[i].createDate, deadline: back.data.findProjectsByUserId.content[i].deadline, teams: [], progress: back.data.findProjectsByUserId.content[i].progress, status: back.data.findProjectsByUserId.content[i].status, size: back.data.findProjectsByUserId.content[i].size, endTask: back.data.findProjectsByUserId.content[i].endTask });
                            for (j = 0; back.data.findProjectsByUserId.content[i].users != null && j < back.data.findProjectsByUserId.content[i].users.length; j++) {
                                this.tableData_finished[m].members.push({ id: back.data.findProjectsByUserId.content[i].users[j].id, name: back.data.findProjectsByUserId.content[i].users[j].name })
                                if (j != back.data.findProjectsByUserId.content[i].users.length - 1) { this.tableData_finished[m].members_name.push(back.data.findProjectsByUserId.content[i].users[j].name + ',') }
                                else { this.tableData_finished[m].members_name.push(back.data.findProjectsByUserId.content[i].users[j].name) }
                            } m++;
                        } 
                    }
                    this.$axios.post("project/findProjectsByUserId", { user_id: sessionStorage.getItem("UserId") }).then(back => { console.log("返回值:", back) });
                    this.$axios.post("project/findProjectsByUserId", { user_id: sessionStorage.getItem("UserId") }).then(back => {
                        let i, j;
                        m = 0; n = 0;
                        for (i = 0; i < back.data.findProjectsByUserId.content.length; i++) {
                            if (back.data.findProjectsByUserId.content[i].status == '进行中') {
                                this.tableData_underway.push({ id: back.data.findProjectsByUserId.content[i].id, name: back.data.findProjectsByUserId.content[i].name, description: back.data.findProjectsByUserId.content[i].description, members: [], members_name: [], createDate: back.data.findProjectsByUserId.content[i].createDate, deadline: back.data.findProjectsByUserId.content[i].deadline, teams: [], progress: back.data.findProjectsByUserId.content[i].progress, status: back.data.findProjectsByUserId.content[i].status, size: back.data.findProjectsByUserId.content[i].size, endTask: back.data.findProjectsByUserId.content[i].endTask });
                                for (j = 0; j < back.data.findProjectsByUserId.content[i].users.length; j++) {
                                    this.tableData_underway[n].members.push({ id: back.data.findProjectsByUserId.content[i].users[j].id, name: back.data.findProjectsByUserId.content[i].users[j].name });
                                    if (j != back.data.findProjectsByUserId.content[i].users.length - 1) { this.tableData_underway[n].members_name.push(back.data.findProjectsByUserId.content[i].users[j].name + ',') }
                                    else { this.tableData_underway[n].members_name.push(back.data.findProjectsByUserId.content[i].users[j].name) }
                                } n++;                                
                            }
                        }

                        //for (i = 0; i < back.data.list.length; i++) {
                            //for (j = 0; back.data.list[i].teams,length; i++) {
                                //this.tableData_underway[i].teams.push({ id: back.data.list[i].teams[j].id, name: back.data.list[i].teams[j].name })
                            //}
                        //}
                    });
                });
            }
            return {
                tableData_finished: [],
                input: '',
                tableData_underway:[]
            }
        },
        methods: {
            edit_1(index) {
                this.$router.push("/project/detail/" + index);
            },
            delete_1(user) {  // 删除功能
                console.log(user.id);
                this.$axios.post("project/delete", { /*description: newObj.project,*/id: user.id });
                location.reload();
            }
        },
        computed: {
            tables_finished() {  // 模糊搜索功能
                const search = this.input;
                if (search) {
                    // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                    // 注意： filter() 不会对空数组进行检测。
                    // 注意： filter() 不会改变原始数组。
                    return this.tableData_finished.filter(data => {
                        // some() 方法用于检测数组中的元素是否满足指定条件;
                        // some() 方法会依次执行数组的每个元素：
                        // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                        // 如果没有满足条件的元素，则返回false。
                        // 注意： some() 不会对空数组进行检测。
                        // 注意： some() 不会改变原始数组。
                        return Object.keys(data).some(key => {
                            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                            return String(data[key]).toLowerCase().indexOf(search) > -1
                        })
                    })

                } return this.tableData_finished;
            },
            tables_underway() {
                const search = this.input;
                if (search) {
                    // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                    // 注意： filter() 不会对空数组进行检测。
                    // 注意： filter() 不会改变原始数组。
                    return this.tableData_underway.filter(data => {
                        // some() 方法用于检测数组中的元素是否满足指定条件;
                        // some() 方法会依次执行数组的每个元素：
                        // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                        // 如果没有满足条件的元素，则返回false。
                        // 注意： some() 不会对空数组进行检测。
                        // 注意： some() 不会改变原始数组。
                        return Object.keys(data).some(key => {
                            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                            return String(data[key]).toLowerCase().indexOf(search) > -1
                        })
                    })

                } return this.tableData_underway;
            }
        }
    }
</script>