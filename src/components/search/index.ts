Component({
  externalClasses: ['placeholder-class'],
  properties: {
    shape: String,
    value: {
      type: String,
      value: '',
    },
    background: String, //  搜索输入框外背景色
    disabled: {
      // 是否禁用
      type: Boolean,
      value: false,
    },
    placeholder: {
      type: String,
      value: '输入搜索内容',
    },
    maxlength: {
      // 最大输入长度
      type: Number,
      value: 100,
    },
    focus: {
      // 是否立即聚集
      type: Boolean,
      value: false,
    },
    center: {
      // placeholder 是否居中
      type: Boolean,
      value: false,
    },
    borderRadius: {
      type: Number,
      value: 50,
    }, // 自定义 border-radius
  },
  data: {
    radius: 0,
    style: '',
  },
  lifetimes: {
    attached() {
      const { shape, borderRadius, background } = this.data;

      let style = '';
      if (background) {
        style = `background: ${background};`;
      }

      if (shape === 'round') {
        this.setData({
          radius: 50 / 2,
          style,
        });
      } else if (shape !== 'square') {
        if (borderRadius !== 0) {
          this.setData({
            radius: borderRadius,
            style,
          });
        }
      } else {
        this.setData({ style });
      }
    },
  },
  methods: {
    search(e: any) {
      this.triggerEvent('search', e.detail);
    },
    blur(e: any) {
      this.triggerEvent('blur', e.detail);
    },
    focus(e: any) {
      this.triggerEvent('focus', e.detail);
    },
    change(e: any) {
      // 输入时触发
      this.triggerEvent('change', e.detail);
    },
  },
});
