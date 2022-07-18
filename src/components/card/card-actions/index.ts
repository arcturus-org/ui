Component({
  properties: {
    align: {
      type: String,
      value: 'right',
    },
    vertical: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    a: 'start',
  },
  lifetimes: {
    attached() {
      const { align } = this.data;
      let a;

      if (align === 'left') {
        a = 'start';
      } else if (align === 'right') {
        a = 'end';
      } else a = align;

      this.setData({ a });
    },
  },
});
