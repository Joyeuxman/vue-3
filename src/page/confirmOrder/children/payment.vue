<template>
  <div class="payment_page">
    <head-top headTitle="在线支付" goBack="true"/>
  </div>
</template>


<script>
import headTop from '@/components/header/head';

export default {
  name:'payment',
  components:{headTop,},
  data(){
    return{

    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../../style/mixin';

.payment_page{
  z-index:202;
  position: fixed;
  top:0;
  right: 0;
  bottom:0;
  left: 0;
  padding-top:1.95rem;
  background-color:#fff;
}
</style>