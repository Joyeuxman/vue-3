<template>
  <div class="setusername_page">
    <head-top headTitle="修改用户名" goBack="true" />
    <section class="setname">
      <section class="setname-top">
        <input type="text" :class="{'setname-input':borderColor}" placeholder="输入用户名" v-model="inputValue" @input="inputThing">
        <div>
          <p v-if="earn">用户名只能修改一次（5-24字符之间）</p>
          <p class="unlikep" v-else>用户名长度在5到24位之间</p>
        </div>
      </section>
      <section class="reset">
        <button :class="{'fontopacity':opacityall}" @click="retsetName">确认修改</button>
      </section>
    </section>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';
import headTop from '@/components/header/head';

export default {
  name: 'setusername',
  components: { headTop, },
  data() {
    return {
      earn: true,//输入框提醒
      borderColor: false,//输入框颜色
      opacityall: false,//字体透明度
      inputValue: '',//输入框的值
      // newusername: '',//新用户名
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    ...mapMutations(['RETSET_NAME']),
    // 校验输入的值
    inputThing() {
      const l = this.inputValue.length;
      if (l < 5 || l > 25) {
        this.earn = false;
        this.borderColor = true;
        this.opacityall = false;
      } else {
        this.earn = true;
        this.borderColor = false;
        this.opacityall = true;
      }
    },
    // 重新设置用户名
    retsetName() {
      this.RETSET_NAME(this.inputValue);
      this.$router.go(-1);
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../../style/mixin';

.setusername_page {
  z-index: 202;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #f2f2f2;
}

.setname {
  width: 15.2rem;
  margin: 0 auto;
  .setname-top {
    padding-top: .4rem;
    input {
      display: block;
      width: 15.2rem;
      margin: 0 auto;
      padding: .2rem;
      line-height: 1.2rem;
      border: 1px solid #ddd;
      border-radius: 2px;
      @include sc(.6rem, #333);
    }
    .setname-input {
      border-color: #ea3106;
    }
    p {
      padding: .4rem .1rem;
      @include sc(.4rem, #666);
    }
    .unlikep {
      padding-top: .3rem;
      @include sc(.6rem, #ea3106);
    }
  }
  .reset {
    button {
      display: block;
      opacity: .6;
      width: 100%;
      margin: 0 auto;
      line-height: 1.8rem;
      text-align: center;
      border-radius: .2rem;
      background-color: #3199e8;
      transition:all 1s;
      @include sc(.6rem, #fff);
    }
    .fontopacity {
      transition:all 1s;
      opacity: 1;
    }
  }
}
</style>