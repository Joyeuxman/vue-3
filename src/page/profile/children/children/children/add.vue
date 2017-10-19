<template>
  <div class="add_page">
    <head-top headTitle="新增地址" goBack="true" />
    <section class="adddetail">
      <form action="" v-on:submit.prevent>
        <section class="ui-padding-block">
          <div class="input-new">
            <input type="text" placeholder="请填写你的姓名" :class="{verifies:verify}" v-model="message" @input="inputThing">
            <p v-if="verify">请填写你的姓名</p>
          </div>
          <router-link class="add-detail" to="/profile/info/address/add/addDetail">
            <div class="input-new">
              <input type="text" placeholder="小区/写字楼/学校等" readonly v-model="addAddress">
            </div>
          </router-link>
          <div class="input-new">
            <input type="text" placeholder="请填写详细送餐地址" :class="{verifies:verifythree}" v-model="mesthree" @input="inputThingthree">
            <p v-if="verifythree">{{sendaddress}}</p>
          </div>
          <div class="input-new">
            <input type="text" placeholder="请填写能够联系到您的手机号" :class="{verifies:verifyfour}" v-model="telenum" @input="inputThingfour">
            <p v-if="verifyfour">{{telephone}}</p>
          </div>
          <div class="input-new">
            <input type="text" placeholder="备用联系电话（选填）" v-model="standbytelenum" @input="inputThingfive">
            <p v-if="verifyfive">{{standbytele}}</p>
          </div>
        </section>
        <section class="addbutton">
          <button :class="{butopacity:butpart}" @click="submitThing">新增地址</button>
        </section>
      </form>
    </section>
    <transition name="router-slide" mode="out-in">
      <router-view></router-view>
    </transition>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';
import headTop from '@/components/header/head';
import alertTip from '@/components/common/alertTip';
import { postAddAddress } from '@/service/getData';

export default {
  name: 'add',
  components: { headTop, alertTip },
  data() {
    return {
      verify: false,//校验姓名
      verifytwo: false,//校验备注
      verifythree: false,//校验地址
      verifyfour: false,//校验电话
      verifyfive: false,//校验备用电话
      butpart: false,//新增地址按钮的透明度
      sendaddress: '',//地址
      message: '',//信息
      mesthree: '',//送餐地址
      telenum: '',//手机号
      telephone: '',//手机号提示
      standbytele: '',//备用手机号提示
      standbytelenum: '',//备用手机号
      addSearch: false,//添加搜索地址
      newAddress: {},//增加数组的元素
      showAlert: false,//是否显示弹框
      alertText: null,//弹框内容信息
    }
  },
  computed: {
    ...mapState(['userInfo', 'addAddress', 'removeAddress', 'geohash']),
  },
  methods: {
    ...mapMutations(['ADD_ADDRESS']),
    // 输入姓名
    inputThing() {
      this.verify = this.message ? false : true;
      this.bindThing();
    },
    //输入地址
    inputThingthree() {
      this.verifythree = true;
      if (this.mesthree.length == 0) {
        this.sendaddress = '请详细填写送餐地址';
      } else if (this.mesthree.length > 0 && this.mesthree.length < 2) {
        this.sendaddress = '送餐地址太短了，不能识别';
      } else {
        this.sendaddress = '';
        this.verifythree = false;
      }
      this.bindThing();
    },
    // 输入手机号
    inputThingfour() {
      this.verifyfour = true;
      if ((/^[1][358][0-9]{9}$/).test(this.telenum)) {
        this.verifyfour = false;
      } else if (this.telenum == '') {
        this.telephone = '手机号不能为空';
      } else {
        this.telephone = '请输入正确的手机号码';
      }
      this.bindThing();
    },
    // 输入手机号
    inputThingfive() {
      this.verifyfive = true;
      if ((/^[1][358][0-9]{9}$/).test(this.standbytelenum) || this.standbytelenum == '') {
        this.verifyfive = false;
      } else {
        this.standbytele = '请输入正确的手机号码';
      }
      this.bindThing();
    },
    // 校验新增地址按钮是否可点击
    bindThing() {
      if (this.message && this.mesthree && !this.verifyfour) {
        this.butpart = true;
      } else {
        this.butpart = false;
      }
    },
    // 保存新增地址
    async submitThing() {
      const res = await postAddAddress(this.userInfo.user_id, this.mesthree, this.addAddress, this.geohash, this.message, this.telenum, this.standbytelenum, 0, 1, '公司', 4);
      console.log('地址===', res);
      if (res.message) {
        this.showAlert = true;
        this.alertText = res.message;
      } else if (this.butpart) {
        // 保存的地址存入VUEX
        this.ADD_ADDRESS({
          name: this.message,
          address: this.mesthree,
          address_detail: this.addAddress,
          geohash: 'wtw37r7cxep4',
          phone: this.telenum,
          phone_bk: this.standbytelenum,
          poi: this.addAddress,
          poi_type: 0,
        })
        this.$router.go(-1);
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../../../../style/mixin';

.add_page {
  z-index: 202;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #f2f2f2;
}

.adddetail {
  .ui-padding-block {
    margin-top: .4rem;
    padding-top: .4rem;
    background-color: #fff;
    .input-new {
      padding-bottom: .4rem;
      input {
        display: block;
        width: 94%;
        padding: .3rem;
        margin: 0 auto;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        background-color: #f2f2f2;
        @include sc(.6rem, #333);
      }
      .verifies {
        border-color: #ea3106;
      }
      p {
        padding-top: .2rem;
        padding-left: .5rem;
        @include sc(.5rem, #ea3106);
      }
    }
  }
  .addbutton {
    width: 94%;
    margin: .6rem auto;
    button {
      opacity: .6;
      width: 100%;
      line-height: 1.6rem;
      text-align: center;
      border-radius: 5px;
      font-weight: 700;
      background-color: #4cd964;
      @include sc(.7rem, #fff);
    }
    .butopacity {
      opacity: 1;
      transition: all .4s;
    }
  }
}
</style>