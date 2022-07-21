Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    isLink: {
      type: Boolean,
      value: false,
    },
    path: String,
    label: String,
    sub: String,
    value: String,
    leftIcon: String,
    rightIcon: String,
  },
  methods: {
    to() {
      const { isLink, path } = this.data;

      if (isLink && path) {
        wx.navigateTo({
          url: path,
        }).catch((err) => {
          console.error(`跳转失败, ${err.errMsg}`);
        });
      } else if (!path) {
        console.warn('cell 组件缺少 path');
      }
    },
  },
});
