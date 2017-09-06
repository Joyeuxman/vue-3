<template>
  <div v-lgh-tap>
    搜索页面</div>
</template>

<script>
import Vue from 'vue'

// 调用自定义插件的全局方法
Vue.myGlobalMethod();

export default {
  name: 'search',
  data(){
    return{
      lgh:true
    }
  },
  methods:{
    test(){
      console.log('test方法=======');
    }
  },
  created(){
    // 调用自定义插件的实例方法
    this.$myMethod();
  }
}
</script>

<style lang="scss" scoped>

</style>


