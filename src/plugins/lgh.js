const LGH = {};
LGH.install = function (Vue, options) {
  // 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // console.log('自定义插件--全局方法===============');
  }
  // 添加全局资源
  Vue.directive('lghTap', {
    bind(el, binding, vnode, oldValue) {
      // console.log(el, binding, vnode, oldValue);
      // console.log('自定义插件--全局指令--lgh-tap==============');
    }
  })
  // 注入组件
  // Vue.mixin 全局注册混合对象
  // 注意使用! 一旦使用全局混合对象，将会影响到所有之后创建的Vue实例。
  // 使用恰当时，可以为自定义对象注入处理逻辑。
  Vue.mixin({
    created() {
      // 
      // console.log('自定义插件--注入组件=========');
      // console.log('this==============',this);
      if(this.lgh === true){
        // console.log('哈哈，你终于发现我自定义的组件了...');
      }
    }
  })
  // 添加实例方法
  Vue.prototype.$myMethod = function (methodOption) {
    // console.log('自定义插件--实例方法==========');
  }
}

export default LGH;