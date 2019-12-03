<template>
    <div class="Box">
        <div class="Title_left">
            题库列表
        </div>
        <div v-for="item in list" :key="item.id" class="Subject">
            {{item}}
            <div >
                <i class="el-icon-edit" style="float: right; margin-top: -10px;margin-right: 20px;font-size: 20px;color: red" @click="edit"></i>
            </div>

          <div v-for="(item,index) in list1" :key="index" class="Option">
              <el-input
                v-model="list1[index]"
                :disabled="true"
              ></el-input>
          </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Item_bank_list",
        data() {
            return {
                list: ['1.当你要外出一整天，你会', '2.当你要外出一整天，你会', '1.当你要外出一整天，你会'],
                list1: ['A.计划你要做什么和在什么时候做', 'B.说做就做'],
                input: ''
            }
        },
        methods:{
            edit(){
                this.$router.replace('/main_content/eval_topics')
            }
        }
    }
</script>

<style scoped>
    .Box{
        width: 1040px;
        height: 700px;
        left: 117px;
        top: 109px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 150%;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        margin-left: 100px;
        margin-top: 10px;
        padding: 30px;
    }
    .Title_left{
        width: 80px;
        height: 30px;
        left: 160px;
        top: 146px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
    }
    .Subject{
        width: 750px;
        margin: 0 auto;
        margin-top: 30px;
    }
    .Option{
        margin-top: 20px;
    }
</style>