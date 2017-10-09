<template>
  <div>
    <head-top signin-up="msite">
      <router-link class="link_search" :to="`/search/${geohash}`" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="9" cy="9" r="8" stroke="rgb(255,255,255)" stroke-width="2" fill="none" />
          <line x1="15" y1="15" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2" />
        </svg>
      </router-link>
      <router-link class="msite_title" to="/home" slot="msite-title">
        <span class="title_text">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item,index) in foodTypes" :key="index">
            <router-link class="link_to_food" :to="{path:'/food',query:{geohash,title:foodItem.title,restaurant_category_id:getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id">
              <!-- ???figure 有着很大的外边距，记得要将其外边距置0 -->
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url" alt="图片">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop_header_title">附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { imgBaseUrl } from '@/config/env'
import headTop from '@/components/header/head'
import shopList from '@/components/common/shopList'
import { msiteAddress, msiteFoodTypes, msiteShopList } from '@/service/getData'
// ??? 报错 
// 通过在根目录中的index.html中全局引入swiper.min.js
// require('../../plugins/swiper.min.js') ;
// 以上做法会导致swiper分页器不显示 
// 已解决 
// 将.babelrc文件的"modules": false配置去掉，在plugins选项中添加transform-es2015-modules-commonjs
// 执行 npm install transform-es2015-modules-commonjs --save
import '../../plugins/swiper.min.js'
import '../../style/swiper.min.css'

export default {
  name: 'msite',
  components: { headTop, shopList },
  data() {
    return {
      geohash: '',//city页面传递过来的地址geohash
      msiteTitle: '获取地址中...',//msite页面头部标题
      foodTypes: [],//食品分类列表
      hasGetData: false,//是否已经获取到数据
      imgBaseUrl,//图片域名地址
    }
  },
  async beforeMount() {
    this.geohash = this.$route.query.geohash;
    // 获取位置信息
    // 使用const来接await异步返回的结果不会报错
    const res = await msiteAddress(this.geohash);
    this.msiteTitle = res.name;
    // 记录当前经度纬度
    this.RECORD_ADDRESS(res);

    this.hasGetData = true;
  },
  mounted() {
    // 获取导航食品类型列表
    msiteFoodTypes(this.geohash)
      .then(res => {
        const resLength = res.length;
        const resArr = res.concat([]);//返回一个新的数组
        const foodArr = [];
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8);
        }
        this.foodTypes = foodArr;
      })
      .then(() => {
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: true,
        })
      })
  },
  methods: {
    ...mapMutations([
      'RECORD_ADDRESS'
    ]),
    // 解码url地址，求去restaurant_category_id的值
    getCategoryId(url) {
      const urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id;
      } else {
        return ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

.link_search {
  left: 0.8rem;
  @include wh(.8rem, .9rem);
  @include center-top;
}

.msite_title {
  width: 50%;
  margin-left: -0.5rem;
  text-align: center;
  @include center;
  .title_text {
    //??? 此处为什么要加display: block;
    // 唯一特别之处是 父元素上下左右居中
    // 由于父元素也是块元素，貌似可以继承父元素的上下左右居中
    display: block;
    @include sc(0.8rem, #fff);
  }
}

.msite_nav {
  padding-top: 2.1rem;
  border-bottom: 0.025rem solid $bc;
  background-color: #fff;
  .swiper-container {
    padding-bottom: 0.6rem;
    @include wh(100%, auto);
    .swiper-pagination {
      bottom: 0.2rem;
    }
  }
}

.food_types_container {
  display: flex;
  flex-wrap: wrap;
  .link_to_food {
    width: 25%;
    padding: 0.3rem 0rem;
    @include fj(center);
    figure {
      img {
        margin-bottom: 0.3rem;
        @include wh(1.8rem, 1.8rem);
      }
      figcaption {
        text-align: center;
        @include sc(0.55rem, #666);
      }
    }
  }
}

.shop_list_container {
  margin-top: .4rem;
  border-top: 0.025rem solid $bc;
  background-color: #fff;
  .shop_header {
    .shop_icon {
      margin-left: 0.6rem;
      vertical-align: middle;
      fill: #999;
      @include wh(0.6rem, 0.6rem);
    }
    .shop_header_title {
      color: #999;
      @include font(0.55rem, 1.6rem);
    }
  }
}
</style>
