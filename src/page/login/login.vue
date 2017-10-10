<template>
  <div class="loginContainer">
    <head-top :head-title="loginWay ? '登录': '密码登录' " goBack='true'>
      <div class="change_login" slot='changeLogin' @click='changeLoginWay'>
        {{loginWay ? '密码登录':'短信登录'}}
      </div>
    </head-top>
    <form class="loginForm" v-if="loginWay">
      <section class="input_container phone_number">
        <input type="text" name="phone" placeholder="手机号" v-model="phoneNumber" @input="inputPhone" maxlength="11">
        <button :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime" @click.prevent='getVerifyCode'>获取验证码</button>
        <button @click.prevent v-show='computedTime'>已发送({{computedTime}})s</button>
      </section>
      <section class="input_container">
        <input type="text" name="mobileCode" placeholder="验证码" maxlength="6" v-model="mobileCode">
      </section>
    </form>
    <form class="loginForm" v-else>
      <section class="input_container">
        <!-- 在默认情况下，v-model 在 input 事件中同步输入框的值与数据，
                    但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步： -->
        <input type="text" placeholder="手机号/邮箱/用户名" v-model.lazy='userAccount'>
      </section>
      <section class="input_container">
        <input type='password' placeholder="密码" v-if="!showPassword" v-model="passWord">
        <input type="text" placeholder="密码" v-else v-model="passWord">
        <div class="button_switch" :class="{change_to_text:showPassword}">
          <div class="circle_button" :class="{trans_to_right:showPassword}" @click="changePasswordType"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="img_change_img">
          <img :src="captchaCodeImg" alt="验证码图片" v-show="true">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <p class="login_tips">
      温馨提示：未注册饿了吗账号的手机号，登录时将自动注册，且代表您已同意
      <a href="https://h5.ele.me/service/agreement/">《用户服务协议》</a>
    </p>
    <div class="login_container" @click="mobileLogin">登录</div>
    <router-link to="/forget" class="to_forget" v-if="!loginWay">忘记密码？</router-link>

  </div>
</template>

<script>
import headTop from '@/components/header/head';
import { mapState, mapMutations } from 'vuex';
import { checkExsis, mobileCode, sendLogin, accountLogin, getcaptchas } from '@/service/getData';

