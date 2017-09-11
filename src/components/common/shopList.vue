<template>
  <div class="shoplist_container">
    <ul v-load-more="loaderMore" v-if="shopListArr.length">
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
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <section class="rating_section">
                <div class="rating_container">
                  <span class="star_container">
                    <svg class="grey_fill" v-for="num in 5" :key="num">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                    </svg>
                  </span>
                  <div :style="'width:' + item.rating*2/5 + 'rem'" class="star_overflow">
                    <span class="star_container">
                      <svg class="orange_fill" v-for="num in 5" :key="num">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                      </svg>
                    </span>
                  </div>
                </div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { imgBaseUrl } from '@/config/env'
import { msiteShopList } from '@/service/getData'
import { loadMore } from '@/components/common/mixin'
import { showBack, animate } from '@/config/mUtils'

export default {
  name: 'shopList',
  data() {
    return {
      offset: 0,//批次加载店铺列表，每次加载20个 limit=20
      shopListArr: [],//店铺列表数据
      imgBaseUrl,//图片域名地址
      preventRepeatRequest: false,//到达底部加载数据，防止重复加载
      showBackStatus: false,//显示返回顶部按钮
    }
  },
  // async await 异步执行
  // 等到msiteShop这个异步请求得到结果后，才执行生命周期中在mounted之后的操作
  async mounted() {
    this.shopListArr = await msiteShopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
    // 开始监听scrollTop的值，达到一定程度后开始显示返回顶部按钮
    showBack(status => {
      this.showBackStatus = status;
    })
  },
  props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect'],
  mixins: [loadMore],
  computed: {
    ...mapState([
      'latitude', 'longitude'
    ])
  },
  methods: {
    // 传递过来的图片地址需要经过处理后才可以正常使用
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
    },

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
        .rating_container {
          position: relative;
          width: 2rem;
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


