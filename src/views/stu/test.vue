<template>
    <div>
        <el-row type="flex" justify="space-around">
            <el-col :span="9">
                <div class="grid-content ">
                    <p class="p-box">技能树-列表</p>
                    <p class="p_box">{{this.title}}</p>

                    <div class="sec-box">
                        <div>
                            <el-tree
                                    :data="data2"
                                    default-expand-all
                                    node-key="id"
                                    ref="tree"
                                    @node-click="getId"
                                    highlight-current>
                            </el-tree>
                        </div>
                    </div>

                </div>
            </el-col>

            <el-col :span="13">
                <div class="grid-content1 ">
                    <div>
                        <!--<editimage v-bind:data1="data1"></editimage>-->
                        <div class="dv_right">
                            <span class="xxnr">学习内容</span>
                            <div class="p1">
                                <p>
                                    {{this.task[0].content}}
                                </p>

                            </div>
                            <span class="gdsc">规定时长</span>  <p class="p2">{{this.task[0].allowedTime}}</p>
                            <span class="splj">视频链接</span> <a class="a1" href="#">{{this.task[0].videoAddress}}</a>
                            <span class="wblj">文本连接</span> <a class="a2" href="#">{{this.task[0].textAddress}}</a>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //import TreeMenu from './TreeMenu.vue'
    export default {
        name: "edit",
        inject:['reload'],
        data() {
            this.$axios.post("treeNode/list",{id:1}).then(res =>{
                //console.log(res)
                // this.title = res.data.list.content[0].treeNode.tree.title;
                for(var i=0;i<res.data.children.length;i++){
                    this.children.push({
                        label:res.data.children[i].title,
                        id:res.data.children[i].id,
                        pid:res.data.children[i].parentId,
                        children:[],
                    })
                    if(res.data.children[i].children.length>0){
                        for(var j=0;j<res.data.children[i].children.length;j++){
                            this.children[i].children.push({
                                label:res.data.children[i].children[j].title,
                                id:res.data.children[i].children[j].id,
                                pid:res.data.children[i].children[j].parentId,
                                children:[],
                            })
                            if(res.data.children[i].children[j].children.length>0){
                                for(var z=0;z<res.data.children[i].children[j].children.length;z++){
                                    this.children[i].children[j].children.push({
                                        label:res.data.children[i].children[j].children.title,
                                        id:res.data.children[i].children[j].children.id,
                                        pid:res.data.children[i].children[j].children.parentId,
                                        children:[],
                                    })
                                }

                            }
                        }

                    }

                }
                this.data2.push({
                    pid:0,
                    id:1,
                    label:'java',
                    children:this.children,
                })

            })
            this.$axios.post("tree/treeDetails",{id:1}).then(res=>{
                //console.log(res);
                if(res.data.TreeDetail != null){
                    this.title = res.data.TreeDetail.title;
                    if(res.data.TreeDetail.content != null &&
                        res.data.TreeDetail.allowedTime != null &&
                        res.data.TreeDetail.videoAddress != null &&
                        res.data.TreeDetail.textAddress != null){
                        this.task.push({
                            title : res.data.TreeDetail.title,
                            content :res.data.TreeDetail.content,
                            allowedTime : res.data.TreeDetail.allowedTime,
                            videoAddress : res.data.TreeDetail.videoAddress,
                            textAddress : res.data.TreeDetail.textAddress,
                        });
                    }else {
                        this.task.push({
                            title : res.data.TreeDetail.title,
                            content :"暂无数据",
                            allowedTime : "暂无数据",
                            videoAddress : "暂无数据",
                            textAddress : "暂无数据",
                        });
                    }
                }else{
                    this.task.push({
                        title : res.data.TreeDetail.title,
                        content :"暂无数据",
                        allowedTime : "暂无数据",
                        videoAddress : "暂无数据",
                        textAddress : "暂无数据",
                    });
                }
            })


            return {
                list1:[],
                task:[],
                list:[],
                children:[],
                data1:[],
                title:'',
                data2:[],
                treeNodeId:1,
                id:1,
            }
        },
        components: {
            //"tree-menu": TreeMenu
        },
        methods: {
            handleMore() {
                this.$router.push('/stu/show')
            },
            getId() {
                this.reload();
                //alert(this.id);
                //this.id = this.$refs.tree.getCurrentKey();
                //sessionStorage.setItem("treeId",this.$refs.tree.getCurrentKey());
            },
        },
        mounted() {
        }
    }
</script>

<style scoped>

    .grid-content {
        border-radius: 1px;
        min-height: 749px;
        margin-left: 40px;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        background: #ffffff;
        width:685px;
    }

    .grid-content1 {
        min-height: 749px;
        width:726px;
    }
    .p-box {
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
        margin-left: 41px;
        padding-top:41px;
    }
    .p_box{
        margin-left:41px;
        color: #2a82e4;
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        padding-top:20px;
    }

    .sec-box {
        float: left;
        margin: 41px;
        width: 80%;
        height: 70%;
        max-height: 600px;
        /* 内容超出自动添加滚动条 */
        overflow: auto;
    }

    .root-tree {
        border: none;
        font-size: 20px;
        /* 实现红色的竖线居于原点之下 */
    }
    .dv_right {
        width: 756px;
        height: 749px;
        position: absolute;
        left: 800px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 150%;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        float:right;
    }


    .xxnr {
        position: absolute;
        width: 123px;
        height: 46px;
        left: 48px;
        top: 59px;
        color: rgba(33, 33, 33, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
    }

    .p1 {
        position: absolute;
        width: 647px;
        height: 182px;
        left: 48px;
        top: 105px;
        color: rgba(136, 136, 136, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
    }

    .gdsc {
        position: absolute;
        width: 123px;
        height: 46px;
        left: 48px;
        top: 335px;
        color: rgba(33, 33, 33, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
    }

    .p2 {
        position: absolute;
        width: 444px;
        height: 46px;
        left: 152px;
        top: 335px;
        color: rgba(136, 136, 136, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
    }

    .splj {
        position: absolute;
        width: 123px;
        height: 46px;
        left: 49px;
        top: 412px;
        color: rgba(33, 33, 33, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
    }

    .a1 {
        position: absolute;
        width: 523px;
        height: 138px;
        left: 172px;
        top: 412px;
        color: rgba(136, 136, 136, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
    }

    .wblj {
        position: absolute;
        width: 123px;
        height: 46px;
        left: 49px;
        top: 549px;
        color: rgba(33, 33, 33, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
    }

    .a2 {
        position: absolute;
        width: 523px;
        height: 138px;
        left: 172px;
        top: 549px;
        color: rgba(136, 136, 136, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
    }

    a {
        text-decoration: none;
    }
</style>
