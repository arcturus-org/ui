import getNavInfo from './navInfo';

Component({
  properties: {
    color: {
      // 字体颜色
      type: String,
      value: '#000',
    },
    backgroundColor: {
      // 背景色
      type: String,
      value: '#fff', // 填入 transparent 设置成透明
    },
    loading: {
      // 是否处于 loading 状态
      type: Boolean,
      value: false,
    },
    fixed: {
      type: Boolean,
      value: true, // 导航栏是否固定
    },
    title: String, // 导航栏标题
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
      const { navHeight, statusBarHeight, capsuleLeft } = getNavInfo();
      this.setData({
        navHeight,
        statusBarHeight,
        navWidth: capsuleLeft,
      });
    },
  },
  methods: {
    click(e: any) {
      this.triggerEvent('click', e);
    },
  },
});
