<template>
  <div class="benefit_page">
    <head-top headTitle="我的优惠" goBack="true"/>
    <section v-if="!showLoading">
      <section class="category_title">
        <span :class="{choosed:categoryType === 1}" @click="categoryType = 1">红包</span>
        <span :class="{choosed:categoryType === 2}" @click="categoryType = 2">商家代金券</span>
      </section>
      <transition name="router-fade">
        <section v-if="categoryType === 1">
          <section class="hongbao_container">
            <header class="hongbao_title">
              <section class="total_number">
                有 <span>{{hongbaoList.length}}</span> 个红包即将到期
              </section>
              <section class="hongbao_description">
                <img src="../../images/description.png" alt="">
                <router-link class="hongbao_detail" to="/benefit/hbDescription">红包说明</router-link>
              </section>
            </header>
            <ul class="hongbao_list_ul">
              <li class="hongbao_list_li" v-for="item in hongbaoList" :key="item.id">
                <section class="list_item">
                  <div class="list_item_left">
                    <span>￥</span>
                    <span>{{String(item.amount).split('.')[0]}}</span>
                    <span>.</span>
                    <span>{{String(item.amount).split('.')[1]||0}}</span>
                    <p>{{item.description_map.sum_condition}}</p>
                  </div>
                  <div class="list_item_right">
                    <h4>{{item.name}}</h4>
                    <p>{{item.description_map.validity_periods}}</p>
                    <p>{{item.description_map.phone}}</p>
                  </div>
                  <div class="time_left">{{item.description_map.validity_delta}}</div>
                </section>
                <footer class="list_item_footer">
                  <p>{{item.limit_map && item.limit_map.restaurant_flavor_ids}}</p>
                </footer>
              </li>
            </ul>
          </section>
          <router-link class="history_hongbao" to="/benefit/hbHistory">
            <span class="check_history">查看历史红包</span>
            <svg class="history_right">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
          <footer class="hongbao_footer">
            <router-link class="hongbao_style" to="/benefit/exchange">兑换红包</router-link>
            <router-link class="hongbao_style" to="/benefit/commend">推荐有奖</router-link>
          </footer>
        </section>
      </transition>
      <transition name="router-fade">
        <section class="voucher_container" v-if="categoryType === 2">
          <section class="hongbao_description voucher_header">
            <img src="../../images/description.png" alt="">
            <router-link class="hongbao_detail" to="/benefit/coupon">商家代金券说明</router-link>
          </section>
          <section class="unable_use">
            <img src="../../images/voucher.png" alt="">
            <p>无法使用代金券</p>
            <p>非客户端或客户端版本过低</p>
            <router-link to="/download" class="download_app">下载或升级客户端</router-link>
          </section>
        </section>
      </transition>
    </section>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <loading v-show="showLoading"></loading>
    <transition name="router-slide" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import headTop from "@/components/header/head";
import { getHongbaoNum } from "@/service/getData";
import alertTip from "@/components/common/alertTip";
import loading from "@/components/common/loading";

export default {
  name: "benefit",
  components: { headTop,alertTip,loading },
  data() {
    return {
      showLoading:true,//加载动画
      showAlert:false,//是否显示弹框
      alertText:null,//弹出框文字
      hongbaoList:null,//红包列表
      categoryType:1,//红包与商家代金券切换
    };
  },
  computed:{
    ...mapState(['userInfo']),
  },
  watch:{
    userInfo(value){
      this.initData();
    }
  },
  mounted(){
    this.initData();
  },
  methods:{
    async initData(){
      if(this.userInfo){
        this.hongbaoList = await getHongbaoNum(this.userInfo.user_id);
        this.showLoading = false;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../style/mixin";

.benefit_page {
  padding-top: 1.95rem;
  .category_title {
    display: flex;
    justify-content: space-around;
    // line-height:2rem;会将其子元素的span的高度变为2rem
    align-items: center;
    height: 2rem;
    background-color: #fff;
    @include sc(0.7rem,#000);
    span {
      padding-bottom: 0.2rem;
      text-align: center;
    }
    .choosed {
      border-bottom: 2px solid $blue;
      color: $blue;
    }
  }
  .hongbao_container {
    padding: 0.4rem;
    .hongbao_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include sc(0.5rem,#000);
      .total_number {
        span {
          color: red;
        }
      }
    }
    .hongbao_list_ul {
      margin-top: 0.6rem;
      .hongbao_list_li {
        margin-bottom: 0.5rem;
        border-radius: 5px;
        background: #fff url(../../images/hongbao.png) top left / 0.5rem 0.2rem
          repeat-x;
        .list_item {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0.5rem 0.8rem;
          .list_item_left {
            flex: 1;
            border-right: 1px solid #d9d9d9;
            font-size: 0;
            span:nth-of-type(1) {
              font-weight: 700;
              @include sc(0.75rem,#ff5340);
            }
            span:nth-of-type(2) {
              @include sc(1.5rem,#ff5340);
            }
            span:nth-of-type(3) {
              font-weight: 700;
              @include sc(0.8rem,#ff5340);
            }
            span:nth-of-type(4) {
              font-weight: 700;
              @include sc(0.7rem,red);
            }
            p {
              @include sc(0.4rem,#999);
            }
          }
          .list_item_right {
            flex: 2;
            padding-left: 1rem;
            h4 {
              font-weight: 500;
              @include sc(0.8rem,#666);
            }
            p {
              @include sc(0.4rem,#999);
            }
          }
          .time_left {
            // list-style-type 属性设置列表项标记的类型。disc默认实心点
            // list-style-type: disc;
            @include sc(0.75rem,red);
          }
        }
        .list_item_footer {
          padding: 0.4rem;
          background-color: #f9f9f9;
          border-bottom-left-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
          p {
            margin-left: 0.4rem;
            @include sc(0.4rem,#999);
          }
        }
      }
    }
  }
}
.hongbao_description {
  display: flex;
  img {
    margin-right: 0.2rem;
    margin-top: 0.2rem;
    @include wh(0.6rem,0.6rem);
  }
  .hongbao_detail {
    margin-top: 0.2rem;
    color: $blue;
  }
}
.history_hongbao {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0 2.8rem;
  .check_history {
    margin-left: 0.2rem;
    @include sc(0.5rem,#999);
  }
  .history_right {
    @include wh(0.4rem, 0.4rem);
    fill: #aaa;
  }
}
.hongbao_footer {
  z-index:202;
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  .hongbao_style {
    flex: 1;
    line-height: 2rem;
    text-align: center;
    @include sc(0.7rem,#555);
  }
}
.voucher_container {
  .voucher_header {
    display: flex;
    justify-content: flex-end;
    margin-right: 0.5rem;
    @include sc(0.5rem,$blue);
  }
  .unable_use {
    margin-top: 4rem;
    text-align: center;
    img {
      @include wh(6rem,3.4rem);
    }
    p:nth-of-type(1) {
      margin-top: 0.4rem;
      @include sc(0.7rem,#666);
    }
    p:nth-of-type(2) {
      margin-top: 0.4rem;
      @include sc(0.5rem,#999);
    }
    .download_app {
      padding: 0.3rem;
      border-radius: 0.15rem;
      background-color: #56d176;
      @include sc(0.6rem,#fff);
    }
  }
}
</style>