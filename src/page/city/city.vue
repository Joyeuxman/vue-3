<template>
  <div>
    <div class="city_container">
      <head-top :head-title="cityname" go-back="true">
        <router-link class="change_city" slot="changecity" to="/home">切换城市</router-link>
      </head-top>
    </div>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input class="city_input input_style" v-model="inputValue" type="search" name="city" placeholder="输入学校、商务楼、地址" required>
      </div>
      <div>
        <input class="city_submit input_style" type="submit" @click="postpois">
      </div>
    </form>
    <div>
      <header class="pois_search_history" v-if="historytitle">搜索历史</header>
    </div>
    <ul class="getpois_ul">
      <li v-for="(item,index) in placelist" @click="nextpage(index,item.geohash)" :key="index">
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_adress ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <div class="search_none_place" v-if="placeNone">很抱歉！ 无搜索结果</div>
  </div>
</template>

<script>
import headTop from '@/components/header/head'
import { currentcity, searchplace } from '@/service/getData'
import * as Tool from '@/config/mUtils'

export default {
  name: 'city',
  components: { headTop },
  data() {
    return {
      inputValue: '',
      cityid: '',
      cityname: '',
      placelist: [],
      placeHistory: [],
      historytitle: true,
      placeNone: false,
    }
  },
  created() {
    // ???this.$router 与 this.$route有什么区别
    // this.$route 路由信息对象。表示当前激活路由的状态信息，包含了当前URL解析得到的信息。
    //可以用它获取路由中传递的参数等
    // this.$router 路由实例
    // 可以用它进行页面的跳转
    this.cityid = this.$route.params.cityid;//获取路由参数里的cityid
    currentcity(this.cityid).then(res => {
      this.cityname = res.name;
    })
    if (Tool.getStore('placeHistory')) {
      this.placelist = JSON.parse(Tool.getStore('placeHistory'));
    }
  },
  methods: {
    postpois() {
      if (this.inputValue) {
        searchplace(this.cityid, this.inputValue).then(res => {
          this.historytitle = false;
          this.placelist = res;
          this.placeNone = res.length ? false : true;
        })
      }
    },
    nextpage(index, geohash) {
      let history = Tool.getStore('placeHistory');
      let choosePlace = this.placelist[index];
      if (history) {
        // 根据geohash这个唯一的标识符进行去重
        let checkrepeat = false;
        this.placeHistory = JSON.parse(history);
        this.placeHistory.forEach(item => {
          if (item.geohash == geohash) {
            checkrepeat = true;
          }
        })
        if (!checkrepeat) {
          this.placeHistory.push(choosePlace);
        }
      } else {
        this.placeHistory.push(choosePlace);
      }
      Tool.setStore('placeHistory', this.placeHistory);
      this.$router.push({ path: '/msite', query: { geohash } })
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.city_container {
  padding-top: 2.35rem;
}

.change_city {
  right: 0.4rem;
  @include center-top;
  @include sizecolor(0.6rem, #fff);
}

.city_form {
  padding-top: 0.4rem;
  border-top: 1px solid $bordercolor;
  border-bottom: 1px solid $bordercolor;
  background-color: #fff;
  div {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    .input_style {
      margin-bottom: 0.4rem;
      border-radius: 0.1rem;
      @include wh(100%, 1.4rem);
    }
    .city_input {
      padding: 0 0.3rem;
      border: 1px solid $bordercolor;
      @include sizecolor(0.65rem, #333);
    }
    .city_submit {
      background-color: $blue;
      @include sizecolor(0.65rem, #fff);
    }
  }
}

.pois_search_history {
  padding-left: 0.5rem;
  border-top: 1px solid $bordercolor;
  border-bottom: 1px solid $bordercolor;
  @include font(0.475rem, 0.8rem);
}

.getpois_ul {
  border-top: 1px solid $bordercolor;
  background-color: #fff;
  li {
    margin: 0 auto;
    padding-top: 0.65rem;
    border-bottom: 1px solid $bordercolor;
    .pois_name {
      margin: 0 auto 0.35rem;
      width: 90%;
      @include sizecolor(0.65rem, #333);
    }
    .pois_adress {
      width: 90%;
      margin: 0 auto 0.55rem;
      @include sizecolor(0.45rem, #999);
    }
  }
}

.search_none_place {
  margin: 0 auto;
  text-indent: 0.5rem;
  background-color: #fff;
  color: #333;
  @include font(0.65rem, 1.75rem);
}
</style>
