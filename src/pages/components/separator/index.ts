Page({
  data: {
    spaced: 0,
    position: 'left',
    pValue: [
      {
        value: 'left',
        checked: true,
      },
      {
        value: 'center',
      },
      {
        value: 'right',
      },
    ],
  },
  sliderChange(e) {
    this.setData({
      spaced: e.detail.value,
    });
  },

  radioChange(e) {
    this.setData({
      position: e.detail.value,
    });
  },
});
