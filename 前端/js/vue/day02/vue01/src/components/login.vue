<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group label="用户名:" label-for="userName" description="请输入用户名">
        <b-form-input id="userName" col- v-model="loginForm.userName"  type="text" required placeholder="请输入用户名"></b-form-input>
      </b-form-group>
      <b-form-group label="请输入密码" label-for="userPass">
        <b-form-input id="userPass" v-model="loginForm.userPass" type="password" required placeholder="请输入密码"></b-form-input>
      </b-form-group>
      <b-form-group id="validateCode" v-if="loginForm.showValidate">
       <img src="../../build/logo.png">
      </b-form-group>
      <b-form-group id="rememberMe">
          <b-form-checkbox v-model="loginForm.rememberMe"  value="true" unchecked-value="false">记住我</b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary">登录</b-button>
      <b-button type="reset" variant="danger">重置</b-button>
    </b-form>
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
      }
    }
  }
</script>
