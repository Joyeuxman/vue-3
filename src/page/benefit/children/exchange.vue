<template>
  <div class="exchange_page">
    <head-top headTitle="服务中心" goBack="true"/>
    <form class="exchange_code">
      <input type="text" placeholder="请输入兑换码" v-model="exchangeCode" class="exchange_input">
      <section class="input_container captcha_code_container">
          <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
          <div class="img_change_img">
              <img v-show="captchaCodeImg" :src="captchaCodeImg">
              <div class="change_img" @click="getCaptchaCode">
                  <p>看不清</p>
                  <p>换一张</p>
              </div>
          </div>
      </section>
    </form>
    <div class="determine" @click="exchange" :class="{active: status}">兑换</div>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>


<script>
import { mapState } from "vuex";
import headTop from "@/components/header/head";
import { getcaptchas, exChangeHongbao } from "@/service/getData";
import alertTip from "@/components/common/alertTip";

export default {
  name: "exchange",
  components: { headTop,alertTip},
  data() {
    return {
      showAlert: false,
      alertText: null,
      exchangeCode: null, //兑换码
      codeNumber: "", //
      captchaCodeImg: null //验证码图片
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    status() {
      const status =
        /^\d+$/gi.test(this.exchangeCode) && /^\w{4}$/gi.test(this.codeNumber);
      return status;
    }
  },
  mounted() {
    this.getCaptchaCode();
  },
  methods: {
    //线上环境采用固定的图片，编译环境获取真实的验证码
    async getCaptchaCode() {
      let res = await getcaptchas();
      this.captchaCodeImg = res.code;
    },
    //兑换红包
    async exchange() {
      if (this.status && this.userInfo) {
        let res = await exChangeHongbao(
          this.userInfo.user_id,
          this.exchangeCode,
          this.codeNumber
        );
        //不成功则弹出提示框
        if (res.message) {
          this.getCaptchaCode();
          this.showAlert = true;
          this.alertText = res.message;
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../style/mixin";
.exchange_page {
  z-index: 203;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding-top: 1.95rem;
  background-color: #f1f1f1;
}
.exchange_code {
  margin: 0.5rem;
  .exchange_input {
    width: 100%;
    padding: 0.6rem 0.4rem;
    border-radius: 0.15rem;
    @include sc(0.7rem,#666);
  }
  .captcha_code_container {
    display: flex;
    margin-top: 0.7rem;
    input {
      flex: 3;
      margin-right: 0.4rem;
      padding: 0.6rem 0.4rem;
      border-radius: 0.15rem;
      @include sc(0.7rem,#666);
    }
    .img_change_img {
      display: flex;
      align-items: center;
      flex: 2;
      border-radius: 0.15rem;
      background-color: #fff;
      img {
        margin-right: 0.2rem;
        @include wh(3.5rem,1.5rem);
      }
      .change_img {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: column;
        width: 2rem;
        p {
          @include sc(0.55rem,#333);
        }
        p:nth-of-type(2) {
          margin-top: 0.2rem;
          color: #3b95e9;
        }
      }
    }
  }
}
.determine {
  margin: 0 0.7rem;
  line-height: 1.8rem;
  text-align: center;
  border-radius: 0.2rem;
  background-color: #ccc;
  @include sc(0.7rem, #fff);
}
.active {
  background-color: #4cd964;
}
</style>