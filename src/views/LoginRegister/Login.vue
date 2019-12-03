<template>
  <div>
    <div v-if="LoginSkip">
      <div class="box_head">
        <div class="box_a">
          <div class="box_b"></div>
        </div>
      </div>
      <img src="../../../public/yu.png" class="img_yu" />
      <label class="text_ly">鲤鱼云平台</label>
      <div class="box_text">
        <label class="text_txta">鲤鱼终有出头日</label>
        <br />
        <label class="text_txtb">一跃龙门便化龙</label>
      </div>

      <div class="box_c">
        <label class="text_login">登陆</label>
      </div>

      <el-input v-model="login" placeholder="请输入用户名" prefix-icon="../../1.png" class="input_login"></el-input>
      <el-input
        v-model="pwd"
        placeholder="密码"
        show-password
        prefix-icon="../../1.png"
        class="input_pwd"
      ></el-input>

      <el-button type="danger" class="btn_login" @click="loginFun">登陆</el-button>

      <label class="text_d">点击登录，即表示以阅读并同意</label>
      <label class="text_e">《注册会员服务条款》</label>
      <label class="text_f" @click="skip">还木有账号？注册</label>
    </div>

    <div v-if="RegisterSkip">
      <div class="box_head">
        <div class="box_a">
          <div class="box_b"></div>
        </div>
      </div>
      <img src="../../../public/yu.png" class="img_yu" />
      <label class="text_ly">鲤鱼云平台</label>
      <div class="box_text">
        <label class="text_txta">鲤鱼终有出头日</label>
        <br />
        <label class="text_txtb">一跃龙门便化龙</label>
      </div>
      <div class="box_c">
        <label class="text_logina">鲤鱼云平台</label>
      </div>
      <el-input
        v-model="account"
        placeholder="请输入用户名"
        prefix-icon="../../1.png"
        class="input_login"
      ></el-input>
      <el-input
        v-model="loginpwd"
        placeholder="密码"
        show-password
        prefix-icon="../../1.png"
        class="input_loginpwd"
      ></el-input>
      <el-button class="btn_code">获取验证码</el-button>

      <el-button type="danger" class="btn_register" @click="regisFun">注册</el-button>

      <label class="text_d">点击登录，即表示以阅读并同意</label>
      <label class="text_e">《注册会员服务条款》</label>
      <label class="text_g" @click="skip">已经有账号啦！我要登录</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: "",
      pwd: "",
      account: "",
      id1: "",
      loginpwd: "",
      LoginSkip: true,
      RegisterSkip: false,
      id: 0
    };
  },
  methods: {
    skip() {
      this.LoginSkip = !this.LoginSkip;
      this.RegisterSkip = !this.RegisterSkip;
    },
    loginFun: function() {
      this.$axios
        .post("user/login", {
          account: this.login,
          password: this.pwd
        })
        .then(res => {
          // console.log(res);
          const a = res.data.user.id;
          sessionStorage.setItem("UserId", a); //存入用户ID参数： 1.调用的值 2.所要存入的数据
          const b = res.data.user.character;
          sessionStorage.setItem("UserCharacter", b); //存入身份信息参数： 1.调用的值 2.所要存入的数据
          const c = res.data.token;
          sessionStorage.setItem("UserToken", c); //存入用户登录token参数： 1.调用的值 2.所要存入的数据
          if (res.code == 1) {
            // console.log("当前ID ",this.id))
            if (b === "学生") {
              sessionStorage.setItem("user", this.login);
              sessionStorage.setItem("password", this.pwd);
              sessionStorage.setItem("User", res.data.user.id);
              sessionStorage.setItem("name", res.data.user.name);
              if (
                res.data.user.name == null ||
                res.data.user.sex == null ||
                res.data.user.subject == null ||
                res.data.user.phone == null ||
                res.data.user.native_place == null ||
                res.data.user.politics_status == null ||
                res.data.user.email == null ||
                res.data.user.emergency_contact == null ||
                res.data.user.emergency_contact_phone == null ||
                res.data.user.qq == null ||
                res.data.user.wechat == null ||
                res.data.user.health == null ||
                res.data.user.blood_type == null ||
                res.data.user.education == null ||
                res.data.user.job == null ||
                res.data.user.hobby == null
              ) {
                this.$router.push({ path: "/stu/stu_txxx" });
              } else {
                this.$router.push({ path: "/stu/home" });
              }
            } else {
              this.$router.push({
                path: "/sys_home",
                name: "sys_home"
              });
            }
          } else {
            alert("登陆失败");
            this.$router.push({
              path: "/login"
            });
          }
        })
        .catch(err => {
          alert("登陆失败" + err);
        });
    },
    regisFun: function() {
      this.$axios
        .post("user/register", {
          account: this.account,
          password: this.loginpwd
        })
        .then(res => {
          if (res.code == 1) {
            alert("创建成功");
          } else {
            alert("创建失败");
          }
        })
        .catch(err => {
          alert("创建失败" + err);
        });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.box_head {
  width: 1535px;
  height: 728px;
  background-image: url("../../../public/Login.png");
  background-size: cover;
  opacity: 0.6;
}

.box_a {
  width: 809px;
  height: 405px;
  background-color: #ffffff;
  opacity: 0.65;
  position: relative;
  top: 195px;
  left: 380px;
}

.box_b {
  width: 405px;
  height: 334px;
  border-right: 2px solid #e2e2e2;
  position: absolute;
  top: 34px;
}

.img_yu {
  height: 107px;
  width: 107px;
  position: absolute;
  top: 270px;
  left: 450px;
}

.text_ly {
  width: 125px;
  height: 37px;
  position: absolute;
  left: 545px;
  top: 311px;
  color: rgba(212, 48, 48, 1);
  font-size: 25px;
  line-height: 150%;
  text-align: left;
}

.box_text {
  width: 300px;
  height: 74px;
  color: rgba(80, 80, 80, 1);
  font-size: 25px;
  line-height: 150%;
  position: absolute;
  top: 415px;
  left: 440px;
}

.text_txta {
  text-align: left;
  float: left;
}

.text_txtb {
  text-align: right;
  float: right;
}

.box_c {
  width: 316px;
  height: 50px;
  position: absolute;
  border-bottom: solid 1px #e2e2e2;
  top: 234px;
  left: 820px;
  opacity: 0.6;
}

.text_login {
  width: 40px;
  height: 30px;
  position: absolute;
  left: 150px;
  top: 15px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
}

.text_logina {
  width: 200px;
  height: 30px;
  position: absolute;
  left: 120px;
  top: 15px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
}

.input_login {
  width: 314px;
  height: 43px;
  position: absolute;
  top: 325px;
  left: 830px;
}

.input_pwd {
  width: 314px;
  height: 43px;
  position: absolute;
  top: 390px;
  left: 830px;
}

.input_loginpwd {
  width: 181px;
  height: 43px;
  position: absolute;
  top: 390px;
  left: 830px;
}

.btn_login {
  width: 314px;
  height: 43px;
  color: rgba(255, 255, 255, 1);
  border-radius: 3px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  position: absolute;
  top: 455px;
  left: 830px;
}

.btn_register {
  width: 314px;
  height: 43px;
  color: rgba(255, 255, 255, 1);
  border-radius: 3px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  position: absolute;
  top: 455px;
  left: 820px;
}

.text_d {
  width: 168px;
  height: 18px;
  position: absolute;
  left: 850px;
  top: 500px;
  color: rgba(128, 128, 128, 1);
  font-size: 11px;
  line-height: 150%;
  text-align: left;
}

.text_e {
  width: 120px;
  height: 18px;
  position: absolute;
  left: 1005px;
  top: 500px;
  color: rgba(85, 122, 157, 1);
  font-size: 11px;
  line-height: 150%;
  text-align: left;
}

.text_f {
  width: 112px;
  height: 21px;
  position: absolute;
  left: 1030px;
  top: 530px;
  color: rgba(42, 130, 228, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}

.text_g {
  width: 200px;
  height: 21px;
  position: absolute;
  left: 990px;
  top: 530px;
  color: rgba(42, 130, 228, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}

.btn_code {
  width: 105px;
  height: 40px;
  border: red 1px solid;
  color: red;
  position: absolute;
  top: 390px;
  left: 1039px;
}
</style>