<template>
    <div class="hos_head">
        <div class="logo">
            <div>
                <img src="@/assets/logo.png" class="logoc"/>
            </div>
            <div class="aname">鲤鱼云平台</div>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="showbgitem">
            <el-menu-item index="1" @click="toindex">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">测评答题</template>
                <el-menu-item index="2-1" @click="toanswer">答题测评</el-menu-item>
                <el-menu-item index="2-2" @click="toreview">测评结果</el-menu-item>
                <el-menu-item index="2-3" @click="toeval">历史评估记录</el-menu-item>
            </el-submenu>
            <el-menu-item index="3" v-bind:class="{chbg: this.bg}">知识树</el-menu-item>
            <el-menu-item index="4">我的小组</el-menu-item>
            <el-menu-item index="5">我的任务</el-menu-item>
            <el-menu-item index="6">工作报告</el-menu-item>
            <el-menu-item index="7">我的评估</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "hos_head",
        data: function () {
            return {
                activeIndex: '3',
                bg: false
            }
        },
        props: ['data1'],
        methods: {
            showbgitem: function (key) {
                if (key == '3') {
                    this.bg = true
                }
                else {
                    this.bg = false
                }
            },
            toindex: function () {
                this.$router.push({
                    path: '/hos'
                })
            },
            toanswer: function () {
                this.$router.push({
                    path: '/hos/answer'
                })
            },
            toreview: function () {
                this.$router.push({
                    path: '/hos/review_results'
                })
            },
            toeval: function () {
                this.$router.push({
                    path: '/hos/eval_record'
                })
            }
        }
    }
</script>

<style scoped>
    .logo {
        display: flex;
        justify-content: left;
        float: left;
        size: auto;
    }

    .logoc {
        width: 50px;
        height: 50px;
        float: left;
        margin-left: 40px;
    }

    .el-menu-demo {
        display: flex;
        justify-content: space-between;
        min-height: 50px;
    }

    .aname {
        margin-top: 15px;
        margin-left: 30px;
        font-size: 20px;
        text-align: center;
        color: #383838;
        width: 150px;
    }

    .chbg {
        background-color: #ff5c5c;
    }
</style>