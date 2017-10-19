<template>
  <div class="addDetail_page">
    <head-top headTitle="搜索地址" goBack="true" />
    <section>
      <div class="add-detail">
        <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputAdress">
        <button @click="inputThing">确认</button>
      </div>
      <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
      <div class="point" v-show="warning">
        <p>找不到地址</p>
        <p>请尝试输入小区、写字楼或者学校名</p>
        <p>详细地址（如门牌号）可稍后输入哦</p>
      </div>
    </section>
    <section class="poisearch-container">
      <ul>
        <li v-for="(item, index) in adressList" :key="index" @click="listClick(index)">
          <p>{{item.name}}</p>
          <p>{{item.address}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>


<script>
import { mapMutations, mapState } from 'vuex';
import headTop from '@/components/header/head';
import { searchNearby } from '@/service/getData';
export default {
  name: 'addDetail',
  components: { headTop, },
  data() {
    return {
      warning: true,//是否提示
      inputAdress: '',//输入的地址
      adressList: [],//搜索出的地址列表
    }
  },
  computed: {
    ...mapState(['addAddress']),
  },
  created() {
    this.inputAdress = this.addAddress ? this.addAddress : this.inputAdress;
  },
  methods: {
    ...mapMutations(['SAVE_ADDDETAIL']),
    //搜索地址
    inputThing() {
      searchNearby(this.inputAdress).then(res => {
        this.adressList = res;
        this.warning = true;
        if (this.adressList.length > 0) {
          this.warning = false;
          if (this.inputAdress == '') {
            this.adressList = [];
            this.warning = true;
          }
        }
      });
    },
    //选择地址
    listClick(index) {
      this.SAVE_ADDDETAIL(this.adressList[index].name);
      this.$router.go(-1);
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../../../../../style/mixin';

.addDetail_page {
  z-index: 202;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #f2f2f2;
}

.add-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .3rem .4rem;
  background-color: #fff;
  input {
    width: 80%;
    margin-right: .3rem;
    padding: .3rem;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    background-color: #f2f2f2;
    @include sc(.6rem, #333);
  }
  button {
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    background-color: $blue;
    @include wh(3rem, 1.6rem);
    @include sc(.6rem, #fff);
  }
}

.warnpart {
  padding-left: .4rem;
  line-height: 1.4rem;
  background-color: antiquewhite;
  @include sc(.6rem, orange);
}

.point {
  @include center;
  width: 100%;
  p {
    width: 100%;
    text-align: center;
    @include sc(.7rem, #969696);
    margin-bottom: .4rem;
  }
}

.poisearch-container {
  background: #f2f2f2;
  li {
    border-bottom: 1px solid #ccc;
    padding: .4rem;
    p {
      @include sc(.65rem, #969696);
    }
    p:first-child {
      margin-bottom: .2rem;
    }
  }
  li:last-child {
    border: 0;
  }
}
</style>