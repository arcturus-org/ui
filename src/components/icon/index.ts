Component({
  externalClasses: ['i-icon-class'],
  properties: {
    icon: String,
    size: {
      type: Number,
      value: 20,
    },
  },
  data: {
    prefix: '',
  },
  lifetimes: {
    ready() {
      if (this.data.icon === '') {
        console.warn('图标类型不能为空');
      }
    },
  },
});
