<template>
    <div id="hos-id">
        <el-container>
            <el-header style="background-color: #fff; box-shadow: 0px -5px 10px 0px #505050;box-sizing: border-box">
                <hos_head></hos_head>
            </el-header>
            <el-main>
                <router-view v-bind:data1="data1"></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Hos_head from './head/index'

    export default {
        name: "hos_index",
        components: {
            "hos_head": Hos_head
        },
        data() {
            return {
                data1: {
                    name: "家装小程序",
                    id: "1",
                    children: [
                        {
                            name: "首页",
                            id: '1.1'
                        },
                        {
                            name: "商品类型",
                            id: '1.2'
                        },
                        {
                            name: "智能推荐",
                            id: '1.3',
                            children: [
                                {
                                    name: '装修计算器',
                                    id: '1.3.1'
                                }
                            ]
                        },
                        {
                            name: "家装分享",
                            id: '1.4',
                            children: [
                                {
                                    name: '屋主',
                                    id: '1.4.1',
                                    children: [
                                        {
                                            name: '分享',
                                            id: '1.4.1.1'
                                        },
                                        {
                                            name: '收藏',
                                            id: '1.4.1.2'
                                        },
                                        {
                                            name: '评论',
                                            id: '1.4.1.3'
                                        },
                                        {
                                            name: '点赞',
                                            id: '1.4.1.4'
                                        }
                                    ]
                                },
                                {
                                    name: '设计师',
                                    id: '1.4.2',
                                    children: [
                                        {
                                            name: '分享',
                                            id: '1.4.2.1'
                                        },
                                        {
                                            name: '收藏',
                                            id: '1.4.2.2'
                                        },
                                        {
                                            name: '评论',
                                            id: '1.4.2.3'
                                        },
                                        {
                                            name: '点赞',
                                            id: '1.4.2.4'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>