<template>
  <div class="paddingTop" v-lgh-tap>
    <head-top head-title="搜索" goBack="true"></head-top>
    <form class="search_form">
      <input type="search" class="search_input" v-model="searchValue" @input="checkInput" name="search" placeholder="请输入商家或美食名称">
      <input type="submit" class="search_submit" @click.prevent="searchTarget" name="submit">
    </form>
    <section v-if="true">
      <h4 class="title_restaurant">商家</h4>
      <ul class="list_container">
        <router-link class="list_li" tag="li" to="/home">
          <section class="item_left">
            <img src="" alt="商家图片" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>火锅</span>
                <svg class="pay_icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14">
                  <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#ff6000;stroke-width:1" />
                  <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#ff6000;stroke-width:1.5" />
                  <text x="3.5" y="9" style="fill:#ff6000;font-size:9;font-weight:bold;">支付</text>
                </svg>
              </p>
              <p>月售 1000 单</p>
              <p>999元起送 / 距离200m</p>
            </div>
            <ul class="item_right_detail">
              <li>
                <span class="activities_icon"></span>
                <span>免费随便享用</span>
                <span class="only_phone">(手机客户端专用)</span>
              </li>
            </ul>
          </section>
        </router-link>
      </ul>
    </section>
    <section class="search_history" v-if="true">
      <h4 class="title_restaurant">搜索历史</h4>
      <ul>
        <li class="history_list">
          <span class="history_text ellipsis">标题</span>
          <svg class="delete_icon" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3" />
            <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3" />
          </svg>
        </li>
      </ul>
      <footer class="clear_history">清空搜索历史</footer>
    </section>
    <div class="search_none" v-if="true">很抱歉!无搜索结果</div>
  </div>
</template>

<script>
import Vue from 'vue'
import headTop from '@/components/header/head'
import { getStore, setStore } from '@/config/mUtils'
import { searchRestaurant } from '@/service/getData'
import { imgBaseUrl } from '@/config/env'

// 调用自定义插件的全局方法
Vue.myGlobalMethod();

export default {
  name: 'search',
  data() {
    return {
      lgh: true,//是否启动自定义插件
      geohash: '',//msite页面传递过来的地址信息
      searchValue: '',//搜索内容
      imgBaseUrl,//图片域名地址
      searchHistory: [],//搜索历史记录
      showHistory: true,//是否显示历史记录，只有在返回搜索结果后隐藏
      emptyResult: false,//搜索结果为空时提示
    }
  },
  components: { headTop },
  mounted() {
    this.geohash = this.$route.params.geohash;
    // 获取搜索历史记录
    if (getStore('searchHistory')) {
      this.searchHistory = JSON.parse(getStore('searchHistory'));
    }
  },
  methods: {
    // 点击提交按钮，显示搜索结果，同时将搜索内容存入历史记录
    async searchTarget() {
      if (!this.searchValue) return;
      // 隐藏历史记录
      this.showHistory = false;
      // 获取搜索结果
      this.restaurantList = await searchRestaurant(this.geohash, this.searchValue);
      console.log('22222222222222222',this.restaurantList);
      this.emptyResult = !this.restaurantList.length;
      // 点击搜索结果进入下一页面时进行判断是否有一样的历史记录
      // 如果没有则新增，如果有则不做重复存储，判断完成后进入下一页
      const history = getStore('searchHistory');
      if (history) {
        let checkrepeat = false;
        this.searchHistory.forEach(item => {
          if (item == this.searchValue) {
            checkrepeat = true;
          }
        })
        if (!checkrepeat) {
          this.searchHistory.push(searchValue);
        }
      } else {
        this.searchHistory.push(searchValue);
      }
      setStore('searchHistory', this.searchHistory);
    },
    // 搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
    checkInput() {
      if (this.searchValue === '') {
        this.showHistory = true;//显示历史记录
        this.restaurantList = [];//清空搜索结果
        this.emptyResult = false;//隐藏搜索为空提示
      }
    },
    // 点击删除按钮，删除当前历史记录
    deleteHistory(index) {
      this.searchHistory.splice(index, 1);
      setStore('searchHistory', this.searchHistory);
    },
    // 清空所有的历史记录
    clearAllHistory() {
      this.searchHistory = [];
      setStore('searchHistory', this.searchHistory);
    }
  },
  created() {
    // 调用自定义插件的实例方法
    this.$myMethod();
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

.search_form {
  padding: 0.5rem;
  background-color: #fff;
  .search_input {
    padding: 0 0.25rem;
    border: 0.025rem solid $bc;
    border-radius: 0.125rem;
    background-color: #f2f2f2;
    @include wh(78%, 1.5rem);
    @include sc(0.65rem, #333);
  }
  .search_submit {
    padding: 0 0.25rem;
    border: 0.025rem solid $blue;
    border-radius: 0.125rem;
    font-weight: 500;
    background-color: $blue;
    @include wh(20%, 1.5rem);
    @include sc(0.65rem, #fff);
  }
}

.title_restaurant {
  line-height: 2rem;
  text-indent: 0.5rem;
  font-weight: 600;
  font-size: 0.7rem;
  color: #666;
}

.list_container {
  background-color: #fff;
}

.list_li {
  display: flex;
  justify-content: center; // ???总感觉这个属性没什么卵用justify-content:center
  padding: 0.5rem;
  border-bottom: 0.025rem solid $bc;
  .item_left {
    margin-right: 0.25rem;
    .restaurant_img {
      @include wh(1.7rem, 1.7rem);
    }
  }
  .item_right {
    flex: 1;
    font-size: 0.55rem;
    .item_right_text {
      padding-bottom: 0.25rem;
      border-bottom: 0.025rem solid $bc;
      p {
        line-height: .9rem;
      }
      .pay_icon {
        margin-bottom: -0.08rem;
      }
    }
    .item_right_detail {
      margin-top: 0.25rem;
      li {
        font-size: 0;
        span {
          display: inline-block;
          margin-bottom: 0.2rem;
          font-size: .5rem;
        }
        .activities_icon {
          margin-right: 0.125rem;
          padding: .04rem;
          border-radius: 0.15rem;
          @include sc(.5rem, #fff);
        }
        .only_phone {
          color: #ff6000;
        }
      }
    }
  }
}

.search_history {
  .history_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.3rem;
    border-bottom: 0.025rem solid $bc;
    background-color: #fff;
    @include font(0.7rem, 2rem);
    .history_text {
      display: inline-block;
      width: 80%;
    }
    .delete_icon {
      @include wh(1rem, 1rem);
    }
  }
  .clear_history {
    font-weight: bold;
    text-align: center;
    background-color: #fff;
    color: $blue;
    @include font(.7rem, 2rem)
  }
}

.search_none {
  margin: 0.125rem auto 0;
  text-align: center;
  background-color: #fff;
  color: #333;
  @include font(0.65rem, 1.75rem);
}
</style>


