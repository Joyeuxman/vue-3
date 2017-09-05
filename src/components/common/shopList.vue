<template>
  <ul>
    <router-link class="shop_li" tag="li" :to="{path:'food',query:{}}" v-for="item in shopListArr" :key="item.id">
      <section>
        <img class="shop_img" :src="`${imgBaseUrl}${subImgUrl(item.image_path)}`" alt="商品图片">
      </section>
      <hgroup class="shop_right">
        <header class="shop_detail_header">
          <!-- premium 保险费 -->
          <h4 class="shop_title ellipsis" :class="item.is_premium ? 'premium':''">{{item.name}}</h4>
          <ul class="shop_detail_ul">
            <li class="supports" v-for="item in item.supports" :key="item.id">{{item.icon_name}}</li>
          </ul>
        </header>
        <!-- ??? -->
        <h5></h5>
        <h5></h5>
      </hgroup>
    </router-link>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import { imgBaseUrl } from '@/config/env'
import { msiteShopList } from '@/service/getData'

export default {
  name: 'shopList',
  data() {
    return {
      offset: 0,//批次加载店铺列表，每次加载20个 limit=20
      shopListArr: [],//店铺列表数据
      imgBaseUrl,
    }
  },
  // async await 异步执行
  // 等到msiteShop这个异步请求得到结果后，才执行生命周期中在mounted之后的操作
  async mounted() {
    this.shopListArr = await msiteShopList(this.latitude, this.longitude, this.offset);
  },
  computed: {
    ...mapState([
      'latitude', 'longitude'
    ])
  },
  methods: {
    subImgUrl(path) {
      let suffix;//图片后缀 --- suffix 后缀
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg';
      } else {
        suffix = '.png';
      }
      // 拼接成饿了吗后台存放图片的地址
      const url = `/${path.substr(0, 1)}/${path.substr(1, 2)}/${path.substr(3)}${suffix}`;
      return url;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.shop_li {
  display: flex;
  padding: 0.8rem 0.4rem;
  border-bottom: 1px solid $bordercolor;
}

.shop_img {
  display: block;
  margin-right: 0.3rem;
  @include wh(2.7rem, 2.7rem);
}

.shop_right {
  // flex属性是flex-grow(项目放大比例)、flex-shrink(项目缩小比例)、flex-basis(项目占据的主空间)的简写
  // 默认值是0 1 auto,后两个属性可选
  // flex:auto; --->  1 1 auto
  flex: auto;
  .shop_detail_header {
    align-items: center;
    @include fj;
    .shop_title {
      width: 8.5rem;
      font-weight: 700;
      @include sizecolor(0.7rem, #333);
    }
    .premium {}
    .shop_detail_ul {
      display: flex;
      .supports {
        margin-left: 0.1rem;
        padding: 0.04rem;
        border: 0.025rem solid #f1f1f1;
        border-radius: 0.08rem;
        @include sizecolor(0.5rem, #999);
      }
    }
  }
}
</style>

