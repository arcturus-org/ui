Component({
  externalClasses: ['i-loading-class'],
  properties: {
    text: String,
    color: {
      type: String,
      value: '#fff',
    },
    size: {
      type: Number,
      value: 50,
    },
    type: {
      type: String,
      value: 'shutter', // shutter | normal
    },
  },
  lifetimes: {
    attached() {
      const { type } = this.data;

      if (type !== 'shutter' && type !== 'normal') {
        console.warn(`样式${type} 在 i-loading 中暂不支持哦`);
      }
    },
  },
});
