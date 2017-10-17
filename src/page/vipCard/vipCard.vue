<template>
  <div class="vipCard_page">
    <head-top headTitle="会员中心" goBack="true" />
    <section v-if="userInfo">
      <p class="buy_for">为账户
        <span>{{userInfo.username}}</span> 购买会员</p>
      <section class="vip_prerogative">
        <router-link class="header_style" to="/vipCard/vipDescription">
          <span class="header_left">会员特权</span>
          <section class="header_right">
            <span>会员说明</span>
            <svg fill="#fff">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:href="#arrow-right" />
            </svg>
          </section>
        </router-link>
        <section class="vip_detail">
          <div class="vip_detail_left">
            <img src="../../images/sheng.jpeg" height="80" width="70" alt="">
          </div>
          <div class="vip_detail_right">
            <h4>减免配送费</h4>
            <p>每月减免30单，每日可减免3单，每单最高减免4元</p>
            <p>蜂鸟专送专享</p>
          </div>
        </section>
        <section class="vip_detail">
          <div class="vip_detail_left">
            <img src="../../images/jifen.jpeg" height="80" width="70" alt="">
          </div>
          <div class="vip_detail_right">
            <h4>减免配送费</h4>
            <p>每月减免30单，每日可减免3单，每单最高减免4元</p>
            <p>蜂鸟专送专享</p>
          </div>
        </section>
      </section>
      <section class="apply_vip">
        <header class="header_style">
          <span class="header_left">开通会员</span>
        </header>
        <section class="apply_vip_buy">
          <div class="apply_vip_buy_left">
            <span>1个月</span>
            <span>￥20</span>
          </div>
          <div class="apply_vip_buy_right" @click="buyCart">购买</div>
        </section>
      </section>
      <router-link class="header_style common_style" to="/vipCard/useCart">
        <span class="header_left">兑换会员</span>
        <section class="header_right">
          <span>使用卡号卡密</span>
          <svg fill="#fff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:href="#arrow-right" />
          </svg>
        </section>
      </router-link>
      <router-link class="header_style common_style" to="/vipCard/invoiceRecord">
        <span class="header_left">购买记录</span>
        <section class="header_right">
          <span>开发票</span>
          <svg fill="#fff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:href="#arrow-right" />
          </svg>
        </section>
      </router-link>
    </section>
    <transition name="router-slide">
      <router-view></router-view>
    </transition>
  </div>
</template>


<script>
import headTop from '@/components/header/head';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'vipCard',
  components: { headTop, },
  computed: {
    ...mapState(['userInfo']),
  },
  methods:{
    ...mapMutations(['ORDER_SUCCESS','BUY_CART']),
    buyCart(){
      this.ORDER_SUCCESS({order_id:'399525134200981325'});
      this.BUY_CART(20);
      this.$router.push('/confirmOrder/payment');
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../style/mixin';


.vipCard_page {
  padding-top: 1.95rem;
}

.router-slide-enter-active,
.router-slide-leave-active {
  transition: all .3s;
}

.router-slide-enter,
.router-slide-leave-active {
  transform: translateX(100%);
}

.buy_for {
  padding-left: .7rem;
  line-height: 2rem;
  @include sc(.6rem, #666);
  span {
    font-weight: bold;
  }
}

.vip_prerogative {
  margin-bottom: .5rem;
  padding-left: .7rem;
  background-color: #fff;
  .vip_detail {
    display: flex;
    padding: .8rem 0;
    border-bottom: 1px solid #f5f5f5;
    .vip_detail_left {
      margin-right: .6rem;
      img {
        @include wh(1.6rem, 1.8rem);
      }
    }
    .vip_detail_right {
      h4 {
        font-weight: normal;
        @include sc(.7rem, #333);
      }
      p {
        @include sc(.5rem, #999);
      }
    }
  }
}

.header_style {
  display: flex;
  justify-content: space-between;
  line-height: 2rem;
  padding-right: .7rem;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
  .header_left {
    @include sc(.7rem, #333);
  }
  .header_right {
    display: flex;
    align-items: center;
    span {
      margin-right: .2rem;
      @include sc(.6rem, #999);
    }
    svg {
      @include wh(.5rem, .5rem);
    }
  }
}

.common_style {
  padding-left: .7rem;
  margin-bottom: .5rem;
}

.apply_vip {
  padding-left: .7rem;
  margin-bottom: .5rem;
  background-color: #fff;
  .apply_vip_buy {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: .7rem;
    line-height: 2.6rem;
    .apply_vip_buy_left {
      span {
        @include sc(.7rem, #333);
      }
      span:nth-of-type(2) {
        font-weight: bold;
        @include sc(.7rem, #f60);
      }
    }
    .apply_vip_buy_right {
      line-height: 1.2rem;
      text-align: center;
      border: 1px solid #f60;
      border-radius: .2rem;
      @include sc(.6rem, #f60);
      @include wh(2.6rem, 1.2rem);
    }
  }
}
</style>