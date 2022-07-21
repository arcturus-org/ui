Page({
  data: {
    nav: [
      {
        title: '布局组件',
        list: [
          {
            label: '导航栏',
            path: '/pages/components/navbar/index',
          },
          {
            label: '卡片',
            path: '/pages/components/card/index',
          },
          {
            label: '栅格',
            path: '/pages/components/row/index',
          },
        ],
      },
      {
        title: '基础组件',
        list: [
          {
            label: '按钮',
            path: '/pages/components/button/index',
          },
        ],
      },
      {
        title: '展示组件',
        list: [
          {
            label: '分割线',
            path: '/pages/components/separator/index',
          },
          {
            label: '日历',
            path: '/pages/components/calendar/index',
          },
          {
            label: '加载',
            path: '/pages/components/loading/index',
          },
        ],
      },
    ],
  },
  onShow() {
    this.getTabBar().init();
  },
});
