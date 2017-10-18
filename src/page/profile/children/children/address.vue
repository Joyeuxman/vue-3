<template>
  <div class="address_page">
    <head-top headTitle="编辑地址" goBack="true">
      <span class="edit" slot="edit" @click="editThing">{{editText}}</span>
    </head-top>
    <section class="address">
      <ul class="addresslist">
        <li v-for="(item,index) in removeAddress" :key="index">
          <div>
            <p>{{item.address}}</p>
            <p>
              <span>{{item.phone}}</span>
              <span v-if="item.phonepk">、{{item.phonepk}}</span>
            </p>
          </div>
          <div class="deletesite" v-if="deletesite">
            <span @click="deleteSite(index,item)">x</span>
          </div>
        </li>
      </ul>
      <router-link to="/profile/info/address/add">
        <div class="addsite">
          <span>新增地址</span>
          <span class="addsvg">
            <svg fill="#d8d8d8">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </router-link>
    </section>
    <transition name="router-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import headTop from '@/components/header/head';
import { getAddressList, deleteAddress } from '@/service/getData';

export default {
  name: 'address',
  components: { headTop, },
  data() {
    return {
      editText: '编辑',//编辑处的文字
      deletesite: false,//是否为编辑状态
      addressList: [],//地址列表
    }
  },
  computed: {
    ...mapState(['userInfo', 'removeAddress']),
  },
  watch: {
    userInfo(value) {
      if (value && value.user_id) {
        this.initData();
      }
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions(['saveAddress']),
    // 初始化数据
    initData() {
      if (this.userInfo && this.userInfo.user_id) {
        this.saveAddress();
      }
    },
    // 编辑
    editThing() {
      if (this.editText == '编辑') {
        this.editText = '完成';
        this.deletesite = true;
      } else {
        this.editText = '编辑';
        this.deletesite = false;
      }
    },
    // 删除地址
    async deleteSite(index, item) {
      if (this.userInfo && this.userInfo.user_id) {
        await deleteAddress(this.userInfo.user_id, item.id);
        this.removeAddress.splice(index, 1);
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../../../style/mixin';


.address_page {
  z-index: 202;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 1.95rem;
  background-color: #f2f2f2;
}

.edit {
  right: 0.4rem;
  @include sc(0.7rem, #fff);
  @include center-top;
}

.address {
  width: 100%;
  margin-top: .4rem;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  .addresslist {
    background: #fff;
    li {
      border-bottom: 1px solid #d9d9d9;
      padding: .4rem;
      @include fj(space-between);
      p {
        line-height: .9rem;
        @include sc(.6rem, #333);
        span {
          display: inline-block;
          @include sc(.6rem, #333);
        }
      }
      .deletesite {
        display: flex;
        align-items: center;
        span {
          display: block;
          @include sc(.8rem, #999)
        }
      }
    }
    li:nth-of-type(1) {
      background: #FFF8C3;
    }
  }
  .addsite {
    margin-top: .4rem;
    background: #fff;
    padding: .2rem .4rem;
    border-top: 1px solid #d9d9d9;
    @include fj(space-between);
    span {
      display: block;
      @include sc(.7rem, #333);
      line-height: 1.4rem;
    }
    .addsvg {
      @include wh(.66667rem, 1.4rem);
      svg {
        @include wh(100%, 100%);
      }
    }
  }
}

</style>