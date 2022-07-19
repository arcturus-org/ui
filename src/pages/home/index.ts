Page({
  data: {
    layout: [
      {
        label: '导航栏',
        path: '',
      },
      {
        label: '卡片',
        path: '/pages/components/card/index',
      },
      {
        label: '栅格',
        path: '/pages/components/row/index',
      },
      {
        label: 'grid',
        path: '',
      },
      {
        label: '标题',
        path: '',
      },
    ],
    display: [
      {
        label: '分割线',
        path: '/pages/components/separator/index',
      },
      {
        label: '日历',
        path: '/pages/components/calendar/index',
      },
    ],
  },
  onShow() {
    this.getTabBar().init();
  },
});
