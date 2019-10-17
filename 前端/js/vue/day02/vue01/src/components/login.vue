<template>
<div class="main">
  <div>
      <h4 class="login-title">登录：</h4>
      <p class="login-desc">加油</p>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group label="用户名" label-cols="3" label-for="userName">
          <b-form-input id="userName" :state="validation.login.userName" trim aria-describedby="input-live-userName" v-model="loginForm.userName" placeholder="请输入用户名"></b-form-input>
          <b-form-invalid-feedback id="input-live-userName" v-if="validation.login.userName">
             {{validation.login.userNameMsg}}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="密码" label-cols="3"  label-for="userPass">
          <b-form-input id="userPass" :state="validation.login.userPass" trim aria-describedby="input-live-userPass" v-model="loginForm.userPass" type="password" placeholder="请输入密码"></b-form-input>
          <b-form-invalid-feedback id="input-live-userPass" v-if="validation.login.userPass">
             {{validation.login.userPassMsg}}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-row id="validateCode" class="row" v-if="loginForm.showValidate">
            <b-col md=6>
               <b-form-input :state="validation.login.validateCode" trim aria-describedby="input-live-validateCode" v-model="loginForm.validateCode" autocomplete="off"></b-form-input>
                <b-form-invalid-feedback id="input-live-validateCode" v-if="validation.login.validateCode">
                    {{validation.login.validateCodeMsg}}
                </b-form-invalid-feedback>
            </b-col>
            <b-col md=6>
              <b-link title="更换验证码"  @click="changeValidateCode">
                   <b-img ref="validateCode" src="http://demo.ruoyi.vip/captcha/captchaImage?type=math" fluid alt="验证码" class="imgCode"></b-img>
              </b-link>
            </b-col>
        </b-row>
        <b-input-group id="rememberMe">
            <b-form-checkbox v-model="loginForm.rememberMe" value="true" unchecked-value="false">记住我</b-form-checkbox>
        </b-input-group>
        <b-row>
          <b-col md=6>
          <b-button type="submit" variant="primary" data-loading="正在验证登录，请稍后...">登录</b-button>
          </b-col>
          <b-col md=3 pull="left">
            <b-button type="reset" variant="danger">重置</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loginForm: {
          userName: '',
          userPass: '',
          showValidate: true,
          validateCode:'',
          rememberMe: false
        },
        validation:{
          login:{
            userName:false,
            userNameMsg:"用户名不正确",
            userPass:false,
            userPassMsg:"密码不正确",
            validateCode:false,
            validateCodeMsg:"验证码不正确"
          }
        }
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.loginForm))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.loginForm.userName = ''
        this.loginForm.userPass = ''
        this.loginForm.validateCode = ''
        this.loginForm.rememberMe = false;
        this.$nextTick(() => {
         
        })
      },
      changeValidateCode(){
        this.$refs.validateCode.src = "http://demo.ruoyi.vip/captcha/captchaImage?type=math";
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
    color: rgba(255,255,255,.95);
}
.main{
    width: 400px;
    margin: 5% auto;
    border: 1px solid rgba(255,255,255,.3);
    background: rgba(255,255,255,.2);
    box-shadow: 0 3px 0 rgba(12,12,12,.03);
    padding: 3% 3%;
    border-radius: 15px;
}
 .login-title {
    margin: 0 !important;
}
.login-title h3{
    margin-top: 5px;
    font-weight: 600;
}
.login-desc {
    margin-top: 20px;
}

.login-desc p {
    margin: 0 0 10px;
}
.imgCode{
  width: 100px;
  height: 35px;
}
.invalid-feedback{
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}
/* .custom-control {
    position: relative;
    display: block;
    min-height: 1.5rem;
    padding-left: 1.5rem;
} */

</style>
