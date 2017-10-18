
<template>
  <div class="profile_page">
    <head-top goBack="true" :head-title="profiletitle" />
    <section v-if="userInfo">
      <section class="profile_number">
        <router-link class="profile_link" :to="getUserInfo ? '/profile/info':'/login'">
          <img :src="imgPath" alt="个人头像" v-if="this.avatar" class="privateImage">
          <span class="privateImage" v-else>
            <svg class="privateImage_svg">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
            </svg>
          </span>
          <div class="user_info">
            <p>{{username}}</p>
            <p>
              <span class="user_icon">
                <svg class="icon_mobile" fill="#fff">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                </svg>
              </span>
              <span class="icon_mobile_number">{{mobile}}</span>
            </p>
          </div>
          <span class="arrow">
            <svg class="arrow_svg" fill="#fff">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </router-link>
      </section>
      <section class="info_data">
        <ul class="clear">
          <router-link class="info_data_link" to='/balance' tag="li">
            <span class="info_data_top">
              <b>{{parseInt(balance).toFixed(2)}}</b>元</span>
            <span class="info_data_bottom">我的余额</span>
          </router-link>
          <router-link class="info_data_link" to='/benefit' tag="li">
            <span class="info_data_top">
              <b>{{count}}</b>元</span>
            <span class="info_data_bottom">我的优惠</span>
          </router-link>
          <router-link class="info_data_link" to='/points' tag="li">
            <span class="info_data_top">
              <b>{{pointNumber}}</b>元</span>
            <span class="info_data_bottom">我的积分</span>
          </router-link>
        </ul>
      </section>
      <section class="profile_1reTe">
        <!-- 我的订单 -->
        <router-link class="myorder" to='/order'>
          <aside>
            <svg fill="#4aa5f0">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
            </svg>
          </aside>
          <div class="myorder_div">
            <span>我的订单</span>
            <span class="myorder_divsvg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
        <!-- 积分商城 -->
        <router-link class="myorder" to='/order'>
          <aside>
            <svg fill="#fc7b53">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
            </svg>
          </aside>
          <div class="myorder_div">
            <span>积分商城</span>
            <span class="myorder_divsvg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
        <!-- 饿了吗会员 -->
        <router-link class="myorder" to='/vipcard'>
          <aside>
            <svg fill="#ffc636">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
            </svg>
          </aside>
          <div class="myorder_div">
            <span>饿了吗会员卡</span>
            <span class="myorder_divsvg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
      </section>
      <section class="profile_1reTe">
        <!-- 服务中心 -->
        <router-link class="myorder" to='/service'>
          <aside>
            <svg fill="#4aa5f0">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
            </svg>
          </aside>
          <div class="myorder_div">
            <span>服务中心</span>
            <span class="myorder_divsvg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
        <!-- 下载饿了吗APP -->
        <router-link class="myorder" to='/download'>
          <aside>
            <svg fill="#3cabff">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
            </svg>
          </aside>
          <div class="myorder_div">
            <span>下载饿了吗APP</span>
            <span class="myorder_divsvg">
              <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </div>
        </router-link>
      </section>
    </section>
    <transition name="router-slide">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import headTop from '@/components/header/head';
import { getImgPath } from '@/components/common/mixin';
import { mapState, mapMutations } from 'vuex';
import { imgBaseUrl } from '@/config/env';

export default {
  name: 'profile',
  data() {
    return {
      profiletitle: '我的账户',//页面标题名
      getUserInfo: {},//个人信息
      username: '登录/注册',//用户名
      mobile: '登陆后享受更多服务',//电话号码
      avatar: '',//头像地址
      imgBaseUrl,
      balance: 0,//我的余额
      count: 0,//优惠券个数
      pointNumber: 0,//积分数
    }
  },
  components: { headTop },
  mixins: [getImgPath],
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations(['SAVE_AVANDER']),
    initData() {
      if (this.userInfo && this.userInfo.user_id) {
        this.avatar = this.userInfo.avatar;
        this.username = this.userInfo.username;
        this.mobile = this.userInfo.mobile || '暂无绑定手机号';
        this.balance = this.userInfo.balance;
        this.count = this.userInfo.gift_amount;
        this.pointNumber = this.userInfo.point;
      }else{
        this.username = '登录/注册';
        this.mobile = '登陆后享受更多服务';
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    //后台会返回两种头像地址格式，分别处理
    imgPath() {
      let path;
      // console.log('this.avatar===',this.avatar);
      if (this.avatar.indexOf('/') == -1) {
        path = imgBaseUrl + this.avatar;
      } else {
        path = this.getImgPath(this.avatar);
      }
      this.SAVE_AVANDER(path);
      // console.log('path===',path);
      return path;
    }
  },
  watch: {
    userInfo() {
      this.initData();
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../style/mixin';
.profile_page {
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}

.profile_number {
  padding-top: 1.95rem;
  .profile_link {
    display: flex;
    align-items: center;
    padding: .65rem .6rem;
    background: $blue;
    .privateImage {
      display: inline-block;
      border-radius: 50%;
      @include sc(.7rem,#fff);
      @include wh(2.5rem, 2.5rem);
      .privateImage_svg {
        border-radius: 50%;
        @include wh(2.5rem, 2.5rem);
      }
    }
    .user_info {
      flex: 1;
      margin-left: .5rem;
      p {
        font-weight: 500;
        @include sc(.7rem, #fff);
        .user_icon {
          display: inline-block;
          line-height: .75rem;
          vertical-align: middle;
          @include wh(.5rem, .75rem);
          .icon_mobile {
            @include wh(100%, 100%);
          }
        }
        .icon_mobile_number {
          display: inline-block;
          @include sc(.6rem, #fff);
        }
      }
    }
    .arrow {
      display: inline-block;
      @include wh(.45rem, 1rem);
      svg {
        @include wh(100%, 100%);
      }
    }
  }
}

.info_data {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  ul {
    .info_data_link {
      display: inline-block;
      float: left;
      width: 33.33%;
      border-right: 1px solid #f1f1f1;
      span {
        display: block;
        width: 100%;
        text-align: center;
      }
      .info_data_top {
        @include sc(.55rem, #333);
        padding: .85rem 0 .45rem;
        b {
          line-height: 1rem;
          font-weight: 700;
          @include sc(1.2rem, #f90);
        }
      }
      .info_data_bottom {
        padding-bottom: .45rem;
        font-weight: 400;
        @include sc(.57rem, #666);
      }
    }
    .info_data_link:nth-of-type(2) {
      .info_data_top {
        b {
          color: #ff5f3e;
        }
      }
    }
    .info_data_link:nth-of-type(3) {
      border: 0;
      .info_data_top {
        b {
          color: #6ac20b;
        }
      }
    }
  }
}

.profile_1reTe {
  margin-top: .4rem;
  background-color: #fff;
  .myorder {
    display: flex;
    align-items: center;
    padding-left: 1.6rem;
    aside {
      display: flex;
      align-items: center;
      margin-left: -.85rem;
      margin-right: .25rem;
      @include wh(.7rem, .7rem);
      svg {
        @include wh(100%, 100%);
      }
    }
    .myorder_div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: .45rem .26rem .45rem 0;
      @include sc(.7rem, #333);
      border-bottom: 1px solid #f1f1f1;
      span {
        display: block;
      }
      .myorder_divsvg {
        @include wh(.45rem, .45rem);
        svg {
          @include wh(100%, 100%);
        }
      }
    }
  }
  .myorder:nth-of-type(3) .myorder_div {
    border: 0;
  }
  
}
</style>


