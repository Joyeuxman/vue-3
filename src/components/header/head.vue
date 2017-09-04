<template>
  <header id="head_top">
    <slot name="logo" />
    <div class="head_goback" v-if="goBack" @click="$router.go(-1)"></div>
    <router-link to="/login" v-if="signinUp" class="head_login">登录|注册</router-link>
    <div class="title_head" v-if="headTitle">{{headTitle}}</div>
    <slot name="changecity" />
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
  position: fixed;
  left: 0;
  top: 0;
  background-color: $blue;
  @include wh(100%, 1.95rem);
}

.head_goback {
  left: 0.4rem;
  @include wh(0.375rem, 0.7rem);
  @include center-top;
  @include backimg('../../images/icon_back.png');
}

.head_login {
  right: 0.55rem;
  @include sizecolor(0.6rem, #fff);
  @include center-top;
}

.title_head {
  @include center;
  @include sizecolor(0.7rem, #fff);
}
</style>

