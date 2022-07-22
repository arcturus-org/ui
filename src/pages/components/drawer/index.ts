Page({
  data: {
    right: false,
    left: false,
    top: false,
    bottom: false,
  },
  onRight() {
    this.setData({
      right: true,
      left: false,
      top: false,
      bottom: false,
    });
  },
  onLeft() {
    this.setData({
      right: false,
      left: true,
      top: false,
      bottom: false,
    });
  },
  onTop() {
    this.setData({
      right: false,
      left: false,
      top: true,
      bottom: false,
    });
  },
  onBottom() {
    this.setData({
      right: false,
      left: false,
      top: false,
      bottom: true,
    });
  },
});
