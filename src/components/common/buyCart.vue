<template>
  <section class="cart_module">
    <section class="cart_button" v-if="!foods.specifications.length">
      <transition name="showReduce">
        <svg v-if="foodNum" @click="removeOutCart(foods.category_id,foods.item_id,foods.specfoods[0].name,foods.specfoods[0].price,'')">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus" />
        </svg>
      </transition>
      <transition name="fade">
        <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
      </transition>
      <svg class="cart_add" @click="addToCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '')">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add" />
      </svg>
    </section>
    <section class="choose_specification" v-else>
      <section class="choose_icon_container">
        <transition name="showReduce">
          <svg class="specs_recude_icon" v-if="foodNum" @click="showReduceTip">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus" />
          </svg>
        </transition>
        <transition name="fade">
          <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
        </transition>
        <transition name="fade">
          <p class="show_delete_tip" v-if="showDeleteTip">多种规格商品只能去购物车删除哦</p>
        </transition>
        <span class="show_chooselist" @click="showChooseList">选规格</span>
      </section>
      <section>
        <transition name="fade">
          <div class="specs_cover" @click="showChooseList" v-if="showSpecs"></div>
        </transition>
        <transition name="fadeBounce">
          <div class="specs_list" v-if="showSpecs">
            <header class="specs_list_header">
              <h4 class="ellipsis">{{foods.name}}</h4>
              <svg class="specs_cancel" @click="showChooseList" width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
                <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2" />
              </svg>
            </header>
            <section class="specs_details">
              <h5 class="specs_details_title">{{foods.specifications[0].name}}</h5>
              <ul>
                <li :class="{specs_activity:itemIndex == specsIndex}" @click="chooseSpecs(itemIndex)" v-for="(item,itemIndex) in foods.specifications[0].values" :key="itemIndex">
                  {{item}}
                </li>
              </ul>
            </section>
            <section class="specs_footer">
              <div class="specs_price">
                <span>￥</span>
                <span>{{foods.specfoods[specsIndex].price}}</span>
              </div>
              <div class="specs_addto_cart" @click="addSpecs(foods.category_id, foods.item_id, foods.specfoods[specsIndex].food_id, foods.specfoods[specsIndex].name, foods.specfoods[specsIndex].price, foods.specifications[0].values[specsIndex])">
                加入购物车
              </div>
            </section>
          </div>
        </transition>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: 'buyCart',
  data() {
    return {
      showSpecs: false,//是否显示选择规格型号的模态框
      specsIndex: 0,//当前所选规格型号的序号
      showDeleteTip: false,//是否显示删除多种规格型号的提示
    }
  },
  props: ['foods', 'shopCart'],
  computed: {
    // 计算选择美食的数量
    foodNum() {
      const category_id = this.foods.category_id;
      const item_id = this.foods.item_id;
      if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
        let num = 0;
        Object.values(this.shopCart[category_id][item_id]).forEach((item, index) => {
          console.log('buyCart中', item, index);
          num += item.num;
        })
        return num;
      } else {
        return 0;
      }
    }
  },
  methods: {
    // 将所选美食移除购物车
    removeOutCart(category_id, item_id, food_id, name, price, specs) {
      if (this.foodNum > 0) {
        this.$emit('reduce', category_id, item_id, food_id, name, price, specs);
      }
    },
    // 将所选美食加入购物车
    addToCart(category_id, item_id, food_id, name, price, specs) {
      this.$emit('add', category_id, item_id, food_id, name, price, specs);
    }
    //切换选择规格型号的模态框的显示状态
    , showChooseList() {
      this.showSpecs = !this.showSpecs;
      this.specsIndex = 0;
    }
    // 选择当前规格型号，并记录
    , chooseSpecs(index) {
      this.specsIndex = index;
    }
    // 添加规格型号到购物车
    ,addSpecs(category_id, item_id, food_id, name, price, specs){
      this.$emit('add',category_id, item_id, food_id, name, price, specs);
      this.showChooseList();
    }
    // 切换是否显示删除多种规格型号的提示
    ,showReduceTip(){
      this.showDeleteTip = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        clearTimeout(this.timer);
        this.showDeleteTip = false;
      },3000);
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../style/mixin';

.cart_module {
  .cart_button {
    display: flex;
    align-items: center;
  }
  svg {
    fill: #3190e8;
    @include wh(.8rem, .8rem);
  }
  .specs_reduce_icon {
    fill: #999;
  }
  .cart_num {
    min-width: 1rem;
    text-align: center;
    font-family: Helvetica Neue, Tahoma;
    @include sc(.6rem, #666);
  }
  .choose_specification {
    .choose_icon_container {
      display: flex;
      align-items: center;
      .show_chooselist {
        display: block;
        padding: .2rem .3rem;
        border: 1px solid $blue;
        border-radius: .5rem;
        background-color: $blue;
        @include sc(.55rem, #fff);
      }
      .show_delete_tip {
        z-index: 18;
        position: fixed;
        top: 50%;
        left: 15%;
        width: 70%;
        padding: .5rem 0;
        border: 1px solid rgb(0, 0, 0);
        border-radius: .25rem;
        transform: translateY(-50%);
        text-align: center;
        background-color: rgba(0, 0, 0, .8);
        @include sc(.65rem, #fff);
      }
    }
    .specs_cover {
      z-index: 17;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .4);
    }
    .specs_list {
      z-index: 18;
      position: fixed;
      top: 35%;
      left: 15%;
      width: 70%;
      border: 1px solid #fff;
      border-radius: .2rem;
      background-color: #fff;
      .specs_list_header {
        h4 {
          padding: .5rem;
          text-align: center;
          font-weight: normal;
          @include sc(.7rem, #222);
        }
        .specs_cancel {
          position: absolute;
          right: 0.5rem;
          top: .5rem;
        }
      }
      .specs_details {
        padding: .5rem;
        .specs_details_title {
          @include sc(.6rem, #666);
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          padding: .4rem 0;
          li {
            margin-right: .5rem;
            padding: .3rem .5rem;
            border: 1px solid #ddd;
            border-radius: .2rem;
            font-size: .6rem;
          }
          .specs_activity {
            color: #3190e8;
            border-color: #3190e8;
          }
        }
      }
      .specs_footer {
        padding: .5rem;
        border: 1px;
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;
        align-items: center;
        font-size:0;
        background-color: #f9f9f9;
        @include fj;
        .specs_price {
          span {
            color: #ff6000;
          }
          span:nth-of-type(1) {
            font-size: .5rem;
          }
          span:nth-of-type(2) {
            font-size: .8rem;
            font-weight: bold;
            font-family: Helvetica Neue, Tahoma;
          }
        }
        .specs_addto_cart{
          border:1px;
          border-radius: .15rem;
          text-align: center;
          line-height: 1.3rem;
          background-color: #3199e8;
          @include wh(4rem,1.3rem);
          @include sc(.6rem,#fff);
        }
      }
    }
  }
}
</style>

