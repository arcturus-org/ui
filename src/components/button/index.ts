Component({
  properties: {
    label: String,
    size: Number,
    type: {
      type: String,
      value: 'default',
    },
    icon: String,
    flat: {
      type: Boolean,
      value: false,
    },
    outlined: {
      type: Boolean,
      value: false,
    },
    rounded: Boolean,
    square: Boolean,
    plain: Boolean,
    disabled: Boolean,
    loading: Boolean,
    loadingType: {
      type: String,
      value: 'normal',
    },
    formType: String,
    openType: String,
    hoverStartTime: Number,
    hoverStopPropagation: Boolean,
    hoverStayTime: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    appParameter: String,
    showMessageCard: Boolean,
  },

  methods: {
    onGetUserInfo(
      event: WechatMiniprogram.ButtonGetUserInfo
    ) {
      this.triggerEvent('getuserinfo', event.detail);
    },

    onContact(event: WechatMiniprogram.ButtonContact) {
      this.triggerEvent('contact', event.detail);
    },

    onClick(event: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('tap', event.detail);
    },

    onGetPhoneNumber(
      event: WechatMiniprogram.ButtonGetPhoneNumber
    ) {
      this.triggerEvent('getphonenumber', event.detail);
    },

    onError(event: WechatMiniprogram.ButtonError) {
      this.triggerEvent('error', event.detail);
    },

    onLaunchApp(event: WechatMiniprogram.ButtonLaunchApp) {
      this.triggerEvent('launchapp', event.detail);
    },

    onOpenSetting(
      event: WechatMiniprogram.ButtonOpenSetting
    ) {
      this.triggerEvent('opensetting', event.detail);
    },

    onGetAvatar(event) {
      this.triggerEvent('chooseavatar', event.detail);
    },
  },
});
