<template>
  <div class="rating_container">
    <span class="star_container">
      <svg class="grey_fill" v-for="num in 5" :key="num">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
      </svg>
    </span>
    <div :style="'width:' + rating*2/5 + 'rem'" class="star_overflow">
      <span class="star_container">
        <svg class="orange_fill" v-for="num in 5" :key="num">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ratingStar',
  props: ['rating']
}
</script>

<style lang="scss" scoped>
.rating_container {
  position: relative;
  width: 2rem;
  height:0.4rem;
  .star_overflow {
    position: absolute;
    height: 100%;
    overflow: hidden;
  }
  .star_container {
    display: flex;
    position: absolute;
    top: -0.02rem;
    width: 2rem;
    height: 0.4rem;
    .grey_fill {
      fill: #d1d1d1;
    }
    .orange_fill {
      fill: #ff9a0d;
    }
  }
}
</style>

