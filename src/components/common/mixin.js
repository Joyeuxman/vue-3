import { getStyle } from '@/config/mUtils'
import { imgBaseUrl } from '@/config/env'

// 注册局部指令v-loadMore
const loadMore = {
  directives: {
    'load-more': {
      // bind只调用一次，指令第一次绑定到元素时调用，
      // 用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
      // el  指令绑定的元素，可以用来直接操作DOM
      // binding:一个对象 binding.value指令的绑定值
      bind: (el, binding) => {
        let windowHeight = window.screen.height;
        let height;
        let setTop;
        let paddingBottom;
        let marginBottom;
        let requestFram;
        let oldScrollTop;

        el.addEventListener('touchstart', () => {
          height = el.offsetHeight;
          setTop = el.offsetTop;
          paddingBottom = getStyle(el, 'paddingBottom');
          marginBottom = getStyle(el, 'marginBottom');
        }, { passive: true });
        el.addEventListener('touchmove', () => {
          loadMore();
        }, { passive: true });
        el.addEventListener('touchend', () => {
          oldScrollTop = document.body.scrollTop;
          moveEnd();
        }, { passive: true });

        const moveEnd = () => {
          requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
              oldScrollTop = document.body.scrollTop;
              moveEnd();
            } else {
              cancelAnimationFrame(requestFram);
              height = el.offsetHeight;
              loadMore();
            }
          })
        }

        const loadMore = () => {
          // 当滑动页面到底层出现没有更多数据时触发，以此来重新发送请求来渲染列表页面
          // 页面滚动后隐藏的高度 + 页面高度 > 列表高度 + 列表距离页面顶部的高度 + 列表paddingBottom + 列表marginBottom
          if (document.body.scrollTop + windowHeight > height + setTop + paddingBottom + marginBottom) {
            binding.value();
          }
        }
      }
    }
  }
}

const getImgPath = {
  methods: {
    // 传递过来的图片地址需要经过处理后才可以正常使用
    getImgPath(path) {
      let suffix;//图片后缀 --- suffix 后缀
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg';
      } else {
        suffix = '.png';
      }
      // 拼接成饿了吗后台存放图片的地址
      const url = `/${path.substr(0, 1)}/${path.substr(1, 2)}/${path.substr(3)}${suffix}`;
      return imgBaseUrl + url;
    }
  }
}

export { loadMore, getImgPath };