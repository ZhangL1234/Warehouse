<template>
    <div class="main">
        <div class="bt">小组信息</div>
        <el-table
                :data="tableData"
                style="width: 750px; padding-left: 37px " >
            <el-table-column
                    prop="one"
                    label=""
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="two"
                    label=""
            >
            </el-table-column>

        </el-table>
        <div class="groups">
            <div class="btm">小组成员</div>
            <div class="img">
                <el-avatar :size="50" ><img src="../../assets/5.png" /></el-avatar>&nbsp;&nbsp;&nbsp;
                <el-avatar :size="50" ><img src="../../assets/2.png" /></el-avatar>&nbsp;&nbsp;&nbsp;
                <el-avatar :size="50" ><img src="../../assets/3.png" /></el-avatar>&nbsp;&nbsp;&nbsp;
                <el-avatar :size="50" ><img src="../../assets/4.png" /></el-avatar>&nbsp;&nbsp;&nbsp;
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "mygroup",
        data() {
            this.team_id = sessionStorage.getItem('team_id')
            //alert(this.team_id);
            this.$axios.post("team/teamInfo",{id:this.team_id}).then(back => {
                for(var i=0;i<back.data.members.length;i++){
                    if(back.data.members[i].jobs == '组长'){
                        this.leader_id = i;
                    }
                }
                this.tableData.push({one:'小组名称',two:back.data.members[0].team.name});
                this.tableData.push({one:'小组组长',two:back.data.members[0].user.name});
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
    .btm{
        position: absolute;
        padding-left: 47px;
        padding-top: 40px;
    }
    .img{

        padding-left: 150PX;
        padding-top: 20px;
        float: left;


    }
    .group{
        height: 20px;
        width: 400px;

        margin-top: 40px;
        margin-left: 46px;
        line-height: 60px;
    }
    .wz{
        padding-left: 50px;
    }
    .groups{
        padding-top: 10px;
    }


</style>