<template>
  <div class="balance_page">
    <head-top headTitle="我的余额" goBack="true"/>
    <section class="content_container">
      <section class="content">
        <header class="content_header">
          <span class="content_title_style">当前余额</span>
          <section class="content_description">
            <img src="../../images/description.png" alt="">
            <router-link class="content_title_style" to="/balance/balanceDetail">余额说明</router-link>
          </section>
        </header>
          <p class="content_num">
            <span>0.00</span>
            <span>元</span>
          </p>
          <div class="promit_button">提现</div>
      </section>
    </section>
    <p class="deal_detail">交易明细</p>
    <div class="no_log">
      <img src="../../images/no-log.png" alt="">
      <p>暂无交易明细</p>
    </div>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="router-slide" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>


<script>
import headTop from "@/components/header/head";
import alertTip from "@/components/common/alertTip";

export default {
  name: "balance",
  components: { headTop, alertTip },
  data() {
    return {
      showAlert: false,
      alertText: null
    };
  }
};
</script>


<style lang="scss" scoped>
@import "../../style/mixin";
// .balance_page {
//   padding-top: 1.95rem;
// }
// .content_container {
//   padding: 0.3rem;
//   background-color: $blue;
//   .content {
//     padding: 0.4rem;
//     border-radius: 5px;
//     background: #fff;
//     .content_header {
//       display:flex;
//       justify-content:space-between;
//       font-size: .55rem;
//       .content_title_style {
//         @include sc(0.5rem,#222);
//       }
//       .content_description {
//         display:flex;
//         align-items:center;
//         img {
//           @include wh(0.6rem,0.6rem);
//           margin-right:.2rem;
//         }
//         a {
//           color: $blue;
//         }
//       }
//       .content_num {
//         span:nth-of-type(1) {
//           font-weight: 500;
//           @include sc(1.8rem,#222);
//         }
//         span:nth-of-type(2) {
//           @include sc(0.6rem,#222);
//         }
//       }
//       .promit_button {
//         margin-top: 0.6rem;
//         line-height: 1.6rem;
//         text-align: center;
//         border-radius: 5px;
//         background-color: #d9d9d9;
//         @include sc(0.7rem,#fff);
//         @include wh(100%, 2rem);
//       }
//     }
//   }
// }
// .deal_detail {
//   padding: 0.6rem;
//   @include sc(0.6rem,#999);
// }
// .no_log {
//   text-align: center;
//   img {
//     @include wh(8rem,5rem);
//   }
//   p {
//     margin-top: 0.4rem;
//     @include sc(0.7rem,#666);
//   }
// }

.balance_page {
  padding-top: 1.95rem;
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.content_container {
  padding: 0.3rem;
  background-color: $blue;
  .content {
    padding: 0.4rem;
    background-color: #fff;
    border-radius: 0.15rem;
    .content_header {
      @include fj;
      font-size: 0.55rem;
      .content_description {
        display: flex;
        align-items: center;
        img {
          @include wh(0.6rem, 0.6rem);
          margin-right: 0.2rem;
        }
        .content_title_style {
          color: $blue;
        }
      }
      .content_title_style {
        color: #666;
      }
    }
    .content_num {
      span:nth-of-type(1) {
        @include sc(1.8rem, #333);
      }
      span:nth-of-type(2) {
        @include sc(0.7rem, #333);
      }
    }
    .promit_button {
      @include wh(100%, 2rem);
      @include sc(0.8rem, #fff);
      border-radius: 0.15rem;
      line-height: 2rem;
      margin-top: 1rem;
      text-align: center;
      background-color: #ccc;
    }
  }
}
.deal_detail {
  @include sc(0.6rem, #999);
  line-height: 2rem;
  padding-left: 0.5rem;
}
.no_log {
  text-align: center;
  margin-top: 1rem;
  img {
    @include wh(8rem, 5rem);
  }
  p {
    margin-top: 0.5rem;
    @include sc(0.7rem, #666);
  }
}
</style>