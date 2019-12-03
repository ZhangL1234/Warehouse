<template>
    <div class="main">
        <div class="title">工作情况</div>
        <div>
            <el-form :model="form" :rules="rules" label-width="115px" hide-required-asterisk ref="form"  inline-message>
                <el-form-item label="姓名" prop="name">
                    <el-input style="width:748px;height: 53px;margin-left:80px;" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input style="width:748px;height: 53px;margin-left:80px;" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="毕业时间" prop="gduTime">
                    <el-date-picker
                            v-model="form.gduTime"
                            style="width:748px;margin-left: 80px;"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择毕业时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="工作地点" prop="wokingPlace">
                    <el-input style="width:748px;height: 53px;margin-left:80px;" v-model="form.wokingPlace"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" prop="wokingTime">
                    <el-date-picker
                            v-model="form.wokingTime"
                            style="width:748px;margin-left: 80px;"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择毕业时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="职位" prop="position">
                    <el-input style="width:748px;height: 53px;margin-left:80px;" v-model="form.position"></el-input>
                </el-form-item>
                <el-form-item label="工作内容介绍" prop="woking_introduce">
                    <el-input type="textarea" :rows="3" style="width:748px;margin-left:80px;" v-model="form.woking_introduce"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="fanHui()" style="width:239px; height:55px; margin-left: 165px;" type="info" plain>返回</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button @click="sendForm()"  style="width:239px; height:55px;"  type="danger">填写完成</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                rules:{//表单验证规则
                    name:[
                        {   required: true,
                            message:'请输入姓名',
                            trigger:'blur'
                        }
                    ],
                    position:[
                        {   required:true,
                            message:'请输入用户名',
                            trigger:'blur'
                        }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        {
                            validator: function (rule, value, callback) {
                                var MobileRegex = /^1[0-9]{10}$/;
                                if (!MobileRegex.test(value)) {
                                    callback(new Error('手机号码格式不正确！'))
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
                    ],
                    gduTime:[
                        {
                            type:'string',
                            required:true,
                            message:'请选择毕业日期',
                            trigger:'blur'
                        }
                    ],
                    wokingPlace:[
                        {
                            required:true,
                            message:'工作地点不能为空',
                            trigger:'blur'
                        }
                    ],
                    woking_introduce:[
                        {
                            required:true,
                            message:'工作内容介绍不能为空',
                            trigger:'blur'
                        }
                    ],
                   /* feedback: [
                        {
                            required:true,
                            message:'反馈内容不能为空',
                            trigger:'blur'
                        }
                    ],
                    <el-form-item label="反馈" prop="feedback">
                        <el-input type="textarea" :rows="3" style="width:748px;margin-left:80px;" v-model="form.feedback"></el-input>
                    </el-form-item>
                    */
                    wokingTime: [
                        {
                            required:true,
                            message:'入职时间不能为空',
                            trigger:'blur'
                        }
                    ]
                },
                form:{//表单双向数据绑定
                    name:'',
                    phone:'',
                    gduTime:'',
                    wokingPlace:'',
                    wokingTime:'',
                    position:'',
                    woking_introduce:'',
                    feedback:''
                }
            }
        },
        methods:{
            fanHui() {//返回到上一级方法
                this.$router.go(-1);
            },
            sendForm(){
                if(this.form.name != '' &&
                this.form.phone != '' &&
                this.form.gduTime != '' &&
                this.form.wokingPlace != '' &&
                this.form.wokingTime != '' &&
                this.form.position != '' &&
                this.form.woking_introduce != ''
                ){
                    this.$axios({
                        method: 'POST',
                        url: "user/addInfo",
                        data: {
                            id:sessionStorage.getItem("User"),
                            name:this.form.name,
                            phone:this.form.phone,
                            deadline:this.form.gduTime,
                            jobaddress:this.form.wokingPlace,
                            starttime:this.form.wokingTime,
                            job:this.form.position,
                            workcontent:this.form.woking_introduce
                        }
                    }).then(() =>{
                        //console.log(res)
                        this.$message.success("修改成功")
                        this.$router.push("home");
                    }).catch(err =>{
                        this.$message.error(err+"修改失败")
                    })
                }else{
                    this.$message.error("请填写必填字段")
                }
            },
            getFormData(){
                this.$axios.post("user/userInfo",{id:sessionStorage.getItem("User")}).then(res =>{
                    console.log(res)
                    this.form.name = res.data.user.name;
                    this.form.phone = res.data.user.phone;
                    this.form.deadline = res.data.user.deadline;
                })
            },
            getDate(strDate) {
                var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
                function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
                return date;
    }
        },
        mounted() {
            this.getFormData();
        }
    }
</script>
<style>
    .main{
        background-color: #ffffff;
        width:1452px;
        height:874px;
        margin:0 auto;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);

    }
    .title{
        padding-top: 35px;
        padding-left:37px;
        padding-bottom:42px;
        color: rgba(80, 80, 80, 1);
        font-size: 20px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
    }


</style>