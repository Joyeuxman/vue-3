<template>
  <div class="forget_page">
    <head-top headTitle="重置密码" goBack="true"/>
    <form  class="restForm">
      <section class="input_container phone_numb">
        <input type="text" placeholder="账号" maxlength="11" v-model="phoneNumber" @input="inputPhone">
      </section>
      <section class="input_container">
        <input type="text" placeholder="旧密码" v-model="oldPassWord">
      </section>
      <section class="input_container">
        <input type="text" placeholder="新密码" v-model="newPassWord">
      </section>
      <section class="input_container">
        <input type="text" placeholder="确认密码" v-model="confirmPassWord">
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="mobileCode">
        <div class="img_change_img">
          <img :src="captchaCodeImg">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <div class="login_container" @click="resetButton">确认修改</div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>


<script>
import headTop from "@/components/header/head";
import alertTip from "@/components/common/alertTip";
import {
  mobileCode,
  checkExsis,
  sendMobile,
  getcaptchas,
  changePassword
} from "@/service/getData";

export default {
  name: "forget",
  components: { headTop,alertTip },
  data() {
    return {
      phoneNumber: null, //账号
      oldPassWord: null,//旧密码
      newPassWord: null, //新密码
      rightPhoneNumber: false, //输入的账号是否符合要求
      confirmPassWord: null, //确认密码
      captchaCodeImg: null, //验证码地址
      showAlert: false, //显示提示组件
      alertText: null, //提示的内容
      mobileCode: null, //短信验证码
    };
  },
  created() {
    this.getCaptchaCode();
  },
  methods: {
    // 判断输入的账号是否正确
    inputPhone() {
      if (/.+/gi.test(this.phoneNumber)) {
        this.rightPhoneNumber = true;
      } else {
        this.rightPhoneNumber = false;
      }
    },
    // 获取验证码图片地址
    async getCaptchaCode() {
      const res = await getcaptchas();
      this.captchaCodeImg = res.code;
    },
    // 确认修改
    async resetButton() {
      if (!this.phoneNumber) {
        this.showAlert = true;
        this.alertText = "请输入正确的账号";
        return;
      } else if (!this.oldPassWord) {
        this.showAlert = true;
        this.alertText = "请输入旧密码";
        return;
      } else if (!this.newPassWord) {
        this.showAlert = true;
        this.alertText = "请输入新密码";
        return;
      } else if (!this.confirmPassWord) {
        this.showAlert = true;
        this.alertText = "请输确认密码";
        return;
      } else if (this.newPassWord !== this.confirmPassWord) {
        this.showAlert = true;
        this.alertText = "两次输入的密码不一致";
        return;
      } else if (!this.mobileCode) {
        this.showAlert = true;
        this.alertText = "请输验证码";
        return;
      }
      // 发送重置信息
      const res = await changePassword(this.phoneNumber,this.newPassWord,this.confirmPassWord,this.mobileCode);
      if(res.message){
        this.showAlert = true;
        this.alertText = res.message;
        this.getCaptchaCode();
        return;
      }else{
        this.showAlert = true;
        this.alertText = '密码修改成功';
      }
    },
    // 关闭弹框
    closeTip(){
      this.showAlert = false;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../style/mixin";

.restForm {
  margin-top: 2.45rem;
  background-color: #fff;
  .input_container {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0.8rem;
    border-bottom: 1px solid #d9d9d9;
    input {
      @include sc(0.65rem,#666);
    }
  }
  .captcha_code_container {
    height: 2.2rem;
    .img_change_img {
      display: flex;
      align-items: center;
      img {
        margin-right: 0.2rem;
        @include wh(3.5rem,1.5rem);
      }
      .change_img {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        width: 2rem;
        p {
          @include sc(0.55rem,#666);
        }
        p:nth-of-type(2) {
          margin-top: 0.2rem;
          color: #3b95e9;
        }
      }
    }
  }
}
.login_container {
  margin: 0.5rem;
  padding: 0.5rem 0;
  text-align: center;
  border: 1px;
  border-radius: 0.15rem;
  background-color: #4cd964;
  @include sc(0.7rem,#fff);
}
</style>