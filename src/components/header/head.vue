<template>
  <header id="head_top">
    <slot name="logo" /><!-- 饿了吗logo图标 -->
    <slot name="search" /><!-- 搜索图标 -->
    <section class="head_goback" v-if="goBack" @click="$router.go(-1)"><!-- 返回按钮 -->
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2" />
      </svg>
    </section>
    <section class="title_head ellipsis" v-if="headTitle"><!-- 城市名称 -->
      <span class="title_text">{{headTitle}}</span>
    </section>
    <slot name="msite-title" /><!-- 特色商铺名称 -->
    <router-link to="/login" v-if="signinUp" class="head_login">登录|注册</router-link><!-- 登录|注册 -->
    <slot name="changecity" /><!-- 切换城市 -->
  </header>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  props: ['signinUp', 'headTitle', 'goBack'],
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
#head_top {
  z-index: 9999999999999;
  position: fixed;
  left: 0;
  top: 0;
  background-color: $blue;
  @include wh(100%, 1.95rem);
}

.head_goback {
  left: 0.4rem;
  @include wh(0.6rem, 0.8rem);
  @include center-top;
}

.head_login {
  right: 0.55rem;
  @include sizecolor(0.6rem, #fff);
  @include center-top;
}

.title_head {
  width: 50%;
  text-align: center;
  color: #fff;
  @include center;
  .title_text {
    @include sizecolor(0.8rem, #fff);
    text-align: center;
  }
}
</style>

