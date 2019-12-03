<template>
    <el-container>
        <el-header style="background-color: #fff; box-shadow: 0px -5px 10px 0px #505050;box-sizing: border-box">
            <head-bar></head-bar>
        </el-header>
        <el-main>
            <main-content></main-content>
        </el-main>
        <el-footer>
            <foot-bar></foot-bar>
        </el-footer>
    </el-container>
</template>

<script>
    import HeadBar from "@/views/head_bar/HeadBar";
    import MainContent from "@/views/main_content/MainContent";
    import FootBar from "@/views/foot_bar/FootBar";

    export default {
        name: "Home",
        components: {FootBar, MainContent, HeadBar},
        component: {
            HeadBar,
            FootBar,
            MainContent
        }
    }
</script>

<style scoped>

</style>
