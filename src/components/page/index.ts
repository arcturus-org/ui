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
        const { navHeight, statusBarHeight, occupy } =
          target.data;

        if (occupy) {
          this.setData({
            navHeight: navHeight + statusBarHeight,
          });
        }
      },
    },
    '../tabbar/index': {
      type: 'child',
    },
  },
  data: {
    navHeight: 0,
  },
});
