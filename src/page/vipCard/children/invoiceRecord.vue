<template>
  <div class="invoiceRecord_page">
    <head-top headTitle="购买记录" goBack="true" />
    <section class="invoice_container">
      <img src="../../../images/no-log.png" alt="">
      <p>没有购买记录</p>
    </section>
  </div>
</template>


<script>
import headTop from '@/components/header/head';

export default {
  name: 'invoiceRecord',
  components: { headTop, },
  data() {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../../style/mixin';

.invoiceRecord_page {
  z-index: 202;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #fff;
}
.invoice_container{
  display: flex;
  flex-direction: column;
  align-items:center;
  img{
    margin-top:5rem;
    @include wh(8rem,5rem);
  }
  p{
    margin-top:.8rem;
    @include sc(.6rem,#666);
  }
}
</style>