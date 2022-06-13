/**
 * 与 i-notify 的区别是这是静态的...
 */

Component({
  externalClasses: ['i-alert-class'],
  properties: {
    backgroundColor: {
      type: String,
      value: '#fff',
    },
    color: {
      type: String,
      value: '#000',
    },
    type: String,
    message: String,
    icon: String,
  },
  data: {
    icon_: '',
  },
  lifetimes: {
    attached() {
      const { icon, type, message } = this.data;

      if (icon !== '') {
        this.setData({
          icon_: icon,
        });
      } else if (type !== '') {
        // 如果 icon 没有定义则使用 type 定义的图标
        this.setData({
          icon_: type,
        });
      }

      if (message === '') {
        console.warn('i-alert 缺少 message 参数');
      }
    },
  },
});
