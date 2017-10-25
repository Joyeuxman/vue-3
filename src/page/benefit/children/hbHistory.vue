<template>
  <div class="hbHistory_page">
    <head-top headTitle="历史红包" goBack="true"/>
        <section v-if="!showLoading" id="scroll_section" class="scroll_container">
            <ul class="hongbao_list_ul">
                <li class="hongbao_list_li" v-for="item in expiredList" :key="item.id">
                    <section class="list_item">
                        <div class="list_item_left">
                            <span>¥</span>
                            <span>{{String(item.amount).split('.')[0]}}</span>
                            <span>.</span>
                            <span>{{String(item.amount).split('.')[1]||0}}</span>
                            <p>{{item.description_map.sum_condition}}</p>
                        </div>
                        <div class="list_item_right">
                            <h4>{{item.name}}</h4>
                            <p>{{item.description_map.validity_periods}}</p>
                            <p>{{item.description_map.phone}}</p>
                        </div>
                    </section>
                    <footer class="list_item_footer" v-if="item.limit_map">
                        <p>{{item.limit_map.restaurant_flavor_ids}}</p>
                    </footer>
                    <svg class="expired">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#expired"></use>
                    </svg>
                </li>
            </ul>
        </section>
        <loading v-if="showLoading"></loading>    
  </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import headTop from "@/components/header/head";
import { getExpired } from "@/service/getData";
import loading from "@/components/common/loading";
import BScroll from "better-scroll";

export default {
  name: "hbHistory",
  components: { headTop, loading },
  data() {
    return {
      showLoading: true,
      expiredList: null //历史红包列表
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  watch: {
    userInfo: function(value) {
      this.initData();
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations(["CLEAR_CART"]),
    async initData() {
      //获取历史红包
      if (this.userInfo) {
        this.expiredList = await getExpired(this.userInfo.user_id);
        this.showLoading = false;
        this.$nextTick(() => {
          new BScroll("#scroll_section", {
            deceleration: 0.001,
            bounce: true,
            swipeTime: 1800,
            click: true
          });
        });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../style/mixin";

.hbHistory_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 1.95rem;
  background-color: #f1f1f1;
  z-index: 300;
  overflow-y: scroll;
}

.scroll_container {
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // padding-top: 1.95rem;
  .hongbao_list_ul {
    padding: 1rem 0.5rem;
    .hongbao_list_li {
      position: relative;
      margin-bottom: 0.5rem;
      border-radius: 0.25rem;
      background: url(../../../images/expired.png) center left / 0.5rem 0.2rem
        repeat-x;
      .list_item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 1rem 0.5rem 0.8rem;
        background-color: #fff;
        .list_item_left {
          flex: 1;
          font-size: 0;
          border-right: 1px solid #d9d9d9;
          span:nth-of-type(1) {
            font-weight: 700;
            @include sc(0.75rem,#ccc);
          }
          span:nth-of-type(2) {
            @include sc(2rem,#ccc);
          }
          span:nth-of-type(3) {
            font-weight: 700;
            @include sc(1rem,#ccc);
          }
          span:nth-of-type(4) {
            font-weight: 700;
            @include sc(1rem,#ccc);
          }
          p {
            @include sc(0.4rem,#999);
          }
        }
        .list_item_right {
          flex: 2;
          margin-left: 0.8rem;
          h4 {
            @include sc(0.7rem,#999);
          }
          p {
            @include sc(0.4rem,#999);
          }
        }
      }
    }
  }
}
.expired {
  position: absolute;
  top: 0.6rem;
  right: 0.2rem;
  @include wh(3rem,3rem);
}
.list_item_footer {
  padding: 0.4rem;
  background-color: #f9f9f9;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  @include sc(0.4rem,#999);
}
</style>