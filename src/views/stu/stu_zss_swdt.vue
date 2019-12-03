<template>
    <div>

        <el-row type="flex" justify="space-around">
            <el-col>
                <div class="grid-content1  ">

                    <span class="wz2">技能树-脑图</span><br>
                    <div style="height: 40px;"></div>
                    <span class="wz1">JAVA技能树</span>
                    <div>
                        <showimage v-bind:data1="data1"></showimage>
                    </div>



                </div>
            </el-col>

        </el-row>


    </div>
</template>

<script>
    import showimage from './showimage.vue'
    export default {
        name: "show",
        data() {
            this.$axios.post("treeDetails/list",{id:9}).then(res =>{
                //console.log(res)
                this.title = res.data.list.content[0].treeNode.tree.title;
                for(var i=0;i<res.data.list.content.length;i++){
                    if(res.data.list.content[i].treeNode.parentId !=0){
                        this.list1.push({
                            name:res.data.list.content[i].treeNode.title,
                            parentId:res.data.list.content[i].treeNode.parentId,
                            id:res.data.list.content[i].treeNode.id,
                            children:[]
                        })
                    }
                    if(res.data.list.content[i].treeNode.parentId == 0){
                        this.list.push({
                            name:res.data.list.content[i].treeNode.title,
                            parentId:res.data.list.content[i].treeNode.parentId,
                            id:res.data.list.content[i].treeNode.id,
                            children:[]
                        })
                    }
                }
                for(var j=0;j<this.list1.length;j++){
                    for(var z=0;z<this.list1.length;z++){
                        if(this.list1[j].id == this.list1[z].parentId){
                            this.list1[j].children.push(this.list1[z]);
                        }
                    }
                }
                for(var x=0;x<this.list1.length-1;x++){
                    this.list.push(this.list1[x]);
                }
                for(var y=0;y<this.list.length;y++){
                    for(var s=0;s<this.list.length;s++){
                        if(this.list[y].id == this.list[s].parentId){
                            this.list[y].children.push(this.list[s]);
                        }
                    }
                }
                for(var o=0;o<this.list.length;o++){
                    if(this.list[o].parentId == 0){
                        this.children.push(this.list[o]);
                    }
                }
               this.data1.name = this.title;
                this.data1.id ="1";
                this.data1.children = this.children;

            })
            return {
                list:[],
                list1:[],
                children:[],
                title:'',
                data1: {
                    name:"java技能树",
                    id:"1",
                    children: [{
                        name: 'java第一章',
                        id: "1.1",
                        children:[{
                            name:"java第一章第一节",
                            id:"1.1.1",
                            children:[{
                                name:"java第一章第一节第一课",
                                id:"1.1.1.1"
                            }]
                        }
                        ]
                    },
                        {
                            name: 'java第二章',
                            id: "1.2",
                            children:[{
                                name:"java第二章第一节",
                                id:"1.2.1"
                            }]
                        },]
                }
            }
        },

        components: {

            // "app-tree":TreeV,
            // "app-btn": btnFQ,
            "showimage": showimage,
        },
        methods: {
            handleMore() {
                this.$router.push('/sys/edit')
            }
        }
    }
</script>

<style scoped>

    .grid-content1 {
        border-radius: 1px;
        min-height: 630px;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        background-color: rgba(251, 251, 251, 1);
        width:1452px;
        margin:0 auto;
        padding-top:40px;
    }
    .wz1 {
        color: #00aeff;
        margin-left:41px;

    }
    .wz2{
        font-weight: bold;
        margin-left:41px;
    }
</style>
