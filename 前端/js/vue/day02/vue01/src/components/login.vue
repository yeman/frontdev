<template>
  <div class="formController">
    <b-container>
    <div id="login" class="main">
      <b-form-group>
        <b-row align-v="start" class="text-center">
          <b-col cols="xs-12" sm="12" md="12" lg="12">
            <h3>后台系统</h3>
          </b-col>
        </b-row>
      </b-form-group>
      <div class="loginForm">
        <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group>
          <b-input-group>
            <b-form-input id="userName" trim v-model="loginForm.userName" placeholder="请输入用户名"></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group>
          <b-input-group>
            <b-form-input id="userPass" trim v-model="loginForm.userPass" type="password" placeholder="请输入密码"></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group>
          <b-form-row id="validateCode" class="row" v-if="loginForm.showValidate">
            <b-col cols="6" sm="6" md="6" lg="6">
              <b-form-input trim v-model="loginForm.validateCode" autocomplete="off"></b-form-input>
            </b-col>
            <b-col cols="6" sm="6" md="6" lg="6">
              <b-link title="更换验证码"  @click="changeValidateCode">
                <b-img ref="validateCode" src="http://demo.ruoyi.vip/captcha/captchaImage?type=math" fluid alt="验证码" class="imgCode"></b-img>
              </b-link>
            </b-col>
          </b-form-row>
        </b-form-group>
        <b-form-group>
          <div class="row clearfix">
          <div class="col-md-6 col-sm-6">
            <b-form-checkbox size="md" v-model="loginForm.rememberMe">记住我</b-form-checkbox>
          </div>
          </div>
        </b-form-group>
        <b-form-group>
          <b-row align-v="start">
            <b-col cols="6" sm="6" md="6" lg="6">
              <b-button type="submit" variant="primary">登录</b-button>
            </b-col>
            <b-col cols="6" sm="6" md="6" lg="6">
              <b-button type="reset" variant="info">重置</b-button>
            </b-col>
          </b-row>
        </b-form-group>
      </b-form>
    </div>
    </div>
    <b-form-group>
      <b-row class="text-center">
        <b-col cols="12" sm="12" md="12" lg="12">
          <h6>Copyright ©2019 <strong>JingtianTech</strong> All Rights Reserved.</h6>
        </b-col>
      </b-row>
    </b-form-group>
  </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        userPass: '',
        showValidate: true,
        validateCode: '',
        rememberMe: false
      }

    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.loginForm))
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.loginForm.userName = ''
      this.loginForm.userPass = ''
      this.loginForm.validateCode = ''
      this.loginForm.rememberMe = false
      this.$nextTick(() => {

      })
    },
    changeValidateCode () {
      this.$refs.validateCode.src = 'http://demo.ruoyi.vip/captcha/captchaImage?type=math'
    }
  }
}
</script>
<style>
body{
    height: auto;
    /* overflow: hidden; */
    background: url(../assets/image/login-background.png) no-repeat center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    /*color: rgba(255,255,255,.95);*/
}
.main{
    width: 339px;
    margin: 15% auto 5% auto;
    border: 1px solid rgba(255,255,255,.3);
    background: rgba(255,255,255,.2);
    box-shadow: 0 3px 0 rgba(12,12,12,.03);
    padding: 3% 3%;
    border-radius: 15px;
}
 .login-title {
   margin-bottom: 15%;
   text-align: center;
}
.login-title h3{
    margin-top: 5px;
    font-weight: 600;
}
.imgCode{
  width: 100px;
  height: 35px;
}
</style>
