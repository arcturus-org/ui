Page({
  data: {
    loading: false,
    blur: false,
    occupy: true,
    leftIcon: '',
    sub: '',
  },

  changeBlur(event: WechatMiniprogram.CustomEvent) {
    const { value } = event.detail;

    this.setData({ blur: value });
  },

  changeOccupy(event: WechatMiniprogram.CustomEvent) {
    const { value } = event.detail;

    this.setData({ occupy: value });
  },

  changeLoading(event: WechatMiniprogram.CustomEvent) {
    const { value } = event.detail;

    this.setData({ loading: value });
  },

  changeLeftIcon(event: WechatMiniprogram.CustomEvent) {
    const { value } = event.detail;

    if (value) {
      this.setData({ leftIcon: 'ri ri-home-3-line' });
    } else {
      this.setData({ leftIcon: '' });
    }
  },

  changeSub(event: WechatMiniprogram.CustomEvent) {
    const { value } = event.detail;

    if (value) {
      this.setData({ sub: '我是副标题' });
    } else {
      this.setData({ sub: '' });
    }
  },
});
