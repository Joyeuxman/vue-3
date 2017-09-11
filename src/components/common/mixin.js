import { getStyle } from '@/config/mUtils'

const loadMore = {
  directives: {
    'load-more': {
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
          if (document.body.scrollTop + windowHeight > height + setTop + paddingBottom + marginBottom) {
            binding.value();
          }
        }
      }
    }
  }
}

export { loadMore };