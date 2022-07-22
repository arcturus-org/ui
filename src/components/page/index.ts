import useSafeHeight from '../utils/safeArea';

Component({
  // 启用多 slot 支持
  options: {
    multipleSlots: true,
  },
  relations: {
    '../navbar/index': {
      type: 'child',
      linked: function (
        target: WechatMiniprogram.Component.TrivialInstance
      ) {
        const { navHeight, occupy } = target.data;
        const { height } = this.data;

        if (occupy) {
          this.setData({
            height: height - navHeight,
          });
        }
      },
    },
  },
  data: {
    height: 0,
  },
  lifetimes: {
    attached() {
      const tabbar = this.getTabBar();
      const height = useSafeHeight();

      if (tabbar) {
        // 当前页面存在 tabbar
        this.setData({ height: height - 60 });
      } else {
        this.setData({ height });
      }
    },
  },
});
