<template>
  <div class="download_page">
    <head-top headTitle='下载' goBack='true' />
    <section class="download_container">
      <img src="../../images/elmlogo.jpeg" alt="logo图片" class="logo_img">
      <p>下载饿了吗APP</p>
      <div class="determine" @click="download">下载</div>
    </section>
    <alert-tip v-if="showAlert" :alertText="alertText" @closeTip="showAlert = false" />
  </div>
</template>


<script>
import headTop from '@/components/header/head';
import alertTip from '@/components/common/alertTip';

export default {
  name: 'download',
  components: { headTop,alertTip },
  data() {
    return {
      system: null,//手机操作系统
      showAlert: false,//是否显示弹框
      alertText: null,//弹框中的提示信息
    }
  },
  created() {
    // 判断手机的操作系统
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios终端
    if (isAndroid) {
      this.system = 'Android';
    } else if (isIOS) {
      this.system = 'IOS';
    } else {
      this.system = 'PC';
    }
  },
  methods: {
    download() {
      if (this.system == 'IOS') {
        this.showAlert = true;
        this.alertText = 'IOS用户请前往APPStore下载';
      } else {
        try {
          const elemIF = document.createElement('iframe');
          elemIF.src = 'http://static10.elemecdn.com/uploads/androidapp/eleme6_4_1476672934695.apk';
          elemIF.style.display = 'none';
          document.body.appendChild(elemIF);
        } catch (e) {
          alert('下载失败，请稍后再试');
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

.download_page {
  z-index: 202;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #fff;
}

.download_container {
  text-align: center;
  .logo_img {
    margin-top: 1rem;
    border-radius: 1rem;
  }
  p {
    margin-bottom: 1rem;
    @include sc(.8rem, #666);
  }
  .determine {
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: .2rem;
    background-color: #4cd964;
    @include sc(.7rem, #fff);
  }
}
</style>


