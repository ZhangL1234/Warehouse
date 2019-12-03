<template>
    <div id="frame">
        <div class="subcoat">
            <div class="skill">技能编辑</div>
            <el-form ref="form" :model="skill_tree" label-width="80px">
                <el-form-item class="headline" label="技能标题:">
                    <el-input style="width:748px">{{}}</el-input>
                </el-form-item>
                <el-form-item class="content" label="技能内容:">
                    <el-input type="textarea" style="width:748px">{{}}</el-input>
                </el-form-item>
                <el-form-item class="time" label="规定时间:">
                    <el-input style="width:748px">{{}}</el-input>
                </el-form-item>
                <el-form-item class="video" label="视频链接:">
                    <el-input>{{}}</el-input>
                </el-form-item>
                <el-form-item class="text" label="文本链接:">
                    <el-input>{{}}</el-input>
                </el-form-item>
                <el-form-item class="skip">
                    <el-button class="return" type="danger" @click="back">返回</el-button>
                    <el-button class="accomplish" @click="accomplish">编辑完成</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
    #frame {
        width: 1447px;
        height: 749px;
        left: 117px;
        top: 109px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 150%;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        margin: auto;
    }
    .subcoat{
        position:relative;
    }
    .skill {
        width: 80px;
        height: 30px;
        left: 43px;
        top: 37px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
        position:absolute
    }
    .accomplish {
        width: 248px;
        height: 55px;
        left: 573px;
        top: 786px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 92, 92, 1);
        border-radius: 6px;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
    }

    .return {
        width: 239px;
        height: 55px;
        left: 287px;
        top: 786px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(215, 215, 215, 1);
        border-radius: 6px;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
    }

    .skip {
        left: 35px;
        top: 687px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }
    .headline {
        height: 30px;
        left: 43px;
        top: 115px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute
    }

    .content {
        height: 30px;
        left: 43px;
        top: 188px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute
    }

    .time {
        height: 30px;
        left: 43px;
        top: 333px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute
    }

    .video {
        height: 30px;
        left: 43px;
        top: 430px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .text {
        height: 30px;
        left: 43px;
        top: 526px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute
    }
</style>