import map from './map';

Component({
  externalClasses: ['i-icon-class'],
  properties: {
    name: {
      type: String,
      value: '',
    },
    size: {
      type: Number,
      value: 30,
    },
  },
  lifetimes: {
    attached() {
      const { name } = this.data;
      if (name !== '') {
        if (map.hasOwnProperty(name)) {
          this.setData({
            imgUrl: map[name as keyof typeof map],
          });
        } else {
          console.warn(`i-icon 暂不支持 ${name} 类型的图标`);
        }
      } else {
        console.warn('图标类型不能为空');
      }
    },
  },
  // 允许 <i-icon name="{{xxx ? A : B}}"></i-icon>
  observers: {
    name: function (n: string) {
      this.setData({
        imgUrl: map[n as keyof typeof map],
      });
    },
  },
});
