import mockData from './test';

// 将一个数扩大成最接近于它的整 5 倍
function ceilToTen(n: number) {
  return Math.ceil(n / 5) * 5;
}

// 可滑动柱状图
Component({
  properties: {
    data: {
      // 接收的数据
      type: Array,
      value: mockData(),
    },
    showYAxis: {
      // 是否显示 y 轴
      type: Boolean,
      value: true,
    },
    barWidth: {
      // 单个柱宽度
      type: Number,
      value: 10,
    },
    tipWidth: {
      // 提示框宽度
      type: Number,
      value: 130,
    },
    showTip: {
      type: Boolean,
      value: true,
    },
  },

  data: {
    height: 0, // 图像高度
    YAxis: new Array<number>(), // Y 轴数据
    currentIndex: 0, // 当前位置
    scrollWidth: 0, // scroll-view 的可视宽度
  },

  lifetimes: {
    ready() {
      // 获取可用高度
      this.createSelectorQuery()
        .in(this)
        .select('.i-slide__container')
        .boundingClientRect((rect: any) => {
          // 上下共预留出 50px
          const height = rect.height - 50;
          const scrollWidth = rect.width - 52; // 滚动区域为剩余宽度(包括padding)

          if (height < 150) {
            console.warn('i-slide-bar 的高度是否太小了呢?(╯°□°）╯︵');
          }

          const { data, barWidth, tipWidth } = this.data;

          const value = data.map((e) => e.value);

          const Max = ceilToTen(Math.max(...value));

          // 按比例计算每个 bar 的高度
          const count = data.length;
          data.forEach((e, i) => {
            const triangle = tipWidth - 2 * barWidth;
            e.height = height * (e.value / Max);
            e.left = -tipWidth * ((i + 1) / count);
            // Tip 小三角绝对定位的 left, 这个方向与 left 相反
            e.tLeft = triangle * ((i + 1) / count);
          });

          this.setData({
            data,
            height,
            YAxis: [Max, Max / 2, 0],
            scrollWidth,
          });
        })
        .exec();
    },
  },

  methods: {
    // 正在滑动
    scroll(e: any) {
      const { scrollWidth, scrollLeft } = e.detail;
      const s = scrollWidth - this.data.scrollWidth;
      const percentage = scrollLeft / s;
      const currentIndex = Math.ceil(this.data.data.length * percentage);
      this.setData({ currentIndex });
    },
  },
});
