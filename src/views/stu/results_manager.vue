<template>
    <div id="ResultsManagement">
        <div class="Title">{{Title}}</div>

        <div class="Search">
            <div class="SearchBox">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-input v-model="input" placeholder="搜索" prefix-icon="el-icon-search" class="SearchBoxInput"></el-input>
                </el-form>
            </div>

            <div class="ManagementButton">
                <el-button type="danger" class="ManagementBtn" @click="Management">评测题目管理</el-button>
            </div>
        </div>

        <div class="Content">
            <el-table :data="tables" style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="results" label="评测结果">
                </el-table-column>
                <el-table-column prop="times" label="评测次数" width="180">
                </el-table-column>
                <el-table-column prop="caozuo" label="操作" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-edit" @click="editButton(scope.row,scope.$index)"></i>
                        <i class="el-icon-delete" @click="deleteButton(scope.$index)"></i>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="编辑" :visible.sync="edit" width="30%" :before-close="handleClose">
                <el-form :model="objUser">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="objUser.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="日期" :label-width="formLabelWidth">
                        <el-date-picker v-model="objUser.date" type="date" placeholder="请输入日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="评测结果" :label-width="formLabelWidth">
                        <el-input v-model="objUser.results" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="评测次数" :label-width="formLabelWidth">
                        <el-input v-model="objUser.times" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="danger" @click="confirm">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="ReturnButton">
            <el-button type="info" class="ReButton" @click="reTurn">返回</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                Title:"评测结果",
                input:'',
                tableData: [
                    {
                        name: '刘备',
                        date: '2016-05-02',
                        results:'ENTP型',
                        times: 5
                    },
                    {
                        name: '关羽',
                        date: '2016-05-02',
                        results:'ENTP型',
                        times: 5
                    },
                    {
                        name: '张飞',
                        date: '2016-05-02',
                        results:'ENTP型',
                        times: 5
                    },
                    {
                        name: '赵云',
                        date: '2016-05-02',
                        results:'ENTP型',
                        times: 5
                    },
                    {
                        name: '吕布',
                        date: '2016-05-02',
                        results:'ENTP型',
                        times: 5
                    }
                ],
                user:{
                    name:'',
                    date:'',
                    results:'',
                    times:''
                },
                objUser:{},
                index:0,
                edit: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        methods:{
            Management(){  // 评测结果管理按钮
                this.$router.replace('/main_content/Topic_manage');
            },
            editButton(user,index){  // 编辑弹窗功能
                this.edit = true;
                this.index = index;
                this.objUser = {
                    name:user.name,
                    date:user.date,
                    results:user.results,
                    times:user.times
                }
            },
            deleteButton(index){  // 删除功能
                this.$confirm('确认删除？')
                    .then(() => {
                        this.tableData.splice(index,1);
                    })
                    .catch(() => {});
            },
            confirm(){
                this.$set(this.tableData,this.index,this.objUser);
                this.edit = false;
                this.$message({
                    message:"修改成功",
                    type:'success'
                })
            },
            handleClose(){
                this.edit = false;
            },
            reTurn(){
                this.$router.replace('/main_content/review_results');
            }
        },
        computed: {
            tables () {  // 模糊搜索功能
                const search = this.input;
                if (search) {
                    // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                    // 注意： filter() 不会对空数组进行检测。
                    // 注意： filter() 不会改变原始数组。
                    return this.tableData.filter(data => {
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
                }
                return this.tableData;
            }
        }
    }
</script>

<style>
    #ResultsManagement{
        width: 1040px;
        height: 700px;
        padding: 0 30px;
        margin: 0 auto;
        background-color: white;
    }
    .Title{
        width: 240px;
        height: 70px;
        line-height: 70px;
        font-weight: bold;
        margin: 10px 0;
    }
    .Search{
        width: 1000px;
        height: 50px;
        line-height: 50px;
        vertical-align: middle;
        margin: 10px 0;
    }
    .SearchBox{
        width: 700px;
        float: left;
    }
    .SearchBoxInput{
        width: 700px;
    }
    .Content{
        width: 900px;
    }
    .ManagementButton{
        height: 45px;
        width: 200px;
        float: left;
        padding-left: 30px;
    }
    .ManagementBtn{
        height: 45px;
        width: 150px;
    }
    .ReturnButton{
        width: 900px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        float: left;
        /*border: 1px palevioletred solid;*/
        margin-top: 10px;
    }
    .ReButton{
        height: 45px;
        width: 100px;
    }
</style>