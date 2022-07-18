import useNavInfo from '../utils/navInfo';

Component({
  properties: {
    blur: {
      // 是否开启毛玻璃效果
      type: Boolean,
      value: true,
    },
    loading: {
      // 是否处于 loading 状态
      type: Boolean,
      value: false,
    },
    back: {
      type: Boolean,
      value: false,
    },
    fixed: {
      type: Boolean,
      value: true, // 导航栏是否固定
    },
    title: String, // 导航栏标题
    sub: String, // 副标题
    leftIcon: String, // 左图标(一般都是返回图标)
    occupy: {
      type: Boolean,
      value: true,
    }, // 是否防止 navbar 遮挡内容元素
  },
  data: {
    navHeight: 0, // 导航栏高度
    statusBarHeight: 0, // 状态栏高度
  },
  lifetimes: {
    attached() {
      const { navHeight, statusBarHeight, capsuleLeft } =
        useNavInfo();

      this.setData({
        navHeight,
        statusBarHeight,
        navWidth: capsuleLeft,
      });
    },
  },
  methods: {
    click(e: any) {
      if (this.data.back) {
        wx.navigateBack({
          delta: 1,
        }).catch((err) => {
          console.error(`返回错误, 原因: ${err.errMsg}`);
        });
      } else {
        this.triggerEvent('click', e);
      }
    },
  },
});
