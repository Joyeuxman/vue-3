<template>
  <div class="shop_container">
    <header class="shop_detail_header" v-if="!showLoading" ref="shopheader" :style="{zIndex:showActivities? '14':'10'}">
      <img :src="getImgPath(shopDetailData.image_path)" alt="" class="header_cover_img">
      <section class="description_header">
        <section class="description_top" @click="showActivitiesFun">
          <section class="description_left">
            <img :src="getImgPath(shopDetailData.image_path)" alt="必胜客图片">
          </section>
          <section class="description_right">
            <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
            <p class="description_text">商家配送 / {{shopDetailData.order_lead_time}}分钟送达 / 配送费￥{{shopDetailData.float_delivery_fee}}</p>
            <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
          </section>
          <svg class="description_arrow" xmlns="http://www.w3.org/1999/svg" version="1.1" width="14" height="14">
            <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none" />
          </svg>
        </section>
        <footer class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
          <p class="ellipsis">
            <span class="tip_icon" :style="{backgroundColor:`#${shopDetailData.activities[0].icon_color}`,borderColor:`#${shopDetailData.activities[0].icon_color}`}">{{shopDetailData.activities[0].icon_name}}</span>
            <span>{{shopDetailData.activities[0].description}}（APP专享）</span>
          </p>
          <p>{{shopDetailData.activities.length}}个活动</p>
        </footer>
        <transition name="fade">
          <section class="activities_details" v-if="showActivities">
            <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
            <h3 class="activities_ratingstar">
              <rating-star :rating="shopDetailData.rating" />
            </h3>
            <section class="activities_list">
              <header class="activities_title_style">
                <span>优惠信息</span>
              </header>
              <ul>
                <li v-for="item in shopDetailData.activities" :key="item.id">
                  <span class="activities_icon" :style="{backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                  <span>{{item.description}}（APP专享）</span>
                </li>
              </ul>
            </section>
            <section class="activities_shopinfo">
              <header class="activities_title_style">
                <span>商家公告</span>
              </header>
              <p>{{promotionInfo}}</p>
            </section>
            <svg class="close_activities" width="60" height="60" @click.stop="showActivitiesFun">
              <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
              <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2" />
              <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2" />
            </svg>
          </section>
        </transition>
      </section>
    </header>
    <section class="menu_container">
      <ul class="menu_left">
        <li class="menu_left_li" :class="{activity_menu:index == menuIndex}" @click="chooseMenu(index)" v-for="(item,index) in menuList" :key="index">
          <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
          <span>{{item.name}}</span>
          <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
        </li>
      </ul>
      <ul class="menu_right" ref="menuFoodList">
        <li v-for="(item,index) in menuList" :key="index">
          <header class="menu_detail_header">
            <section class="menu_detail_header_left">
              <strong class="menu_item_title">{{item.name}}</strong>
              <span class="menu_item_description">{{item.description}}</span>
            </section>
            <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
            <transition name="fade">
              <p class="description_tip" v-show="index == TitleDetailIndex">
                <span>{{item.name}}</span>{{item.description}}
              </p>
            </transition>
          </header>
          <section class="menu_deatil_list" v-for="(foods,foodindex) in item.foods" :key="foodindex">
            <router-link class="menu_detail_link" to="/shop/rating" tag="div">
              <section class="menu_food_img">
                <img :src="getImgPath(foods.image_path)">
              </section>
              <section class="menu_food_description">
                <h3 class="food_description_head">
                  <strong class="description_foodname">{{foods.name}}</strong>
                  <ul class="attributes_ul" v-if="foods.attributes.length">
                    <li v-for="(attribute,foodindex) in foods.attributes" :key="foodindex" :style="{color:`#${attribute.icon_color}`,borderColor:`#${attribute.icon_color}`}" :class="{attribute_new:attribute.icon_name == '新'}">
                      <p :style="{color:attribute.icon_name == '新' ? '#fff':`#${attribute.icon_color}`}">
                        {{attribute.icon_name == '新' ? '新品' : attribute.icon_name}}
                      </p>
                    </li>
                  </ul>
                </h3>
                <p class="food_description_content">{{foods.description}}</p>
                <p class="food_description_sale_rating">
                  <span>月售{{foods.month_sales}}份</span>
                  <span>好评率{{foods.satisfy}}%</span>
                </p>
                <p class="food_activity" v-if="foods.activity">
                  <span :style="{color: '#' + foods.activity.image_text_color,borderColor:'#' +foods.activity.icon_color}">{{foods.activity.image_text}}</span>
                </p>
              </section>
            </router-link>
            <footer class="menu_detail_footer">
              <section class="food_price">
                <span>￥</span>
                <span>{{foods.specfoods[0].price}}</span>
                <span v-if="foods.specifications.length">起</span>
              </section>
              <buy-cart :foods="foods" :shopCart="shopCart" @add="addToCart" @reduce="removeOutCart" />
            </footer>
          </section>
        </li>
      </ul>
    </section>
    <section class="buy_cart_container">
      <section class="cart_icon_num" @click="toggleCartList">
        <div class="cart_icon_container" :class="{cart_icon_activity:totalPrice>0}">
          <svg class="cart_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon" />
          </svg>
        </div>
        <div class="cart_num">
          <div>￥ {{totalPrice}} </div>
          <div>配送费￥{{deliveryFee}}</div>
        </div>
      </section>
      <section class="gotopay" :class="{gotopay_activity:minimumOrderAmount<0}">
        <span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差￥{{minimumOrderAmount}}起送</span>
        <span class="gotopay_button_style" v-else>去结算</span>
      </section>
    </section>
    <transition name="toggle-cart">
      <section class="cart_food_list" v-show="showCartList&&cartFoodList.length">
        <header>
          <h4>购物车</h4>
          <div @click="clearCart">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove" />
            </svg>
            <span class="clear_cart">清空</span>
          </div>
        </header>
        <section class="cart_food_details">
          <ul>
            <li class="cart_food_li" v-for="(item,index) in cartFoodList" :key="index">
              <div class="cart_list_num">
                <p class="ellipsis">{{item.name}}</p>
                <p class="ellipsis">{{item.specs}}</p>
              </div>
              <div class="cart_list_price">
                <span>￥</span>
                <span>{{item.price}}</span>
              </div>
              <section class="cart_list_control">
                <svg @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                </svg>
                <span class="cart_num">{{item.num}}</span>
                <svg class="cart_add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                </svg>
              </section>
            </li>
          </ul>
        </section>
      </section>
    </transition>
    <transition name="fade">
      <div class="screen_cover" @click="toggleCartList" v-show="showCartList&&cartFoodList.length"></div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getImgPath } from '@/components/common/mixin'
