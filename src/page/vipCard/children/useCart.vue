<template>
  <div class="useCart_page">
    <head-top headTitle="兑换会员" goBack="true" />
    <p class="buy_for">成功兑换后将关联到当前账号：
      <span>{{userInfo && userInfo.username}}</span>
    </p>
    <form class="form_style">
      <input type="text" maxlength="10" v-model="cartNumber" @input="checkCart" placeholder="请输入10位卡号">
      <input type="text" maxlength="6" v-model="passWord" @input="checkPassWord" placeholder="请输入6位卡密">
    </form>
    <p class="determine" :class="{could_pay:couldPay}" @click="confirmPay">兑换</p>
    <footer class="binding">
      <h3>——温馨提示——</h3>
      <p>新兑换的会员服务，权益以「会员说明」为准。</p>
      <p>月卡：
        <b>30次</b>减免配送费。</p>
      <p>季卡：
        <b>90次</b>减免配送费。</p>
      <p>年卡：
        <b>360</b>次减免配送费。</p>
      <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
    </footer>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText" />
  </div>
</template>


<script>
import headTop from '@/components/header/head';
import { mapState, mapMutations } from 'vuex';
import { vipCart } from '@/service/getData';
import alertTip from '@/components/common/alertTip';

export default {
  name: 'useCart',
  components: { headTop, alertTip },
  data() {
    return {
      cartNumber: null,//卡号
      passWord: null,//卡密
      rightCart: false,//验证卡号是否正确
      rightPassWord: false,//验证卡密是否正确
      showAlert: false,//是否显示弹框
      alertText: null,//弹框提示信息
    }
  },
  computed: {
    ...mapState(['userInfo']),
    couldPay() {
      return this.rightCart && this.rightPassWord;
    }
  },
  methods: {
    checkCart() {
      if (/^\d{10}$/.test(this.cartNumber)) {
        this.rightCart = true;
      } else {
        this.rightCart = false;
      }
    },
    checkPassWord() {
      if (/^\d{6}$/.test(this.passWord)) {
        this.rightPassWord = true;
      } else {
        this.rightPassWord = false;
      }
    },
    async confirmPay() {
      if (this.couldPay) {
        const res = await vipCart(this.userInfo.id, this.cartNumber, this.passWord);
        console.log(res);
        if (res.message) {
          this.showAlert = true;
          this.alertText = res.message;
        } else if (res.name) {
          this.showAlert = true;
          this.alertText = res.name;
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../../style/mixin';

.useCart_page {
  z-index: 202;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #f5f5f5;
}

.buy_for {
  margin-left: .7rem;
  line-height: 2rem;
  @include sc(.6rem, #666);
  span {
    font-weight: bold;
  }
}

.form_style {
  display: flex;
  flex-direction: column;
  input {
    line-height: 2rem;
    text-indent: 1rem;
    border-bottom: 1px solid #f5f5f5;
    @include sc(.65rem, #999);
  }
}

.determine {
  margin: .7rem;
  line-height: 1.8rem;
  text-align: center;
  font-weight: bold;
  border-radius: .2rem;
  background-color: #ccc;
  @include sc(.7rem, #fff);
}

.could_pay {
  background-color: #4cd964;
}

.binding {
  margin-top: 1rem;
  h3 {
    margin-bottom: .65rem;
    text-align: center;
    font-weight: normal;
    @include sc(.65rem, #999);
  }
  p,
  b {
    line-height: .8rem;
    @include sc(.5rem, #aaa);
  }
  p {
    padding-left: 2rem;
  }
}
</style>