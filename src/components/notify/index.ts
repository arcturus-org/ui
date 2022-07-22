let timer: number; // 定时器

Component({
  properties: {
    message: {
      // 通知内容
      type: String,
      value: '',
    },
    backgroundColor: String,
    color: String,
    type: {
      type: String,
      value: 'info',
    },
    icon: String,
    showIcon: {
      type: Boolean,
      value: false,
    },
    position: {
      type: String,
      value: 'top',
    },
    duration: {
      // 持续时间
      type: Number,
      value: 1000,
    },
    open: Boolean,
  },
  data: {
    show: false,
  },
  methods: {
    hide() {
      clearTimeout(timer);
      this.setData({ show: false });
    },
    show() {
      this.setData({ show: true });
      const { duration } = this.data;

      if (duration > 0 && duration !== Infinity) {
        timer = setTimeout(() => {
          this.hide();
        }, duration + 1000); // 过渡动画要 1s
      }
    },
  },

  observers: {
    open(o: Boolean) {
      if (o) {
        this.show();
      }
    },
  },
});
