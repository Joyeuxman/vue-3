<template>
  <div class="orderDetail_page">
    <head-top headTitle="订单详情" goBack="true"/>
    <section class="scroll_container" id="scroll_section" v-if="!showLoading">
      <section class="scroll_insert">
        <section class="order_title">
          <img :src="imgBaseUrl+orderDetail.restaurant_image_url">
          <p>{{orderDetail.status_bar.title}}</p>
          <p>{{orderDetail.timeline_node.description}}</p>
          <router-link class="order_again" :to="{path:'/shop',query:{geohash,id:orderDetail.restaurant_id}}">再来一单</router-link>
        </section>
        <section class="food_list">
          <router-link class="food_list_header" :to="{path: '/shop', query: {geohash, id: orderDetail.restaurant_id}}">
            <div class="shop_name">
              <img :src="imgBaseUrl+orderDetail.restaurant_image_url">
              <span>{{orderDetail.restaurant_name}}</span>
            </div>
            <svg fill="#333" class="arrow_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
          <ul class="food_list_ul">
            <li v-for="(item,index) in orderDetail.basket.group[0]" :key="index">
              <p class="food_name ellipsis">{{item.name}}</p>
              <div class="quantity_price">
                <span>X{{item.quantity}}</span>
                <span>￥{{item.price}}</span>
              </div>
            </li>
          </ul>
          <div class="deliver_fee">
            <span>配送费</span>
            <span>{{orderDetail.basket.deliver_fee&&orderDetail.basket.deliver_fee.price||0}}</span>
          </div>
          <div class="pay_ment">实付{{orderDetail.total_amount.toFixed(2)}}</div>
        </section>
        <section class="order_detail_style">
          <header>配送信息</header>
          <section class="item_style">
            <p class="item_left">送达时间：</p>
            <div class="item_right">
              <p>{{orderData && orderData.deliver_time}}</p>
            </div>
          </section>
          <section class="item_style">
            <p class="item_left">送货地址：</p>
            <div class="item_right">
                <p>{{orderData && orderData.consignee}}</p>
                <p>{{orderData && orderData.phone}}</p>
                <p>{{orderData && orderData.address}}</p>
            </div>
          </section>
          <section class="item_style">
              <p class="item_left">配送方式：</p>
              <div class="item_right">
                  <p>蜂鸟专送</p>
              </div>
          </section>          
        </section>
        <section class="order_detail_style">
            <header>订单信息</header>
            <section class="item_style">
                <p class="item_left">订单号：</p>
                <div class="item_right">
                    <p>{{orderDetail.id}}</p>
                </div>
            </section>
            <section class="item_style">
                <p class="item_left">支付方式：</p>
                <div class="item_right">
                    <p>在线支付</p>
                </div>
            </section>
            <section class="item_style">
                <p class="item_left">下单时间：</p>
                <div class="item_right">
                    <p>{{orderDetail.formatted_created_at}}</p>
                </div>
            </section>
        </section>        
      </section>
    </section>
    <transition name="loading">
      <loading v-if="showLoading"/>
    </transition>
  </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import headTop from "@/components/header/head";
import loading from "@/components/common/loading";
import { getImgPath } from "@/components/common/mixin";
import { getOrderDetail } from "@/service/getData";
import { imgBaseUrl } from "@/config/env";
import BScroll from "better-scroll";

export default {
  name: "orderDetail",
  components: { headTop, loading },
  mixins: [getImgPath],
  data() {
    return {
      showLoading: true, //显示加载动画
      orderData: null, //null,
      imgBaseUrl
    };
  },
  computed: {
    ...mapState(["orderDetail", "geohash", "userInfo"])
  },
  watch: {
    userInfo(value) {
      if (value & value.user_id) {
        this.initData();
      }
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 初始化数据信息
    async initData() {
      if (this.userInfo && this.userInfo.user_id) {
        this.orderData = await getOrderDetail(
          this.userInfo.user_id,
          this.orderDetail.unique_id
        );
        this.showLoading = false;
        this.$nextTick(() => {
          new BScroll("#scroll_section", {
            deceleration: 0.001, //滚动动量减速越大越快，建议不大于0.01
            bounce: true, //是否启用回弹动画效果
            swiperTime: 1800, //持续时间
            click: true //是否派发click事件，通常判断浏览器派发的click是betterscroll派发的click,可以用event._constructed,若是bs派发则为true
          });
        });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../style/mixin";

.orderDetail_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 202;
  overflow-y: scroll;
  padding-top: 1.95rem;
  background-color: #f1f1f1;
}
.scroll_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  padding-top: 1.95rem;
}
.scroll_insert {
  .order_title {
    margin-bottom: 0.4rem;
    padding: 0.6rem;
    text-align: center;
    background-color: #fff;
    img {
      border: 1px solid $blue;
      border-radius: 50%;
      @include wh(3rem,3rem);
    }
    p {
      padding-top: 0.2rem;
      @include sc(0.8rem,#333);
    }
    .order_again {
      padding: 0.1rem 0.2rem;
      border: 1px solid $blue;
      border-radius: 0.15rem;
      @include sc(0.6rem,$blue);
    }
  }
  .food_list {
    margin-bottom: 0.4rem;
    padding: 0.5rem;
    background-color: #fff;
    .food_list_header {
      display: flex;
      justify-content: space-between;
      .shop_name {
        display: flex;
        border-bottom: 1px solid #d9d9d9;
        img {
          margin-right: 0.4rem;
          @include wh(1.5rem,1.5rem);
        }
        span {
          font-weight: bold;
          @include sc(0.75rem,#333);
        }
      }
      .arrow_right {
        fill: #666;
        @include wh(0.6rem,0.6rem);
      }
    }
    .food_list_ul {
      li {
        display: flex;
        justify-content: space-between;
        line-height: 1.8rem;
        border-bottom: 1px solid #d9d9d9;
        .food_name {
          @include sc(0.7rem,#666);
        }
        .quantity_price {
          span:nth-of-type(1) {
            @include sc(0.6rem,#999);
          }
          span:nth-of-type(2) {
            margin-left: 1rem;
            @include sc(0.7rem,#666);
          }
        }
      }
    }
    .deliver_fee {
      display: flex;
      justify-content: space-between;
      line-height: 1.8rem;
      border-bottom: 1px solid #d9d9d9;
      span {
        @include sc(0.7rem,#666);
      }
    }
    .pay_ment {
      padding-top: 0.4rem;
      text-align: right;
      @include sc(0.7rem,orange);
    }
  }
  .order_detail_style {
    margin-bottom: 0.4rem;
    padding: 0.5rem;
    background-color: #fff;
    header {
      line-height: 1.5rem;
      @include sc(0.8rem,#333);
      border-bottom: 1px solid #d9d9d9;
    }
    .item_style {
      display: flex;
      justify-content: space-between;
      p {
        line-height: 1.2rem;
      }
      .item_left {
        @include sc(0.7rem,#999);
      }
      .item_right {
        p {
          @include sc(0.7rem,#999);
        }
      }
    }
  }
}
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.7s;
}
.loading-enter,
.loading-leave-active {
  opacity: 0;
}
</style>