import { msiteAddress, shopDetails, foodMenu } from '@/service/getData'
import loading from '@/components/common/loading'
import ratingStar from '@/components/common/ratingStar'
import { animate } from '@/config/mUtils'
import buyCart from '@/components/common/buyCart'

export default {
  name: 'shop',
  mixins: [getImgPath],
  components: { loading, ratingStar, buyCart },
  data() {
    return {
      showLoading: true,//显示加载动画
      showActivities: false,//是否显示活动详情
      shopDetailData: null,//商铺详情
      shopId: null,//商铺ID
      geohash: '',//geohash位置信息
      menuList: [],//食品列表
      menuIndex: 0,//已选菜单索引值
      menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
      shopListTop: [],//商品列表的高度集合 用来动态显示商品(点击左边，右边相应变化)
      categoryNum: [],//商品类型右上角已加入购物车的数量
      TitleDetailIndex: null,//点击展示列表头部详情
      showCartList: false,//显示购物车列表
      totalPrice: 0,//商品的总共价格
      cartFoodList: [],//购物车商品列表
    }
  },
  created() {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    this.INIT_BUYCART();
  },
  mounted() {
    this.initData();
  },
  computed: {
    ...mapState(['latitude', 'longitude', 'cartList']),
    // 公告信息
    promotionInfo() {
      return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
    },
    // 当this.cartList发生变化时，触发computed中的shopCart方法,并将值返回给this.shopCart,从而触发watch中的shopCart方法
    shopCart() {
      // console.log('this.shopCart===', Object.assign({}, this.cartList[this.shopId]));
      return Object.assign({}, this.cartList[this.shopId]);
    },
    // 配送费
    deliveryFee() {
      if (this.shopDetailData) {
        return this.shopDetailData.float_delivery_fee;
      } else {
        return null;
      }
    },
    // 起送价-所选商品总价格
    minimumOrderAmount() {
      if (this.shopDetailData) {
        return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
      } else {
        return null;
      }
    },

  },

  watch: {
    // 当this.showLoading发生变化时，触发该watch中的showLoading函数
    // value为所观察属性的值
    showLoading(value) {
      // loading加载结束
      if (!value) {
        // $nextTick:在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        // 加深理解 : 异步更新队列
        /*
          可能你还没有注意到，Vue异步执行DOM更新。只要观察到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据变化。
          如果同一个watcher被多次触发，只会一次推入到队列中。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作上非常重要。
          然后，在下一个的事件循环中'tick'中，Vue刷新队列并执行实际(已去重的)工作。Vue在内部尝试对异步使用原生的Promise.then和
          MutationObserver,如果执行环境不支持，会采用setTimeout(fn,0)代替。
          例如，当你设置vm.someData = 'new value' ,该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个'tick'更新。
          多数情况下我们并不需要关心这个过程，但是如果你想在DOM状态更新后做点什么，这就有可能会有点棘手。虽然Vue.js通常鼓励开发人员沿着
          数据驱动的方式思考，避免直接接触DOM，但是有时我们确实需要这么做。为了在数据变化之后等待Vue完成更新DOM,可以在数据变化之后
          立即调用Vue.nextTick(callback).这样回调函数在DOM更新完成之后就会调用。
        */
        this.$nextTick(() => {
          this.getFoodListHeight();
          this.initCategoryNum();
        })
      }
    },
    // 当this.shopCart发生变化时，触发该watch中的shopCart函数
    shopCart(value) {
      this.initCategoryNum();
    },
    //当this.cartFoodList发生变化时，触发该watch中的cartFoodList函数
    cartFoodList(value) {
      if (value.length == 0) {
        this.showCartList = false;
      }
    }
  },
  methods: {
    ...mapMutations([
      'RECORD_ADDRESS', 'ADD_CART', 'REDUCE_CART', 'INIT_BUYCART', 'CLEAR_CART'
    ]),
    // 初始化获取商铺食品列表基本数据
    async initData() {
      if (!this.latitude) {
        // 获取位置信息
        const res = await msiteAddress(this.geohash);
        // 记录当前经度纬度存入vuex
        this.RECORD_ADDRESS(res);
      }
      this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
      this.menuList = await foodMenu(this.shopId);
      this.showLoading = false;
    },
    // 切换是否显示活动详情
    showActivitiesFun() {
      this.showActivities = !this.showActivities;
    },
    // 点击列表左边，切换列表右边的数据
    chooseMenu(index) {
      this.menuIndex = index;
      this.menuIndexChange = false;
      animate(this.$refs.menuFoodList, { scrollTop: this.shopListTop[index] }, () => {
        this.menuIndexChange = true;
      })
    },
    // 点击展示列表头部详情
    showTitleDetail(index) {
      if (this.TitleDetailIndex == index) {
        this.TitleDetailIndex = null;
      } else {
        this.TitleDetailIndex = index;
      }
    },
    // 加入购物车 其子组件buyCart.vue点击加入购物车会触发该事件，
    // 该操作会使this.cartList发生变化，从而触发computed中的shopCart函数
    addToCart(category_id, item_id, food_id, name, price, specs) {
      this.ADD_CART({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs });
    },
    // 移除购物车
    removeOutCart(category_id, item_id, food_id, name, price, specs) {
      this.REDUCE_CART({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs });
    },
    // 切换购物车的显示状态
    toggleCartList() {
      this.showCartList = !this.showCartList;
    },
    // 隐藏、清空购物车
    clearCart() {
      this.toggleCartList();
      this.CLEAR_CART(this.shopid);
    },
    // 初始化购物车列表cartFoodList,计算商品总价格totalPrice，将每种商品的数量放到categoryNum数组中
    initCategoryNum() {
      let newArr = [];
      let cartFoodNum = 0;
      this.totalPrice = 0;
      this.cartFoodList = [];
      this.menuList.forEach((item, index) => {
        if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
          // console.log('this.shopCart[item.foods[0].category_id]',this.shopCart[item.foods[0].category_id]);
          let num = 0;
          Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid => {
            Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
              let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid];
              num += foodItem.num;
              if (item.type == 1) {
                this.totalPrice += foodItem.num * foodItem.price;
                if (foodItem.num > 0) {
                  this.cartFoodList[cartFoodNum] = {};
                  this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
                  this.cartFoodList[cartFoodNum].item_id = itemid;
                  this.cartFoodList[cartFoodNum].food_id = foodid;
                  this.cartFoodList[cartFoodNum].num = foodItem.num;
                  this.cartFoodList[cartFoodNum].price = foodItem.price;
                  this.cartFoodList[cartFoodNum].name = foodItem.name;
                  this.cartFoodList[cartFoodNum].specs = foodItem.specs;
                  cartFoodNum++;
                }
              }
            })
          })
          newArr[index] = num;
        } else {
          newArr[index] = 0;
        }
      })
      this.categoryNum = newArr.concat([]);
    },
    // 获取商品列表高度集合，并监听
    getFoodListHeight() {
      const baseHeight = this.$refs.shopheader.clientHeight;//店铺食品列表距离页面顶部的高度
      const listContainer = this.$refs.menuFoodList;
      const listArr = Array.from(listContainer.children);
      listArr.forEach((item, index) => {
        this.shopListTop[index] = item.offsetTop - baseHeight;
      })
      this.listenScroll(listContainer);
    },
    // 监听滚动
    listenScroll(element) {
      let oldScrollTop;
      let requestFram;
      // 商品左右列表根据高度进行匹配当前index
      const currenIndex = () => {
        this.shopListTop.forEach((item, index) => {
          if (this.menuIndexChange && element.scrollTop > item && element.scrollTop < this.shopListTop[index + 1]) {
            this.menuIndex = index;
          }
        })
      }
      // 点击商品左边列表，右边列表会滑动到相应的位置
      const bounceMove = () => {
        requestFram = requestAnimationFrame(() => {
          if (element.scrollTop != oldScrollTop) {
            oldScrollTop = element.scrollTop;
            currenIndex();
            bounceMove();
          } else {
            cancelAnimationFrame(requestFram);
            currenIndex();
          }
        })
      }
      element.addEventListener('scroll', () => {
        currenIndex();
      }, false);
      element.addEventListener('touchmove', () => {
        currenIndex();
      }, false);
      element.addEventListener('touched', () => {
        oldScrollTop = element.scrollTop;
        bounceMove();
      }, false);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

.shop_container {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  left: 0;
  height: 100%;
  padding-bottom: 2rem;
  overflow: hidden;
}

.shop_detail_header {
  position: relative;
  overflow: hidden;
  .header_cover_img {
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    filter: blur(10px);
  }
  .description_header {
    z-index: 10;
    position: relative;
    width: 100%;
    padding: 0.4rem 0 0.4rem 0.4rem;
    overflow: hidden;
    background-color: rgba(119, 103, 137, .43);
    .description_top {
      display: flex;
      .description_left {
        margin-right: 0.3rem;
        img {
          border-radius: .15rem;
          @include wh(2.9rem, 2.9rem);
        }
      }
      .description_right {
        flex: 1;
        .description_title {
          width: 100%;
          font-weight: bold;
          margin-bottom: 0.3rem;
          @include sc(.8rem, #fff);
        }
        .description_text {
          // width:100%;
          margin-bottom: 0.3rem;
          @include sc(.5rem, #fff);
        }
        .description_promotion {
          width: 12.5rem;
          margin-bottom: 0.3rem;
          @include sc(.5rem, #fff);
        }
      }
      .description_arrow {
        z-index: 11;
        right: 0.3rem;
        @include center-top;
      }
    }
    .description_footer {
      margin-top: 0.5rem;
      padding-right: 0.4rem;
      @include fj;
      p {
        @include sc(0.5rem, #fff);
        span {
          color: #fff;
        }
        .tip_icon {
          display: inline-block;
          padding: 0.01rem;
          border: 0.025rem solid #fff;
          border-radius: 0.1rem;
        }
      }
      .ellipsis {
        width: 87%;
      }
    }
    .activities_details {
      z-index: 21;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 1.25rem;
      background-color: #262626;
      .activities_shoptitle {
        text-align: center;
        @include sc(.8rem, #fff);
      }
      .activities_ratingstar {
        display: flex;
        justify-content: center;
        margin-top: .7rem;
        transform: scale(2.2);
      }
      .activities_list {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        @include sc(.5rem, #fff);
        li {
          margin-bottom: .2rem;
          .activities_icon {
            padding: .01rem;
            border: 0.025rem solid #fff;
            border-radius: 0.1rem;
          }
          span {
            line-height: .6rem;
            color: #fff;
          }
        }
      }
      .activities_title_style {
        text-align: center;
        margin-bottom: 1rem;
        span {
          padding: .2rem .4rem;
          border: .025rem solid #555;
          border-radius: .5rem;
          @include sc(.5rem, #fff);
        }
      }
      .activities_shopinfo {
        p {
          line-height: .7rem;
          @include sc(.5rem, #fff);
        }
      }
      .close_activities {
        position: absolute;
        bottom: 1rem;
        @include center-left;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.menu_container {
  display: flex;
  flex: 1;
  overflow-y: auto;
  .menu_left {
    width: 3.8rem;
    overflow-y: auto;
    background-color: #f8f8f8;
    .menu_left_li {
      position: relative;
      padding: .7rem .3rem;
      box-sizing: border-box;
      border-left: .015rem solid #f8f8f8;
      border-bottom: .025rem solid #ededed;
      img {
        @include wh(.5rem, .6rem);
      }
      span {
        @include sc(.6rem, #666);
      }
      .category_num {
        position: absolute;
        top: .1rem;
        right: 0.1rem;
        height: 0.6rem;
        min-width: width 0.6rem;
        border: .025rem solid #ff461d;
        border-radius: 50%;
        line-height: .6rem;
        text-align: center;
        font-family: Helvetica Neue, Tahoma, Arial;
        background-color: #ff461d;
        @include sc(.5rem, #fff);
      }
    }
    .activity_menu {
      border-left: .15rem solid #3190e8;
      background-color: #fff;
      span:nth-of-type(1) {
        font-weight: bold;
      }
    }
  }
  .menu_right {
    flex: 4;
    overflow-y: auto;
    .menu_detail_header {
      position: relative;
      width: 100%;
      padding: .4rem;
      align-items: center;
      @include fj;
      .menu_detail_header_left {
        width: 11rem;
        white-space: nowrap; //文本不换行
        overflow: hidden;
        .menu_item_title {
          font-weight: bold;
          @include sc(.7rem, #666);
        }
        .menu_item_description {
          display: inline-block; // width: 30%;
          overflow: hidden;
          @include sc(.5rem, #999);
        }
      }
      .menu_detail_header_right {
        display: block;
        background: url('../../images/icon_point.png') left center / 100% .4rem no-repeat;
        @include wh(0.5rem,
        1rem);
      }
      .description_tip {
        z-index: 14;
        opacity: 0.95;
        position: absolute;
        top: 1.5rem;
        right: 0.2rem;
        width: 8rem;
        padding: .5rem .4rem;
        border: 1px;
        border-radius: .2rem;
        background-color: #39373a;
        @include sc(.5rem,
        #fff);
        &:after {
          content: '';
          position: absolute;
          top: -.5rem;
          right: 0.7rem;
          transform: rotate(-45deg) translateY(.41rem);
          background-color: #39373a;
          @include wh(0.4rem,
          0.4rem);
        }
        span {
          line-height: .6rem;
          font-size: .55rem;
          color: #fff;
        }
      }
    }
    .menu_deatil_list {
      position: relative;
      padding: .6rem .4rem;
      border-bottom: .025rem solid #f8f8f8;
      overflow: hidden;
      background-color: #fff;
      .menu_detail_link {
        display: flex;
        .menu_food_img {
          margin-right: .4rem;
          img {
            display: block;
            @include wh(2rem,
            2rem);
          }
        }
        .menu_food_description {
          width: 100%;
          .food_description_head {
            margin-bottom: .2rem;
            @include fj;
            .description_foodname {
              @include sc(.7rem,
              #333);
            }
            .attributes_ul {
              display: flex;
              li {
                height: 0.6rem;
                margin-right: .1rem;
                padding: .1rem;
                border: .025rem solid #666;
                border-radius: .3rem;
                line-height: .35rem;
                font-size: .3rem;
                transform: scale(.8);
              }
              .attribute_new {
                display: flex;
                align-items: flex-end;
                position: absolute;
                top: 0;
                left: 0;
                border: none;
                border-radius: 0;
                transform: rotate(-45deg) translate(-.1rem, -1.5rem);
                background-color: #4cd964;
                @include wh(2rem,
                2rem);
                P {
                  flex: 1;
                  text-align: center;
                  @include sc(.4rem,
                  #fff);
                }
              }
            }
          }
          .food_description_content {
            line-height: .6rem;
            @include sc(.5rem,
            #999);
          }
          .food_description_sale_rating {
            line-height: .8rem;
            span {
              @include sc(.5rem,
              #333);
            }
          }
          .food_activity {
            line-height: .4rem;
            span {
              display: inline-block;
              padding: .08rem;
              margin-left: -.35rem;
              border: 1px solid currentColor;
              border-radius: .3rem;
              transform: scale(.8);
              font-size: .3rem;
            }
          }
        }
      }
      .menu_detail_footer {
        margin-left: 2.4rem;
        margin-top: .3rem;
        font-size: 8;
        @include fj;
        .food_price {
          span {
            font-family: 'Helvetica Neue', Tahoma, Arial;
          }
          span:nth-of-type(1) {
            margin-right: .05rem;
            @include sc(.5rem,
            #f60);
          }
          span:nth-of-type(2) {
            margin-right: .3rem;
            font-weight: bold;
            @include sc(.7rem,
            #f60);
          }
          span:nth-of-type(3) {
            @include sc(.5rem,
            #666);
          }
        }
      }
    }
  }
}

.buy_cart_container {
  z-index: 13;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #3d3d3f;
  @include wh(100%,
  2rem);
  .cart_icon_num {
    flex: 1;
    .cart_icon_container {
      position: absolute;
      top: -.7rem;
      left: 0.5rem;
      padding: .4rem;
      border: .25rem solid #444;
      border-radius: 50%;
      background-color: #3d3d3f;
      .cart_icon {
        @include wh(1.2rem,
        1.2rem);
      }
    }
    .cart_icon_activity {
      background-color: #3190e8;
    }
    .cart_num {
      left: 3.5rem;
      @include center-top;
      div {
        color: #fff;
      }
      div:nth-of-type(1) {
        margin-bottom: .1rem;
        font-size: .8rem;
        font-weight: bold;
      }
      div:nth-of-type(2) {
        font-size: .5rem;
      }
    }
  }
  .gotopay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    text-align: center;
    background-color: #535356;
    @include wh(5rem,
    100%);
    .gotopay_button_style {
      font-weight: bold;
      @include sc(.7rem,
      #fff);
    }
    .goropay_activity {
      background-color: #4cd964;
    }
  }
}

.cart_food_list {
  z-index: 12;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 2rem;
  background-color: #fff;
  header {
    align-items: center;
    padding: .3rem .6rem;
    background-color: #eceff1;
    @include fj;
    svg {
      vertical-align: middle;
      @include wh(.6rem,
      .6rem);
    }
    h4 {
      @include sc(.7rem,
      #666);
    }
    .clear_cart {
      @include sc(.6rem,
      #666);
    }
  }
  .cart_food_details {
    background-color: #fff;
    .cart_food_li {
      padding: .6rem .5rem;
      @include fj;
      .cart_list_num {
        width: 55%;
        p:nth-of-type(1) {
          font-weight: bold;
          @include sc(.7rem,
          #666);
        }
        p:nth-of-type(2) {
          @include sc(.4rem,
          #666);
        }
      }
      .cart_list_price {
        font-size: 0;
        span:nth-of-type(1) {
          @include sc(.6rem,
          #f60);
          font-family: Helvetica Neue, Tahoma;
        }
        span:nth-of-type(2) {
          @include sc(.7rem,
          #f60);
          font-family: Helvetica Neue, Tahoma;
          font-weight: bold;
        }
      }
      .cart_list_control {
        display: flex;
        align-items: center;
        svg {
          fill: #3190e8;
          @include wh(.8rem,
          .8rem);
        }
        .specs_reduce_icon {
          fill: #999;
        }
        .cart_num {
          min-width: 1rem;
          text-align: center;
          font-family: Helvetica Neue, Tahoma;
          @include sc(.6rem,
          #666);
        }
      }
    }
  }
}

.screen_cover {
  z-index: 11;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .3);
}
</style>


