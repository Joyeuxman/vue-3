<template>
  <div class="service_page">
    <head-top headTitle="服务中心" goBack="true" />
    <section class="service_connect">
      <a href="https://ecs-im.ele.me/" class="service_left">
        <svg>
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#human" />
        </svg>
        <span>在线客服</span>
      </a>
      <a href="tel:10105757" class="service_right">
        <svg>
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#phone" />
        </svg>
        <span>在线客服</span>
      </a>
    </section>
    <section class="hot_questions" v-if="serviceData">
      <h4 class="question_header">热门问题</h4>
      <ul>
        <li class="question_title" v-for="(item,index) in questionTitle" :key="index" @click="toQuestionDetail(item,index)">
          <span>{{item}}</span>
          <svg>
            <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href="#arrow-right" />
          </svg>
        </li>
      </ul>
    </section>
    <transition name="router-sild">
      <router-view></router-view>
    </transition>
  </div>
</template>


<script>
import headTop from '@/components/header/head';
import { mapMutations } from 'vuex';
import { getService } from '@/service/getData';

export default {
  name: 'service',
  components: { headTop, },
  data() {
    return {
      serviceData: null,//服务数据(包含热门问题)
      questionTitle: [],//热门问题标题
      questionDetail: [],//热门问题具体详情
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapMutations(['SAVE_QUESTION']),
    // 初始化数据
    async initData() {
      this.serviceData = await getService();
      Object.keys(this.serviceData).forEach(item => {
        let avoidRepeat = false;
        this.questionTitle.forEach(insertItem => {
          if (insertItem == this.serviceData[item]) {
            avoidRepeat = true;
          }
        })
        // 包含Caption并且不重复
        if (item.indexOf('Caption') !== -1 && !avoidRepeat) {
          this.questionTitle.push(this.serviceData[item]);
        } else if (!avoidRepeat) {
          this.questionDetail.push(this.serviceData[item]);
        }
      })
    },
    // 将问题详情保存到state中，并跳转到问题详情页面
    toQuestionDetail(title, index) {
      this.SAVE_QUESTION({ title, detail: this.questionDetail[index] });
      this.$router.push('/service/questionDetail');
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../style/mixin';

.service_page {
  padding-top: 1.95rem;
  background-color: #fff;
}

.service_connect {
  display: flex;
  justify-content: space-between;
  a {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 4rem;
    border-bottom: 1px solid #f5f5f5;
    svg {
      @include wh(1rem, 1rem);
    }
    span {
      margin-top: .4rem;
      @include sc(.6rem, #666);
    }
  }
  .service_left {
    border-right: 1px solid #f5f5f5;
  }
}

.hot_questions {
  .question_header {
    padding-left: .7rem;
    line-height: 3rem;
    border-bottom: 1px solid #f5f5f5;
    @include sc(.75rem, #333);
  }
  .question_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 2rem;
    padding-left: .7rem;
    border-bottom: 1px solid #f5f5f5;
    span {
      @include sc(.6rem, #666);
    }
    svg {
      @include wh(.6rem, .6rem);
    }
  }
}

.router-sild-enter-active,
.router-sild-leave-active {
  transition: all .3s;
}

.router-sild-enter,
.router-sild-leave-actice {
  transform: translateX(100%);
}
</style>

