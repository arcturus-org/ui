// 这是一条分割线
Component({
  properties: {
    inset: {
      type: Boolean,
      value: false,
    },
    vertical: {
      type: Boolean,
      value: false,
    },
    spaced: String,
    label: String, // 自定义文本
    position: {
      type: String,
      value: 'center', // 文本位置
    },
  },
  data: {
    o: 0,
  },
  lifetimes: {
    attached() {
      const { position, label } = this.data;

      if (label) {
        this.changePosition(position);
      }
    },
  },
  methods: {
    changePosition(position) {
      let o;

      switch (position) {
        case 'center':
          o = 5;
          break;
        case 'left':
          o = 1;
          break;
        case 'right':
          o = 9;
      }

      this.setData({ o });
    },
  },
  observers: {
    position: function (p) {
      this.changePosition(p);
    },
  },
});
