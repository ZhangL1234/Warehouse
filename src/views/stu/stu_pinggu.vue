<template>
    <div class="main">
        <div class="bt">我的评估</div>
        <el-table
                :data="tableData"
                style="width: 600px; padding-left: 37px " >
            <el-table-column
                    prop="one"
                    label=""
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="two"
                    label=""
            >
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: "myassessment",
        data() {
            this.$axios.post("staffAssess/findByUserId",{id:sessionStorage.getItem("User")}).then(res =>{
               console.log(res);
               this.tableData.push({
                   one: '姓名',
                   two: res.data.list[0].user.name
               },
                   {
                       one: '任务完成度',
                       two: res.data.list[0].complete
                   },
                   {
                       one: '心里素质',
                       two: res.data.list[0].quality
                   },
                   {
                       one: '职业技能',
                       two: res.data.list[0].skill
                   },
                   {
                       one: '评价',
                       two: res.data.list[0].evaluation
                   });
            });
            return {

                tableData: []
            }
        }
    }
</script>

<style scoped>
    .main{
        width: 1447px;
        height: 749px;
        left: 117px;
        top:109px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 150%;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);

        margin: 0 auto;
    }
    .bt{
        width: 80px;
        height: 30px;
        margin-left: 46px;
        padding-top: 37px;
        color: rgba(80, 80, 80, 1);
        font-size: 18px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
    }
</style>