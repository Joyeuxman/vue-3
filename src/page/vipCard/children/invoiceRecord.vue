<template>
  <div class="invoiceRecord_page">
    <head-top headTitle="兑换会员" goBack="true"/>
  </div>
</template>


<script>
import headTop from '@/components/header/head';

export default {
  name:'invoiceRecord',
  components:{headTop,},
  data(){
    return{

    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../../style/mixin';

.invoiceRecord_page{
  padding-top:1.95rem;
}
</style>