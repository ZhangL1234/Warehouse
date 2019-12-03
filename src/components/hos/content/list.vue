<template>
    <div class="list">
        <div class="box_8863X1">
            <p class="text_8886X1">
                技能树-列表
                <button class="icon_752X1" @click="jumpimage" v-bind:data1="data1">跳转思维导图</button>
            </p>
            <div class="text_8887X1">JAVA技能树</div>
            <div class="text_8884X1">
                <div class="box_8871X1" style="display:inline-block" @click="HIDE()"></div>
                {{ZHANGJIE1}}
                <ul v-if="XIANSHI1">
                    <li>
                        <div class="box_8871X1" style="display:inline-block"></div>
                        {{MULU1}}<ul>
                            <li v-for="BIAOTI in BIAOTI1" :key="BIAOTI">
                                <div class="box_8871X1" style="display:inline-block"></div>
                                {{BIAOTI}}
                                <div class="text_9483X2" style="display:inline-block"></div>
                                <span class="text_9483X2" v-if="ZHUANGTAI">{{ZHUANGTAI1}}</span>
                                <span class="text_8904X1" v-else>{{ZHUANGTAI2}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="text_8876X1">
                <div class="box_8871X1" style="display:inline-block" @Click="HIDE()"></div>
                {{ZHANGJIE2}}
                <ul v-if="XIANSHI1">
                    <li>
                        <div class="box_8871X1" style="display:inline-block"></div>
                        {{MULU2[0]}}
                        <div class="text_9483X2" style="display:inline-block"></div>
                        <span class="text_9483X2" v-if="ZHUANGTAI">{{ZHUANGTAI1}}</span>
                        <span class="text_8904X1" v-else>{{ZHUANGTAI2}}</span>
                    </li>
                    <li>
                        <div class="box_8871X1" style="display:inline-block"></div>
                        {{MULU2[1]}}
                        <div class="text_9483X2" style="display:inline-block"></div>
                        <span class="text_9483X2" v-if="ZHUANGTAI">{{ZHUANGTAI1}}</span>
                        <span class="text_8904X1" v-else>{{ZHUANGTAI2}}</span>
                    </li>
                </ul>
            </div>

            <div class="text_8870X1">
                <div class="box_8871X1" style="display:inline-block;"></div>
                {{ZHANGJIE3}}
                <ul v-if="XIANSHI1">
                    <li>
                        <div class="box_8871X1" style="display:inline-block"></div>
                        {{MULU3}}<ul>
                            <li>
                                <div class="box_8871X1" style="display:inline-block"></div>
                                {{BIAOTI3}}
                                <div class="text_9483X2" style="display:inline-block"></div>
                                <span class="text_9483X2" v-if="ZHUANGTAI">{{ZHUANGTAI1}}</span>
                                <span class="text_8904X1" v-else>{{ZHUANGTAI2}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="box_8927X1">
            <div class="text_8929X1">学习内容</div>
            <div class="text_8930X1">{{NEIRONG1}}</div>
            <div class="text_8931X1">规定时长:</div>
            <div class="text_8932X1">{{XIAOSHI1}}小时</div>
            <div class="text_8934X1">视频链接:</div>
            <div class="text_8935X1">{{SHIPIN1}}</div>
            <div class="text_9685X1">文本链接:</div>
            <div class="text_9686X1">{{WENBEN1}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data: function () {
            return {
                ZHANGJIE1: "法、法律的概念",
                ZHANGJIE2: "法、法律的概念",
                ZHANGJIE3: "法律的要素",
                MULU1: "(壹):法的概念",
                MULU2: ["(壹):法的概念", "(贰):法律的概念"],
                MULU3: "完整的法律规范-逻辑",
                BIAOTI1: ["狭义上的法律仅指全国", "完整的法律规范-逻辑"],
                BIAOTI3: "完整的法律规范-逻辑",
                ZHUANGTAI: 0,
                ZHUANGTAI1: "已完成",
                ZHUANGTAI2: "学习中",
                NEIRONG1: "https://learning.dcloud.io/#/?vid=0https://learning.dcloud.io/#/?vid=0https://learning.dcloud.io/#/?vid=0https://learning.dcloud.io/#/?vid=0https://learning.dcloud.io/#/?vid=0",
                XIAOSHI1: "5",
                SHIPIN1: "http://localhost:52942/HTMLPage1.html",
                WENBEN1: "http://localhost:52942/HTMLPage1.html",
                XIANSHI1: true
            }
        },
        methods: {
            jumpimage: function () {
                this.$router.push({
                    path: '/hos/image'
                })

            },
            HIDE: function () {

                this.XIANSHI1 = !this.XIANSHI1;

            }
        },
        props: ['data1'],
    }
</script>

<style scoped>
    .box_8863X1 {
        width: 635px;
        height: 749px;
        left: 117px;
        top: 109px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 150%;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        text-align: center;
        position: fixed;
    }

    .text_8886X1 {
        width: 144px;
        height: 40px;
        left: 161px;
        top: 146px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
        position: fixed;
    }

    .text_8887X1 {
        width: 130px;
        height: 36px;
        left: 161px;
        top: 214px;
        color: rgba(63, 160, 255, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
    }

    .box_8885X1 {
        width: 14px;
        height: 14px;
        left: 38px;
        top: 172px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 92, 92, 1);
        border-radius: 8px;
        font-size: 23px;
        line-height: 150%;
        text-align: center;
        position: absolute;
    }

    .text_8884X1 {
        width: 635px;
        height: 30px;
        left: 192px;
        top: 273px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
    }

    /*.box_8882X1 {*/
    /*    width: 14px;*/
    /*    height: 14px;*/
    /*    left: 75px;*/
    /*    top: 230px;*/
    /*    color: rgba(80, 80, 80, 1);*/
    /*    background-color: rgba(255, 92, 92, 1);*/
    /*    border-radius: 8px;*/
    /*    font-size: 23px;*/
    /*    line-height: 150%;*/
    /*    text-align: center;*/
    /*    position: absolute;*/
    /*}*/

    .text_8883X1 {
        width: 213px;
        height: 30px;
        left: 116px;
        top: 230px;
        color: rgba(255, 92, 92, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .box_8880X1 {
        width: 14px;
        height: 14px;
        left: 116px;
        top: 279px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 92, 92, 1);
        border-radius: 8px;
        font-size: 23px;
        line-height: 150%;
        text-align: center;
        position: absolute;
    }

    .text_8881X1 {
        width: 355px;
        height: 35px;
        left: 156px;
        top: 279px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .box_8878X1 {
        width: 14px;
        height: 14px;
        left: 116px;
        top: 330px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 92, 92, 1);
        border-radius: 8px;
        font-size: 23px;
        line-height: 150%;
        text-align: center;
        position: absolute;
    }

    .text_8879X1 {
        width: 229px;
        height: 30px;
        left: 156px;
        top: 330px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .box_8877X1 {
        width: 14px;
        height: 14px;
        left: 38px;
        top: 401px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 92, 92, 0.5357142857142857);
        border-radius: 8px;
        font-size: 23px;
        line-height: 150%;
        text-align: center;
        position: absolute;
    }

    .text_8876X1 {
        width: 635px;
        height: 30px;
        left: 192px;
        top: 501px;
        color: rgba(80, 80, 80, 0.7214285714285714);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
    }

    .box_8874X1 {
        width: 14px;
        height: 14px;
        left: 75px;
        top: 450px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 92, 92, 0.5357142857142857);
        border-radius: 8px;
        font-size: 23px;
        line-height: 150%;
        text-align: center;
        position: absolute;
    }

    .text_8875X1 {
        width: 213px;
        height: 30px;
        left: 116px;
        top: 450px;
        color: rgba(80, 80, 80, 0.7214285714285714);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .box_8872X1 {
        width: 14px;
        height: 14px;
        left: 75px;
        top: 499px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 92, 92, 0.5357142857142857);
        border-radius: 8px;
        font-size: 23px;
        line-height: 150%;
        text-align: center;
        position: absolute;
    }

    .text_8873X1 {
        width: 233px;
        height: 30px;
        left: 116px;
        top: 499px;
        color: rgba(80, 80, 80, 0.7214285714285714);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .box_8871X1 {
        width: 14px;
        height: 14px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 92, 92, 0.5357142857142857);
        border-radius: 8px;
        font-size: 23px;
        line-height: 150%;
        text-align: center;
    }

    .text_8870X1 {
        width: 635px;
        height: 30px;
        left: 192px;
        top: 662px;
        color: rgba(80, 80, 80, 0.7214285714285714);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
    }

    .box_8868X1 {
        width: 14px;
        height: 14px;
        left: 75px;
        top: 607px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 92, 92, 0.5357142857142857);
        border-radius: 8px;
        font-size: 23px;
        line-height: 150%;
        text-align: center;
        position: absolute;
    }

    .text_8869X1 {
        width: 262px;
        height: 30px;
        left: 116px;
        top: 607px;
        color: rgba(80, 80, 80, 0.7214285714285714);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .box_8927X1 {
        width: 756px;
        height: 749px;
        left: 781px;
        top: 109px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 150%;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        text-align: center;
        position: fixed;
    }

    .text_8929X1 {
        width: 123px;
        height: 46px;
        left: 829px;
        top: 168px;
        color: rgba(33, 33, 33, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed
    }

    .text_8930X1 {
        height: 182px;
        width: 647px;
        left: 829px;
        top: 214px;
        color: rgba(136, 136, 136, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
        word-wrap: break-word;
    }

    .text_8931X1 {
        width: 123px;
        height: 46px;
        left: 829px;
        top: 444px;
        color: rgba(33, 33, 33, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
    }

    .text_8932X1 {
        width: 444px;
        height: 46px;
        left: 937px;
        top: 444px;
        color: rgba(136, 136, 136, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
    }

    .text_8934X1 {
        width: 123px;
        height: 46px;
        left: 830px;
        top: 521px;
        color: rgba(33, 33, 33, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
    }

    .text_8935X1 {
        width: 523px;
        height: 138px;
        left: 953px;
        top: 521px;
        color: rgba(136, 136, 136, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
    }

    .text_9685X1 {
        width: 123px;
        height: 46px;
        left: 830px;
        top: 658px;
        color: rgba(33, 33, 33, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
    }

    .text_9686X1 {
        width: 523px;
        height: 138px;
        left: 953px;
        top: 658px;
        color: rgba(136, 136, 136, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: fixed;
    }

    .box_8867X1 {
        width: 1px;
        height: 158px;
        left: 45px;
        top: 211px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 92, 92, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: center;
        position: absolute;
    }

    ul {
        list-style-type: none;
    }

    .text_9483X2 {
        color: rgba(0, 186, 173, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
    }

    .text_8904X1 {
        color: rgba(42, 130, 228, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
    }

    .icon_752X1 {
        height: 40px;
        left: 618px;
        top: 141px;
        position: fixed;
    }
</style>