<template>
  <div class="commend_page">
    <head-top headTitle="推荐有奖" goBack="true"/>
    <section class="activity_banner">
      <img src="../../../images/activity.png" alt="">
    </section>
    <section class="invite_friend">
      <div class="invite_friend_style">
        <img src="../../../images/weixin.png" @click="fenxiang" alt="">
        <p>邀请微信好友</p>
      </div>
      <div class="invite_friend_style">
        <img src="../../../images/qq.png" @click="fenxiang" alt="">
        <p>邀请QQ好友</p>
      </div>
      <div class="invite_friend_style">
        <img src="../../../images/fenxiang.png" @click="fenxiang" alt="">
        <p>面对面邀请</p>
      </div>
    </section>
    <section class="invite_num">
      <div class="invite_num_style">
        <p>累计收益</p>
        <p><span>0</span>元</p>
      </div>
      <div class="invite_num_style invite_people">
        <p>成功邀请</p>
        <p><span>0</span>人</p>
      </div>
    </section>
    <p class="income_detail">收益明细</p>
    <section class="incom_tips">
      <img src="../../../images/qianbao.png">
      <p>还不赶紧去邀请好友</p>
    </section>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>


<script>
import { mapState } from "vuex";
import headTop from "@/components/header/head";
import { payRequest } from "@/service/getData";
import alertTip from "@/components/common/alertTip";

export default {
  name: "commend",
  components: { headTop, alertTip },
  data() {
    return {
      showAlert: false,
      alertText: null
    };
  },
  methods: {
    fenxiang() {
      this.showAlert = true;
      this.alertText = "请在饿了么APP中打开";
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../style/mixin";

.commend_page {
  z-index: 203;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #f2f2f2;
}
.activity_banner {
  img {
    @include wh(100%,10rem);
  }
}
.invite_friend {
  display: flex;
  padding: 1rem 0;
  background-color: #fff;
  .invite_friend_style {
    flex: 1;
    text-align: center;
    img {
      @include wh(2.5rem,2.5rem);
    }
    p {
      @include sc(0.5rem,#333);
    }
  }
}
.invite_num {
  display: flex;
  margin-top: 1rem;
  @include sc(0.5rem,#666);
  .invite_num_style {
    flex: 1;
    text-align: center;
    p {
      color: #666;
    }
    span {
      font-weight: 600;
      @include sc(0.8rem,#ff5633);
    }
  }
  .invite_people {
    border-left: 0.025rem solid #ddd;
    span {
      @include sc(0.8rem, #666);
      font-weight: bold;
    }
  }
}
.income_detail {
  text-align: center;
  margin-top: 1rem;
  @include sc(0.5rem, #666);
}
.incom_tips {
  text-align: center;
  margin-top: 1rem;
  img {
    @include wh(1.3rem, 1.6rem);
  }
  p {
    @include sc(0.5rem, #999);
  }
}
</style>