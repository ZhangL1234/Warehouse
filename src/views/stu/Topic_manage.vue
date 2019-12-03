<template>
    <div class="Box">

        <div class="Title">
            {{Title}}
        </div>

<!--            列表title-->
        <el-table :data="tableData" style="width: 100%" >
            <el-table-column prop="id" label="题库编号" width="150"  >
            </el-table-column>
            <el-table-column prop="name" label="题库名称" width="200" >
            </el-table-column>
            <el-table-column prop="introduce" label="题库介绍" width="300" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="operation" label="操作" width="250" >
                <template slot-scope="scope">
                    <i class="el-icon-plus" style="width: 30px;color:blue" @click="dialogFormVisible = true"></i>
                    <i class="el-icon-edit" style="width: 30px;color:blue" @click="Modify(scope.row,scope.$index)"></i>
                    <i class="el-icon-delete" style="width: 30px;color:blue"  @click="Delect(scope.$index)"></i>
                    <i class=" el-icon-reading" style="color: blue" @click="See"></i>
                </template>
            </el-table-column>
        </el-table>
<!--    添加按钮弹出的界面-->
        <el-dialog title="添加题库" :visible.sync="dialogFormVisible">
<!--            <template slot-scope="scope">-->
            <el-form :model="form">
                <el-form-item label="题库编号" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="题库名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="题库介绍" :label-width="formLabelWidth">
                    <el-input v-model="form.introduce" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">

                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="danger"  @click="AddData()">添 加</el-button>
            </div>
        </el-dialog>
<!--        <div>-->
<!--            <span>在这里测试跳转页面</span>-->
<!--            <input type="button" value="点击跳转" @click="directe()">-->
<!--        </div>-->

    </div>

</template>


<script>
   export default {
        data() {
            return {
                Title: "题库详情",
                tableData: [{
                    id:'1',
                    name: '王小虎',
                    introduce: '上海市普陀区金沙ssssssssssssssssssssssssssssssss江路 1518 弄'
                    },
                    {
                        id:'2',
                        name: '王小虎s ',
                        introduce: '上海市普陀区金沙江sssssssssssssssssssssssssssssssssss路 1518 弄'
                    },
                    {
                        id:'3',
                        name: '王小s',
                        introduce: '上海市普陀区金沙江aaaaaaaaaaaaaaaaaaaaaaaaaa路 1518 弄'
                    }],
                dialogFormVisible: false,
                form: {
                    id: '',
                    name: '',
                    introduce:'',
                    delivery: false,
                },
                formLabelWidth: '120px',
                userIndex:0,
            };
        },
        methods:{
            Modify(){
                this.$router.replace('/main_content/eval_topics')
                // this.$router.push({path: '/main_content/eval_topics',query:{id:'1',name:'小青'}});
            },
            //删除一组数据
            Delect(index){
                this.tableData.splice(index,1)
            },
            AddData()
            {
                let newObj={
                    id:this.form.id,
                    name: this.form.name,
                    introduce:this.form.introduce
                }
                // console.log(newObj)
                this.tableData.push(newObj);
                this.dialogFormVisible = false
            },
            See(){
                this.$router.replace('/main_content/Item_bank_list')
            }
        }
   }

</script>
<style lang="css"> .el-tooltip__popper{ max-width:50% } </style>
<style scoped>
    .Box{
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
        /*border: 1px green solid;*/
        margin: 10px 0;
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

    .el-row {
        margin-bottom: 20px;

    }
    :last-child {
        margin-bottom: 0;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .RowTitle{
        height: 60px;
        background-color: #42b983;
        line-height: 60px;
    }
</style>