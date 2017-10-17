<template>
  <div class="vipDescription_page">
    <head-top headTitle="我的优惠" goBack="true"/>
    <p>未完成</p>
  </div>
</template>


<script>
import headTop from '@/components/header/head';

export default {
  name:'vipDescription',
  components:{headTop,},
  data(){
    return{

    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../../style/mixin';

.vipDescription_page{
  z-index: 202;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #fff;
}
</style>