export default {
  name: 'login',
  data() {
    return {
      loginWay: true,//登录方式，默认短信登录
      phoneNumber: null,//电话号码
      mobileCode: null,//短信验证码
      rightPhoneNumber: false,//输入的手机号是否符合要求
      computedTime: 0,//倒数计时
      validate_token: null,//获取短信时返回的验证值，登录时需要
      showAlert: false,//显示提示组件
      alertText: null,//提示的内容
      userAccount: null,//用户名
      passWord: null,//密码
      codeNumber: null,//验证码
      showPassword: false,//是否显示密码
      captchaCodeImg: null,//验证码图片地址
    }
  },
  components: { headTop },
  methods: {
    ...mapMutations(['RECORD_USERINFO']),
    changeLoginWay() {
      this.loginWay = !this.loginWay;
    },
    changePasswordType() {
      this.showPassword = !this.showPassword;
    },
    inputPhone() {
      if (/^1\d{10}$/gi.test(this.phoneNumber)) {
        this.rightPhoneNumber = true;
      } else {
        this.rightPhoneNumber = false;
      }
    },
    async getCaptchaCode() {
      const res = await getcaptchas();
      this.captchaCodeImg = 'https://mainsite-restapi.ele.me/v1/captchas/' + res.code;
    },
    async getVerifyCode() {
      if (this.rightPhoneNumber) {
        this.computedTime = 30;
        this.timer = setInterval(() => {
          this.computedTime--;
          if (this.computedTime == 0) {
            clearInterval(this.timer);
          }
        }, 1000)
        let exsis = await checkExsis(this.phoneNumber, 'mobile');
        if (exsis.message) {
          this.showAlert = true;
          this.alertText = exsis.message;
          return;
        }
        else if (!exsis.is_exists) {
          this.showAlert = true;
          this.alertText = '您输入的手机号尚未绑定';
          return;
        }
        let res = await mobileCode(this.phoneNumber);
        if (res.message) {
          this.showAlert = true;
          this.alertText = res.message;
          return;
        }
        this.validate_token = res.validate_token;
      }
    },
    async mobileLogin() {
      if (this.loginWay) {
        if (!this.rightPhoneNumber) {
          this.showAlert = true;
          this.alertText = '手机号码不正确';
          return;
        }
        else if (!(/^\d{6}$/gi.test(this.mobileCode))) {
          this.showAlert = true;
          this.alertText = '短信验证码不正确';
          return;
        }
        this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validate_token);
      } else {
        if (!this.userAccount) {
          this.showAlert = true;
          this.alertText = '请输入手机号/邮箱/用户名';
          return;
        }
        else if (!this.passWord) {
          this.showAlert = true;
          this.alertText = '请输入密码';
          return;
        }
        else if (!this.codeNumber) {
          this.showAlert = true;
          this.alertText = '请输入验证码';
          return;
        }
        this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
      }
      if (!this.userInfo.user_id) {
        this.showAlert = true;
        this.alertText = this.userInfo.message;
        if (!this.loginWay) this.getCaptchaCode();
      } else {
        this.RECORD_USERINFO(this.userInfo);
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.loginContainer {
  padding-top: 1.95rem;
  p,
  span,
  input {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.change_login {
  position: absolute;
  right: .75rem;
  @include center-top;
  @include sc(.7rem, #fff);
}

.loginForm {
  margin-top: .6rem;
  background-color: #fff;
  .input_container {
    display: flex;
    justify-content: space-between;
    padding: .6rem .8rem;
    border-bottom: .025rem solid #f1f1f1;
    input {
      @include sc(.7rem, #666);
    }
    button {
      padding: .28rem .4rem;
      border: 1px;
      border-radius: .15rem;
      font-family: Helvetica Neue, Tahoma, Arial;
      @include sc(.65rem, #fff);
    }
    .right_phone_number {
      background-color: #4cd964;
    }
  }
  .phone_number {
    // padding: .3rem .8rem;
  }
  .captcha_code_container {
    height: 2.2rem;
    .img_change_img {
      display: flex;
      align-items: center;
      img {
        margin-right: .2rem;
        @include wh(3.5rem, 1.5rem);
      }
      .change_img {
        display: flex;
        flex-direction: 'columns';
        flex-wrap: wrap;
        justify-content: center;
        width: 2rem;
        p {
          @include sc(.55rem, #666);
        }
        p:nth-of-type(2) {
          margin-top: .2rem;
          color: #3b95e9;
        }
      }
    }
  }
}

.login_tips {
  padding: .4rem .6rem;
  line-height: .7rem;
  @include sc(.5rem, #999);
  a {
    color: #3b95e9;
  }
}

.login_container {
  margin: 0 .5rem 1rem;
  padding: .5rem 0;
  border: 1px;
  border-radius: .15rem;
  text-align: center;
  background-color: #4cd964;
  @include sc(.7rem, #fff);
}

.button_switch {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 0 .2rem;
  border: 1px;
  border-radius: .5rem;
  transition: all .3s;
  @include wh(2rem, .7rem);
  background-color: #ccc;
  .circle_button {
    position: absolute;
    z-index: 1;
    left: -0.1rem;
    border-radius: 50%;
    box-shadow: 0 0.026rem 0.053rem rgba(0, 0, 0, .1);
    background-color: #f1f1f1;
    transition: all .3s;
    @include wh(1.2rem, 1.2rem);
  }
  .trans_to_right {
    transform: translateX(1.3rem);
  }
  span {
    @include sc(.45rem, #fff);
    transform: translateY(.05rem);
    line-height: .6rem;
  }
  span:nth-of-type(2) {
    transform: translateY(-.08rem);
  }
}

.change_to_text {
  background-color: #4cd964;
}

.to_forget {
  float: right;
  margin-right: .3rem;
  @include sc(.6rem, #3b95e9);
}
</style>
