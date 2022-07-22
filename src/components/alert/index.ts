// 与 i-notify 的区别是这是静态的...

const typeMap = {
  positive: 'ri ri-checkbox-circle-line',
  negative: 'ri ri-alert-line',
  info: 'ri ri-notification-line',
  warning: 'ri ri-error-warning-line',
};

Component({
  options: {
    multipleSlots: true,
  },
  externalClasses: ['i-alert-class'],
  properties: {
    backgroundColor: String,
    color: String,
    type: {
      type: String,
      value: 'info',
    },
    message: String,
    icon: String,
    showIcon: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    style: '',
    messageStyle: '',
    typeIcon: '',
  },
  lifetimes: {
    attached() {
      const { backgroundColor, color, type } = this.data;

      let style = '';
      let messageStyle = '';
      let typeIcon = '';

      if (backgroundColor) {
        style = `background-color: ${backgroundColor};`;
      }

      if (color) {
        messageStyle = `color: ${color};`;
      }

      if (type) {
        typeIcon = typeMap[type];
      }

      this.setData({
        messageStyle,
        style,
        typeIcon,
      });
    },
  },
});
