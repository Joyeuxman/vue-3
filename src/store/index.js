import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

const state = {
  latitude: '',//当前位置纬度
  longitude: '',//当前位置经度
  cartList:{},//加入购物车的商品列表
  userInfo:null,//用户信息
  removeAddress:[],//移除地址
  login:true,//用户是否登录
  imgPath:null,//头像地址
  question:null,//问题详情
  cartPrice:null,//会员卡价格
  orderMessage:null,//订单返回的信息
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})