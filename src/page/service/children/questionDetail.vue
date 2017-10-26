<template>
  <div class="questionDetail_page">
    <head-top headTitle="活动问题" goBack="true"/>
    <section class="markdown" v-html="markdownText"></section>
  </div>
</template>


<script>
import headTop from '@/components/header/head';
import {mapState} from 'vuex';
import showdown from 'showdown';

export default {
  name:'service',
  components:{headTop,},
  computed:{
    ...mapState(['question']),
    markdownText(){
      const converter = new showdown.Converter();
      return converter.makeHtml(this.question.detail);
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../../style/mixin';

.questionDetail_page{
  z-index:202;
  position: fixed;
  top:0;
  right: 0;
  bottom:0;
  left: 0;
  padding-top:1.95rem;
  overflow-y: auto;
  background-color:#fff;
}
.markdown{
  padding:.2rem .7rem ;
  font-weight:normal;
  @include sc(.6rem,#666);
}
</style>