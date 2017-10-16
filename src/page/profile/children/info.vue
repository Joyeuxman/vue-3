<template>
  <div class="rating_page">
    <head-top headTitle="账户信息" goBack="true" />
    <section class="profile-info">
      <section class="headportrait">
        <input type="file" class="profileinfopanel-upload">
        <h2>头像</h2>
        <div class="headportrait-div">
          <img :src="imgPath" alt="个人头像" v-if="avatarinfo" class="headportrait-div-top">
          <span class="headportrait-div-top" v-else>
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default" />
            </svg>
          </span>
          <span class="headportrait-div-bottom">
            <svg fill="#d8d8d8">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right" />
            </svg>
          </span>
        </div>
      </section>
      <router-link class="info-router" to="/profile/setusername">
        <section class="headportrait headportraitwo">
          <h2>用户名</h2>
          <div class="headportrait-div">
            <p>{{username}}</p>
            <span class="headportrait-div-bottom">
              <svg fill="#d8d8d8">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right" />
              </svg>
            </span>
          </div>
        </section>
      </router-link>
      <router-link class="info-router" to="/profile/info/address">
        <section class="headportrait headportraitwo headportraithree">
          <h2>收货地址</h2>
          <div class="headportrait-div">
            <span class="headportrait-div-bottom">
              <svg fill="#d8d8d8">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right" />
              </svg>
            </span>
          </div>
        </section>
      </router-link>

      <section class="bind-phone">绑定账号</section>
      <router-link class="info-router" to="#">
        <section class="headportrait headportraitwo headportraithree">
          <h2><img src="../../../images/bindphone.png" alt="手机图片" style="display:inline-block;margin-right:.4rem;">手机</h2>
          <div class="headportrait-div">
            <p>{{infotel}}</p>
            <span class="headportrait-div-bottom">
              <svg fill="#d8d8d8">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right" />
              </svg>
            </span>
          </div>
        </section>
      </router-link>

      <section class="bind-phone">安全设置</section>
      <router-link class="info-router" to="/forget">
        <section class="headportrait headportraitwo headportraithree">
          <h2>登录密码</h2>
          <div class="headportrait-div">
            <p>修改</p>
            <span class="headportrait-div-bottom">
              <svg fill="#d8d8d8">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right" />
              </svg>
            </span>
          </div>
        </section>
      </router-link>
      <section class="exitlogin" @click="exitlogin">退出登录</section>
    </section>
    <section class="coverpart" v-if="show">
      <section class="cover-background"></section>
      <section class="cover-content" :class="{'cover-animate':isEnter,'cover-animate-leave':isLeave}">
        <div class="sa-icon">
          <span class="sa-body"></span>
          <span class="sa-dot"></span>
        </div>
        <h2>是否退出登录</h2>
        <div class="sa-botton">
          <button class="waiting" @click="waitingThing">再等等</button>
          <div style="display:inline-block">
            <button class="quitlogin" @click="outLogin">退出登录</button>
          </div>
        </div>
      </section>
    </section>
    <transition name="router-slid">
      <router-view></router-view>
    </transition>
  </div>
</template>


<script>
import headTop from '@/components/header/head';
import { mapState, mapMutations } from 'vuex';
import { imgBaseUrl } from '@/config/env';

