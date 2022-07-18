Component({
  data: {
    selected: 0,
    list: [
      {
        path: '/pages/home/index',
        activeIcon: 'ri ri-stack-fill',
        inactiveIcon: 'ri ri-stack-line',
      },
      {
        path: '/pages/about/index',
        activeIcon: 'ri ri-user-smile-fill',
        inactiveIcon: 'ri ri-user-smile-line',
      },
    ],
  },
  methods: {
    onChange(e: CustomEvent) {
      const { idx } = e.detail;

      this.setData({ selected: idx });

      wx.switchTab({
        url: this.data.list[idx].path,
      });
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        selected: this.data.list.findIndex(
          (item) => item.path === `/${page!.route}`
        ),
      });
    },
  },
});
