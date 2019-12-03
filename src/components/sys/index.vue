<template>
    <div class="sys_index">
        <el-container>
            <el-header style="background-color: #fff; box-shadow: 0px -5px 10px 0px #505050;box-sizing: border-box">
                <sys_head></sys_head>
            </el-header>
            <el-main>
                <router-view ></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import sys_head from './head/index'

    export default {
        name: "sys_index",
        components:{
            "sys_head": sys_head
        }
    //     data() {
    //         return {
    //             data1:{
    //                name:'家装小程序',
    //                id :"1",
    //                 children:[{
    //                     name:'首页',
    //                     id :"1.1",
    //                },
    //                {
    //                    name:'智能推荐',
    //                    id :"1.2",
    //                children:[{
    //                 name:'装修计算机',
    //                id :"1.2.1",
    //                }]
    //                },
    //                {
    //                 name:'家装分享',
    //                    id :"1.3",
    //                    children:[{
    //                        name: '屋主',
    //                        id: '1.3.1',
    //                         children: [
    //                              {name: '分享',
    //                               id: '1.3.1.1'
    //                             },
    //                             {
    //                                 name: '收藏',
    //                                 id: '1.3.1.2'
    //                             },
    //                             {
    //                                 name: '评论',
    //                                 id: '1.3.1.3'
    //                             },
    //                             {
    //                                 name: '点赞',
    //                                 id: '1.3.1.4'
    //                                     }
    //                                 ]
    //                             },
    //                         {
    //                         name: '设计师',
    //                         id: '1.3.2',
    //                             children: [
    //                             {
    //                                 name: '分享',
    //                                 id: '1.3.2.1'
    //                             },
    //                             {
    //                                 name: '收藏',
    //                                 id: '1.3.2.2'
    //                             },
    //                             {
    //                                 name: '评论',
    //                                 id: '1.3.2.3'
    //                             },
    //                             {
    //                                 name: '点赞',
    //                                 id: '1.3.2.4'
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                },
    //                {name:'商品类型',
    //                id :"1.4",}
    //                ]
    //            }
    //        }
    // }
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
</style>