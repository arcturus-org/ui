import notify from '../../../components/notify/notify';

Page({
  data: {
    open1: false,
    open2: false,
  },
  onOpen1() {
    this.setData({
      open1: true,
    });
  },
  onOpen2() {
    this.setData({
      open2: true,
    });
  },

  onOpen3() {
    notify({
      message: 'hello',
    });
  },
});
