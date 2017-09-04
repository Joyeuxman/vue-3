<template>
  <div>
    <head-top signin-up="home">
      <router-link class="head_logo" to='/home' slot='logo'>饿了吗</router-link>
    </head-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link class="guess_city" :to="`/city/${guessCityid}`">
        <span>{{guessCity}}</span>
        <span>></span>
      </router-link>
    </nav>
    <div id="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul clear">
        <router-link tag="li" v-for="item in hotcity" :to=" `/city/${item.id}`" :key="item.id">
          {{item.name}}
        </router-link>
      </ul>
    </div>
    <div class="group_city_container">
      <ul class="letter_classify">
        <li class="letter_classify_li" v-for="(value,key,index) in sortgroupcity" :key="key">
          <h4 class="city_title">{{key}}
            <span v-if="index === 0">(按字母排序)</span>
          </h4>
          <ul class="groupcity_name_container citylistul clear">
            <router-link class="ellipsis" tag="li" v-for="item in value" :to="`/city/${item.id}`" :key="item.id">
              {{item.name}}
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/header/head'
import { cityGuess, hotcity, groupcity } from '@/service/getData'

export default {
  name: 'home',
  data() {
    return {
      guessCity: '',
      guessCityid: '',
      hotcity: [],
      groupcity: {},
    }
  },
  created() {
    cityGuess().then(res => {
      this.guessCity = res.name;
      this.guessCityid = res.id;
    })
    hotcity().then(res => {
      this.hotcity = res;
    })
    groupcity().then(res => {
      this.groupcity = res;
    })
  },
  components: { headTop },
  computed: {
    sortgroupcity() {
      // 按照A-Z的顺序将请求回来的城市数据放到sortgroupcity计算属性中
      // String.fromCharCode(num),将Unicode码转化为对应的字符串。
      // 通俗来说 将数字65-90转换为大写字母A-Z
      let sortobj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.groupcity[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
        }
      }
      return sortobj;
    }
  }
}
</script>

<style lang="scss" scoped>
// ???这俩种写法为什么第一种报错
// @import '@/style/mixin';
@import '../../style/mixin';

.head_logo {
  left: 0.4rem;
  font-weight: 400;
  @include sizecolor(0.7rem, #fff);
  @include wh(2.3rem, 0.7rem);
  @include center-top;
}

.city_nav {
  margin-top: 2.35rem;
  margin-bottom: 0.4rem;
  border-top: 1px solid $bordercolor;
  background-color: #fff;
  .city_tip {
    display: flex;
    justify-content: space-between;
    line-height: 1.45rem;
    padding: 0 0.45rem;
    span:nth-of-type(1) {
      @include sizecolor(0.55rem, #666);
    }
    span:nth-of-type(2) {
      font-weight: 900;
      @include sizecolor(0.475rem, #9f9f9f);
    }
  }
  .guess_city {
    display: flex;
    justify-content: space-between;
    height: 1.8rem;
    padding: 0 0.45rem;
    border-top: 1px solid $bordercolor;
    border-bottom: 2px solid $bordercolor;
    @include font(0.75rem, 1.8rem);
    span:nth-of-type(1) {
      color: $blue;
    }
    span:nth-of-type(2) {
      color: #9f9f9f;
    }
  }
}

#hot_city_container {
  margin-bottom: 0.4rem;
  background-color: #fff;
}

.citylistul {
  li {
    float: left;
    border-bottom: 0.025rem solid $bordercolor;
    border-right: 0.025rem solid $bordercolor;
    text-align: center;
    color: $blue;
    @include wh(25%, 1.75rem);
    @include font(0.6rem, 1.75rem);
  }
  li:nth-of-type(4n) {
    border-right: none;
  }
}

.city_title {
  border-top: 2px solid $bordercolor;
  border-bottom: 1px solid $bordercolor;
  text-indent: 0.45rem;
  font-weight: 400;
  color: #666;
  @include font(0.55rem, 1.45rem, 'Helvetica Neue');
  span {
    @include sizecolor(0.475rem, #999);
  }
}

.letter_classify_li {
  margin-bottom: 0.4rem;
  border-bottom: 1px solid $bordercolor;
  background-color: #fff;
  .groupcity_name_container {
    li {
      color: #666;
    }
  }
}
</style>


