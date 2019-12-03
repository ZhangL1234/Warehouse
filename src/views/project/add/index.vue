<template>
    <div id="frame">
        <div class="subcoat">
            <div class="project">新建项目</div>
            <el-form :model="form">
                <el-form-item class="name" label="项目名称:" :label-width="formLabelWidth">
                    <el-input style="width:748px" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="groups" label="小组:" :label-width="formLabelWidth">
                    <el-select style="width:748px" v-model="value1" multiple placeholder="请选择" @change="show_1()">
                        <el-option v-for="item in all_groups"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="members" label="成员:" :label-width="formLabelWidth">
                    <el-select style="width:748px" v-model="value3" multiple placeholder="请选择">
                        <el-option v-for="item in sub_groups" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="deadline" label="截止时间:" :label-width="formLabelWidth">
                    <el-date-picker style="width:748px" v-model="form.deadline" autocomplete="off" type="date" placeholder="请输入日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="description" label="项目介绍:" :label-width="formLabelWidth">
                    <el-input style="width:748px" type="textarea" v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="skip" :label-width="formLabelWidth">
                    <el-button class="return" @click="back">返回</el-button>
                    <el-button class="publish" style="margin-left:47px;" type="primary" @click="add_1()">确认发布</el-button>
                </el-form-item>
                <el-form-item class="upload" label="上传文件" :label-width="formLabelWidth">
                    <el-upload class="upload-demo"
                               ref="upload"
                               action="https://upload-z2.qiniup.com"
                               :on-preview="handlePreview"
                               :on-remove="handleRemove"
                               :on-success="handleSuccess"
                               :on-error="handleError"
                               :before-remove="beforeRemove"
                               multiple
                               :data="token"
                               :limit="3"
                               :on-exceed="handleExceed"
                               :file-list="fileList">
                        <el-button class="upload_button" size="mini" icon="el-icon-upload2" slot="trigger">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'add',
        data() {
            this.$axios.post("team/list", {}).then(back => { console.log("返回值:", back) })
            this.$axios.post("team/list", {}).then(back => {
                let m;
                for (m = 0; m < back.data.list.length; m++) {
                    this.all_groups.push({ id: back.data.list[m].id, createDate: back.data.list[m].createDate, name: back.data.list[m].name })
                }
            });
            return {
                tableData: [],
                value1: [],
                value2: [],
                value3: [],
                value4: [],
                sub_groups: [],
                form: {
                    id: '',
                    name: '',
                    description: '',
                    createDate: '',
                    deadline: '',
                    progress: '',
                    status: '',
                    size: '',
                    endTask: '',
                    delivery: false,
                },
                formLabelWidth: '120px',
                all_groups: [],
                fileList: [],
                //fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
                token: {},

            }
        },

        methods: {
            show_1() {
                this.sub_groups = [];
                this.value3 = [];
                let i, j;
                for (i = 0; i < this.value1.length; i++) {
                    this.$axios.post("teamGroup/teamMembers", { id: this.value1[i] }).then(back => {
                        for (j = 0; j < back.data.teamMembers.length; j++) { this.sub_groups.push({ id: back.data.teamMembers[j].user.id, name: back.data.teamMembers[j].user.name }) }
                    })
                }
            },
            add_1() {
                var newObj = {
                    name: this.form.name,
                    deadline: this.form.deadline,
                    description: this.form.description,
                }
                let i, j;
                for (i = 0; i < this.value1.length; i++) {
                    this.value2.push({ id: this.value1[i] })
                }
                for (j = 0; j < this.value3.length; j++) {
                    this.value4.push({ id: this.value3[j] })
                }

                /*for (j = 0; j < back.data.list[i].teams.length; j++) { this.tableData[i].group.push({ id: j + 1, createDate: back.data.list[i].createDate, name: back.data.list[i].teams[j].name }) }

        */
                this.$axios.post("project/add", { name: newObj.name, deadline: Date.parse(this.form.deadline), description: newObj.description, users: this.value4/* ,survive: Boolean(newObj.remind) , teams: newObj.number, /*, progress: newObj.speed, status: newObj.state, teams: newObj.number*/ })/*.then(create => { })*/
                console.log(this.value1);
                console.log(this.value2);
                console.log(this.value3);
                console.log(this.value4);
                this.$router.push("/project/list");
                location.reload();

            },
            back() {
                this.$router.push('/project/list');
                location.reload();
            },
            handleRemove(file, fileList) {
      console.log(file, fileList);
    },
             handlePreview(file) {
      console.log(file);
    },
            handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
            beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
            handleError(err, file) {
      this.$message.error(` ${file.name} 上传失败`);
    },
    handleSuccess(response) {
      console.log(response);
    },
    gettoken() {
      this.$axios({
        url: "Upload/upToken",
        method: "POST",
        data: {}
      })
        .then(res => {
          // console.log("then", res);
          this.token = res.data.getToken;
          // console.log(this.token);
        })
        .catch(() => {});
    }
        },
    created(){
    this.gettoken();}
    }
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

    .publish {
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

    .subcoat {
        position: relative;
    }

    .project {
        width: 80px;
        height: 30px;
        left: 35px;
        top: 37px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
        position: absolute;
    }

    .name {
        height: 53px;
        left: 35px;
        top: 109px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .groups {
        height: 53px;
        left: 35px;
        top: 185px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .members {
        height: 30px;
        left: 35px;
        top: 261px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .deadline {
        width: 100px;
        height: 30px;
        left: 35px;
        top: 337px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .description {
        width: 100px;
        height: 30px;
        left: 35px;
        top: 401px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
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

    .upload {
        height: 30px;
        left: 35px;
        top: 566px;
        color: rgba(33, 33, 33, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        position: absolute;
    }

    .upload_button {
        width: 171px;
        height: 52px;
        left: 160px;
        top: 566px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        border-radius: 3px;
        font-size: 23px;
        line-height: 150%;
        border: rgba(217, 217, 217, 1) solid 1px;
        text-align: center;
    }
</style>