<template>
  <div>
    <head-top signin-up="home">
      <span class="head_logo" @click="reload" slot='logo'>饿了吗</span>
    </head-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link class="guess_city" :to="`/city/${guessCityid}`">
        <span>{{guessCity}}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>
    <div id="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul clear">
        <router-link tag="li" v-for="(item,index) in hotcity" :to=" `/city/${item.id}`" :key="item.id">
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
  components: { headTop },
  data() {
    return {
      guessCity: '',//当前定位城市name
      guessCityid: '',//当前定位城市id
      hotcity: [],//热门城市
      groupcity: {},//城市列表
    }
  },
  created() {
    // 获取当前城市
    cityGuess().then(res => {
      this.guessCity = res.name;
      this.guessCityid = res.id;
    })
    // 获取热门城市
    hotcity().then(res => {
      this.hotcity = res;
    })
    // 获取所有城市
    groupcity().then(res => {
      this.groupcity = res;
    })
  },
  computed: {
    // 当sortgroupcity依赖的属性即this.groupcity发生变化时，就会触发该函数，并将return的数据绑定到data中
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
  },
  methods: {
    // 点击饿了吗刷新页面
    // location.reload(force);
    // 如果该方法没有规定参数，或者参数为false,他就会用HTTP头If-Modified-Since来检测服务器上的文档是否已经改变。
    // 如果文档已改变，reload()会再次下载该文档。如果文档没有改变，则该方法姜葱缓存中装载文档。
    // 这与用户单击浏览器的刷新按钮的效果相同。
    // 如果该方法的参数设置为true，那么无论文档的最后修改日期是什么，它都会绕过缓存，从服务器上重新下载该文档。
    // 这与用户在单击浏览器的刷新按钮时按住Shift键的效果是完全一样的。
    reload() {
      window.location.reload();
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
  @include sc(0.7rem, #fff);
  @include wh(2.3rem, 0.7rem);
  @include center-top;
}


.city_nav {
  margin-top: 2.35rem;
  margin-bottom: 0.4rem;
  border-top: 1px solid $bc;
  background-color: #fff;
  .city_tip {
    display: flex;
    justify-content: space-between;
    line-height: 1.45rem;
    padding: 0 0.45rem;
    span:nth-of-type(1) {
      @include sc(0.55rem, #666);
    }
    span:nth-of-type(2) {
      font-weight: 900;
      @include sc(0.475rem, #9f9f9f);
    }
  }
  .guess_city {
    display: flex;
    justify-content: space-between;
    align-items:center;
    height: 1.8rem;
    padding: 0 0.45rem;
    border-top: 1px solid $bc;
    border-bottom: 2px solid $bc;
    @include font(0.75rem, 1.8rem);
    span:nth-of-type(1) {
      color: $blue;
    }
    span:nth-of-type(2) {
      color: #9f9f9f;
    }
    .arrow_right {
      @include wh(.6rem, .6rem);
      fill: #999;
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
    padding: 0 .2rem;
    border-bottom: 0.025rem solid $bc;
    border-right: 0.025rem solid $bc;
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
  border-top: 2px solid $bc;
  border-bottom: 1px solid $bc;
  text-indent: 0.45rem;
  font-weight: 400;
  color: #666;
  @include font(0.55rem, 1.45rem, 'Helvetica Neue');
  span {
    @include sc(0.475rem, #999);
  }
}

.letter_classify_li {
  margin-bottom: 0.4rem;
  border-bottom: 1px solid $bc;
  background-color: #fff;
  .groupcity_name_container {
    li {
      color: #666;
    }
  }
}
</style>


