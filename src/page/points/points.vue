<template>
  <div class="points_page">
    <head-top headTitle="我的积分" goBack="true"/>        
    <section class="content_container">
      <section class="content">
          <header class="content_header">
              <span class="content_title_style">当前积分</span>
              <section class="contetn_description">
                  <img src="../../images/description.png" height="24" width="24">
                  <router-link to="/points/pointsDetail" class="content_title_style">积分说明</router-link>
              </section>
          </header>
          <p class="content_num">
              <span>0</span>
              <span>分</span>
          </p>
          <div class="promit_button" @click="usePoint">积分兑换商品</div>
      </section>
    </section>
    <p class="deal_detail">最近30天积分纪录</p>
    <div class="no_log">
        <img src="../../images/no-log.png">
        <p>最近30天无积分纪录</p>
        <p>快去下单赚取大量积分吧</p>
    </div>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
    </div>
  </div>
</template>


<script>
import headTop from "@/components/header/head";
import alertTip from "@/components/common/alertTip";

export default {
  name: "points",
  components: { headTop, alertTip },
  data() {
    return {
      showAlert: false,
      alertText: null
    };
  },
  methods: {
    usePoint() {
      this.showAlert = true;
      this.alertText = "快去下单赚取大量积分吧";
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../style/mixin";
.points_page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #f2f2f2;
  z-index: 300;
  overflow-y: scroll;
}
.content_container {
  padding: 0.3rem;
  background-color: $blue;
  .content {
    padding: 0.4rem;
    border-radius: 0.25rem;
    background-color: #fff;
    .content_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .content_title_style {
        @include sc(0.6rem,#000);
      }
      .contetn_description {
        display: flex;
        align-items: center;
        img {
          margin-right: 0.2rem;
          @include wh(0.6rem,0.6rem);
        }
        .content_title_style {
          color: $blue !important;
          @include sc(0.6rem,#000);
        }
      }
    }
    .content_num {
      span:nth-of-type(1) {
        @include sc(1.8rem,#000);
      }
      span:nth-of-type(2) {
        @include sc(0.8rem,#000);
      }
    }
    .promit_button {
      margin-top: 0.6rem;
      line-height: 1.8rem;
      text-align: center;
      border-radius: 0.15rem;
      background-color: orange;
      @include sc(0.8rem,#fff);
    }
  }
}
.deal_detail {
  margin: 0.4rem;
  @include sc(0.6rem,#999);
}
.no_log {
  text-align: center;
  img {
    margin-top: 2rem;
    @include wh(9rem,4.5rem);
  }
  p{
    margin-top:.5rem;
  }
  p:nth-of-type(1) {
    @include sc(0.7rem,#333);
  }
  p:nth-of-type(2) {
    @include sc(0.5rem,#999);
  }
}
</style>