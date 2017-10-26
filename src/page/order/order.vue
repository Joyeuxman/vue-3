<template>
  <div class="order_page">
    <head-top headTitle="订单列表" goBack="true"/>
    <ul class="order_list_ul" v-load-more="loaderMore">
      <li class="order_list_li" v-for="item in orderList" :key="item.id">
        <img :src="imgBaseUrl + item.restaurant_image_url" class="restaurant_image">
        <section class="order_item_right">
          <section @click="showDetail(item)">
            <header class="order_item_right_header">
              <section class="order_header">
                <h4>
                  <span class="ellipsis">{{item.restaurant_name}}</span>
                  <svg fill="#333" class="arrow_right">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </h4>
                <p class="order_time">{{item.formatted_created_at}}</p>
              </section>
              <p class="order_status">{{item.status_bar.title}}</p>
            </header>
            <section class="order_basket">
              <p class="order_name ellipsis">{{item.basket.group[0][0].name}}{{item.basket.group[0].length > 1 ? ' 等' + item.basket.group[0].length + '件商品' : ''}}</p>
              <p class="order_amount">¥{{item.total_amount.toFixed(2)}}</p>
            </section>
          </section>
          <div class="order_again">
            <!-- <computed-time v-if="item.status_bar.title == '等待支付'" :time="item.time_pass"/> -->
            <router-link class="buy_again" :to="{path:'/shop',query:{geohash,id:item.restaurant_id}}" tag="span" >再来一单</router-link>
          </div>
        </section>
      </li>
    </ul>
    <!-- <foot-guide></foot-guide> -->
    <transition name="loading">
        <loading v-show="showLoading"></loading>
    </transition>
    <transition name="router-slide" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import headTop from "@/components/header/head";
import computeTime from "@/components/common/computeTime";
import footGuide from "@/components/footer/footGuide";
import loading from "@/components/common/loading";
import { loadMore } from "@/components/common/mixin";
import { getImgPath } from "@/components/common/mixin";
import { getOrderList } from "@/service/getData";
import { imgBaseUrl } from "@/config/env";

export default {
  name: "order",
  mixins: [loadMore],
  components: {
    headTop,
    footGuide,
    loading,
    computeTime
  },
  data() {
    return {
      orderList: null, //订单列表
      offset: 0,
      preventRepeat: false, //防止重复获取
      showLoading: true, //显示加载动画
      imgBaseUrl
    };
  },
  computed: {
    ...mapState(["userInfo", "geohash"])
  },
  watch: {
    userInfo: function(value) {
      if (value && value.user_id && !this.orderList) {
        this.initData();
      }
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations(["SAVE_ORDER"]),
    //初始化获取信息
    async initData() {
      if (this.userInfo && this.userInfo.user_id) {
        const res = await getOrderList(this.userInfo.user_id, this.offset);
        console.log('1111111',res);
        this.orderList = [...res];
      }
      this.hideLoading();
    },
    // 生产环境与发布环境隐藏loading方式不同
    hideLoading() {
      this.showLoading = false;
    },
    // 加载更多
    async loaderMore() {
      if (this.preventRepeat) return;
      this.preventRepeat = true;
      this.showLoading = true;
      this.offset += 10;
      // 获取信息
      const res = await getOrderList(this.userInfo.user_id, this.offset);
      this.orderList = [...this.orderList,...res];
      this.hideLoading();
      if (res.length < 10) return;
      this.preventRepeat = false;
    },
    // 显示详情页
    showDetail(item) {
      this.SAVE_ORDER(item);
      this.preventRepeat = false;
      this.$router.push("/order/orderDetail");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../style/mixin";

.order_page {
  padding-top: 1.95rem;
  background-color: #f1f1f1;
}
.order_list_ul {
  .order_list_li {
    display: flex;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background-color: #fff;
    img {
      margin-right: 0.4rem;
      @include wh(2rem,2rem);
    }
    .order_item_right {
      flex: 5;
      .order_item_right_header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid #d9d9d9;
        .order_header {
          font-size: 0;
          h4 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            line-height: 1rem;
            font-weight: 500;
            @include sc(0.75rem, #333);
            svg {
              @include wh(0.4rem,0.4rem);
            }
          }
          .order_time {
            margin-top: 0.2rem;
            @include sc(0.5rem,#999);
          }
        }
        .order_status {
          @include sc(0.6rem,#333);
        }
      }
      .order_basket {
        display: flex;
        justify-content: space-between;
        line-height: 2rem;
        border-bottom: 1px solid #d9d9d9;
        p:nth-of-type(1) {
          @include sc(0.6rem,#000);
        }
        p:nth-of-type(2) {
          font-weight: 700;
          @include sc(0.6rem,#f60);
        }
      }
      .order_again {
        margin-top: 0.4rem;
        text-align: right;
        @include sc(0.6rem,$blue);
        .buy_again {
          padding:.1rem .2rem;
          border: 1px solid $blue;
          border-radius: 5px;
          @include sc(0.55rem,$blue);
        }
      }
    }
  }
}
</style>