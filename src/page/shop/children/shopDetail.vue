<template>
  <div class="rating_page">
    <head-top head-title="商品详情" go-back="true" />
  </div>
</template>


<script>
import headTop from '@/components/header/head';

export default {
  name: 'shopDetails',
  components: { headTop },
}
</script>


<style lang="scss" scoped>
@import '../../../style/mixin';
.rating_page {
  z-index: inherit 18;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
</style>