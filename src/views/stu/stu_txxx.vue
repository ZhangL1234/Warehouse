<template>
    <div class="main">
            <div class="left">
                <div>
                    <el-form ref="form1" :rules="rules" :model="form" label-width="150px" :hide-required-asterisk="true">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="form.name" placeholder="必填"></el-input>
                        </el-form-item>

                        <el-form-item label="性别" prop="sex">
                            <el-input v-model="form.sex" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="所学专业" prop="professional">
                            <el-input v-model="form.professional" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="form.phone" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="籍贯" prop="Native_place">
                            <el-input v-model="form.Native_place" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="政治面貌" prop="political">
                            <el-input v-model="form.political" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="紧急联系人" prop="Emergency_contact">
                            <el-input v-model="form.Emergency_contact" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="紧急联系人手机号" prop="phone">
                            <el-input v-model="form.Emergency_phone" placeholder="必填"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="right">
                <div>
                    <el-form ref="form1" :rules="rules" :model="form" label-width="150px" hide-required-asterisk="true">
                        <el-form-item label="QQ" prop="qq">
                            <el-input v-model="form.qq" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="微信号" prop="weixin">
                            <el-input v-model="form.weixin" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="家庭住址" prop="family_address">
                            <el-input v-model="form.family_address" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="健康状况" prop="healthy_state">
                            <el-input v-model="form.healthy_state" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="血型" prop="blood_type">
                            <el-input v-model="form.blood_type" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="教育状况" prop="edu_status">
                            <el-input v-model="form.edu_status" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="现有职务" prop="position">
                            <el-input v-model="form.position" placeholder="必填"></el-input>
                        </el-form-item>
                        <el-form-item label="爱好" prop="hobby">
                            <el-input v-model="form.hobby" placeholder="必填"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div style="margin:0 auto; text-align: center; margin-top: 55px;">
                    <el-button  style="width:239px; height:55px;" @click="arroundHome()" type="danger">填写完成</el-button>

                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                form:{
                    name:'',
                    sex:'',
                    professional:'',
                    phone:'',
                    Native_place:'',
                    political:'',
                    email:'',
                    Emergency_contact:'',
                    Emergency_phone:'',
                    qq:'',
                    weixin:'',
                    family_address:'',
                    healthy_state:'',
                    blood_type:'',
                    edu_status:'',
                    position:'',
                    hobby:'',
                },
                rules:{//表单验证规则
                    name:[
                        {   required: true,
                            message:'请输入姓名',
                            trigger:'blur'
                        }
                    ],
                    sex:[
                        {   required: true,
                            message:'请输入性别',
                            trigger:'blur'
                        }
                    ],
                    professional:[
                        {   required: true,
                            message:'请输入所学专业',
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
                    Native_place:[
                        {   required: true,
                            message:'请输入籍贯',
                            trigger:'blur'
                        }
                    ],

                    political:[
                        {   required:true,
                            message:'请输入政治面貌',
                            trigger:'blur'
                        }
                    ],
                    email:[
                        {
                            required:true,
                            message:'请输入邮箱',
                            trigger:'blur'
                        },
                        {
                            validator: function (rule, value, callback) {
                                var MobileRegex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                                if (!MobileRegex.test(value)) {
                                    callback(new Error('邮箱格式不正确！'))
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
                    ],

                    Emergency_contact: [
                        {
                            required:true,
                            message:'请输入紧急联系人',
                            trigger:'blur'
                        }
                    ],
                    qq: [
                        {
                            required:true,
                            message:'请输入qq',
                            trigger:'blur'
                        }
                    ],
                    weixin: [
                        {
                            required:true,
                            message:'请输入微信号',
                            trigger:'blur'
                        }
                    ],
                    family_address: [
                        {
                            required:true,
                            message:'请输入家庭住址',
                            trigger:'blur'
                        }
                    ],
                    healthy_state: [
                        {
                            required:true,
                            message:'请输入健康状况',
                            trigger:'blur'
                        }
                    ],
                    blood_type: [
                        {
                            required:true,
                            message:'请输入血型',
                            trigger:'blur'
                        }
                    ],
                    edu_status: [
                        {
                            required:true,
                            message:'请输入教育状况',
                            trigger:'blur'
                        }
                    ],
                    position: [
                        {
                            required:true,
                            message:'请输入现有职务',
                            trigger:'blur'
                        }
                    ],
                    hobby: [
                        {
                            required:true,
                            message:'请输入爱好',
                            trigger:'blur'
                        }
                    ],


                },

            }
        },
        methods:{
            arroundHome(){
                if(
                    this.form.name !="" &&
                    this.form.sex !="" &&
                    this.form.professional !="" &&
                    this.form.phone !="" &&
                    this.form.Native_place !="" &&
                    this.form.political !="" &&
                    this.form.email !="" &&
                    this.form.Emergency_contact !="" &&
                    this.form.Emergency_phone !="" &&
                    this.form.qq !="" &&
                    this.form.weixin !="" &&
                    this.form.family_address !="" &&
                    this.form.healthy_state !="" &&
                    this.form.blood_type !="" &&
                    this.form.edu_status !="" &&
                    this.form.position !="" &&
                    this.form.hobby !=""
                ){
                    alert(this.form.phone)
                    this.$axios.post("user/save",{
                        account:sessionStorage.getItem("user"),
                        password:sessionStorage.getItem("password"),
                        id:sessionStorage.getItem("User"),
                        name:this.form.name,
                        sex:this.form.sex,
                        subject:this.form.professional,
                        phone:this.form.phone,
                        native_place:this.form.Native_place,
                        politics_status:this.form.political,
                        email:this.form.email,
                        emergency_contact:this.form.Emergency_contact,
                        emergency_contact_phone:this.form.Emergency_phone,
                        qq:this.form.qq,
                        wechat:this.form.weixin,
                        address:this.form.family_address,
                        health:this.form.healthy_state,
                        blood_type:this.form.blood_type,
                        education:this.form.edu_status,
                        job:this.form.position,
                        hobby:this.form.hobby
                    }).then(res =>{
                        console.log(res)
                    }).catch(err => {
                        alert("修改失败" + err)
                    })
                    this.$router.push({path:'/stu/home'})
                }else{
                    this.$message.error("请填写必填信息！！")
                }

            },
            getFormData() {
                this.$axios.post("user/userInfo",{id:sessionStorage.getItem("User")}).then(res =>{
                    console.log(res)
                    if(res.data.user.name !=null){
                        this.form.name = res.data.user.name;
                    }
                    if(res.data.user.sex != null){
                        this.form.sex = res.data.user.sex;
                    }
                    if(res.data.user.subject != null){
                        this.form.professional = res.data.user.subject;
                    }
                    if(res.data.user.phone != null){
                        this.form.phone = res.data.user.phone;
                    }
                    if(res.data.user.native_place != null){
                        this.form.Native_place = res.data.user.native_place;
                    }
                    if(res.data.user.politics_status != null){
                        this.form.political = res.data.user.politics_status;
                    }
                    if(res.data.user.email != null){
                        this.form.email = res.data.user.email;
                    }
                    if(res.data.user.emergency_contact != null){
                        this.form.Emergency_contact = res.data.user.emergency_contact;
                    }
                    if(res.data.user.emergency_contact_phone != null){
                        this.form.Emergency_phone = res.data.user.emergency_contact_phone;
                    }
                    if(res.data.user.qq != null){
                        this.form.qq = res.data.user.qq;
                    }
                    if(res.data.user.wechat != null){
                        this.form.weixin = res.data.user.wechat;
                    }
                    if(res.data.user.address != null){
                        this.form.family_address = res.data.user.address;
                    }
                    if(res.data.user.health != null){
                        this.form.healthy_state = res.data.user.health;
                    }
                    if(res.data.user.blood_type != null){
                        this.form.blood_type = res.data.user.blood_type;
                    }
                    if(res.data.user.education != null){
                        this.form.edu_status = res.data.user.education;
                    }
                    if(res.data.user.job != null){
                        this.form.position = res.data.user.job;
                    }
                    if(res.data.user.hobby != null){
                        this.form.hobby = res.data.user.hobby;
                    }
                })
            },

        },
        mounted() {
            this.getFormData();
        }
    }
</script>

<style>
    .el-input__inner {
        width: 350px;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
    }
    .main{
        width: 1452px;
        height:861px;
        margin:0 auto;
        margin-top:30px;
    }
    .left{
        width:686px;
        height:861px;
        background-color: #FFFFFF;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        float:left;
    }
    .right{
        width:719px;
        height:861px;
        background-color: #FFFFFF;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        float:right;
    }

    .left>div{
        margin-top:34px;
        font-size:20px;
    }
    .right>div{
        margin-top:34px;
        font-size:20px;
    }


</style>