export default {
  name: 'info',
  components: { headTop },
  data() {
    return {
      avatarinfo: '',//用户头像
      username: '',//用户名
      infotel: '',//用户手机号
      getUsermes: {},//用户信息
      show: false,
      isEnter: true,
      isLeave: false,
      imgBaseUrl,
    }
  },
  computed: {
    ...mapState(['userInfo', 'imgPath']),
  },
  created() {
    this.getUsermes = this.userInfo;
    if (this.userInfo) {
      this.username = this.getUsermes.username;
      this.infotel = this.getUsermes.mobile;
      this.avatarinfo = this.getUsermes.avatar;
    }
  },
  methods: {
    ...mapMutations(['OUT_LOGIN',]),
    exitlogin() {
      this.show = true;
      this.isEnter = true;
      this.isLeave = false;
    },
    waitingThing() {
      clearTimeout(this.timer);
      this.isEnter = false;
      this.isLeave = true;
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        this.show = false;
      }, 200)
    },
    outLogin() {
      this.OUT_LOGIN();
      this.waitingThing();
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';

.rating_page {
  z-index: 202;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #f2f2f2;
}

.profile-info {
  @include wh(100%, 3.1rem);
  .profileinfopanel-upload {
    display: block;
    opacity: 0;
    position: absolute;
    top: 2.35rem;
    left: 0;
    @include wh(100%, 3.1rem);
  }
  .headportrait {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .4rem;
    padding: .5rem .4rem;
    border-top: 1px solid #ddd;
    background-color: #fff;
    h2 {
      display: flex;
      align-items: center;
      font-weight: 500;
      @include sc(.6rem, #333);
    }
    .headportrait-div {
      span {
        display: inline-block;
        svg {
          @include wh(100%, 100%);
        }
      }
      .headportrait-div-top {
        vertical-align: middle;
        border-radius: 50%;
        @include wh(2rem, 2rem);
      }
      .headportrait-div-bottom {
        position: relative;
        top: .44rem;
        @include wh(.65rem, 1.4rem);
      }
    }
  }
  .headportraitwo {
    margin-top: 0;
    padding: .3rem .4rem;
    .headportrait-div {
      display: flex; // justify-content:flex-start;
      p {
        margin-right: .2rem;
        line-height: 1.4rem;
        text-align: center;
        font-weight: 100;
        font-family: Arial;
        @include sc(.7rem, #999);
      }
      .headportrait-div-bottom {
        top: 0;
      }
    }
  }
  .headportraithree {
    border-bottom: 1px solid #ddd;
  }
  .bind-phone {
    padding: .4rem;
    @include sc(.5rem, #666);
  }
  .exitlogin {
    width: 96%;
    margin: 1.3rem auto 0;
    line-height: 1.5rem;
    text-align: center;
    border-radius: 5px;
    background-color: #d8584a;
    @include sc(.6rem, #fff);
    &:active {
      opacity: .8;
      background-color: #c1c1c1;
    }
  }
}

.coverpart {
  @include wh(100%, 100%);
  @include allcover;
  .cover-background {
    z-index: 100;
    opacity: .2;
    background: #000;
    @include wh(100%, 100%);
    @include allcover;
  }
  .cover-content {
    z-index: 1000;
    position: absolute;
    top: 20%;
    left: 3%;
    width: 94%;
    padding: 17px;
    border-radius: 5px;
    background-color: #fff;
    .sa-icon {
      position: relative;
      margin: 20px auto;
      border-radius: 50%;
      border: 4px solid #f8bb86;
      @include wh(90px, 90px);
      .sa-body {
        top: 10px;
        background-color: #f8bb86;
        border-radius: 2px;
        @include wh(5px, 47px);
        @include center-left;
      }
      .sa-dot {
        bottom: 10px;
        border-radius: 50%;
        background-color: #f8bb86;
        @include wh(7px, 7px);
        @include center-left;
      }
    }
    h2 {
      margin: 25px 0;
      width: 100%;
      text-align: center;
      font-weight: 500;
      @include sc(30px, #575757);
    }
    .sa-botton {
      width: 100%;
      text-align: center;
      button {
        display: inline-block;
        margin-top: 26px;
        padding: .4rem 1rem;
        letter-spacing: 1px;
        border-radius: 5px;
        @include sc(.6rem, #fff);
      }
      .waiting {
        margin-right: .4rem;
        background-color: #c1c1c1;
      }
      .quitlogin {
        background-color: rgb(221, 107, 85);
      }
    }
  }
}

body .coverpart .cover-animate {
  transition: all 1s;
  animation: bounceIn .6s;
}

body .coverpart .cover-animate-leave {
  animation: zoomOut .4s;
}

.router-sild-enter-active,
.router-sild-leave-active {
  transition: all .4s;
}

.router-sild-enter,
.router-sild-leave-active {
  transform: translateX(100%);
}

@keyframes bounceIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  100% {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(.9, .9, .9);
  }
  60% {
    opacity:1;
    transform: scale3d(1.03,1.03,1.03);
  }
  80% {
    transform: scale3d(.97, .97, .97);
  }
  40% {
    opacity: 1;
    transform: scale3d(1,1,1);
  }
}
@keyframes zoomOut {
  0%{
    opacity:1;
  }
  50%{
    opacity: 0;
    transform:scale3d(.3,.3,.3);
  }
  100%{
    opacity:0;
  }
}
</style>

