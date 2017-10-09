<template>
  <div class="shoplist_container">
    <ul v-load-more="loaderMore" v-if="shopListArr.length">
      <router-link class="shop_li" tag="li" :to="{path:'shop',query:{geohash,id:item.id}}" v-for="item in shopListArr" :key="item.id">
        <section>
          <img class="shop_img" :src="getImgPath(item.image_path)" alt="商品图片">
        </section>
        <hgroup class="shop_right">
          <header class="shop_detail_header">
            <!-- premium 保险费 -->
            <h4 class="shop_title ellipsis" :class="item.is_premium ? 'premium':''">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li class="supports" v-for="item in item.supports" :key="item.id">{{item.icon_name}}</li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <section class="rating_section">
                <rating-star :rating='item.rating' />
                <span class="rating_num">{{item.rating}}</span>
              </section>
              <section class="order_section">
                月售{{item.recent_order_num}}单
              </section>
            </section>
            <section class="rating_order_num_right" v-if="item.delivery_mode">
              <span class="delivery_style delivery_left">{{item.delivery_mode.text}}</span>
              <span class="delivery_style delivery_right">准时达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <section class="fee">
              ￥{{item.float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </section>
            <section class="distance_time">
              <span>
                {{item.distance>1000?(item.distance/1000).toFixed(2)+'km':item.distance+'m'}}
                <span class="segmentation">/</span>
              </span>
              <span class="order_time">{{item.order_lead_time}}分钟</span>
            </section>
          </h5>
        </hgroup>
      </router-link>
    </ul>
    <p class="empty_data">没有更多了</p>
    <aside class="return_top" @click="backTop" v-if="showBackStatus">
      <svg class="back_top_svg">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop" />
      </svg>
    </aside>
    <footer class="load_more">正在加载更多商家...</footer>
    <div ref="abc" style="background-color:red;"></div>
    <transition name="loading">
      <loading v-show="showLoading" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { msiteShopList } from '@/service/getData'
import { loadMore, getImgPath } from '@/components/common/mixin'
import { showBack, animate } from '@/config/mUtils'
import loading from '@/components/common/loading'
import ratingStar from '@/components/common/ratingStar'

export default {
  name: 'shopList',
  data() {
    return {
      offset: 0,//批次加载店铺列表，每次加载20个 limit=20
      shopListArr: [],//店铺列表数据
      preventRepeatRequest: false,//到达底部加载数据，防止重复加载
      showBackStatus: false,//显示返回顶部按钮
      showLoading: true,//显示加载动画
    }
  },
  // async await 异步执行
  // 等到msiteShop这个异步请求得到结果后，才执行生命周期中在mounted之后的操作
  async mounted() {
    this.shopListArr = await msiteShopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
    this.showLoading = false;
    // 开始监听scrollTop的值，达到一定程度后开始显示返回顶部按钮
    showBack(status => {
      this.showBackStatus = status;
    })
  },
  components: { loading, ratingStar },
  props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect','geohash'],
  // 将getImgPath提取为公共方法，用mixins来接收
  mixins: [loadMore, getImgPath],
  computed: {
    ...mapState([
      'latitude', 'longitude'
    ])
  },
  methods: {
    // 到达底部加载更多数据
    async loaderMore() {
      // 防止重复请求
      if (this.preventRepeatRequest) return;
      this.preventRepeatRequest = true;
      // 数据的定位加20位
      this.offset += 20;
      let res = await msiteShopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
      this.shopListArr = this.shopListArr.concat(res);
      // 当获取数据小于20,说明没有更多数据，不需要再次请求数据
      if (res.length < 20) return;
      this.preventRepeatRequest = false;
    },

    // 返回顶部
    backTop() {
      animate(document.body, { scrollTop: '0' }, 400, 'ease-out');
    },

    // 监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
    async listenPropChange() {
      this.offset = 0;
      this.shopListArr = await msiteShopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds);
    }
  },

  watch: {
    // 监听父级传来的restaurantCategoryIds,当值发生变化的时候重新获取餐馆数据，作用于排序的筛选
    restaurantCategoryIds: function(value) {
      this.listenPropChange();
    },

    // 监听父级传来的排序方式
    sortByType: function(value) {
      this.listenPropChange();
    },

    // 监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
    confirmSelect: function(value) {
      this.listenPropChange();
      this.$emit('DidConfirm');
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.shoplist_container {
  background-color: #fff;
}

.shop_li {
  display: flex;
  padding: 0.7rem 0.4rem;
  border-bottom: 0.025rem solid #f1f1f1;
}

.shop_img {
  display: block;
  margin-right: 0.4rem;
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
      @include sc(0.7rem, #333);
    }
    .premium::before {
      content: '品牌';
      display: inline-block;
      margin-right: 0.2rem;
      padding: 0 0.1rem;
      border-radius: 0.1rem;
      vertical-align: top;
      font-size: 0.5rem;
      background-color: #ffd930;
    }
    .shop_detail_ul {
      display: flex;
      .supports {
        margin-left: 0.05rem;
        padding: 0.04rem;
        border: 0.025rem solid #f1f1f1;
        border-radius: 0.08rem;
        @include sc(0.5rem, #999);
      }
    }
  }
  .rating_order_num {
    height: 0.6rem;
    margin-top: 0.52rem;
    @include fj(space-between);
    .rating_order_num_left {
      @include fj(flex-start);
      .rating_section {
        display: flex;
        .rating_num {
          @include sc(0.4rem, #ff6000);
          margin: 0 0.2rem;
        }
      }
      .order_section {
        @include sc(0.4rem, #666);
      }
    }
    .rating_order_num_right {
      display: flex;
      .delivery_style {
        padding: 0.04rem 0.08rem 0;
        margin-left: 0.08rem;
        border-radius: 0.08rem;
        font-size: 0.4rem;
      }
      .delivery_left {
        border: 0.025rem solid $blue;
        background-color: $blue;
        color: #fff;
      }
      .delivery_right {
        border: 0.025rem solid $blue;
        color: $blue;
      }
    }
  }
  .fee_distance {
    margin-top: 0.52rem;
    @include fj;
    @include sc(0.5rem, #666);
    .distance_time {
      span {
        color: #888;
      }
      .order_time {
        color: $blue;
      }
      .segmentation {
        color: #ccc
      }
    }
  }
}

.load_more {
  text-align: center;
  color: #999;
  @include font(0.6rem, 3);
}

.empty_data {
  line-height: 2rem;
  text-align: center;
  @include sc(0.5rem, #666);
}

.return_top {
  position: fixed;
  bottom: 3rem;
  right: 1rem;
  .back_top_svg {
    @include wh(2rem, 2rem);
  }
}
</style>


