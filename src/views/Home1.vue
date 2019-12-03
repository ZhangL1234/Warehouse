<template>
    <el-container>
        <el-header style="background-color: #fff; box-shadow: 0px -5px 10px 0px #505050;box-sizing: border-box">
            <HeadBar1></HeadBar1>
        </el-header>
        <el-main>
<!--            <stu_mainContent></stu_mainContent>-->
            <router-view></router-view>
        </el-main>
        <el-footer>
            <foot-bar></foot-bar>
        </el-footer>
    </el-container>
</template>

<script>
    import HeadBar1 from "./head_bar/HeadBar1";
    import stu_mainContent from "@/views/stu/stu_mainContent";
    import FootBar from "@/views/foot_bar/FootBar";

    export default {
        name: "Home1",
        components: {FootBar, HeadBar1},
        component: {
            HeadBar1,
            FootBar,
            stu_mainContent
        }
    }
</script>

<style scoped>

</style>
