const types = [
  'shutter',
  'shutter-2',
  'shutter-3',
  'shutter-4',
  'normal',
  'pulse-1',
  'pulse-2',
  'pulse-3',
];

Component({
  externalClasses: ['i-loading-class'],
  properties: {
    text: String,
    color: {
      type: String,
      value: '#c0c4cc',
    },
    size: {
      type: Number,
      value: 40,
    },
    type: {
      type: String,
      value: 'normal', // shutter | normal
    },
    vertical: {
      // 加载和文字是否垂直排列
      type: Boolean,
      value: false,
    },
  },
  lifetimes: {
    attached() {
      const { type } = this.data;

      if (!types.includes(type)) {
        console.warn(
          `样式${type} 在 i-loading 中暂不支持哦`
        );
      }
    },
  },
});
